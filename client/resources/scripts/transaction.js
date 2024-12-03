let myInventory = []
let myCustomers = []
const url = "http://localhost:5195/item"
const curl = "http://localhost:5195/customer"

async function handleOnLoad(){
    getAllInventory();
    buildInventoryTable();
    getAllCustomers();
    buildCustomersTable();
}

async function getAllInventory(){
    let response = await fetch(url)
    if(response.status == 200){
        myInventory = await response.json()
    }
}
async function getAllCustomers(){
    let response = await fetch(curl)
    if(response.status == 200){
        myInventory = await response.json()
    }
}

async function buildInventoryTable() {
    let html = `
    <table class="inventory-table">
        <thead>
            <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price (USD)</th>
           </tr>
        </thead>`;
}

