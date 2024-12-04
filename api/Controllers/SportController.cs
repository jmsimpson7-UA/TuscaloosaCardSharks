using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportController : ControllerBase
    {
        // GET: api/todo
        [HttpGet("BasketballReport")]
        public async Task<List<Item>> getBasketballReport()
        {

            Database myDatabase = new();

            return await myDatabase.BasketballReport();
        }

        [HttpGet("BaseballReport")]
        public async Task<List<Item>> getBaseballReport()
        {

            Database myDatabase = new();

            return await myDatabase.BaseballReport();
        }

        [HttpGet("HockeyReport")]
        public async Task<List<Item>> getHockeyReport()
        {

            Database myDatabase = new();

            return await myDatabase.HockeyReport();
        }

        [HttpGet("SoccerReport")]
        public async Task<List<Item>> getSoccerReport()
        {

            Database myDatabase = new();

            return await myDatabase.SoccerReport();
        }

        [HttpGet("FootballReport")]
        public async Task<List<Item>> getFootballReport()
        {

            Database myDatabase = new();

            return await myDatabase.FootballReport();
        }
    }
}
