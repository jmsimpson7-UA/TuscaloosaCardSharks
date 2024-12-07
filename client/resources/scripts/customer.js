let myCustomers = [];
const url = "http://localhost:5195/customer";

async function handleOnLoad() {
    await getAllCustomers();
    buildTable();
}

async function getAllCustomers() {
    let response = await fetch(`${url}`);
    if (response.status === 200) {
        myCustomers = await response.json();
    }
    console.log(myCustomers);
}

async function buildTable() {
    let html = `
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Points</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>`;

    myCustomers.forEach((customer) => {
        html += `
        <tr>
            <td>${customer.custID}</td>
            <td>${customer.fName}</td>
            <td>${customer.lName}</td>
            <td>${customer.pointTotal}</td>
            <td>${customer.email}</td>
        </tr>`;
    });

    html += `</tbody>`;
    document.getElementById("customer").innerHTML = html;
}

// function handleEditForm(custID) {
//     const customer = myCustomers.find(cust => cust.custID === custID);

//     let html = `
//     <h2 class="section-heading">Edit Customer</h2>
//     <form id="editCustomerForm" onsubmit="return false" class="edit-form">
//         <label for="fName">First Name:</label>
//         <input type="text" id="editFName" value="${customer.fName}">

//         <label for="lName">Last Name:</label>
//         <input type="text" id="editLName" value="${customer.lName}">

//         <label for="pointTotal">Points:</label>
//         <input type="number" id="editPointTotal" value="${customer.pointTotal}">

//         <label for="email">Email:</label>
//         <input type="email" id="editEmail" value="${customer.email}">

//         <button onclick="handleEdit(${custID})" class="btn btn-success">Save Changes</button>
//         <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
//     </form>`;
//     document.getElementById("customer").innerHTML = html;
// }

// async function handleEdit(custID) {
//     let updatedCustomer = {
//         custID: custID,
//         fName: document.getElementById("editFName").value,
//         lName: document.getElementById("editLName").value,
//         pointTotal: parseInt(document.getElementById("editPointTotal").value),
//         email: document.getElementById("editEmail").value
//     };

//     await fetch(`${url}/${custID}`, {
//         method: "PUT",
//         body: JSON.stringify(updatedCustomer),
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     });
//     handleOnLoad();
// }

// async function handleDelete(custID) {
//     await fetch(`${url}/${custID}`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     });
//     handleOnLoad();
// }

function handleAddForm() {
    let html = `
    <h2 class="section-heading">Add New Customer</h2>
    <form id="addCustomerForm" onsubmit="return false" class="add-form">
        <label for="fName">First Name:</label>
        <input type="text" id="fName" placeholder="Enter first name" required>

        <label for="lName">Last Name:</label>
        <input type="text" id="lName" placeholder="Enter last name" required>

        <label for="pointTotal">Points:</label>
        <input type="number" id="pointTotal" placeholder="Enter points" required>

        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Enter email" required>

        <button onclick="handleAdd()" class="btn btn-success">Add Customer</button>
        <button onclick="handleOnLoad()" class="btn btn-secondary">Cancel</button>
    </form>`;
    document.getElementById("customer").innerHTML = html;
}

async function handleAdd() {
    let newCustomer = {
        fName: document.getElementById("fName").value.trim(),
        lName: document.getElementById("lName").value.trim(),
        pointTotal: parseInt(document.getElementById("pointTotal").value),
        email: document.getElementById("email").value.trim(),
        deleted: "n" 
    };

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(newCustomer),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
    handleOnLoad();
}

function searchTable() {
    const input = document.getElementById("searchBox").value.toUpperCase();
    const table = document.getElementById("customer");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const tdFirstName = tr[i].getElementsByTagName("td")[1];
        const tdLastName = tr[i].getElementsByTagName("td")[2];
        const tdEmail = tr[i].getElementsByTagName("td")[4];
        const txtValueFirstName = tdFirstName ? tdFirstName.textContent.toUpperCase() : "";
        const txtValueLastName = tdLastName ? tdLastName.textContent.toUpperCase() : "";
        const txtValueEmail = tdEmail ? tdEmail.textContent.toUpperCase() : "";

        if (
            txtValueFirstName.indexOf(input) > -1 ||
            txtValueLastName.indexOf(input) > -1 ||
            txtValueEmail.indexOf(input) > -1
        ) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}