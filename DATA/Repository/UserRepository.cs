using DATA.Models;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace DATA.Repository
{
    public class UserRepository
    {
        private readonly EventsContext db = new EventsContext();

        // Create a new User
        public void CreateNewUser(User u)
        {
            db.Users.Add(u);
            db.SaveChanges();
        }

        // Get a User by ID
        public User GetUser(int id)
        {
            return db.Users.First(u => u.Id == id);
        }
    }
}