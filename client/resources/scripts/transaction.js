let myInventory = []
const url = "http://localhost:5195/item"

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

