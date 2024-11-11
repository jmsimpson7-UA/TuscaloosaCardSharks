let myMerch = []
const url = "http://localhost:5195/api/WeatherForecast"
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