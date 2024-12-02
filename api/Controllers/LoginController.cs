using Microsoft.AspNetCore.Mvc;
using api.Databases;
using api.Models;
using MySqlConnector;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Authenticate([FromBody] LoginRequest loginRequest)
    {
        Database myDatabase = new();
        string sql = "SELECT * FROM employee WHERE username = @username AND empPassword = @password;";
        
        List<MySqlParameter> parms = new()
        {
            new MySqlParameter("@username", MySqlDbType.VarChar) { Value = loginRequest.Username },
            new MySqlParameter("@password", MySqlDbType.VarChar) { Value = loginRequest.Password }
        };

        List<Employee> employees = await myDatabase.SelectEmployee(sql, parms);

        if (employees.Count == 0)
        {
            return Unauthorized("Invalid credentials");
        }

        Employee employee = employees.First();
        return Ok(new { employee.empID, employee.isAdmin });
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}