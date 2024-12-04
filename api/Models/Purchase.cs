using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Purchase
    {
        public int purchaseID { get; set; }
        public DateOnly purchaseDate { get; set; }
        public int pointsEarned { get; set; }
        public int price { get; set; }
        public int custID { get; set; }
    }
}