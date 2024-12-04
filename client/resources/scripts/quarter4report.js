let myQ4Purchases = [];
const url = "http://localhost:5195/api/report/fourthquarterreport";

async function handleOnLoad() {
    await getFourthQuarterReport()
    buildTable()
}

async function getFourthQuarterReport() {
    let response = await fetch(url);
    if (response.status === 200) {
        myQ4Purchases = await response.json();
    }
    console.log(myQ4Purchases);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Purchase Date</th>
    <th>Purchase ID</th>
    <th>Point Total</th>
  </tr>`
  myQ4Purchases.forEach((purchase) =>{
      html +=`<tr>
      <td>${purchase.purchaseDate}</td>
      <td>${purchase.purchaseID}</td>
      <td>${purchase.pointsEarned}</td>
    </tr>`
    })
document.getElementById("app").innerHTML = html
}