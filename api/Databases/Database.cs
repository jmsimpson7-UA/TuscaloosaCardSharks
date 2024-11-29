using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using MySqlConnector;

namespace api.Databases
{
    public class Database
    {
        private string cs;
        public Database(){
            cs = "Server=ryvdxs57afyjk41z.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;User ID=qxd5a8g1n496kpfb;Password=awpw92wy7ya8yp15;Database=vgo20llik8rocjos;Port=3306";
        }

    //season (Quarterly), sport, all inventory, rewards reports, purchase

        public async Task<List<Item>> SelectItem(string sql, List<MySqlParameter> parms){

            List<Item> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myItem.Add(new Item(){
                    ID = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Team = reader.GetString(2),
                    Sport = reader.GetString(3),
                    Status = reader.GetString(4),
                    Size = reader.GetString(5),
                    yearMade = reader.GetInt32(6),
                    price = reader.GetDouble(7),
                    category = reader.GetString(8),
                    nameOfPlayer = reader.GetString(9),
                    purchaseID = reader.GetInt32(10),
                    quantity = reader.GetInt32(11)
                });
            }

            return myItem;
        }
        public async Task<List<Employee>> SelectEmployee(string sql, List<MySqlParameter> parms){

            List<Employee> myEmployee = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myEmployee.Add(new Employee(){
                    empID = reader.GetInt32(0),
                    fname = reader.GetString(1),
                    lName = reader.GetString(2),
                    password = reader.GetString(3),
                    isAdmin = reader.GetBoolean(4),
                });
            }

            return myEmployee;
        }

        private async Task ItemNoReturnSql(string sql, List<MySqlParameter> parms){
            List<Item> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }
        private async Task EmployeeNoReturnSql(string sql, List<MySqlParameter> parms){
            List<Item> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }

        public async Task<List<Employee>> GetAllAdmins(){
            string sql = $"SELECT * FROM employee WHERE isAdmin = 1 AND deleted = 'n';";
            List<MySqlParameter> parms = new();
            return await SelectEmployee(sql, parms);
        }

        public async Task<List<Employee>> GetEmployee(int id){
            string sql = $"SELECT * FROM employee WHERE empID = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
            return await SelectEmployee(sql, parms);
        }

        public async Task InsertEmployee(Employee employee){
            string sql = @$"INSERT INTO employee (empID, empFName, empLName, empPassword, isAdmin)
                            VALUES (@empID, @fname, @lName, @password, @isAdmin);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@empID", MySqlDbType.Int32) {Value = employee.empID});
            parms.Add(new MySqlParameter("@fname", MySqlDbType.String) {Value = employee.fname});
            parms.Add(new MySqlParameter("@lName", MySqlDbType.String) {Value = employee.lName});
            parms.Add(new MySqlParameter("@password", MySqlDbType.Int32) {Value = employee.password});
            parms.Add(new MySqlParameter("@isAdmin", MySqlDbType.Int32) {Value = employee.isAdmin});
            await EmployeeNoReturnSql(sql, parms);
       }

        public async Task DeleteEmployee(int id){
            string sql = $"UPDATE employee SET deleted = 'y' WHERE id = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
            await EmployeeNoReturnSql(sql, parms);
       }

       public async Task UpdateEmployee(Employee employee, int id){
            string sql = @$"UPDATE employee SET empFName = @fname, empLName = @lName, empPassword = @password, isAdmin = @isAdmin
                        WHERE empID = @empID;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@empID", MySqlDbType.Int32) {Value = id});
            parms.Add(new MySqlParameter("@fname", MySqlDbType.String) {Value = employee.fname});
            parms.Add(new MySqlParameter("@lName", MySqlDbType.String) {Value = employee.lName});
            parms.Add(new MySqlParameter("@password", MySqlDbType.Int32) {Value = employee.password});
            parms.Add(new MySqlParameter("@isAdmin", MySqlDbType.Int32) {Value = employee.isAdmin});
            await EmployeeNoReturnSql(sql, parms);
       }

       public async Task<List<Item>> GetAllItems(){
            string sql = "SELECT * FROM product WHERE quantity > 0;";
            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> GetItem(int id){
            string sql = $"SELECT * FROM product WHERE productID = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
            return await SelectItem(sql, parms);
        }

        public async Task InsertItem(Item item){
            string sql = @$"INSERT INTO product (productID, productName, price, status, team, category, sport, quantity, yearMade, size, nameOfPlayer)
                            VALUES (@productID, @productName, @price, @status, @team, @category, @sport, @quantity, @yearMade, @size, @nameOfPlayer);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@productID", MySqlDbType.String) {Value = item.ID});
            parms.Add(new MySqlParameter("@productName", MySqlDbType.Date) {Value = item.Name});
            parms.Add(new MySqlParameter("@price", MySqlDbType.Int32) {Value = item.price});
            parms.Add(new MySqlParameter("@status", MySqlDbType.Int32) {Value = item.Status});
            parms.Add(new MySqlParameter("@team", MySqlDbType.Int32) {Value = item.Team});
            parms.Add(new MySqlParameter("@category", MySqlDbType.Int32) {Value = item.category});
            parms.Add(new MySqlParameter("@sport", MySqlDbType.Int32) {Value = item.Sport});
            parms.Add(new MySqlParameter("@quantity", MySqlDbType.Int32) {Value = item.quantity});
            parms.Add(new MySqlParameter("@yearMade", MySqlDbType.Int32) {Value = item.yearMade});
            parms.Add(new MySqlParameter("@size", MySqlDbType.Int32) {Value = item.Size});
            parms.Add(new MySqlParameter("@nameOfPlayer", MySqlDbType.Int32) {Value = item.nameOfPlayer});
            await ItemNoReturnSql(sql, parms);
        }

        public async Task DeleteItem(int id){
            string sql = $"UPDATE product SET deleted = 'y' WHERE id = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
            await ItemNoReturnSql(sql, parms);
        }

        public async Task UpdateItem(Item item, int id){
            string sql = @$"UPDATE product SET productName = @productName, price = @price, status = @status, team = @team, 
            category = @category, sport = @sport, quantity = @quantity, yearMade = @yearMade, size = @size, nameOfPlayer = @playerName
                        WHERE empID = @empID;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@empID", MySqlDbType.Int32) {Value = id});
            parms.Add(new MySqlParameter("@productName", MySqlDbType.String) {Value = item.Name});
            parms.Add(new MySqlParameter("@price", MySqlDbType.Double) {Value = item.price});
            parms.Add(new MySqlParameter("@status", MySqlDbType.String) {Value = item.Status});
            parms.Add(new MySqlParameter("@team", MySqlDbType.String) {Value = item.Team});
            parms.Add(new MySqlParameter("@category", MySqlDbType.String) {Value = item.category});
            parms.Add(new MySqlParameter("@sport", MySqlDbType.String) {Value = item.Sport});
            parms.Add(new MySqlParameter("@quantity", MySqlDbType.Int32) {Value = item.quantity});
            parms.Add(new MySqlParameter("@yearMade", MySqlDbType.Int32) {Value = item.yearMade});
            parms.Add(new MySqlParameter("@size", MySqlDbType.String) {Value = item.Size});
            parms.Add(new MySqlParameter("@playerName", MySqlDbType.String) {Value = item.nameOfPlayer});
            await ItemNoReturnSql(sql, parms);
        }

    }
}