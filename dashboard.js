document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const loggedInUser  = JSON.parse(localStorage.getItem('currentUser  '));

    if (!loggedInUser ) {
        alert('Please log in to access the dashboard');
        window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
        document.getElementById('welcome-message').innerText = `Welcome, ${loggedInUser .username}`;



  // Populate tables
  populateTable('sales-table', salesData, ['sale_id', 'product_id', 'category', 'qty', 'sale_amount', 'sale_date']);
  populateTable('inventory-table', inventoryData, ['product_id', 'product_name', 'category', 'current_stock', 'reorder_level']);
  populateTable('transactions-table', transactionsData, ['transaction_id', 'transaction_date', 'transact_amount', 'items_sold']);

  // Logout functionality
  document.getElementById('logout').addEventListener('click', function() {
      localStorage.removeItem('currentUser '); // Remove user from local storage
      window.location.href = 'login.html'; // Redirect to login page
  });
}

// Function to populate tables dynamically
function populateTable(tableId, data, columns) {
  const tableBody = document.getElementById(tableId).querySelector('tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach(item => {
      const row = document.createElement('tr');
      columns.forEach(col => {
          const cell = document.createElement('td');
          cell.innerText = item[col]; // Set cell text based on the column
          row.appendChild(cell);
      });
      tableBody.appendChild(row);
  });
}

// Function to toggle the visibility of the sections (Sales, Inventory, Transactions)
function toggleTable(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden'); // Show the section
    } else {
        section.classList.add('hidden'); // Hide the section
    }
}
});

   
    // Call report functions
    getSalesReport('daily'); // Change 'daily' to 'weekly' or 'monthly' as needed
    getInventoryReport();
    getTransactionReport();
;

let transactions = []; // Array to store transaction records

function recordTransaction() {
    const transactionId = transactions.length + 1; // Simple ID generation
    const dateTime = new Date().toLocaleString(); // Get current date and time
    const amount = prompt("Enter transaction amount:"); // Prompt for transaction amount
    const itemsSold = prompt("Enter number of items sold:"); // Prompt for items sold

    // Create a new transaction object
    const newTransaction = {
        transaction_id: transactionId,
        transaction_date: dateTime,
        transaction_amount: parseFloat(amount),
        items_sold: parseInt(itemsSold)
    };

    // Add the new transaction to the array
    transactions.push(newTransaction);

    // Update the transaction table
    displayTransactions();
}

function displayTransactions() {
    const transactionBody = document.getElementById('transaction-body');
    transactionBody.innerHTML = ''; // Clear previous records

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.transaction_id}</td>
            <td>${transaction.transaction_date}</td>
            <td>₱${transaction.transaction_amount.toFixed(2)}</td>
            <td>${transaction.items_sold}</td>
        `;
        transactionBody.appendChild(row);
    });
}