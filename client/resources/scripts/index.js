let myMerch = []
const url = "http://localhost:5217/api/Merch"
async function HandleOnLoad(){
    await GetAllMerch()
    console.log(myMerch)
}

async function GetAllMerch(){
    let response = await fetch(url)
    if(response.status == 200){
        myMerch = await response.json()
    }
    console.log(myMerch);
}