let employees = [
    { id: 1, name: "John Doe", role: "Manager", salary: 50000 },
    { id: 2, name: "Jane Smith", role: "Sales Associate", salary: 35000 },
    { id: 3, name: "Robert Johnson", role: "Cashier", salary: 30000 }
];

function handleOnLoad() {
    buildTable(employees);
}

function buildTable(data) {
    let html = `
    <tr>
        <th>Employee ID</th>
        <th>Name</th>
        <th>Role</th>
        <th>Salary (USD)</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>`;
    data.forEach((employee) => {
        html += `
        <tr data-id="${employee.id}">
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.salary}</td>
            <td><button class="edit-button" data-id="${employee.id}">Edit</button></td>
            <td><button class="delete-button" data-id="${employee.id}">Delete</button></td>
        </tr>`;
    });
    document.getElementById("employeeTable").innerHTML = html;

    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", () => handleEditForm(button.dataset.id));
    });
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", () => handleDelete(button.dataset.id));
    });
}

function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase();
    const table = document.getElementById("employeeTable");
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


function handleDelete(id) {
    id = parseInt(id);
    employees = employees.filter(employee => employee.id !== id);
    buildTable(employees);
}

function handleAdd() {
        const newEmployee = {
            id: employees.length + 1,
            name: document.getElementById("employee-name").value,
            role: document.getElementById("employee-role").value,
            salary: parseFloat(document.getElementById("employee-salary").value)
        };
    
        employees.push(newEmployee); 
        buildTable(employees); 
    
        document.getElementById("employee-name").value = "";
        document.getElementById("employee-role").value = "";
        document.getElementById("employee-salary").value = "";
    }

    function handleEditForm(id) {
        id = parseInt(id);
        const employee = employees.find(emp => emp.id === id);
        const row = document.querySelector(`tr[data-id='${id}']`);
    
        const originalContent = row.innerHTML;
    
        row.innerHTML = `
            <td>${employee.id}</td>
            <td><input type="text" id="edit-name-${id}" value="${employee.name}" placeholder="Name"></td>
            <td><input type="text" id="edit-role-${id}" value="${employee.role}" placeholder="Role"></td>
            <td><input type="number" id="edit-salary-${id}" value="${employee.salary}" step="0.01" placeholder="Salary"></td>
            <td>
                <button class="save-button">Save</button>
            </td>
            <td>
                <button class="cancel-button">Cancel</button>
            </td>
        `;
        row.querySelector(".save-button").addEventListener("click", () => handleSave(id));
        row.querySelector(".cancel-button").addEventListener("click", () => {
            row.innerHTML = originalContent; 
        });
    }

    function handleSave(id) {
        id = parseInt(id);
        const updatedEmployee = {
            id: id,
            name: document.getElementById(`edit-name-${id}`).value.trim(),
            role: document.getElementById(`edit-role-${id}`).value.trim(),
            salary: parseFloat(document.getElementById(`edit-salary-${id}`).value)
        };

        employees = employees.map(employee =>
            employee.id === id ? updatedEmployee : employee
        );
    
        buildTable(employees);
    }
    
    function handleCancel(id, originalContent) {
        const row = document.querySelector(`tr[data-id='${id}']`);
        row.innerHTML = originalContent;
    }



document.addEventListener("DOMContentLoaded", () => {
    handleOnLoad();


    document.getElementById("addEmployeeButton").addEventListener("click", handleAdd);

    document.getElementById("searchBox").addEventListener("keyup", searchTable);
});