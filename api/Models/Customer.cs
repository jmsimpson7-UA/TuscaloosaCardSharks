using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Customer
    {
        public int custID { get; set; }

        public string fName { get; set; }

        public string lName { get; set; }

        public int pointTotal { get; set; }

        public string email { get; set; }
        public string deleted { get; set; }
    }
}