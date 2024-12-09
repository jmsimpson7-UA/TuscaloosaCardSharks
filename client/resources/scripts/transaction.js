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
            price: price * 10,
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

    UpdateCustomerPoints(customerId, price);
    UpdateInventory(itemInput);
    HandleProductPurchased(itemInput, customerId);
    
}


async function UpdateCustomerPoints(customerID, price){
    let newPoints = price * 10;
    let customerId = customerID;

    try{
        let response = await fetch(`http://localhost:5195/customer/${customerId}`);

        if (!response.ok) {
            throw new Error("Customer not found.");
        }

        let customer = await response.json();
        let customerID = customer[0].custID;

        let updatedCustomer = {
            custID: customerID,
            fName: customer[0].fName,
            lName: customer[0].lName,
            pointTotal: customer[0].pointTotal + newPoints,
            email: customer[0].email,
            deleted: customer[0].deleted
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
                const errorText = await updateResponse.text();
                throw new Error("Failed to update points: " + errorText);
            }
        } catch (error) {
            console.error("Error updating points:", error);
            alert("Error updating points: " + error.message);
        }
}

async function UpdateInventory(itemID){
    let productId = itemID;

    try{
        let response = await fetch(`http://localhost:5195/Item/${productId}`);

        if (!response.ok) {
            throw new Error("Product not found.");
        }

        let product = await response.json();
        let productID = product[0].productID;
        let newQuantity = product[0].quantity - 1;

        let updatedProduct = {
            id: productID,
            name: product[0].name,
            team: product[0].team,
            sport: product[0].sport,
            status: product[0].status,
            size:  product[0].size,
            price: product[0].price,
            category: product[0].category,
            nameOfPlayer: product[0].nameOfPlayer,
            quantity: newQuantity
        }

        let updateResponse = await fetch(`http://localhost:5195/Item/${productId}`, {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
            if (updateResponse.ok) {
                alert("Product quantity updated successfully.");
            } else {
                const errorText = await updateResponse.text();
                throw new Error("Failed to update quantity: " + errorText);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert("Error updating quantity: " + error.message);
        }
}

async function HandleProductPurchased(productID, customerId) {
    let response = await fetch(`http://localhost:5195/Transaction/${customerId}`);
    let purchase = await response.json();
    let purchaseID = purchase[0].purchaseID;

    let productPurchased = {
        purchaseID: purchaseID,
        productID: productID
    }

    await fetch(`http://localhost:5195/Transaction/PostProductPurchase`, {
        method: "POST",
        body: JSON.stringify(productPurchased),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
}