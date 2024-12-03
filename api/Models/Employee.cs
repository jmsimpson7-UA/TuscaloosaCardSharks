using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Employee
    {
        public int empID { get; set; }
        public string username { get; set; }
        public string fname { get; set; }
        public string lName { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }

        public void processPurchase(){
            
        }

        public void ViewInventory(){

        }

        public void EditInventory(string category, string input){

        }

        public void RemoveInventory(){

        }

        public void DeleteCustAccount(){

        }

        public void DeleteEmpAccount(){

        }
    }
}