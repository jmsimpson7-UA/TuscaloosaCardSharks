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
        public Database()
        {
            cs = "Server=ryvdxs57afyjk41z.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;User ID=qxd5a8g1n496kpfb;Password=awpw92wy7ya8yp15;Database=vgo20llik8rocjos;Port=3306";
        }


        public async Task<List<Item>> SelectItem(string sql, List<MySqlParameter> parms)
        {

            List<Item> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myItem.Add(new Item()
                {
                    ID = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    price = reader.GetDouble(2),
                    Status = reader.GetString(3),
                    Team = reader.GetString(4),
                    category = reader.GetString(5),
                    Sport = reader.GetString(6),
                    quantity = reader.GetInt32(7),
                    Size = reader.GetString(8),
                    nameOfPlayer = reader.GetString(9)
                });
            }

            return myItem;
        }

        public async Task<List<Employee>> SelectEmployee(string sql, List<MySqlParameter> parms)
        {

            List<Employee> myEmployee = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myEmployee.Add(new Employee()
                {
                    empID = reader.GetInt32(0),
                    username = reader.GetString(1),
                    fname = reader.GetString(2),
                    lName = reader.GetString(3),
                    password = reader.GetString(4),
                    isAdmin = reader.GetBoolean(5),
                });
            }

            return myEmployee;
        }

        public async Task<List<Purchase>> SelectPurchase(string sql, List<MySqlParameter> parms)
        {

            List<Purchase> myPurchase = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myPurchase.Add(new Purchase()
                {
                    purchaseID = reader.GetInt32(0),
                    purchaseDate = reader.GetDateOnly(1),
                    pointsEarned = reader.GetInt32(2),
                    price = (reader.GetInt32(2) / 10),
                    custID = reader.GetInt32(3),
                });
            }

            return myPurchase;
        }


        public async Task<List<Employee>> GetAllEmployees()
        {
            string sql = "SELECT * FROM employee WHERE deleted = 'n';";
            List<MySqlParameter> parms = new();
            return await SelectEmployee(sql, parms);
        }
        public async Task<List<Customer>> SelectCustomer(string sql, List<MySqlParameter> parms)
        {

            List<Customer> myCustomer = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myCustomer.Add(new Customer()
                {
                    custID = reader.GetInt32(0),
                    fName = reader.GetString(1),
                    lName = reader.GetString(2),
                    pointTotal = reader.GetInt32(3),
                    email = reader.GetString(4),
                });
            }

            return myCustomer;
        }
        
        public async Task<List<Customer>> GetAllCustomers()
        {
            string sql = "SELECT * FROM customer WHERE deleted = 'n';";
            List<MySqlParameter> parms = new();
            return await SelectCustomer(sql, parms);
        }

        public async Task DeleteCustomer(int id)
        {
            string sql = $"UPDATE customer SET deleted = 'y' WHERE id = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });
            await CustomerNoReturnSql(sql, parms);
        }

        private async Task CustomerNoReturnSql(string sql, List<MySqlParameter> parms)
        {
            List<Customer> mycustomer = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }

        public async Task InsertCustomer(Customer customer)
        {
            string sql = @$"INSERT INTO customer (custID, custFName, custLName, custEmail, PointTotal)
                            VALUES (@custID, @custFName, @custLName, @custEmail, @PointTotal);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@empID", MySqlDbType.Int32) { Value = customer.custID });
            parms.Add(new MySqlParameter("@custFName", MySqlDbType.String) { Value = customer.fName });
            parms.Add(new MySqlParameter("@custLName", MySqlDbType.String) { Value = customer.lName });
            parms.Add(new MySqlParameter("@custEmail", MySqlDbType.String) { Value = customer.email });
            parms.Add(new MySqlParameter("@PointTotal", MySqlDbType.String) { Value = customer.pointTotal });
            await EmployeeNoReturnSql(sql, parms);
        }

        private async Task ItemNoReturnSql(string sql, List<MySqlParameter> parms)
        {
            List<Item> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }
        private async Task EmployeeNoReturnSql(string sql, List<MySqlParameter> parms)
        {
            List<Item> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }

        private async Task PurchaseNoReturnSql(string sql, List<MySqlParameter> parms)
        {
            List<Purchase> myItem = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }

        public async Task<List<Employee>> GetAllAdmins()
        {
            string sql = $"SELECT * FROM employee WHERE isAdmin = 1 AND deleted = 'n';";
            List<MySqlParameter> parms = new();
            return await SelectEmployee(sql, parms);
        }

        public async Task<List<Employee>> GetEmployee(int id)
        {
            string sql = $"SELECT * FROM employee WHERE empID = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });
            return await SelectEmployee(sql, parms);
        }

        public async Task InsertEmployee(Employee employee)
        {
            string sql = @$"INSERT INTO employee (empID, username, empFName, empLName, empPassword, isAdmin)
                            VALUES (@empID, @username, @fname, @lName, @password, @isAdmin);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@empID", MySqlDbType.Int32) { Value = employee.empID });
            parms.Add(new MySqlParameter("@username", MySqlDbType.String) { Value = employee.username });
            parms.Add(new MySqlParameter("@fname", MySqlDbType.String) { Value = employee.fname });
            parms.Add(new MySqlParameter("@lName", MySqlDbType.String) { Value = employee.lName });
            parms.Add(new MySqlParameter("@password", MySqlDbType.String) { Value = employee.password });
            parms.Add(new MySqlParameter("@isAdmin", MySqlDbType.Int32) { Value = employee.isAdmin });
            await EmployeeNoReturnSql(sql, parms);
        }

        public async Task DeleteEmployee(int id)
        {
            string sql = $"UPDATE employee SET deleted = 'y' WHERE id = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });
            await EmployeeNoReturnSql(sql, parms);
        }

        public async Task UpdateEmployee(Employee employee, int id)
        {
            string sql = @$"UPDATE employee SET username = @username, empFName = @fname, empLName = @lName, empPassword = @password, isAdmin = @isAdmin
                        WHERE empID = @empID;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@empID", MySqlDbType.Int32) { Value = id });
            parms.Add(new MySqlParameter("@username", MySqlDbType.String) { Value = employee.username });
            parms.Add(new MySqlParameter("@fname", MySqlDbType.String) { Value = employee.fname });
            parms.Add(new MySqlParameter("@lName", MySqlDbType.String) { Value = employee.lName });
            parms.Add(new MySqlParameter("@password", MySqlDbType.String) { Value = employee.password });
            parms.Add(new MySqlParameter("@isAdmin", MySqlDbType.Int32) { Value = employee.isAdmin });
            await EmployeeNoReturnSql(sql, parms);
        }

        public async Task<List<Item>> GetAllItems() 
        {
            string sql = @"SELECT productID, productName, price, status, team, category, sport, quantity, coalesce(size, ' '), coalesce(nameOfPlayer, ' ')
                            FROM product WHERE quantity > 0 AND deleted = 'n';";
            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> GetItem(int id)
        {
            string sql = $"SELECT * FROM product WHERE productID = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });
            return await SelectItem(sql, parms);
        }

        public async Task InsertItem(Item item)
        {
            string sql = @$"INSERT INTO product (productID, productName, price, status, team, category, sport, quantity, size, nameOfPlayer)
                            VALUES (@productID, @productName, @price, @status, @team, @category, @sport, @quantity, @size, @nameOfPlayer);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@productID", MySqlDbType.Int32) { Value = item.ID });
            parms.Add(new MySqlParameter("@productName", MySqlDbType.String) { Value = item.Name });
            parms.Add(new MySqlParameter("@price", MySqlDbType.Double) { Value = item.price });
            parms.Add(new MySqlParameter("@status", MySqlDbType.String) { Value = item.Status });
            parms.Add(new MySqlParameter("@team", MySqlDbType.String) { Value = item.Team });
            parms.Add(new MySqlParameter("@category", MySqlDbType.String) { Value = item.category });
            parms.Add(new MySqlParameter("@sport", MySqlDbType.String) { Value = item.Sport });
            parms.Add(new MySqlParameter("@quantity", MySqlDbType.Int32) { Value = item.quantity });
            parms.Add(new MySqlParameter("@size", MySqlDbType.String) { Value = item.Size });
            parms.Add(new MySqlParameter("@nameOfPlayer", MySqlDbType.String) { Value = item.nameOfPlayer });
            await ItemNoReturnSql(sql, parms);
        }

        public async Task DeleteItem(int id)
        {
            string sql = $"UPDATE product SET deleted = 'y' WHERE id = @id;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) { Value = id });
            await ItemNoReturnSql(sql, parms);
        }
        

        public async Task UpdateItem(Item item, int id)
        {
            string sql = @$"UPDATE product SET productName = @productName, price = @price, status = @status, team = @team, 
            category = @category, sport = @sport, quantity = @quantity, size = @size, nameOfPlayer = @playerName
                        WHERE productID = @productID;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@productID", MySqlDbType.Int32) { Value = id });
            parms.Add(new MySqlParameter("@productName", MySqlDbType.String) { Value = item.Name });
            parms.Add(new MySqlParameter("@price", MySqlDbType.Double) { Value = item.price });
            parms.Add(new MySqlParameter("@status", MySqlDbType.String) { Value = item.Status });
            parms.Add(new MySqlParameter("@team", MySqlDbType.String) { Value = item.Team });
            parms.Add(new MySqlParameter("@category", MySqlDbType.String) { Value = item.category });
            parms.Add(new MySqlParameter("@sport", MySqlDbType.String) { Value = item.Sport });
            parms.Add(new MySqlParameter("@quantity", MySqlDbType.Int32) { Value = item.quantity });
            parms.Add(new MySqlParameter("@size", MySqlDbType.String) { Value = item.Size });
            parms.Add(new MySqlParameter("@playerName", MySqlDbType.String) { Value = item.nameOfPlayer });
            await ItemNoReturnSql(sql, parms);
        }

        public async Task InsertPurchase(Purchase purchase)
        {
            string sql = @$"INSERT INTO purchase (purchaseID, purchaseDate, pointsEarned, custID) 
                            VALUES (@purchaseID, @purchaseDate, @pointsEarned, @custID);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@purchaseID", MySqlDbType.Int32) { Value = purchase.purchaseID });
            parms.Add(new MySqlParameter("@purchaseDate", MySqlDbType.Date) { Value = purchase.purchaseDate.ToString("yyyy-mm-dd") });
            parms.Add(new MySqlParameter("@pointsEarned", MySqlDbType.Int32) { Value = purchase.pointsEarned });
            parms.Add(new MySqlParameter("@custID", MySqlDbType.Int32) { Value = purchase.custID });
            await PurchaseNoReturnSql(sql, parms);
        }

        //season (Quarterly), sport, all inventory, rewards reports, purchase
        public async Task<List<Purchase>> QuarterlyReport()
        {
            string sql = @"SELECT YEAR(purchaseDate) as Years, QUARTER(purchaseDate) Quarters, pointsEarned, custID
                        FROM purchase GROUP BY YEAR(purchaseDate), QUARTER(purchaseDate) ORDER BY Years, Quarters;";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }

        public async Task<List<Item>> BaseballReport()
        {
            string sql = @"SELECT * FROM product WHERE sport = 'Baseball';";

            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> FootballReport()
        {
            string sql = @"SELECT * FROM product WHERE sport = 'Football';";

            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> BasketballReport()
        {
            string sql = @"SELECT * FROM product WHERE sport = 'Basketball';";

            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> InventoryReport()
        {
            string sql = @"SELECT productID, productName, status, quantity FROM product WHERE deleted = 'n';";

            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Purchase>> DailyPurchaseReport()
        {
            string sql = @"SELECT * FROM purchase WHERE DATE(purchaseDate) = curdate();";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }

        public async Task<List<Purchase>> MonthlyPurchaseReport()
        {
            string sql = @"SELECT * FROM purchase WHERE YEAR(purchaseDate) = YEAR(curdate()) AND MONTH(purchaseDate) = MONTH(curdate());";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }

        public async Task<List<Purchase>> Q1PurchaseReport(){
            string sql = @"SELECT * FROM purchase WHERE YEAR(purchaseDate) = YEAR(curdate()) AND MONTH(purchaseDate) IN (1, 2, 3);";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }
        public async Task<List<Purchase>> Q2PurchaseReport(){
            string sql = @"SELECT * FROM purchase WHERE YEAR(purchaseDate) = YEAR(curdate()) AND MONTH(purchaseDate) IN (4, 5, 6);";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }
        public async Task<List<Purchase>> Q3PurchaseReport(){
            string sql = @"SELECT * FROM purchase WHERE YEAR(purchaseDate) = YEAR(curdate()) AND MONTH(purchaseDate) IN (7, 8, 9);";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }
        public async Task<List<Purchase>> Q4PurchaseReport(){
            string sql = @"SELECT * FROM purchase WHERE YEAR(purchaseDate) = YEAR(curdate()) AND MONTH(purchaseDate) IN (10, 11, 12);";

            List<MySqlParameter> parms = new();
            return await SelectPurchase(sql, parms);
        }

        //WHAT DO WE WANT FOR THE REWARD REPORT??
        public async Task<List<Customer>> RewardsReport()
        {
            string sql = @"SELECT custID, concat(custFName, custLName) as FullName, custEmail, PointTotal FROM customer;";

            List<MySqlParameter> parms = new();
            return await SelectCustomer(sql, parms);
        }

    }
}