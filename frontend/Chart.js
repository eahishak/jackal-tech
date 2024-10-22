document.addEventListener('DOMContentLoaded', function () {
    // Gender Pie Chart
    var internsGenderChartCtx = document.getElementById('internsGenderChart').getContext('2d');
    new Chart(internsGenderChartCtx, {
        type: 'pie',
        data: {
            labels: ['Female', 'Male', 'Other'],
            datasets: [{
                data: [21, 39, 5],
                backgroundColor: ['#007bff', '#dc3545', '#28a745']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Jackal Tech Summer 2024 SWE Interns Gender Chart'
            }
        }
    });

    // Staff Growth Bar Chart
    var staffGrowthChartCtx = document.getElementById('staffGrowthChart').getContext('2d');
    new Chart(staffGrowthChartCtx, {
        type: 'bar',
        data: {
            labels: ['Q4-2023', 'Q1-2024', 'Q2-2024/Baseline'],
            datasets: [{
                label: 'Staff',
                data: [44, 61, 100],
                backgroundColor: '#007bff'
            }, {
                label: 'Growth Rate',
                data: [0, 21, 39],
                backgroundColor: '#dc3545'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Jackal Tech Staff Growth Metrics 2023-24 Term'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Interns Country Pie Chart
    var internsCountryChartCtx = document.getElementById('internsCountryChart').getContext('2d');
    new Chart(internsCountryChartCtx, {
        type: 'pie',
        data: {
            labels: ['Rwanda', 'Pakistan', 'Kenya', 'Vietnam', 'United States', 'Tanzania', 'South Africa', 'India', 'Egypt', 'Bangladesh', 'Burundi', 'Zimbabwe', 'Nigeria', 'Turkey'],
            datasets: [{
                data: [26, 19, 16, 11, 6, 5, 5, 3, 1, 2, 2, 2, 1, 1],
                backgroundColor: ['#007bff', '#dc3545', '#28a745', '#ffc107', '#6f42c1', '#e83e8c', '#20c997', '#fd7e14', '#17a2b8', '#6c757d', '#343a40', '#f8f9fa', '#28a745', '#007bff']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Jackal Tech Interns by Country'
            }
        }
    });
});
