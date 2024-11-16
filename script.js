const VAT_RATE = 0.12;

// Menu items with VAT-inclusive prices
const menuItems = [
    { sku: 'SKU001', name: 'Vegan Burger', price: withVAT(150), image: 'images/vegan_burger.jpg', qty: 30, description: 'A delicious vegan burger made with plant-based ingredients.' },
    { sku: 'SKU002', name: 'Vegan Sausages', price: withVAT(120), image: 'images/vegan_sausages.jpg', qty: 30, description: 'Tasty vegan sausages perfect for grilling.' },
    { sku: 'SKU003', name: 'Tofu Sisig', price: withVAT(100), image: 'images/tofu_sisig.jpg', qty: 30, description: 'A flavorful tofu dish inspired by traditional sisig.' },
    { sku: 'SKU004', name: 'Jackfruit BBQ', price: withVAT(80), image: 'images/jackfruit_bbq.jpg', qty: 30, description: 'Tender jackfruit marinated in BBQ sauce and grilled to perfection.' },
    { sku: 'SKU005', name: 'Vegan Pizza', price: withVAT(110), image: 'images/vegan_pizza.jpg', qty: 30, description: 'A classic pizza topped with fresh vegetables and vegan cheese.' },
    { sku: 'SKU006', name: 'Lentil Curry', price: withVAT(140), image: 'images/lentil_curry.jpg', qty: 30, description: 'A hearty lentil curry packed with spices and flavor.' },
    { sku: 'SKU007', name: 'Mushroom Stroganoff', price: withVAT(90), image: 'images/mushroom_stroganoff.jpg', qty: 30, description: 'Creamy stroganoff made with sautéed mushrooms and herbs.' },
    { sku: 'SKU008', name: 'Vegan Pad Thai', price: withVAT(70), image: 'images/vegan_pad_thai.jpg', qty: 30, description: 'Stir-fried rice noodles with tofu, vegetables, and a tangy sauce.' },
    { sku: 'SKU009', name: 'Plant-Based Burrito', price: withVAT(130), image: 'images/plant_based_burrito.jpg', qty: 30, description: 'A hearty burrito filled with beans, rice, and fresh veggies.' },
    { sku: 'SKU010', name: 'Buddha Bowl', price: withVAT(110), image: 'images/buddha_bowl.jpg', qty: 30, description: 'A nourishing bowl with grains, greens, and a variety of toppings.' },
    { sku: 'SKU011', name: 'Kale Chips', price: withVAT(80), image: 'images/kale_chips.jpg', qty: 30, description: 'Crispy kale chips seasoned with sea salt and spices.' },
    { sku: 'SKU012', name: 'Vegan Spring Rolls', price: withVAT(80), image: 'images/vegan_spring_rolls.jpg', qty: 30, description: 'Fresh spring rolls filled with vegetables and served with dipping sauce.' },
    { sku: 'SKU013', name: 'Sweet Potato Fries', price: withVAT(80), image: 'images/sweet_potato_fries.jpg', qty: 30, description: 'Crispy sweet potato fries seasoned to perfection.' },
    { sku: 'SKU014', name: 'Hummus & Veggies', price: withVAT(90), image: 'images/hummus_veggies.jpg', qty: 30, description: 'Creamy hummus served with fresh vegetables for dipping.' },
    { sku: 'SKU015', name: 'Vegan Dumplings', price: withVAT(100), image: 'images/vegan_dumplings.jpg', qty: 30, description: 'Savory dumplings filled with vegetables and spices.' },
];

let cart = [];
let grandTotal = 0;

// Helper function: Apply 12% VAT and round to 2 decimal places
function withVAT(price) {
    return parseFloat((price * (1 + VAT_RATE)).toFixed(2));
}

