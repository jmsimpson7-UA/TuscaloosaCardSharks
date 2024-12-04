let myInventory = []
let myCustomers = []
const url = "http://localhost:5195/item"
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
    let html = `<table>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Team</th>
    <th>Sport</th>
    <th>Status</th>
    <th>Size</th>
    <th>Price</th>
    <th>Category</th>
    <th>Name of Player</th>
    <th>Quantity</th>
  </tr>`
  myInventory.forEach((inventory) =>{
      html +=`<tr>
      <td>${inventory.id}</td>
      <td>${inventory.name}</td>
      <td>${inventory.team}</td>
      <td>${inventory.sport}</td>
      <td> ${inventory.status}</td>
      <td>${inventory.size}</td>
      <td>${inventory.price}</td>
      <td>${inventory.category}</td>
      <td>${inventory.nameOfPlayer}</td>
      <td> ${inventory.quantity}</td>
    </tr>`
    })
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
            </tbody>`;
    myCustomers.forEach((customer) => {
        html += `
        <tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.points}</td>
        </tr>`
    });

    html += `</table> </tbody>`;

    document.getElementById("customers").innerHTML = html;
}