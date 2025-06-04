using DATA.Models;
using DATA.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace API.Services
{
    public class EventService
    {
        private readonly EventRepository _eventRepository;

        public EventService(EventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public void CreateNewEvent(Event e)
        {
            IsValidEvent(e);
            _eventRepository.CreateNewEvent(e);
        }

        public List<User> GetEventsUsers(int id)  // event/{id}/registration [GET]
        {
            checkId(id);
            return _eventRepository.GetEventUsers(id);
        }

        public void RegisterUserToEvent(int eventId, User user) // event/{id}/registration [POST]
        {
            checkId(eventId);
            _eventRepository.RegisterUserToEvent(eventId, user);
        }

        public Event GetEvent(int id)  // event/{id} [GET]
        {
            checkId(id);
            return _eventRepository.GetEvent(id);
        }

        public void UpdateAnExistingEvent(int eventId, Event e) //event/{id} [PUT]
        {
            IsValidEvent(e);
            checkId(eventId);
            _eventRepository.UpdateAnExistingEvent(eventId, e);
        }

        public void DeleteAnExistingEvent(int id) //event/{id} [DELETE]
        {
            checkId(id);
            _eventRepository.DeleteAnExistingEvent(id);
        }

        public List<Event> GetEventSchedule(DateTime start, DateTime end) // schedule [GET]
        {
            return _eventRepository.GetEventSchedule(start, end);
        }

        public string GetEventWeather(int id) // event/{id}/weather
        {
            checkId(id);
            return _eventRepository.GetEventWeather(id);
        }


        private void IsValidEvent(Event e)
        {
            if (e == null)
            {
                throw new ArgumentNullException(nameof(e), "Event cannot be null.");
            }
            else if (e.EndDate == null || e.StartDate == null || e.Location == "" || e.MaxRegistrations < 0 || e.Name == "")
            {
                throw new ArgumentNullException(nameof(e), "missing parameters");
            }

        }

        private void checkId(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid event ID.", nameof(id));
            }
        }
    }
}
