let myItems = []

const url = "https://"

async function handleOnLoad(){
    await getQuarterlyReport()
}

async function getQuarterlyReport(){
    let response = fetch(url)
    if (response.status = 200){
        myItems = await response.json
    }
    
    console.log(myItems)
}