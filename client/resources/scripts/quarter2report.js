let myQ2Purchases = [];
const url = "http://localhost:5195/api/report/secondquarterreport";

async function handleOnLoad() {
    await getSecondQuarterReport()
    buildTable()
}

async function getSecondQuarterReport() {
    let response = await fetch(url);
    if (response.status === 200) {
        myQ1Purchases = await response.json();
    }
    console.log(myQ2Purchases);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Purchase Date</th>
    <th>Purchase ID</th>
    <th>Point Total</th>
  </tr>`
  myQ1Purchases.forEach((purchase) =>{
      html +=`<tr>
      <td>${purchase.purchaseDate}</td>
      <td>${purchase.purchaseID}</td>
      <td>${purchase.pointsEarned}</td>
    </tr>`
    })
document.getElementById("app").innerHTML = html
}