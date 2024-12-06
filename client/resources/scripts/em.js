let myEmployees = [];
const url = "http://localhost:5195/employee";

async function handleOnLoad() {
    await getAllEmployees();
    buildTable();
}

async function getAllEmployees() {
    let response = await fetch(`${url}/onlyEmp`);
    if (response.status === 200) {
        myEmployees = await response.json();
    }
    console.log(myEmployees);
}

async function buildTable() {
    let html = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>`;

    myEmployees.forEach((employee) => {
        html += `
        <tr>
            <td>${employee.empID}</td>
            <td>${employee.username}</td>
            <td>${employee.fname} ${employee.lName}</td>
            <td><button onclick="handleEditForm(${employee.empID})" class="btn btn-primary">Edit</button></td>
            <td><button onclick="handleDelete(${employee.empID})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    });

    html += `</tbody>`;
    document.getElementById("employee").innerHTML = html;
}

function handleEditForm(empID) {
    const employee = myEmployees.find(emp => emp.empID === empID);

    let html = `
    <h2 class="section-heading">Edit Employee</h2>
    <form id="editEmployeeForm" onsubmit="return false" class="edit-form">
        <label for="username">Username:</label>
        <input type="text" id="editUsername" value="${employee.username}">
        
        <label for="fname">First Name:</label>
        <input type="text" id="editFname" value="${employee.fname}">
        
        <label for="lname">Last Name:</label>
        <input type="text" id="editLname" value="${employee.lName}">
        
        <label for="password">Password:</label>
        <input type="password" id="editPassword" value="${employee.password}">
        
        <button onclick="handleEdit(${empID})" class="btn btn-success">Save Changes</button>
        <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
    </form>`;
    document.getElementById("employee").innerHTML = html;
}

