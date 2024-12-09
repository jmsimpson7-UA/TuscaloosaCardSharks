let myItems = [];
const url = "http://localhost:5195/item";

async function handleOnLoad() {
    await getAllItems();
    buildTable();
    document.getElementById("searchBox").addEventListener("keyup", searchTable);
}

async function getAllItems() {
    let response = await fetch(url); 

    if (response.status === 200) {
        myItems = await response.json();
    }
    console.log(myItems);
}

async function buildTable() {
    let html = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Team</th>
            <th>Sport</th>
            <th>Status</th>
            <th>Size</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>`;

    myItems.forEach((item) => {
        html += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.team}</td>
            <td>${item.sport}</td>
            <td>${item.status}</td>
            <td>${item.size}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td><button onclick="handleEditForm(${item.id})" class="btn btn-primary">Edit</button></td>
            <td><button onclick="handleDelete(${item.id})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    });

    html += `</tbody>`;
    document.getElementById("inventoryTable").innerHTML = html;

}

function handleEditForm(itemID) {
    const item = myItems.find(it => it.id === itemID);

    let html = `
    <h2 class="section-heading">Edit Item</h2>
    <form id="editItemForm" onsubmit="return false" class="edit-form">
        <label for="name">Name:</label>
        <input type="text" id="editName" value="${item.name}">
        
        <label for="team">Team:</label>
        <input type="text" id="editTeam" value="${item.team}">
        
        <label for="sport">Sport:</label>
        <input type="text" id="editSport" value="${item.sport}">
        
        <label for="status">Status:</label>
        <input type="text" id="editStatus" value="${item.status}">
        
        <label for="size">Size:</label>
        <input type="text" id="editSize" value="${item.size}">
        
        <label for="price">Price:</label>
        <input type="number" id="editPrice" value="${item.price}">
        
        <label for="quantity">Quantity:</label>
        <input type="number" id="editQuantity" value="${item.quantity}">
        
        <button onclick="handleEdit(${itemID})" class="btn btn-success">Save Changes</button>
        <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
    </form>`;

    document.getElementById("inventoryTable").innerHTML = html;
}

async function handleEdit(itemID) {

    const updatedItem = {
        ID: itemID,
        Name: document.getElementById("editName").value,
        Team: document.getElementById("editTeam").value,
        Sport: document.getElementById("editSport").value,
        Status: document.getElementById("editStatus").value,
        Size: document.getElementById("editSize").value,
        price: parseFloat(document.getElementById("editPrice").value),
        category: document.getElementById("editCategory")?.value || "", 
        nameOfPlayer: document.getElementById("editPlayer")?.value || "", 
        quantity: parseInt(document.getElementById("editQuantity").value, 10)
    };
    
    

    await fetch(`${url}/${itemID}`, {
        method: "PUT",
        body: JSON.stringify(updatedItem),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
    handleOnLoad();
}

async function handleDelete(itemID) {
    await fetch(`${url}/${itemID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
    handleOnLoad();
}


function handleAddForm() {
    let html = `
    <h2 class="section-heading">Add New Item</h2>
    <form id="addItemForm" onsubmit="return false" class="add-form">
        <label for="name">Name:</label>
        <input type="text" id="addName" placeholder="Enter item name" required>
        
        <label for="team">Team:</label>
        <input type="text" id="addTeam" placeholder="Enter team name" required>
        
        <label for="sport">Sport:</label>
        <input type="text" id="addSport" placeholder="Enter sport" required>
        
        <label for="status">Status:</label>
        <input type="text" id="addStatus" placeholder="Enter status" required>
        
        <label for="size">Size:</label>
        <input type="text" id="addSize" placeholder="Enter size" required>
        
        <label for="price">Price:</label>
        <input type="number" id="addPrice" placeholder="Enter price" required>
        
        <label for="category">Category:</label>
        <input type="text" id="addCategory" placeholder="Enter category" required>
        
        <label for="quantity">Quantity:</label>
        <input type="number" id="addQuantity" placeholder="Enter quantity" required>
        
        <button onclick="handleAdd()" class="btn btn-success">Add Item</button>
        <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
    </form>`;
    document.getElementById("inventoryTable").innerHTML = html;
}

async function handleAdd() {
    let newItem = {
        name: document.getElementById("item-name").value.trim(),
        team: document.getElementById("item-team").value.trim(),
        sport: document.getElementById("item-sport").value.trim(),
        status: document.getElementById("item-status").value.trim(),
        size: document.getElementById("item-size").value.trim(),
        price: parseFloat(document.getElementById("item-price").value),
        category: document.getElementById("item-category").value.trim(),
        nameOfPlayer: document.getElementById("item-player").value.trim(),
        quantity: parseInt(document.getElementById("item-quantity").value, 10)
    };

    console.log(newItem); 

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });

    handleOnLoad();
}




function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase(); 
    const table = document.getElementById("inventoryTable"); 
    const tr = table.getElementsByTagName("tr"); 
    for (let i = 1; i < tr.length; i++) {
        const tdName = tr[i].getElementsByTagName("td")[1]; 
        const txtValueName = tdName ? tdName.textContent.toUpperCase() : "";

        
        if (txtValueName.indexOf(input) > -1) {
            tr[i].style.display = ""; 
        } else {
            tr[i].style.display = "none"; 
        }
    }
}



