let myInventory = []
let myCustomers = []
const url = "http://localhost:5195/item/purchasable"
const curl = "http://localhost:5195/customer"

async function HandleOnLoad(){
    await getAllInventory();
    buildInventoryTable();
    await getAllCustomers();
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
        myCustomers = await response.json()
    }
}

async function buildInventoryTable(){
    let html = `<h2 class="section-heading">Current Inventory</h2>
        <table class="inventory-table">
        <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Team</th>
    <th>Sport</th>
    <th>Size</th>
    <th>Price</th>
    <th>Category</th>
    <th>Quantity</th>
  </tr> </thead> <tbody>`
  myInventory.forEach((inventory) =>{
      html +=`<tr>
      <td>${inventory.id}</td>
      <td>${inventory.name}</td>
      <td>${inventory.team}</td>
      <td>${inventory.sport}</td>
      <td>${inventory.size}</td>
      <td>${inventory.price}</td>
      <td>${inventory.category}</td>
      <td>${inventory.quantity}</td>
    </tr>`
    })
    html += `</tbody> </table>`
document.getElementById("inventory").innerHTML = html
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
            <td>${customer.custID}</td>
            <td>${customer.fName} ${customer.lName}</td>
            <td>${customer.email}</td>
            <td>${customer.pointTotal}</td>
        </tr>`
    });

    html += `</table> </tbody>`;

    document.getElementById("customers").innerHTML = html;
}

async function handleTransaction(event) {
    event.preventDefault();
    
    try {
        let itemInput = document.getElementById("item-name");
        let priceInput = document.getElementById("item-price");
        let customerInput = document.getElementById("customer-name");

        if (!priceInput || !customerInput || !priceInput.value || !customerInput.value) {
            throw new Error("Please fill out all fields.");
        }

        let price = parseInt(priceInput.value);
        var customerId = parseInt(customerInput.value);
        console.log(customerId);

        let newTransaction = {
            purchaseDate: new Date().toISOString().split("T")[0],
            pointsEarned: price * 10,
            custID: customerId
        };

        let response = await fetch("http://localhost:5195/transaction", {
            method: "POST",
            body: JSON.stringify(newTransaction),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        if (response.ok) {
            alert("Transaction created successfully!");
        } else {
            alert("Failed to create transaction: " + result);
        }
    } catch (error) {
        console.error("Error during transaction:", error);
        alert(error.message);
    }

    
}


