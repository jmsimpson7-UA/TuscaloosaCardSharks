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
    public async Task<IActionResult> Post([FromBody] Purchase value)
    {
        if (value == null)
        {
            return BadRequest("Invalid purchase data.");
        }
        
        try
        {
            Database myDatabase = new();
            await myDatabase.InsertPurchase(value);
            return Ok("Transaction inserted successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet ("productPurchase")]
    public async Task<List<ProductPurchase>> GetProductPurchases(){
        Database myDatabase = new();

        return await myDatabase.GetAllProductPurchases();
    }

[HttpPost ("PostProductPurchase")]
    public async Task<IActionResult> PostProductPurchase([FromBody] ProductPurchase value)
    {
        if (value == null)
        {
            return BadRequest("Invalid purchase data.");
        }
        
        try
        {
            Database myDatabase = new();
            await myDatabase.InsertProductPurchase(value);
            return Ok("Transaction inserted successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
}