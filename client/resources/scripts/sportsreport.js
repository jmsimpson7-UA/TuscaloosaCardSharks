let myHockeyPurchases = [];
let mySoccer= [];
let myBasketball = []
let myFootball = []
let myBaseball = []
const hurl = "http://localhost:5195/api/Sport/HockeyReport";
const surl = "http://localhost:5195/api/Sport/SoccerReport"
const baskurl = "http://localhost:5195/api/Sport/BasketballReport"
const furl = "http://localhost:5195/api/Sport/FootballReport"
const baseurl = "http://localhost:5195/api/Sport/BaseballReport"

async function handleOnLoad() {
    await getHockeyReport()
    await getSoccerReport()
    await getBasketballReport()
    await getFootballReport()
    await getBaseballReport()
    buildTable()
    buildSoccerTable()
    buildBasketballTable()
    buildFootballTable()
    buildBaseballTable()
}

async function getSoccerReport(){
    let response = await fetch(surl);
    if (response.status === 200) {
        mySoccer = await response.json();
    }
    console.log(mySoccer);
}

async function getHockeyReport() {
    let response = await fetch(hurl);
    if (response.status === 200) {
        myHockeyPurchases = await response.json();
    }
    console.log(myHockeyPurchases);
}

async function getBasketballReport() {
    let response = await fetch(baskurl);
    if (response.status === 200) {
        myBasketball = await response.json();
    }
    console.log(myBasketball);
}

async function getFootballReport() {
    let response = await fetch(furl);
    if (response.status === 200) {
        myFootball = await response.json();
    }
    console.log(myFootball);
}

async function getBaseballReport() {
    let response = await fetch(baseurl);
    if (response.status === 200) {
        myBaseball = await response.json();
    }
    console.log(myBaseball);
}
async function buildTable(){
    let html = `<table>
  <tr>
    <th>Item ID</th>
    <th>Item Name</th>
    <th>Team</th>
    <th>Status</th>
    <th>Quantity</th>
  </tr>`
  myHockeyPurchases.forEach((item) =>{
      html +=`<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.team}</td>
      <td>${item.status}</td>
      <td>${item.quantity}</td>
    </tr>`
    })
document.getElementById("app").innerHTML = html
}

async function buildSoccerTable(){
    let html = `<table>
  <tr>
    <th>Item ID</th>
    <th>Item Name</th>
    <th>Team</th>
    <th>Status</th>
    <th>Quantity</th>
  </tr>`
  mySoccer.forEach((item) =>{
      html +=`<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.team}</td>
      <td>${item.status}</td>
      <td>${item.quantity}</td>
    </tr>`
    })
document.getElementById("soccer").innerHTML = html
}

async function buildBasketballTable(){
    let html = `<table>
  <tr>
    <th>Item ID</th>
    <th>Item Name</th>
    <th>Team</th>
    <th>Status</th>
    <th>Quantity</th>
  </tr>`
  myBasketball.forEach((item) =>{
      html +=`<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.team}</td>
      <td>${item.status}</td>
      <td>${item.quantity}</td>
    </tr>`
    })
document.getElementById("basketball").innerHTML = html
}
async function buildFootballTable(){
    let html = `<table>
  <tr>
    <th>Item ID</th>
    <th>Item Name</th>
    <th>Team</th>
    <th>Status</th>
    <th>Quantity</th>
  </tr>`
  myFootball.forEach((item) =>{
      html +=`<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.team}</td>
      <td>${item.status}</td>
      <td>${item.quantity}</td>
    </tr>`
    })
document.getElementById("football").innerHTML = html
}

async function buildBaseballTable(){
    let html = `<table>
  <tr>
    <th>Item ID</th>
    <th>Item Name</th>
    <th>Team</th>
    <th>Status</th>
    <th>Quantity</th>
  </tr>`
  myBaseball.forEach((item) =>{
      html +=`<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.team}</td>
      <td>${item.status}</td>
      <td>${item.quantity}</td>
    </tr>`
    })
document.getElementById("baseball").innerHTML = html
}