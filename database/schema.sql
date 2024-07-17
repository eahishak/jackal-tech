-- Create jackaltech database
CREATE DATABASE jackaltech;

-- Connect to the jackaltech database
\c jackaltech;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_events_event_date ON events(event_date);




-- Find employees who earn more than the average salary
SELECT name
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);



-- Retrieve customer orders with customer details
SELECT c.customer_id, c.name, o.order_id, o.order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id;



-- Calculate the cumulative sales for each day
WITH daily_sales AS (
    SELECT order_date, SUM(total_amount) AS sales
    FROM orders
    GROUP BY order_date
)
SELECT order_date, sales, SUM(sales) OVER (ORDER BY order_date) AS cumulative_sales
FROM daily_sales;



-- Rank employees by their salary within each department
SELECT name, department_id, salary,
       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank
FROM employees;



-- Insert the highest salaries from each department into a new table
INSERT INTO top_salaries (department_id, employee_id, salary)
SELECT department_id, employee_id, salary
FROM (
    SELECT department_id, employee_id, salary,
           ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
    FROM employees
) AS ranked
WHERE rn = 1;



-- Update the salary of employees based on their performance score
UPDATE employees e
SET e.salary = e.salary * 1.1
FROM performance p
WHERE e.employee_id = p.employee_id AND p.score > 90;



-- Delete employees who have not made any sales
DELETE FROM employees
WHERE employee_id NOT IN (SELECT DISTINCT employee_id FROM sales);


-- Create an index on the order_date column to speed up queries
CREATE INDEX idx_order_date ON orders(order_date);


-- Use EXPLAIN to analyze the performance of a query
EXPLAIN ANALYZE
SELECT c.customer_id, c.name, o.order_id, o.order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date > '2023-01-01';



-- Concatenate first and last names with a space in between
SELECT first_name || ' ' || last_name AS full_name
FROM employees;


-- Calculate the number of days between order date and delivery date
SELECT order_id, delivery_date - order_date AS delivery_time
FROM orders;


-- Calculate the average, minimum, and maximum salary in each department
SELECT department_id, AVG(salary) AS avg_salary, MIN(salary) AS min_salary, MAX(salary) AS max_salary
FROM employees
GROUP BY department_id;


-- Create a stored procedure to give a raise to employees in a specific department
CREATE PROCEDURE GiveRaise(department_id INT, percentage FLOAT)
BEGIN
    UPDATE employees
    SET salary = salary * (1 + percentage / 100)
    WHERE department_id = department_id;
END;

-- Call the stored procedure
CALL GiveRaise(1, 10);



-- Create a function to calculate the total sales for  given customers
CREATE FUNCTION TotalSales(customer_id INT) RETURNS DECIMAL(10, 2)
BEGIN
    DECLARE total DECIMAL(10, 2);
    SELECT SUM(total_amount) INTO total
    FROM orders
    WHERE customer_id = customer_id;
    RETURN total;
END;






-- Use the function
SELECT customer_id, TotalSales(customer_id) AS total_sales
FROM customers;


