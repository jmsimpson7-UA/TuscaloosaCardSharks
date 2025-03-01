


using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemController : ControllerBase
{
    //GET: api/recipe
    [HttpGet]
    public async Task<List<Item>> GetItemss()
    {
        Database myDatabase = new();
        
        return await myDatabase.GetAllItems();
    }
    [HttpGet ("purchasable")]
    public async Task <List<Item>> GetPurchasableItems(){
        Database myDatabase = new();
        return await myDatabase.GetAllPurchasableItems();
    }

    [HttpGet ("soldOut")]
    public async Task <List<Item>> GetSoldOutItems(){
        Database myDatabase = new();
        return await myDatabase.GetSoldOutItems();
    }

    [HttpGet ("nonPurchasable")]
    public async Task<List<Item>> GetNonPurchasableItems(){
        Database myDatabase = new();
        return await myDatabase.GetNonPurchasableItems();
    }


    [HttpGet("{id}", Name="GetItem")]
    public async Task<List<Item>> GetItem(int id)
    {
        Database myDatabase = new();

        return await myDatabase.GetItem(id);
    }

        [HttpPost]
        public async Task Post([FromBody]Item value)
        {
            Database myDatabase = new();
            await myDatabase.InsertItem(value);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            Database myDatabase = new();
            await myDatabase.DeleteItem(id);
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]Item value)
        {
            Database myDatabase = new();
            await myDatabase.UpdateItem(value, id);
        }
}

// using Microsoft.AspNetCore.Mvc;

// namespace api.Controllers;

// [Route("[controller]")]
// [ApiController]
// public class ItemController : ControllerBase
// {
//     [HttpGet("{id}", Name ="Get")]
//     public async Task<List<ItemController>> Get()
//     {
//         Database myDatabase = new();

//         return await myDatabase.GetAllItems();
//     }

//     [HttpPost]
//     public async void Post([FromBody] Item value)
//     {
//         System.Console.WriteLine(value.Name);
//         Database myDatabase = new();
//         await myDatabase.InsertItem(value);
//     }
// }.