
using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class AdminController : ControllerBase
{
    //GET: api/recipe
    [HttpGet]
    public async Task<List<Admin>> GetRecipes()
    {
        Databases myDatabase = new();
        
        return await myDatabase.GetAllAdmins();
    }

    [HttpGet("{id}", Name="Get")]
    public async Task<List<Admin>> GetAdmin(int id)
    {
        Databases myDatabase = new();

        return await myDatabase.GetAdmin(id);
    }

        [HttpPost]
        public async Task Post([FromBody]Admin value)
        {
            Databases myDatabase = new();
            await myDatabase.InsertAdmin(value);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            Databases myDatabase = new();
            await myDatabase.DeleteAdmin(id);
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]Admin value)
        {
            Databases myDatabase = new();
            await myDatabase.UpdateAdmin(value, id);
        }
}