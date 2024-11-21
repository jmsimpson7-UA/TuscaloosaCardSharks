let myMerch = []
const url = "http://localhost:5195/api/WeatherForecast"
async function HandleOnLoad(){
    await GetAllMerch()
    console.log(myMerch)
}