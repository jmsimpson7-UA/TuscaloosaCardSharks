let myEmployees = [];
const url = "http://localhost:5195/employee/onlyEmp";

async function handleOnLoad() {
    await getAllEmployees()
    buildTable()
}

async function getAllEmployees() {
    let response = await fetch(url);
    if (response.status === 200) {
        myEmployees = await response.json();
    }
    console.log(myEmployees);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>ID</th>
    <th>UserName</th>
    <th>Name</th>
    <th>Password</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>`
  myEmployees.forEach((employee) =>{
      html +=`<tr>
      <td>${employee.empID}</td>
      <td>${employee.username}</td>
      <td>${employee.fname} ${employee.lName}</td>
      <td>${employee.password}</td>
      <td><button>Edit</button></td>
      <td>
      <button>Delete</button>
      </td>
    </tr>`
    })
document.getElementById("employee").innerHTML = html
}