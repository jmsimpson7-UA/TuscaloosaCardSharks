using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RewardController : ControllerBase
    {
        // GET: api/todo
        [HttpGet]
        public async  Task<List<Customer>> Get()
        {
            Database myDatabase = new Database();
            return await myDatabase.GetAllCustomers();
        }
    }
}
