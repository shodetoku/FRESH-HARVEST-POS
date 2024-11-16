// Sample inventory data (you can replace this with data from your database)
const inventoryItems = [
    { sku: 'SKU001', name: 'Vegan Burger', image: 'images/vegan_burger.jpg', qty: 30 },
    { sku: 'SKU002', name: 'Vegan Sausages', image: 'images/vegan_sausages.jpg', qty: 30 },
    { sku: 'SKU003', name: 'Tofu Sisig', image: 'images/tofu_sisig.jpg', qty: 30 },
    { sku: 'SKU004', name: 'Jackfruit BBQ', image: 'images/jackfruit_bbq.jpg', qty: 30 },
    { sku: 'SKU005', name: 'Vegan Pizza', image: 'images/vegan_pizza.jpg', qty: 30 },
    { sku: 'SKU006', name: 'Lentil Curry', image: 'images/lentil_curry.jpg', qty: 30 },
    { sku: 'SKU007', name: 'Mushroom Stroganoff', image: 'images/mushroom_stroganoff.jpg', qty: 30 },
    { sku: 'SKU008', name: 'Vegan Pad Thai', image: 'images/vegan_pad_thai.jpg', qty: 30 },
    { sku: 'SKU009', name: 'Plant-Based Burrito', image: 'images/plant_based_burrito.jpg', qty: 30 },
    { sku: 'SKU010', name: 'Buddha Bowl', image: 'images/buddha_bowl.jpg', qty: 30 },
    { sku: 'SKU011', name: 'Kale Chips', image: 'images/kale_chips.jpg', qty: 30 },
    { sku: 'SKU012', name: 'Vegan Spring Rolls', image: 'images/vegan_spring_rolls.jpg', qty: 30 },
    { sku: 'SKU013', name: 'Sweet Potato Fries', image: 'images/sweet_potato_fries.jpg', qty: 30 },
    { sku: 'SKU014', name: 'Hummus & Veggies', image: 'images/hummus_veggies.jpg', qty: 30 },
    { sku: 'SKU015', name: 'Vegan Dumplings', image: 'images/vegan_dumplings.jpg', qty: 30 },
];

// Function to display inventory items
function displayInventory() {
    const inventoryBody = document.getElementById('inventory-body');
    inventoryBody.innerHTML = ''; // Clear previous content

    inventoryItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}" width="100"></td>
            <td id="stock-${item.sku}">${item.qty}</td>
            <td>
                <input type="number" id="update-${item.sku}" min="0" placeholder="New Stock" />
                <button onclick="updateStock('${item.sku}')">Update</button>
            </td>
        `;
        inventoryBody.appendChild(row);
    });
}

// Function to update stock
function updateStock(sku) {
    const newStock = document.getElementById(`update-${sku}`).value;
    if (newStock) {
        const item = inventoryItems.find(i => i.sku === sku);
        item.qty = parseInt(newStock);
        document.getElementById(`stock-${sku}`).innerText = item.qty;
        alert(`Stock for ${sku} updated to ${item.qty}`);

        // Save updated inventory to localStorage (optional)
        localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));

        document.getElementById(`update-${sku}`).value = ''; // Clear input field
    } else {
        alert('Please enter a valid stock quantity.');
    }
}

// Load inventory items when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayInventory(); // Call this function to display items
});