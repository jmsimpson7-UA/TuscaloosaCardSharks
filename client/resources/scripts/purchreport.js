let myPurchases = [];
const url = "http://localhost:5195/transaction";

async function handleOnLoad() {
    await getAllPurchases()
    buildTable()
}

async function getAllPurchases() {
    let response = await fetch(url);
    if (response.status === 200) {
        myPurchases = await response.json();
    }
    console.log(myPurchases);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Purchase ID</th>
    <th>Purchase Date</th>
    <th>Price</th>
    <th>Customer ID</th>
  </tr>`
  myPurchases.forEach((purchase) =>{
      html +=`<tr>
      <td>${purchase.purchaseID}</td>
      <td>${purchase.purchaseDate}</td>
      <td>${purchase.price}</td>
      <td>${purchase.custID}</td>

    </tr>`
    })
document.getElementById("purchase").innerHTML = html
}