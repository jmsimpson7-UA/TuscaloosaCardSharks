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
 
 
        <button onclick="handleAdd()" class="btn btn-success">Add Employee</button>
        <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
    </form>`;
    document.getElementById("employee").innerHTML = html;
}
 
async function handleAdd() {
    let newEmployee = {
        username: document.getElementById("username").value.trim(),
        fname: document.getElementById("fname").value.trim(),
        lName: document.getElementById("lname").value.trim(),
        password: document.getElementById("password").value.trim(),
        isAdmin: document.getElementById("isAdmin").value === "1" ? true : false,
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
 
 
 
 