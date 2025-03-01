let myQ1Purchases = [];
const url = "http://localhost:5195/api/report/firstquarterreport";

async function handleOnLoad() {
    await getFirstQuarterReport()
    buildTable()
}

async function getFirstQuarterReport() {
    let response = await fetch(url);
    if (response.status === 200) {
        myQ1Purchases = await response.json();
    }
    console.log(myQ1Purchases);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Purchase Date</th>
    <th>Purchase ID</th>
    <th>Price</th>
  </tr>`
  myQ1Purchases.forEach((purchase) =>{
      html +=`<tr>
      <td>${purchase.purchaseDate}</td>
      <td>${purchase.purchaseID}</td>
      <td>${purchase.price}</td>
    </tr>`
    })
document.getElementById("app").innerHTML = html
}