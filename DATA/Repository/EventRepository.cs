using DATA.Models;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace DATA.Repository
{
    public class EventRepository
    {
        private EventsContext db = new EventsContext();

        
        
        
        // create new Event
        public void CreateNewEvent(Event e) // event/ [POST]
        {
            db.Events.Add(e);
            db.SaveChanges();
        }
        

        // get all Users in one Event   
        
        public List<User> GetEventUsers(int id)  // event/{id}/registration [GET]
        {
            List<User> users = db.EventUsers.Where(eu => eu.EventRef == id).Join(db.Users,
                                                                                      eu => eu.UserRef,
                                                                                      u => u.Id,
                                                                                      (eu, u) => u)
                                                                                      .ToList();
            return users;
        }




        // regiter Users to the Event 
        public void RegisterUserToEvent(int Eventid, User user) // event/{id}/registration [POST]
        {
            EventUser currEventUser = new EventUser();
            User newUser = new User();
            User curr = db.Users.FirstOrDefault(u => u.Id == user.Id);
            if (curr == null)
            {
                newUser.Name = user.Name;
                newUser.DateOfBirth = user.DateOfBirth;
                db.Users.Add(newUser);
                db.SaveChanges();
            }
            else
            {
                newUser = curr;
            }
            currEventUser.UserRef = newUser.Id;
            currEventUser.EventRef = Eventid;
            db.EventUsers.Add(currEventUser);
            db.SaveChanges();
        }


        // GET AN EVENT
        public Event GetEvent(int id)  // event/{id} [GET]
        {
            return db.Events.First(e => e.Id == id);
        }


        // update an existing event
        public void UpdateAnExistingEvent(int eventId, Event e) //event/{id} [PUT]
        {
            Event curr = db.Events.Where(e =>  e.Id == eventId).FirstOrDefault();
            if (curr == null)
            {
                throw new ArgumentNullException(nameof(e), "doesn't exist");
            }
            curr.StartDate = e.StartDate;
            curr.EndDate = e.EndDate;
            curr.Location = e.Location;
            curr.Name = e.Name;
            curr.MaxRegistrations = e.MaxRegistrations;
            db.SaveChanges();

        }
        

        // delete Event
        public void DeleteAnExistingEvent(int id) //event/{id} [DELETE]
        {

            List<EventUser> eventUsers = db.EventUsers.Where(eu => eu.EventRef == id).ToList();

            if (eventUsers.Any())
            {
                db.EventUsers.RemoveRange(eventUsers);
                db.SaveChanges();
            }

            Event curr = db.Events.Where(e => e.Id == id).FirstOrDefault();
            if (curr == null) return;

            db.Events.Remove(curr);
            db.SaveChanges();
            
        }

        public List<Event> GetEventSchedule(DateTime start, DateTime end) // schedule [GET]
        {

            return db.Events.Where(e => e.StartDate >= start && e.EndDate <= end).ToList();
        }




        public string GetEventWeather(int id) // event/{id}/weather
        {
            // string json = (new WebClient()).DownloadString(“api endpoint”);
            Event curr = db.Events.Where(e => e.Id == id).FirstOrDefault();
            if (curr != null)
            {
                string json = (new WebClient()).DownloadString(
                    $"http://api.weatherstack.com/current?access_key=5d863dca8b8052ed1d9dfe087934980d&query={curr.Location}");

                using JsonDocument doc = JsonDocument.Parse(json);
                JsonElement root = doc.RootElement;

                // ניגש ל־current → weather_descriptions → [0]
                string weatherDesc = root.GetProperty("current").GetProperty("weather_descriptions")[0].GetString();
                return weatherDesc;
            }

            return null; 
        }
        
    }
}
