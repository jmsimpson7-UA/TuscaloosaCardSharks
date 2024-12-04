let myInventory = [];
const url = "http://localhost:5195/item";

async function handleOnLoad() {
    await getAllItems(); 
    buildTable(myInventory);
}


async function getAllItems() {
    let response = await fetch(url);
    if (response.status === 200) {
        myInventory = await response.json();
    }
    console.log(myInventory);
}


function buildTable() {
    let html = `
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
    </tr>`;
    myInventory.forEach((inventory) => {
        html += `
        <tr>
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
        </tr>`;
    });
    document.getElementById("app").innerHTML = html
}


function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase();
    const table = document.getElementById("inventoryTable");
    const tr = table.getElementsByTagName("tr");

   
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1]; 
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = ""; 
            } else {
                tr[i].style.display = "none"; 
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    handleOnLoad(); 
    document.getElementById("searchBox").addEventListener("keyup", searchTable);
});


// let myInventory = [];
// const url = "http://localhost:5195/item";

// async function handleOnLoad() {
//     await getAllItems()
//     buildTable(myInventory)
// }

// async function getAllItems() {
//     let response = await fetch(url);
//     if (response.status === 200) {
//         myInventory = await response.json();
//     }
//     console.log(myInventory);
// }
// async function buildTable(){
//     let html = `<table>
//   <tr>
//     <th>ID</th>
//     <th>Name</th>
//     <th>Team</th>
//     <th>Sport</th>
//     <th>Status</th>
//     <th>Size</th>
//     <th>Price</th>
//     <th>Category</th>
//     <th>Name of Player</th>
//     <th>Quantity</th>
//   </tr>`
//   myInventory.forEach((inventory) =>{
//       html +=`<tr>
//       <td>${inventory.id}</td>
//       <td>${inventory.name}</td>
//       <td>${inventory.team}</td>
//       <td>${inventory.sport}</td>
//       <td> ${inventory.status}</td>
//       <td>${inventory.size}</td>
//       <td>${inventory.price}</td>
//       <td>${inventory.category}</td>
//       <td>${inventory.nameOfPlayer}</td>
//       <td> ${inventory.quantity}</td>
//     </tr>`
//     })
// document.getElementById("app").innerHTML = html
// }

