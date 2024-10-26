-- Create the jackaltech database
CREATE DATABASE jackaltech;

-- Connect to the jackaltech database
\c jackaltech;

-- Create users table with advanced constraints and triggers
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    password TEXT NOT NULL CHECK (LENGTH(password) > 6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update timestamp when a row is modified
CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the users table
CREATE TRIGGER update_users_mod_time
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create roles table for user permissions
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE NOT NULL
);

-- Insert default roles
INSERT INTO roles (role_name) VALUES ('admin'), ('editor'), ('viewer');

-- Create table for user roles (many-to-many relationship)
CREATE TABLE user_roles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Create videos table with foreign keys and triggers
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL CHECK (url ~* '^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$'),
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add views table to track video views
CREATE TABLE video_views (
    id SERIAL PRIMARY KEY,
    video_id INT REFERENCES videos(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    view_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create events table with partitioning on event_date
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (event_date);

-- Create partitions for different years
CREATE TABLE events_2023 PARTITION OF events
FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE events_2024 PARTITION OF events
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Create users_logs table for auditing
CREATE TABLE users_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Log changes to users
CREATE OR REPLACE FUNCTION log_user_action() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users_logs (user_id, action, log_time) 
    VALUES (NEW.id, TG_OP, CURRENT_TIMESTAMP);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_user_activity
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION log_user_action();

-- Create payments table for storing transactions
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('credit_card', 'paypal', 'bank_transfer')),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for optimizing query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_video_views_video_user ON video_views(video_id, user_id);
CREATE INDEX idx_payments_user ON payments(user_id);

-- Create procedures for handling bulk operations
CREATE PROCEDURE BulkInsertUsers(user_list JSONB)
LANGUAGE plpgsql
AS $$
DECLARE
    user_data JSONB;
    user_email VARCHAR(255);
    user_password TEXT;
BEGIN
    FOR user_data IN SELECT * FROM jsonb_array_elements(user_list)
    LOOP
        user_email := user_data->>'email';
        user_password := user_data->>'password';
        INSERT INTO users (email, password) 
        VALUES (user_email, user_password)
        ON CONFLICT (email) DO NOTHING;
    END LOOP;
END;
$$;

-- Call the procedure for bulk inserting users
CALL BulkInsertUsers('[{"email": "test1@example.com", "password": "password1"}, {"email": "test2@example.com", "password": "password2"}]');

-- Functions for complex queries
CREATE OR REPLACE FUNCTION CalculateUserTotalPayments(user_id INT) RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(amount), 0) INTO total 
    FROM payments
    WHERE user_id = user_id;
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Use the function to retrieve total payments for a user
SELECT CalculateUserTotalPayments(1);

-- Create a view to aggregate video statistics
CREATE VIEW video_stats AS
SELECT 
    v.id AS video_id,
    v.title,
    COUNT(vv.id) AS view_count,
    COALESCE(SUM(CASE WHEN vv.user_id IS NOT NULL THEN 1 ELSE 0 END), 0) AS registered_views
FROM videos v
LEFT JOIN video_views vv ON v.id = vv.video_id
GROUP BY v.id, v.title;

-- Query the view to get video stats
SELECT * FROM video_stats;

-- Advanced querying using window functions
SELECT user_id, 
       SUM(amount) OVER (PARTITION BY user_id ORDER BY payment_date) AS cumulative_payments
FROM payments;

-- Create an aggregate function to calculate the median
CREATE OR REPLACE FUNCTION Median(values FLOAT8[]) RETURNS FLOAT8 AS $$
BEGIN
    RETURN (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY val) FROM UNNEST(values) val);
END;
$$ LANGUAGE plpgsql;

-- Use the median function
SELECT Median(ARRAY(SELECT amount FROM payments WHERE user_id = 1));

-- Create a trigger to enforce business rules
CREATE OR REPLACE FUNCTION check_event_date() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.event_date < CURRENT_DATE THEN
        RAISE EXCEPTION 'Event date cannot be in the past.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the events table
CREATE TRIGGER check_event_date_before_insert
BEFORE INSERT ON events
FOR EACH ROW EXECUTE FUNCTION check_event_date();

-- Transaction example: Insert multiple records and roll back on error
BEGIN;

-- Insert into users
INSERT INTO users (email, password) VALUES ('john.doe@example.com', 'password123');

-- Insert into payments
INSERT INTO payments (user_id, amount, payment_method) 
VALUES (1, 100.00, 'credit_card');

-- Rollback if any error occurs
ROLLBACK;

-- Commit if no errors occur
COMMIT;

-- CTE (Common Table Expressions) for hierarchical data
WITH RECURSIVE subordinates AS (
    SELECT employee_id, manager_id, name
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.manager_id, e.name
    FROM employees e
    INNER JOIN subordinates s ON s.employee_id = e.manager_id
)
SELECT * FROM subordinates;

-- Indexing strategies
CREATE INDEX idx_payments_amount ON payments(amount);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_video_views_view_time ON video_views(view_time);

-- Table partitioning by range for better performance
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    sale_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
) PARTITION BY RANGE (sale_date);

-- Partition tables by year
CREATE TABLE sales_2023 PARTITION OF sales
FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE sales_2024 PARTITION OF sales
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
