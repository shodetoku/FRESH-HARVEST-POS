document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const loggedInUser  = JSON.parse(localStorage.getItem('currentUser  '));

    if (!loggedInUser ) {
        alert('Please log in to access the dashboard');
        window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
        document.getElementById('welcome-message').innerText = `Welcome, ${loggedInUser .username}`;

        // Sample data for Sales, Inventory, and Transactions
        const salesData = [
            { sale_id: 1, product_id: 'SKU001', category: 'Main', qty: 3, sale_amount: 450, sale_date: '2023-10-01 12:00' },
            { sale_id: 2, product_id: 'SKU002', category: 'Main', qty: 2, sale_amount: 240, sale_date: '2023-10-02 14:00' },
            { sale_id: 3, product_id: 'SKU003', category: 'Main', qty: 1, sale_amount: 100, sale_date: '2023-10-03 16:00' },
            { sale_id: 4, product_id: 'SKU004', category: 'Main', qty: 4, sale_amount: 320, sale_date: '2023-10-04 18:00' },
            { sale_id: 5, product_id: 'SKU005', category: 'Main', qty: 2, sale_amount: 220, sale_date: '2023-10-05 10:00' },
            { sale_id: 6, product_id: 'SKU006', category: 'Main', qty: 3, sale_amount: 420, sale_date: '2023-10-06 12:00' },
            { sale_id: 7, product_id: 'SKU007', category: 'Main', qty: 5, sale_amount: 450, sale_date: '2023-10-07 14:00' },
            { sale_id: 8, product_id: 'SKU008', category: 'Main', qty: 2, sale_amount: 140, sale_date: '2023-10-08 16:00' },
            { sale_id: 9, product_id: 'SKU009', category: 'Main', qty: 1, sale_amount: 130, sale_date: '2023-10-09 18:00' },
            { sale_id: 10, product_id: 'SKU010', category: 'Main', qty: 3, sale_amount: 330, sale_date: '2023-10-10 20:00' },
            { sale_id: 11, product_id: 'SKU011', category: 'Snacks', qty: 2, sale_amount: 160, sale_date: '2023-10-11 12:00' },
            { sale_id: 12, product_id: 'SKU012', category: 'Snacks', qty: 4, sale_amount: 320, sale_date: '2023-10-12 14:00' },
            { sale_id: 13, product_id: 'SKU013', category: 'Snacks', qty: 3, sale_amount: 240, sale_date: '2023-10-13 16:00' },
            { sale_id: 14, product_id: 'SKU014', category: 'Snacks', qty: 2, sale_amount: 180, sale_date: '2023-10-14 18:00' },
            { sale_id: 15, product_id: 'SKU015', category: 'Snacks', qty: 1, sale_amount: 100, sale_date: '2023-10-15 10:00' },
            { sale_id: 16, product_id: 'SKU016', category: 'Desserts', qty: 3, sale_amount: 210, sale_date: '2023-10-16 12:00' },
            { sale_id: 17, product_id: 'SKU017', category: 'Desserts', qty: 2, sale_amount: 160, sale_date: '2023-10-17 14:00' },
            { sale_id: 18, product_id: 'SKU018', category: 'Desserts', qty: 4, sale_amount: 320, sale_date: '2023-10-18 16:00' },
            { sale_id: 19, product_id: 'SKU019', category: 'Desserts', qty: 1, sale_amount: 120, sale_date: '2023-10-19 18:00' },
            { sale_id: 20, product_id: 'SKU020', category: 'Desserts', qty: 3, sale_amount: 270, sale_date: '2023-10-20 20:00' },
            { sale_id: 21, product_id: 'SKU021', category: 'Beverages', qty: 5, sale_amount: 150, sale_date: '2023-10-21 12:00' },
            { sale_id: 22, product_id: 'SKU022', category: 'Beverages', qty: 4, sale_amount: 160, sale_date: '2023-10-22 14:00' },
            { sale_id: 23, product_id: 'SKU023', category: 'Beverages', qty: 2, sale_amount: 100, sale_date: '2023-10-23 16:00' },
            { sale_id: 24, product_id: 'SKU024', category: 'Beverages', qty: 3, sale_amount: 180, sale_date: '2023-10-24 18:00' },
            { sale_id: 25, product_id: 'SKU025', category: 'Beverages', qty: 1, sale_amount: 90, sale_date: '2023-10-25 10:00' },
            { sale_id: 26, product_id: 'SKU026', category: 'Snacks', qty: 2, sale_amount: 160, sale_date: '2023-10-26 12:00' },
            { sale_id: 27, product_id: 'SKU027', category: 'Snacks', qty: 4, sale_amount: 320, sale_date: '2023-10-27 14:00' },
            { sale_id: 28, product_id: 'SKU028', category: 'Snacks', qty: 3, sale_amount: 240, sale_date: '2023-10-28 16:00' },
            { sale_id: 29, product_id: 'SKU029', category: 'Snacks', qty: 2, sale_amount: 180, sale_date: '2023-10-29 18:00' },
            { sale_id: 30, product_id: 'SKU030', category: 'Snacks', qty: 1, sale_amount: 100, sale_date: '2023-10-30 20:00' },
        ];

        const inventoryData = [
            { product_id: 'SKU001', product_name: 'Vegan Burger', category: 'Main', current_stock: 50, reorder_level: 10 },
            { product_id: 'SKU002', product_name: 'Vegan Sausages', category: 'Main', current_stock: 30, reorder_level: 5 },
            { product_id: 'SKU003', product_name: 'Tofu Sisig', category: 'Main', current_stock: 25, reorder_level: 5 },
            { product_id: 'SKU004', product_name: 'Jackfruit BBQ', category: 'Main', current_stock: 20, reorder_level: 5 },
            { product_id: 'SKU005', product_name: 'Vegan Pizza', category: 'Main', current_stock: 15, reorder_level: 3 },
            { product_id: 'SKU006', product_name: 'Lentil Curry', category: 'Main', current_stock: 10, reorder_level: 2 },
            { product_id: 'SKU007', product_name: 'Mushroom Stroganoff', category: 'Main', current_stock: 5, reorder_level: 2 },
            { product_id: 'SKU008', product_name: 'Vegan Pad Thai', category: 'Main', current_stock: 8, reorder_level: 3 },
            { product_id: 'SKU009', product_name: 'Plant-Based Burrito', category: 'Main', current_stock: 12, reorder_level: 4 },
            { product_id: 'SKU010', product_name: 'Buddha Bowl', category: 'Main', current_stock: 18, reorder_level: 5 },
            { product_id: 'SKU011', product_name: 'Kale Chips', category: 'Snacks', current_stock: 40, reorder_level: 10 },
            { product_id: 'SKU012', product_name: 'Vegan Spring Rolls', category: 'Snacks', current_stock: 30, reorder_level: 5 },
            { product_id: 'SKU013', product_name: 'Sweet Potato Fries', category: 'Snacks', current_stock: 25, reorder_level: 5 },
            { product_id: 'SKU014', product_name: 'Hummus & Veggies', category: 'Snacks', current_stock: 20, reorder_level: 5 },
            { product_id: 'SKU015', product_name: 'Vegan Dumplings', category: 'Snacks', current_stock: 15, reorder_level: 3 },
            { product_id: 'SKU016', product_name: 'Popcorn Tofu', category: 'Snacks', current_stock: 10, reorder_level: 2 },
            { product_id: 'SKU017', product_name: 'Edamame', category: 'Snacks', current_stock: 8, reorder_level: 3 },
            { product_id: 'SKU018', product_name: 'Roasted Chickpeas', category: 'Snacks', current_stock: 12, reorder_level: 4 },
            { product_id: 'SKU019', product_name: 'Vegan Nachos', category: 'Snacks', current_stock: 18, reorder_level: 5 },
            { product_id: 'SKU020', product_name: 'Stuffed Peppers', category: 'Main', current_stock: 22, reorder_level: 5 },
            { product_id: 'SKU021', product_name: 'Vegan Brownies', category: 'Desserts', current_stock: 30, reorder_level: 10 },
            { product_id: 'SKU022', product_name: 'Coconut Ice Cream', category: 'Desserts', current_stock: 25, reorder_level: 5 },
            { product_id: 'SKU023', product_name: 'Almond Butter Cookies', category: 'Desserts', current_stock: 20, reorder_level: 5 },
            { product_id: 'SKU024', product_name: 'Avocado Mousse', category: 'Desserts', current_stock: 15, reorder_level: 3 },
            { product_id: 'SKU025', product_name: 'Vegan Cheesecake', category: 'Desserts', current_stock: 10, reorder_level: 2 },
            { product_id: 'SKU026', product_name: 'Chia Pudding', category: 'Desserts', current_stock: 8, reorder_level: 3 },
            { product_id: 'SKU027', product_name: 'Banana Bread', category: 'Desserts', current_stock: 12, reorder_level: 4 },
            { product_id: 'SKU028', product_name: 'Vegan Donuts', category: 'Desserts', current_stock: 18, reorder_level: 5 },
            { product_id: 'SKU029', product_name: 'Energy Balls', category: 'Snacks', current_stock: 15, reorder_level: 3 },
            { product_id: 'SKU030', product_name: 'Fruit Sorbet', category: 'Desserts', current_stock: 20, reorder_level: 5 },
        ];

        const transactionsData = [
            { transaction_id: 1, transaction_date: '2023-10-01', transact_amount: 450, items_sold: 3 },
            { transaction_id: 2, transaction_date: '2023-10-02', transact_amount: 240, items_sold: 2 },
            { transaction_id: 3, transaction_date: '2023-10-03', transact_amount: 100, items_sold: 1 },
            { transaction_id: 4, transaction_date: '2023-10-04', transact_amount: 320, items_sold: 4 },
            { transaction_id: 5, transaction_date: '2023-10-05', transact_amount: 220, items_sold: 2 },
            { transaction_id: 6, transaction_date: '2023-10-06', transact_amount: 420, items_sold: 3 },
            { transaction_id: 7, transaction_date: '2023-10-07', transact_amount: 450, items_sold: 5 },
            { transaction_id: 8, transaction_date: '2023-10-08', transact_amount: 140, items_sold: 2 },
            { transaction_id: 9, transaction_date: '2023-10-09', transact_amount: 130, items_sold: 1 },
            { transaction_id: 10, transaction_date: '2023-10-10', transact_amount: 330, items_sold: 3 },
            { transaction_id: 11, transaction_date: '2023-10-11', transact_amount: 160, items_sold: 2 },
            { transaction_id: 12, transaction_date: '2023-10-12', transact_amount: 320, items_sold: 4 },
            { transaction_id: 13, transaction_date: '2023-10-13', transact_amount: 240, items_sold: 3 },
            { transaction_id: 14, transaction_date: '2023-10-14', transact_amount: 180, items_sold: 2 },
            { transaction_id: 15, transaction_date: '2023-10-15', transact_amount: 100, items_sold: 1 },
            { transaction_id: 16, transaction_date: '2023-10-16', transact_amount: 210, items_sold: 3 },
            { transaction_id: 17, transaction_date: '2023-10-17', transact_amount: 160, items_sold: 2 },
            { transaction_id: 18, transaction_date: '2023-10-18', transact_amount: 320, items_sold: 4 },
            { transaction_id: 19, transaction_date: '2023-10-19', transact_amount: 120, items_sold: 1 },
            { transaction_id: 20, transaction_date: '2023-10-20', transact_amount: 270, items_sold: 3 },
            { transaction_id: 21, transaction_date: '2023-10-21', transact_amount: 150, items_sold: 5 },
            { transaction_id: 22, transaction_date: '2023-10-22', transact_amount: 160, items_sold: 4 },
            { transaction_id: 23, transaction_date: '2023-10-23', transact_amount: 100, items_sold: 2 },
            { transaction_id: 24, transaction_date: '2023-10-24', transact_amount: 180, items_sold: 3 },
            { transaction_id: 25, transaction_date: '2023-10-25', transact_amount: 90, items_sold: 1 },
            { transaction_id: 26, transaction_date: '2023-10-26', transact_amount: 160, items_sold: 2 },
            { transaction_id: 27, transaction_date: '2023-10-27', transact_amount: 320, items_sold: 4 },
            { transaction_id: 28, transaction_date: '2023-10-28', transact_amount: 240, items_sold: 3 },
            { transaction_id: 29, transaction_date: '2023-10-29', transact_amount: 180, items_sold: 2 },
            { transaction_id: 30, transaction_date: '2023-10-30', transact_amount: 100, items_sold: 1 },
        ];

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