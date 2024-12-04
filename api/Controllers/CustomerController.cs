using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
    //GET: api/recipe
    [HttpGet]
    public async Task<List<Customer>> GetAllCustomers(){
        Database myDatabase = new();
        return await myDatabase.GetAllCustomers();
    }

    [HttpPost]
    public async Task Post([FromBody] Customer value)
    {
        Database myDatabase = new();
        await myDatabase.InsertCustomer(value);
    }
    

    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
        Database myDatabase = new();
        await myDatabase.DeleteEmployee(id);
    }

}