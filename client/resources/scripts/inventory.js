let myInventory = [
    {
        id: 1,
        name: "Jersey A",
        team: "Team A",
        sport: "Football",
        status: "Available",
        size: "L",
        price: 49.99,
        category: "Apparel",
        nameOfPlayer: "Player A",
        quantity: 100,
    },
    {
        id: 2,
        name: "Ball B",
        team: "Team B",
        sport: "Basketball",
        status: "Out of Stock",
        size: "Standard",
        price: 19.99,
        category: "Equipment",
        nameOfPlayer: "Player B",
        quantity: 0,
    },
];

function handleOnLoad() {
    buildTable(myInventory);
}

function buildTable(data) {
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
        <th>Edit</th>
        <th>Delete</th>
    </tr>`;
    data.forEach((inventory) => {
        html += `
        <tr data-id="${inventory.id}">
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
            <td><button class="edit-button" data-id="${inventory.id}">Edit</button></td>
            <td><button class="delete-button" data-id="${inventory.id}">Delete</button></td>
        </tr>`;
    });
    document.getElementById("inventoryTable").innerHTML = html;

    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", () => handleEditForm(button.dataset.id));
    });
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", () => handleDelete(button.dataset.id));
    });
}

function handleAdd() {
    const newItem = {
        id: myInventory.length + 1,
        name: document.getElementById("item-name").value,
        sport: document.getElementById("item-sport").value,
        status: document.getElementById("item-status").value,
        size: document.getElementById("item-size").value,
        price: parseFloat(document.getElementById("item-price").value),
        nameOfPlayer: document.getElementById("item-player").value,
        quantity: parseInt(document.getElementById("item-quantity").value),
    };

    myInventory.push(newItem);
    buildTable(myInventory);

    document.getElementById("item-name").value = "";
    document.getElementById("item-team").value = "";
    document.getElementById("item-sport").value = "";
    document.getElementById("item-status").value = "";
    document.getElementById("item-size").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-category").value = "";
    document.getElementById("item-player").value = "";
    document.getElementById("item-quantity").value = "";
}

function handleEditForm(id) {
    id = parseInt(id);
    const inventory = myInventory.find(item => item.id === id);
    const row = document.querySelector(`tr[data-id='${id}']`);

    const originalContent = row.innerHTML;

    row.innerHTML = `
        <td>${inventory.id}</td>
        <td><input type="text" id="edit-name-${id}" value="${inventory.name}" /></td>
        <td><input type="text" id="edit-team-${id}" value="${inventory.team}" /></td>
        <td><input type="text" id="edit-sport-${id}" value="${inventory.sport}" /></td>
        <td><input type="text" id="edit-status-${id}" value="${inventory.status}" /></td>
        <td><input type="text" id="edit-size-${id}" value="${inventory.size}" /></td>
        <td><input type="number" id="edit-price-${id}" value="${inventory.price}" /></td>
        <td><input type="text" id="edit-category-${id}" value="${inventory.category}" /></td>
        <td><input type="text" id="edit-player-${id}" value="${inventory.nameOfPlayer}" /></td>
        <td><input type="number" id="edit-quantity-${id}" value="${inventory.quantity}" /></td>
        <td><button class="save-button">Save</button></td>
        <td><button class="cancel-button">Cancel</button></td>
    `;

    row.querySelector(".save-button").addEventListener("click", () => handleSave(id));
    row.querySelector(".cancel-button").addEventListener("click", () => {
        row.innerHTML = originalContent;
    });
}

function handleSave(id) {
    id = parseInt(id);
    const updatedItem = {
        id: id,
        name: document.getElementById(`edit-name-${id}`).value.trim(),
        team: document.getElementById(`edit-team-${id}`).value.trim(),
        sport: document.getElementById(`edit-sport-${id}`).value.trim(),
        status: document.getElementById(`edit-status-${id}`).value.trim(),
        size: document.getElementById(`edit-size-${id}`).value.trim(),
        price: parseFloat(document.getElementById(`edit-price-${id}`).value),
        category: document.getElementById(`edit-category-${id}`).value.trim(),
        nameOfPlayer: document.getElementById(`edit-player-${id}`).value.trim(),
        quantity: parseInt(document.getElementById(`edit-quantity-${id}`).value),
    };

    myInventory = myInventory.map(item =>
        item.id === id ? updatedItem : item
    );

    buildTable(myInventory);
}


function handleDelete(id) {
    id = parseInt(id);
    myInventory = myInventory.filter(item => item.id !== id);
    buildTable(myInventory);
}


function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase();
    const table = document.getElementById("inventoryTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(input) > -1 ? "" : "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleOnLoad();
    document.getElementById("searchBox").addEventListener("keyup", searchTable);
    document.getElementById("addInventoryButton").addEventListener("click", handleAdd);
});










// let myInventory = [];
// const url = "http://localhost:5195/item";

// async function handleOnLoad() {
//     await getAllItems()
//     buildTable()
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