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
    public class ReportController
    {
        public async Task<List<Customer>> getRewardsReport(){

            Database myDatabase = new();

            return await myDatabase.RewardsReport();            
        }

        public async Task<List<Purchase>> getSportsReport(){

            Database myDatabase = new();

            return await myDatabase.QuarterlyReport();            
        }

        public async Task<List<Purchase>> getFirstQuarterReport(){

            Database myDatabase = new();

            return await myDatabase.Q1PurchaseReport();            
        }

        public async Task<List<Purchase>> getSecondQuarterReport(){

            Database myDatabase = new();

            return await myDatabase.Q2PurchaseReport();            
        }

        public async Task<List<Purchase>> getThirdQuarterReport(){

            Database myDatabase = new();

            return await myDatabase.Q3PurchaseReport();            
        }

        public async Task<List<Purchase>> getFourthQuarterReport(){

            Database myDatabase = new();

            return await myDatabase.Q4PurchaseReport();            
        }

        public async Task<List<Purchase>> getAllSalesReport(){

            Database myDatabase = new();

            return await myDatabase.QuarterlyReport();            
        }
    }
}