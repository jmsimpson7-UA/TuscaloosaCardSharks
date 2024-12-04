let myInventory = []
let myCustomers = []
const url = "http://localhost:5195/item/purchasable"
const curl = "http://localhost:5195/customer"

async function HandleOnLoad(){
    // await getAllInventory();
    // buildInventoryTable();
    // await getAllCustomers();
    // buildCustomersTable();

    updatePoints(4, 50);
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
        let priceInput = document.getElementById("item-price");
        let customerInput = document.getElementById("customer-name");

        if (!priceInput || !customerInput || !priceInput.value || !customerInput.value) {
            throw new Error("Please fill out all fields.");
        }

        let price = parseInt(priceInput.value);
        let customerId = parseInt(customerInput.value);

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

    updatePoints(customerInput, priceInput);
    
}

async function updatePoints(customerId, price){
    let points = price * 10;
    try{
        let response = await fetch(`http://localhost:5195/customer/${customerId}`);

            if (!response.ok) {
                throw new Error("Customer not found.");
            }

            let customer = await response.json();

            let updatedCustomer = {
                custID: customer.custID,
                fName: customer.fName,
                lName: customer.lName,
                pointTotal: customer.pointTotal + points,
                email: customer.email,
                deleted: customer.deleted
            }

            let updateResponse = await fetch(`http://localhost:5195/customer/${customerId}`, {
                method: "PUT",
                body: JSON.stringify(updatedCustomer),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });

            if (updateResponse.ok) {
                alert("Customer points updated successfully.");
            } else {
                throw new Error("Failed to update points.");
            }
    } catch (error) {
        console.error("Error updating points:", error);
        alert("Error updating points: " + error.message);
    }
}