// Replace this function with the one in your script.js
function displayMenu(items) {
    const foodItemsDiv = document.getElementById('food-items');
    foodItemsDiv.innerHTML = ''; // Clear previous content

    const searchInput = document.getElementById('search');
    const searchValue = searchInput.value.toLowerCase();

    // Filter items based on search input
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchValue) || item.sku.toLowerCase().includes(searchValue)
    );

    filteredItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100" onclick="showProductModal('${item.image}', '${item.name}', '${item.sku}', '${item.description}', '${item.price}')">
            <h3>${item.name}</h3>
            <p>SKU: ${item.sku}</p>
            <p>Price: ₱${item.price}</p>
            <input type="number" id="qty-input-${item.sku}" min="1" value="1" style="width: 60%; margin: 10px 0;">
            <button onclick="addToCart('${item.sku}')">Add to Cart</button>
        `;
        foodItemsDiv.appendChild(itemDiv);
    });
}

// Add this function to your script.js
function showProductModal(image, name, sku, description, price) {
    document.getElementById('product-modal').style.display = 'block';
    document.getElementById('product-modal-image').src = image;
    document.getElementById('product-modal-name').innerText = name;
    document.getElementById('product-modal-sku').innerText = `SKU: ${sku}`;
    document.getElementById('product-modal-description').innerText = description;
    document.getElementById('product-modal-price').innerText = `Price: ₱${price}`;
}

        // Close the product modal when the user clicks outside of it
document.getElementById('product-modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        document.getElementById('product-modal').style.display = 'none';
    }
});

// Close modal when the close button is clicked
document.querySelector('.product-modal .close').addEventListener('click', () => {
    document.getElementById('product-modal').style.display = 'none';
});

// Update search functionality to trigger on input
document.getElementById('search').addEventListener('input', function() {
    displayMenu(menuItems); // Call displayMenu to filter and show items based on search input
});


let currentSku; // Variable to hold the current SKU for adding to cart

// Show item details and open modal
function showItemDetails(sku) {
    const item = menuItems.find(item => item.sku === sku);
    if (item) {
        document.getElementById('modal-item-name').innerText = item.name;
        document.getElementById('modal-item-image').src = item.image;
        document.getElementById('modal-item-description').innerText = item.description;
        document.getElementById('modal-item-price').innerText = `Price: ₱${item.price} (incl. 12% VAT)`;
        currentSku = sku; // Store the current SKU for adding to cart
        document.getElementById('qty-input').value = 1; // Reset quantity to 1 when showing details
        document.getElementById('item-modal').style.display = 'flex'; // Show the modal

        // Start floating emojis
        startFloatingEmojis();
    }
}

// Function to generate and animate raining emojis
function startFloatingEmojis() {
    const emojiContainer = document.getElementById('floating-emojis');
    emojiContainer.innerHTML = ''; // Clear previous emojis

    const emojis = ['🍃', '🌼', '🍎', '🍋', '🌿', '🌸', '🍓', '🥭']; // Array of emoji characters

    // Create a number of falling emojis
    for (let i = 0; i < 20; i++) { // Change the number for more or fewer emojis
        const emoji = document.createElement('span');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)]; // Random emoji
        emoji.style.left = Math.random() * 100 + '%'; // Random horizontal position
        emoji.style.animationDuration = (Math.random() * 2 + 's')// Random delay before starting to fall
        emojiContainer.appendChild(emoji);
    }
}


// Function to close the modal
function closeModal() {
    document.getElementById('item-modal').style.display = 'none'; // Hide the modal
}

// Add selected items to the cart
function addToCart(sku) {
    const qtyInput = document.getElementById(`qty-input-${sku}`); // Use the unique ID for the input
    const qty = parseInt(qtyInput.value);
    const item = menuItems.find(item => item.sku === sku);

    if (item && qty > 0) {
        const cartItem = cart.find(i => i.sku === sku);
        if (cartItem) {
            cartItem.qty += qty; // Increase quantity if item already in cart
        } else {
            cart.push({ ...item, qty }); // Add new item to cart
        }
        updateOrderSummary(); // Update the order summary
    } else {
        alert('Please enter a valid quantity.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayMenu(menuItems); // Call this after the DOM is ready
});
// Update order summary
function updateOrderSummary() {
    const orderSummaryDiv = document.getElementById('order-summary');
    orderSummaryDiv.innerHTML = '';

    grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        orderSummaryDiv.innerHTML += `
            <div>${item.name} (x${item.qty}) - ₱${itemTotal.toFixed(2)}</div>
        `;
    });

    const vatAmount = (grandTotal - (grandTotal / (1 + VAT_RATE))).toFixed(2);
    document.getElementById('vat-summary').innerHTML = `<div>VAT (12%): ₱${vatAmount}</div>`;
    document.getElementById('vat-summary').style.display = 'block';

    const grandTotalDisplay = document.createElement('div');
    grandTotalDisplay.innerHTML = `<strong>Grand Total: ₱${grandTotal.toFixed(2)}</strong>`;
    orderSummaryDiv.appendChild(grandTotalDisplay);

    const payButton = document.getElementById('pay-button');
    payButton.style.display = 'block';
}

// Handle payment process
document.getElementById('pay-button').addEventListener('click', () => {
    document.getElementById('cash-input').style.display = 'block';
});

// Confirm payment
document.getElementById('confirm-payment').addEventListener('click', () => {
    const cashAmount = parseFloat(document.getElementById('cash-amount').value);
    if (!isNaN(cashAmount) && cashAmount >= grandTotal) {
        const change = (cashAmount - grandTotal).toFixed(2);
        displayReceipt(cashAmount, change);
        cart = []; // Clear cart after payment
        updateOrderSummary();
        document.getElementById('cash-input').style.display = 'none';
    } else {
        alert('Please enter a valid amount.');
    }
});

// Display receipt
function displayReceipt(amountPaid, change) {
    const receiptContent = document.getElementById('receipt-content');
    receiptContent.innerHTML = `
        <h2 style="text-align: center;">Receipt</h2>
        <hr>
        ${cart.map(item => `<div>${item.name} (x${item.qty}) - ₱${(item.price * item.qty).toFixed(2)}</div>`).join('')}
        <hr>
        <div>VAT (12%): ₱${((grandTotal - (grandTotal / (1 + VAT_RATE))).toFixed(2))}</div>
        <div><strong>Grand Total: ₱${grandTotal.toFixed(2)}</strong></div>
        <div>Amount Paid: ₱${amountPaid.toFixed(2)}</div>
        <div>Change: ₱${change}</div>
        <div>Date: ${new Date().toLocaleDateString()}</div> <!-- Add date -->
        <div>Time: ${new Date().toLocaleTimeString()}</div> <!-- Add time -->
    `;
    document.getElementById('receipt').style.display = 'block'; // Show the receipt
}

// Print receipt (for demo purposes)
function printReceipt() {
    alert('Receipt printed (demo action).');
}

// Close receipt
function closeReceipt() {
    document.getElementById('receipt').style.display = 'none';
}

// Initial display of menu items
displayMenu(menuItems);
// Function to search menu items
document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredItems = menuItems.filter(item => 
        item.sku.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
    );
    displayMenu(filteredItems);
});

const users = JSON.parse(localStorage.getItem('users')) || [];

// Prepopulate with default users if none exist
if (users.length === 0) {
    users.push(
        { username: 'manager', password: 'manager123', role: 'manager' },
        { username: 'cashier', password: 'cashier123', role: 'cashier' }
    );
    localStorage.setItem('users', JSON.stringify(users)); // Save to local storage
}

// Handle account creation
document.getElementById('create-account-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Check if user already exists
    const existingUser   = users.find(user => user.username === username);
    if (existingUser ) {
        alert('Username already exists. Please choose another one.');
        return;
    }

    // Create new user
    const newUser   = { username, password, role };
    users.push(newUser );
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! You can now log in.');
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Handle login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert(`Welcome, ${user.role}! You are now logged in.`);
        localStorage.setItem('loggedInUser ', JSON.stringify(user)); // Store logged-in user
        window.location.href = 'index.html'; // Redirect to main page
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Check if user is logged in
const loggedInUser  = JSON.parse(localStorage.getItem('loggedInUser '));
const userMenu = document.getElementById('user-menu');
const createAccountLink = document.getElementById('create-account-link');
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout');

if (loggedInUser ) {
    // If user is logged in, display welcome message and logout option
    userMenu.innerHTML = `
        <span>Welcome, ${loggedInUser .username} (${loggedInUser .role})</span>
        <a href="#" id="logout">Logout</a>
    `;

    // Logout functionality
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser '); // Remove logged-in user from localStorage
        alert('You have been logged out.');
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Hide Create Account and Login links
    createAccountLink.style.display = 'none';
    loginLink.style.display = 'none';
} else {
    // If no user is logged in, show Create Account and Login links
    userMenu.innerHTML = `
        <a href="create_account.html" id="create-account-link">Create Account</a>
        <a href="login.html" id="login-link">Login</a>
    `;
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show the clicked tab's content
        const contentId = tab.id.replace('-tab', '-content');
        document.getElementById(contentId).style.display = 'block';
    });
});

// Show the sales tab content by default
document.getElementById('sales-content').style.display = 'block';

// Example SQL queries (pseudo-code)
const totalSalesQuery = "SELECT SUM(sale_amount) FROM Sales WHERE date BETWEEN start_date AND end_date;";
const productSalesQuery = "SELECT product_id, SUM(sale_amount) FROM Sales GROUP BY product_id;";
const quantitySoldQuery = "SELECT product_id, SUM(quantity) FROM Sales GROUP BY product_id;";

// Fetch data and update the DOM (pseudo-code)
function updateSalesReport() {
    // Fetch total sales and update
    const totalSales = executeQuery(totalSalesQuery);
    document.getElementById('total-sales').innerText = totalSales
    // Fetch product sales and update
    const productSales = executeQuery(productSalesQuery);
    const productSalesTableBody = document.getElementById('product-sales-table').getElementsByTagName('tbody')[0];
    productSalesTableBody.innerHTML = ''; // Clear existing rows
    productSales.forEach(sale => {
        const row = productSalesTableBody.insertRow();
        row.insertCell(0).innerText = sale.product_id; // Assuming 'product_id' is the field name
        row.insertCell(1).innerText = sale.total_sales; // Assuming 'total_sales' is the field name
    });

    // Fetch quantity sold and update
    const quantitySold = executeQuery(quantitySoldQuery);
    const quantitySoldTableBody = document.getElementById('quantity-sold-table').getElementsByTagName('tbody')[0];
    quantitySoldTableBody.innerHTML = ''; // Clear existing rows
    quantitySold.forEach(item => {
        const row = quantitySoldTableBody.insertRow();
        row.insertCell(0).innerText = item.product_id; // Assuming 'product_id' is the field name
        row.insertCell(1).innerText = item.quantity_sold; // Assuming 'quantity_sold' is the field name
    });
}

// Call the function to update the sales report when the page loads
document.addEventListener('DOMContentLoaded', updateSalesReport);