async function handleEdit(empID) {
    let updatedEmployee = {
        empID: empID,
        username: document.getElementById("editUsername").value,
        fname: document.getElementById("editFname").value,
        lName: document.getElementById("editLname").value,
        password: document.getElementById("editPassword").value
    };

    await fetch(`${url}/${empID}`, {
        method: "PUT",
        body: JSON.stringify(updatedEmployee),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
    handleOnLoad();
}

async function handleDelete(empID) {
    await fetch(`${url}/${empID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
    handleOnLoad();
}

function handleAddForm() {
    let html = `
    <h2 class="section-heading">Add New Employee</h2>
    <form id="addEmployeeForm" onsubmit="return false" class="add-form">
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username" required>

        <label for="fname">First Name:</label>
        <input type="text" id="fname" placeholder="Enter first name" required>

        <label for="lname">Last Name:</label>
        <input type="text" id="lname" placeholder="Enter last name" required>

        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password" required>

        <label for="isAdmin">Is Admin:</label>
        <select id="isAdmin">
            <option value="0">No</option>
            <option value="1">Yes</option>
        </select>

        <label for="deleted">Deleted:</label>
        <select id="deleted">
            <option value="n">No</option>
            <option value="y">Yes</option>
        </select>

        <button onclick="handleAdd()" class="btn btn-success">Add Employee</button>
        <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
    </form>`;
    document.getElementById("employee").innerHTML = html;
}

async function handleAdd() {
    let newEmployee = {
        username: document.getElementById("username").value.trim(),
        empFName: document.getElementById("fname").value.trim(),
        empLName: document.getElementById("lname").value.trim(),
        empPassword: document.getElementById("password").value.trim(),
        isAdmin: parseInt(document.getElementById("isAdmin").value), 
        deleted: document.getElementById("deleted").value 
    };

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: {
    "Content-Type": "application/json; charset=UTF-8"
    }
    });
    handleOnLoad();
}

function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase();
    const table = document.getElementById("employee");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const tdUsername = tr[i].getElementsByTagName("td")[1]; 
        const tdName = tr[i].getElementsByTagName("td")[2]; 
        const txtValueUsername = tdUsername ? tdUsername.textContent.toUpperCase() : "";
        const txtValueName = tdName ? tdName.textContent.toUpperCase() : "";

        if (txtValueUsername.indexOf(input) > -1 || txtValueName.indexOf(input) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}






// let myEmployees = [];
// const url = "http://localhost:5195/employee/onlyEmp";

// async function handleOnLoad() {
//     await getAllEmployees();
//     buildTable();
// }

// async function getAllEmployees() {
//     let response = await fetch(url);
//     if (response.status === 200) {
//         myEmployees = await response.json();
//     }
//     console.log(myEmployees);
// }

// async function buildTable() {
//     let html = `<table class="table">
//     <tr>
//         <th>ID</th>
//         <th>Username</th>
//         <th>Name</th>
//         <th>Password</th>
//         <th></th>
//         <th></th>
//     </tr>`;

//     myEmployees.forEach((employee) => {
//         html += `
//         <tr>
//             <td>${employee.empID}</td>
//             <td>${employee.username}</td>
//             <td>${employee.fname} ${employee.lName}</td>
//             <td>${employee.password}</td>
//             <td><button onclick="handleEditForm(${employee.empID})">Edit</button></td>
//             <td><button onclick="handleDelete(${employee.empID})">Delete</button></td>
//         </tr>`;
//     });

//     html += `</table>
//     <br>
//     <button onclick="handleAddForm()">Add</button>`;

//     document.getElementById("employee").innerHTML = html;
// }

// async function handleDelete(empID) {
//     await fetch(`${url}/${empID}`, { method: "DELETE" });
//     handleOnLoad();
// }

// function handleAddForm() {
//     let html = `
//     <form onsubmit="return false">
//         <label for="username">Username:</label><br>
//         <input type="text" id="username" name="username"><br>
//         <label for="fname">First Name:</label><br>
//         <input type="text" id="fname" name="fname"><br>
//         <label for="lname">Last Name:</label><br>
//         <input type="text" id="lname" name="lname"><br>
//         <label for="password">Password:</label><br>
//         <input type="text" id="password" name="password"><br>
//         <button onclick="handleAdd()">Save</button>
//     </form>`;
//     document.getElementById("employee").innerHTML = html;
// }

// function handleEditForm(empID) {
//     const employee = myEmployees.find((emp) => emp.empID === empID);

//     let html = `
//     <form onsubmit="return false">
//         <label for="username">Username:</label><br>
//         <input type="text" id="username" name="username" value="${employee.username}"><br>
//         <label for="fname">First Name:</label><br>
//         <input type="text" id="fname" name="fname" value="${employee.fname}"><br>
//         <label for="lname">Last Name:</label><br>
//         <input type="text" id="lname" name="lname" value="${employee.lName}"><br>
//         <label for="password">Password:</label><br>
//         <input type="text" id="password" name="password" value="${employee.password}"><br>
//         <button onclick="handleEdit(${employee.empID})">Save</button>
//     </form>`;
//     document.getElementById("employee").innerHTML = html;
// }

// async function handleEdit(empID) {
//     let updatedEmployee = {
//         empID: empID, 
//         username: document.getElementById("username").value,
//         fname: document.getElementById("fname").value,
//         lName: document.getElementById("lname").value,
//         password: document.getElementById("password").value,
//     };

//     console.log("Updated Employee:", updatedEmployee);

//     let response = await fetch(`${url}/${empID}`, {
//         method: "PUT",
//         body: JSON.stringify(updatedEmployee),
//         headers: { "Content-Type": "application/json; charset=UTF-8" },
//     });

//     console.log("Response:", response);

//     if (response.ok) {

//         handleOnLoad();
//     } else {
//         console.error("Failed to update employee:", await response.text());
//     }
// }


// async function handleAdd() {
//     let newEmployee = {
//         username: document.getElementById("username").value,
//         fname: document.getElementById("fname").value,
//         lName: document.getElementById("lname").value,
//         password: document.getElementById("password").value,
//     };

//     await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(newEmployee),
//         headers: { "Content-Type": "application/json; charset=UTF-8" },
//     });
//     handleOnLoad();
// }


































// let myEmployees = [];
// const url = "http://localhost:5195/employee/onlyEmp";

// async function handleOnLoad() {
//     await getAllEmployees();
//     buildTable(myEmployees);
// }


// async function getAllEmployees() {
//     let response = await fetch(url);
//     if (response.status === 200) {
//         myEmployees = await response.json();
//     }
//     console.log(myEmployees);
// }


// function buildTable(data) {
//     let html = `<table>
//         <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Name</th>
//             <th>Password</th>
//             <th>Edit</th>
//             <th>Delete</th>
//         </tr>`;
//     data.forEach((employee) => {
//         html += `<tr data-id="${employee.empID}">
//             <td>${employee.empID}</td>
//             <td>${employee.username}</td>
//             <td>${employee.fname} ${employee.lName}</td>
//             <td>${employee.password}</td>
//             <td><button class="edit-button" data-id="${employee.empID}">Edit</button></td>
//             <td><button class="delete-button" data-id="${employee.empID}">Delete</button></td>
//         </tr>`;
//     });

//     html += `</table>`;
//     document.getElementById("employee").innerHTML = html;

//     document.querySelectorAll(".edit-button").forEach((button) => {
//         button.addEventListener("click", () => handleEditForm(button.dataset.id));
//     });
//     document.querySelectorAll(".delete-button").forEach((button) => {
//         button.addEventListener("click", () => handleDelete(button.dataset.id));
//     });
// }


// function searchTable() {
//     const input = document.getElementById("searchBox").value.toUpperCase();
//     const table = document.getElementById("employee").getElementsByTagName("table")[0];
//     const tr = table.getElementsByTagName("tr");

//     for (let i = 1; i < tr.length; i++) {
//         const td = tr[i].getElementsByTagName("td")[1]; 
//         if (td) {
//             const txtValue = td.textContent || td.innerText;
//             if (txtValue.toUpperCase().indexOf(input) > -1) {
//                 tr[i].style.display = ""; 
//             } else {
//                 tr[i].style.display = "none"; 
//             }
//         }
//     }
// }


// async function handleEditForm(empID) {
//     empID = parseInt(empID);
//     const employee = myEmployees.find((emp) => emp.empID === empID);
//     const row = document.querySelector(`tr[data-id='${empID}']`);

//     const originalContent = row.innerHTML;

//     row.innerHTML = `
//         <td>${employee.empID}</td>
//         <td><input type="text" id="edit-username-${empID}" value="${employee.username}" placeholder="Username"></td>
//         <td>
//             <input type="text" id="edit-fname-${empID}" value="${employee.fname}" placeholder="First Name">
//             <input type="text" id="edit-lname-${empID}" value="${employee.lName}" placeholder="Last Name">
//         </td>
//         <td><input type="text" id="edit-password-${empID}" value="${employee.password}" placeholder="Password"></td>
//         <td><button class="save-button">Save</button></td>
//         <td><button class="cancel-button">Cancel</button></td>
//     `;

//     row.querySelector(".save-button").addEventListener("click", () => handleSave(empID));
//     row.querySelector(".cancel-button").addEventListener("click", () => {
//         row.innerHTML = originalContent;
//         attachRowButtons();
//     });
// }


// async function handleSave(empID) {
//     const updatedEmployee = {
//         empID: empID,
//         username: document.getElementById(`edit-username-${empID}`).value.trim(),
//         fname: document.getElementById(`edit-fname-${empID}`).value.trim(),
//         lName: document.getElementById(`edit-lname-${empID}`).value.trim(),
//         password: document.getElementById(`edit-password-${empID}`).value.trim(),
//     };

//     const response = await fetch(`${url}/${empID}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedEmployee),
//     });

//     if (response.status === 200) {
//         await getAllEmployees();
//         buildTable(myEmployees);
//     }
// }

// async function handleDelete(empID) {
//     const response = await fetch(`${url}/${empID}`, { method: "DELETE" });

//     if (response.status === 200) {
//         await getAllEmployees();
//         buildTable(myEmployees);
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     handleOnLoad();

   
//     document.getElementById("searchBox").addEventListener("keyup", searchTable);
// });