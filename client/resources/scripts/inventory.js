let myInventory = [];
const url = "http://localhost:5195/item";

async function handleOnLoad() {
    await getAllItems()
    buildTable()
}

async function getAllItems() {
    let response = await fetch(url);
    if (response.status === 200) {
        myInventory = await response.json();
    }
    console.log(myInventory);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Product ID</th>
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
document.getElementById("app").innerHTML = html
}