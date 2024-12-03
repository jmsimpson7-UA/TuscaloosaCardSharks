let myInventory = []
let myCustomers = []
const url = "http://localhost:5195/item"
const curl = "http://localhost:5195/customer"

async function handleOnLoad(){
    getAllInventory();
    buildInventoryTable();
    getAllCustomers();
    buildCustomersTable();
}

async function getAllInventory(){
    let response = await fetch(url)
    if(response.status == 200){
        myInventory = await response.json()
    }
}
async function getAllCustomers(){
    let response = await fetch(curl)
    if(response.status == 200){
        myInventory = await response.json()
    }
}

async function buildInventoryTable() {
    let html = `<h2 class="section-heading">Current Inventory</h2>
    <table class="inventory-table">
        <thead>
            <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price (USD)</th>
           </tr>
        </thead>
        <tbody>`;
    
    myInventory.forEach((item) => {
        html += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        </tr>`
    });

    html += `</table>`;

    document.getElementById("inventory").innerHTML = html;
}

async function buildCustomersTable(){
    let html = `<h2 class="section-heading">Current Customers</h2>
        <table class="inventory-table">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Pont Total</th>
                </tr>
            </thead>
            <tbody>`;
    myCustomers.forEach((customer) => {
        html += `
        <tr>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.points}</td>
        </tr>`
    });

    html += `</table>`;

    document.getElementById("customers").innerHTML = html;
}