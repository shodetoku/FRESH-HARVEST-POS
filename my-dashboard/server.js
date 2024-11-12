const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'yourusername', // Your database username
    password: 'yourpassword', // Your database password
    database: 'yourdatabase' // Your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Function to execute a query
function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

// Example endpoint to fetch sales data
app.get('/api/sales', async (req, res) => {
    try {
        const totalSalesQuery = "SELECT SUM(sale_amount) AS total_sales FROM Sales WHERE date BETWEEN ? AND ?";
        const productSalesQuery = "SELECT product_id, SUM(sale_amount) AS total_sales FROM Sales GROUP BY product_id";
        const quantitySoldQuery = "SELECT product_id, SUM(quantity) AS quantity_sold FROM Sales GROUP BY product_id";

        // Replace with actual start and end dates as needed
        const startDate = '2023-01-01'; // Example start date
        const endDate = '2023-12-31'; // Example end date

        const totalSales = await executeQuery(totalSalesQuery, [startDate, endDate]);
        const productSales = await executeQuery(productSalesQuery);
        const quantitySold = await executeQuery(quantitySoldQuery);

        res.json({ totalSales, productSales, quantitySold });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});