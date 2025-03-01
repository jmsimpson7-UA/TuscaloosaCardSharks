using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    //GET: api/recipe
    [HttpGet]
    public async Task<List<Employee>> GetAdmins()
    {
        Database myDatabase = new();

        return await myDatabase.GetAllAdmins();
    }

    [HttpGet("all")]
    public async Task<List<Employee>> GetAllEmployees()
    {
        Database myDatabase = new();
        return await myDatabase.GetAllEmployees();
    }

    [HttpGet ("onlyEmp")]
    public async Task<List<Employee>> GetOnlyEmployees(){
        Database myDatabase = new();
        return await myDatabase.GetOnlyEmployees();
    }

    [HttpGet("{id}", Name = "GetAdmin")]
    public async Task<List<Employee>> GetAdmin(int id)
    {
        Database myDatabase = new();

        return await myDatabase.GetEmployee(id);
    }

    [HttpPost]
    public async Task Post([FromBody] Employee value)
    {
        Database myDatabase = new();
        await myDatabase.InsertEmployee(value);
    }

    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
        Database myDatabase = new();
        await myDatabase.DeleteEmployee(id);
    }

    [HttpPut("{id}")]
    public async Task Put(int id, [FromBody] Employee value)
    {
        Database myDatabase = new();
        await myDatabase.UpdateEmployee(value, id);
    }
}