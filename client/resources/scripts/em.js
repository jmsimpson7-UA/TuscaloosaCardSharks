let myEmployees = [];
const url = "http://localhost:5195/employee/onlyEmp";

async function handleOnLoad() {
    await getAllEmployees();
    buildTable(myEmployees);
}


async function getAllEmployees() {
    let response = await fetch(url);
    if (response.status === 200) {
        myEmployees = await response.json();
    }
    console.log(myEmployees);
}


function buildTable(data) {
    let html = `<table>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>`;
    data.forEach((employee) => {
        html += `<tr data-id="${employee.empID}">
            <td>${employee.empID}</td>
            <td>${employee.username}</td>
            <td>${employee.fname} ${employee.lName}</td>
            <td>${employee.password}</td>
            <td><button class="edit-button" data-id="${employee.empID}">Edit</button></td>
            <td><button class="delete-button" data-id="${employee.empID}">Delete</button></td>
        </tr>`;
    });

    html += `</table>`;
    document.getElementById("employee").innerHTML = html;

    document.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", () => handleEditForm(button.dataset.id));
    });
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", () => handleDelete(button.dataset.id));
    });
}


function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase();
    const table = document.getElementById("employee").getElementsByTagName("table")[0];
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


async function handleEditForm(empID) {
    empID = parseInt(empID);
    const employee = myEmployees.find((emp) => emp.empID === empID);
    const row = document.querySelector(`tr[data-id='${empID}']`);

    const originalContent = row.innerHTML;

    row.innerHTML = `
        <td>${employee.empID}</td>
        <td><input type="text" id="edit-username-${empID}" value="${employee.username}" placeholder="Username"></td>
        <td>
            <input type="text" id="edit-fname-${empID}" value="${employee.fname}" placeholder="First Name">
            <input type="text" id="edit-lname-${empID}" value="${employee.lName}" placeholder="Last Name">
        </td>
        <td><input type="text" id="edit-password-${empID}" value="${employee.password}" placeholder="Password"></td>
        <td><button class="save-button">Save</button></td>
        <td><button class="cancel-button">Cancel</button></td>
    `;

    row.querySelector(".save-button").addEventListener("click", () => handleSave(empID));
    row.querySelector(".cancel-button").addEventListener("click", () => {
        row.innerHTML = originalContent;
        attachRowButtons();
    });
}


async function handleSave(empID) {
    const updatedEmployee = {
        empID: empID,
        username: document.getElementById(`edit-username-${empID}`).value.trim(),
        fname: document.getElementById(`edit-fname-${empID}`).value.trim(),
        lName: document.getElementById(`edit-lname-${empID}`).value.trim(),
        password: document.getElementById(`edit-password-${empID}`).value.trim(),
    };

    const response = await fetch(`${url}/${empID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
    });

    if (response.status === 200) {
        await getAllEmployees();
        buildTable(myEmployees);
    }
}

async function handleDelete(empID) {
    const response = await fetch(`${url}/${empID}`, { method: "DELETE" });

    if (response.status === 200) {
        await getAllEmployees();
        buildTable(myEmployees);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleOnLoad();

   
    document.getElementById("searchBox").addEventListener("keyup", searchTable);
});