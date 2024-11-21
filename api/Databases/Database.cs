using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using MySqlConnector;

namespace api.Database
{
    public class Database
    {
        private string cs;
        public Database(){
            cs = "Server=ryvdxs57afyjk41z.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;User ID=qxd5a8g1n496kpfb;Password=awpw92wy7ya8yp15;Database=vgo20llik8rocjos;Port=3306";
        }

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

        public async Task<List<Item>> GetAllPurchases(){
            string sql = "SELECT * FROM purchase;";
            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> GetAllProducts(){
            string sql = "SELECT * FROM product WHERE quantity > 0;";
            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> GetAllEmployees(){
            string sql = "SELECT * FROM employee;";
            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task<List<Item>> GetAllCustomers(){
            string sql = "SELECT * FROM customer;";
            List<MySqlParameter> parms = new();
            return await SelectItem(sql, parms);
        }

        public async Task InsertPurchase(Item item, Customer customer, Purchase purchase){
            string sql = @$"INSERT INTO purchase (purchaseID, purchaseDate, pointsEarned, custID)
                            VALUES (@purchaseID, @purchaseDate, @pointsEarned, @custID);
                            INSERT INTO productPurchased (purchaseID, productID)
                            VALUES (@purchaseID, @productID);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@purchaseID", MySqlDbType.String) {Value = purchase.purchaseID});
            parms.Add(new MySqlParameter("@purchaseDate", MySqlDbType.Date) {Value = DateTime.Now.ToString()});
            parms.Add(new MySqlParameter("@pointsEarned", MySqlDbType.Int32) {Value = Math.Round((item.price * 10), 0)});
            parms.Add(new MySqlParameter("@custID", MySqlDbType.String) {Value = customer.custID});
            parms.Add(new MySqlParameter("@productID", MySqlDbType.String) {Value = item.ID});
            await ItemNoReturnSql(sql, parms);
            
        }

        public async Task InsertProduct(Item item){
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
    
    }
}