let myInventory = []
let nonInventory = []
let soldInventory = []


async function handleOnLoad() {
    await getPurchasableItems()
    await getDeletedItems()
    await getSoldOutItems()
    buildDeletedTable()
    buildTable()
    buildSoldOutTable()
}

async function getPurchasableItems() {
    let response = await fetch("http://localhost:5195/Item/purchasable");
    if (response.status === 200) {
        nonInventory = await response.json();
    }
    console.log(nonInventory);
}

async function getSoldOutItems() {
    let response = await fetch("http://localhost:5195/Item/soldOut");
    if (response.status === 200) {
        soldInventory = await response.json();
    }
    console.log(soldInventory);
}
async function getDeletedItems(){
    let response = await fetch("http://localhost:5195/Item/nonpurchasable");
    if (response.status === 200) {
        myInventory = await response.json();
    }
    console.log(nonInventory);
}
async function buildDeletedTable(){
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
  nonInventory.forEach((noninventory) =>{
      html +=`<tr>
      <td>${noninventory.id}</td>
      <td>${noninventory.name}</td>
      <td>${noninventory.team}</td>
      <td>${noninventory.sport}</td>
      <td>${noninventory.status}</td>
      <td>${noninventory.size}</td>
      <td>${noninventory.price}</td>
      <td>${noninventory.category}</td>
      <td>${noninventory.nameOfPlayer}</td>
      <td>${noninventory.quantity}</td>
    </tr>`
    })
document.getElementById("purchasableTable").innerHTML = html
}

async function buildSoldOutTable(){
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
  soldInventory.forEach((soldinventory) =>{
      html +=`<tr>
      <td>${soldinventory.id}</td>
      <td>${soldinventory.name}</td>
      <td>${soldinventory.team}</td>
      <td>${soldinventory.sport}</td>
      <td>${soldinventory.status}</td>
      <td>${soldinventory.size}</td>
      <td>${soldinventory.price}</td>
      <td>${soldinventory.category}</td>
      <td>${soldinventory.nameOfPlayer}</td>
      <td>${soldinventory.quantity}</td>
    </tr>`
    })
document.getElementById("soldOutTable").innerHTML = html
}

async function buildTable(){
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
      <td>${inventory.status}</td>
      <td>${inventory.size}</td>
      <td>${inventory.price}</td>
      <td>${inventory.category}</td>
      <td>${inventory.nameOfPlayer}</td>
      <td>${inventory.quantity}</td>
    </tr>`
    })
document.getElementById("deletedTable").innerHTML = html
}