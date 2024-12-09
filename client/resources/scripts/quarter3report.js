let myQ3Purchases = [];
const url = "http://localhost:5195/api/report/thirdquarterreport";

async function handleOnLoad() {
    await getThirdQuarterReport()
    buildTable()
}

async function getThirdQuarterReport() {
    let response = await fetch(url);
    if (response.status === 200) {
        myQ3Purchases = await response.json();
    }
    console.log(myQ3Purchases);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Purchase Date</th>
    <th>Purchase ID</th>
    <th>Price</th>
  </tr>`
  myQ3Purchases.forEach((purchase) =>{
      html +=`<tr>
      <td>${purchase.purchaseDate}</td>
      <td>${purchase.purchaseID}</td>
      <td>${purchase.price}</td>
    </tr>`
    })
document.getElementById("app").innerHTML = html
}