using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Databases;
using api.Models;
using MySqlConnector;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController
    {

        [HttpGet("FirstQuarterReport")]
        public async Task<List<Purchase>> getFirstQuarterReport()
        {

            Database myDatabase = new();

            return await myDatabase.Q1PurchaseReport();
        }

        [HttpGet("SecondQuarterReport")]
        public async Task<List<Purchase>> getSecondQuarterReport()
        {

            Database myDatabase = new();

            return await myDatabase.Q2PurchaseReport();
        }

        [HttpGet("ThirdQuarterReport")]
        public async Task<List<Purchase>> getThirdQuarterReport()
        {

            Database myDatabase = new();

            return await myDatabase.Q3PurchaseReport();
        }

        [HttpGet("FourthQuarterReport")]
        public async Task<List<Purchase>> getFourthQuarterReport()
        {

            Database myDatabase = new();

            return await myDatabase.Q4PurchaseReport();
        }
    }
}