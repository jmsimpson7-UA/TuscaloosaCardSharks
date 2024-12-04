let employees = [];
const url = "http://localhost:5195/employee";


async function handleOnLoad() {
    await getAllEmployees(); 
    buildTable(employees);
}


async function getAllEmployees() {
    let response = await fetch(url);
    if (response.status === 200) {
        employees = await response.json(); 
    } else {
        console.error("Failed to fetch employees.");
    }
}


function buildTable(data) {
    let html = `
    <tr>
        <th>Employee ID</th>
        <th>Name</th>
        <th>Role</th>
        <th>Salary</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>`;
    data.forEach((employee) => {
        html += `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.salary}</td>
            <td><button class="edit-button" onclick="editEmployee(${employee.id})">Edit</button></td>
            <td><button class="delete-button" onclick="deleteEmployee(${employee.id})">Delete</button></td>
        </tr>`;
    });
    document.getElementById("employeeTable").innerHTML = html;
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

function addEmployee() {
    const name = document.getElementById("employee-name").value;
    const role = document.getElementById("employee-role").value;
    const salary = document.getElementById("employee-salary").value;

    if (name && role && salary) {
        const newEmployee = {
            id: employees.length + 1, 
            name: name,
            role: role,
            salary: salary
        };
        employees.push(newEmployee); 
        buildTable(employees); 

  
        document.getElementById("employee-name").value = "";
        document.getElementById("employee-role").value = "";
        document.getElementById("employee-salary").value = "";
    } else {
        alert("Please fill out all fields.");
    }
}


function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    buildTable(employees);
}


function editEmployee(id) {
    alert(`Edit functionality for employee ID ${id} not implemented yet.`);
}


document.addEventListener("DOMContentLoaded", () => {
    handleOnLoad(); 
    document.getElementById("searchBox").addEventListener("keyup", searchTable);
    document.getElementById("addEmployeeButton").addEventListener("click", addEmployee);
});
