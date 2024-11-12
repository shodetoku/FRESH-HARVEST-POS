const sqlite3 = require('sqlite3').verbose();

// Connect to the database
let db = new sqlite3.Database('./fresh_harvest.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the fresh_harvest SQLite database.');
});

// Create Sales Table
db.run(`CREATE TABLE IF NOT EXISTS sales (
  sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  category TEXT,
  quantity INTEGER,
  sale_amount REAL,
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Sales table created or verified.');
});

// Create Inventory Table
db.run(`CREATE TABLE IF NOT EXISTS inventory (
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT,
  category TEXT,
  current_stock INTEGER,
  reorder_level INTEGER
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Inventory table created or verified.');
});

// Create Transactions Table
db.run(`CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  transaction_amount REAL,
  items_sold INTEGER
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Transactions table created or verified.');
});

// Insert sample data into Inventory Table
db.run(`INSERT INTO inventory (product_name, category, current_stock, reorder_level)
        VALUES ('Vegan Burger', 'Food', 20, 5),
               ('Vegan Wrap', 'Food', 30, 5),
               ('Vegan Salad', 'Food', 15, 3)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Sample data added to Inventory.');
});

// Insert sample data into Sales Table
db.run(`INSERT INTO sales (product_id, category, quantity, sale_amount)
        VALUES (1, 'Food', 2, 17.98),
               (2, 'Food', 3, 17.97),
               (3, 'Food', 1, 6.50)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Sample data added to Sales.');
});

// Insert sample data into Transactions Table
db.run(`INSERT INTO transactions (transaction_amount, items_sold)
        VALUES (17.98, 2),
               (17.97, 3),
               (6.50, 1)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Sample data added to Transactions.');
});

function getSalesReport(timeFrame) {
    let query = '';

    // Determine the SQL query based on the time frame
    if (timeFrame === 'daily') {
        query = `SELECT SUM(sale_amount) AS total_sales, DATE(sale_date) AS sale_date 
                  FROM sales 
                  GROUP BY sale_date`;
    } else if (timeFrame === 'weekly') {
        query = `SELECT SUM(sale_amount) AS total_sales, strftime('%Y-%W', sale_date) AS sale_week 
                  FROM sales 
                  GROUP BY sale_week`;
    } else if (timeFrame === 'monthly') {
        query = `SELECT SUM(sale_amount) AS total_sales, strftime('%Y-%m', sale_date) AS sale_month 
                  FROM sales 
                  GROUP BY sale_month`;
    }

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        
        // Clear previous report data
        const salesReportDiv = document.getElementById('sales-report');
        salesReportDiv.innerHTML = ''; // Clear previous content

        // Display the results
        rows.forEach(row => {
            const reportItem = document.createElement('div');
            reportItem.innerHTML = `Total Sales: ₱${row.total_sales} on ${row.sale_date || row.sale_week || row.sale_month}`;
            salesReportDiv.appendChild(reportItem);
        });
    });
}

// Function to get Inventory Report
function getInventoryReport() {
    const query = `SELECT product_name, current_stock, reorder_level 
                   FROM inventory`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }

        // Clear previous report data
        const inventoryReportDiv = document.getElementById('inventory-report');
        inventoryReportDiv.innerHTML = ''; // Clear previous content

        // Display the results
        rows.forEach(item => {
            const reportItem = document.createElement('div');
            reportItem.innerHTML = `Product: ${item.product_name}, Current Stock: ${item.current_stock}, Reorder Level: ${item.reorder_level}`;
            inventoryReportDiv.appendChild(reportItem);

            // Check for low stock alerts
            if (item.current_stock <= item.reorder_level) {
                const alertItem = document.createElement('div');
                alertItem.innerHTML = `<strong>Alert: Low stock for ${item.product_name}!</strong>`;
                inventoryReportDiv.appendChild(alertItem);
            }
        });
    });
}

// Function to get Transaction Report
function getTransactionReport() {
    const query = `SELECT transaction_id, transaction_date, transaction_amount, items_sold 
                   FROM transactions`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }

        // Clear previous report data
        const transactionReportDiv = document.getElementById('transaction-report');
        transactionReportDiv.innerHTML = ''; // Clear previous content

        // Display the results
        rows.forEach(transaction => {
            const reportItem = document.createElement('div');
            reportItem.innerHTML = `Transaction ID: ${transaction.transaction_id}, Date: ${transaction.transaction_date}, Amount: ₱${transaction.transaction_amount}, Items Sold: ${transaction.items_sold}`;
            transactionReportDiv.appendChild(reportItem);
        });
    });
}

// Call report functions
getSalesReport();
getInventoryReport();
getTransactionReport();

// Close the database connection after reports
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});
