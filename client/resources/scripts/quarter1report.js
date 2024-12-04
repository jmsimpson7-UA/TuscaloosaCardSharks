let myItems = []

const url = "https://"

async function handleOnLoad(){
    await getQuaReport()
}

async function getQuarterlyReport(){
    let response = fetch(url)
    if (response.status = 200){
        myItems = await response.json
    }
    
    console.log(myItems)
}