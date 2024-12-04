using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    //GET: api/recipe
    [HttpGet]
    public async Task<List<Purchase>> GetPurchases()
    {
        Database myDatabase = new();

        return await myDatabase.GetAllPurchases();
    }

    [HttpPost]
    public async Task Post([FromBody] Purchase value)
    {
        Database myDatabase = new();
        await myDatabase.InsertPurchase(value);
    }

    
}