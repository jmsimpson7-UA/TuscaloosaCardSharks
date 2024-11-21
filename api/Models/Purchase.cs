using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Purchase
    {
        public int purchaseID { get; set; }
        public string date { get; set; }
        public int pointsEarned { get; set; }
        public int custID { get; set; }
    }
}