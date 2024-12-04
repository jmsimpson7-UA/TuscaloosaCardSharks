let myCustomers = [];
const url = "http://localhost:5195/api/reward";

async function handleOnLoad() {
    await getAllCustomers()
    buildTable()
}

async function getAllCustomers() {
    let response = await fetch(url);
    if (response.status === 200) {
        myCustomers = await response.json();
    }
    console.log(myCustomers);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Customer ID</th>
    <th>Name</th>
    <th>Point Total</th>
    <th>Email</th>
  </tr>`
  myCustomers.forEach((customer) =>{
      html +=`<tr>
      <td>${customer.custID}</td>
      <td>${customer.fName} ${customer.lName}</td>
      <td>${customer.pointTotal}</td>
      <td>${customer.email}</td>
    </tr>`
    })
document.getElementById("app").innerHTML = html
}