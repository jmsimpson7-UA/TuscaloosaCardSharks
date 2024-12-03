using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Item
    {
        public int ID { get; set; }
        
        public string Name { get; set; }

        public string Team { get; set; }

        public string Sport { get; set; }

        public string Status { get; set; }

        public string Size { get; set; }

        public double price { get; set; }

        public string category { get; set; }

        public string nameOfPlayer { get; set; }
        public int quantity { get; set; }
    }
}