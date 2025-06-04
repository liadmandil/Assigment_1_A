using DATA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Services;
using Microsoft.Extensions.Caching.Memory;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventService _EventService;
        private readonly IMemoryCache _memoryCache;

        public EventController(EventService eventService, IMemoryCache memoryCache)
        {
            this._EventService = eventService;
            _memoryCache = memoryCache;
        }



        


        // get Event [GET]
        [HttpGet]
        [Route("{EventId}")]
        public ActionResult<Event> GetEvent(int EventId)
        {
            try
            {
                return Ok(_EventService.GetEvent(EventId));
            }
            catch (Exception ex) {
                {
                    return BadRequest(ex.Message);
                }
            }

        }




        // create new Event [Post]
        [HttpPost]
        [Route("")]
        public ActionResult AddEvent( [FromBody]Event e)
        {
            try
            {
                _EventService.CreateNewEvent(e);
                return Ok("register successfully");
            }
            catch (Exception ex)
            {
                {
                    return BadRequest(ex.Message);
                }
            }
        }





        // get Event Users
        [HttpGet]
        [Route("{EventId}/registration")]

        public ActionResult<List<User>> GetEventUsers(int EventId)
        {
            try
            {

                return _EventService.GetEventsUsers(EventId);
            }
            catch (Exception ex)
            {
                {
                    return BadRequest(ex.Message);
                }
            }
        }




        // register user to event
        [HttpPost]
        [Route("{EventId}/registration")]

        public ActionResult registerUserToEvent(int EventId, [FromBody]User user )
        {
            _EventService.RegisterUserToEvent(EventId, user);
            return Ok("updated successfully");
        }






        // update an existing event
        [HttpPut]
        [Route("{EventId}")]

        public ActionResult UpdateExistingEvent(int EventId,[FromBody]Event e)
        {
            _EventService.UpdateAnExistingEvent(EventId, e);
            return Ok("updated successfully");
        }





        // delete Event
        [HttpDelete]
        [Route("{EventId}")]
        public ActionResult DeleteEvent(int EventId)
        {
            _EventService.DeleteAnExistingEvent(EventId);
            return Ok("delete successfully");
        }



        // get all event Event in Schedule
        [HttpGet]
        [Route("schedule")]
        public ActionResult<List<Event>> getSchedule([FromQuery]DateTime start, [FromQuery]DateTime end)
        {
            try
            {
                return _EventService.GetEventSchedule(start, end);
            }
            catch (Exception ex)
            {
                {
                    return BadRequest(ex.Message);
                }
            }
        }


        [HttpGet]
        [Route("{EventId}/weather")]

        public ActionResult<string> getWeather(int EventId)
        {
            try
            {
                string cacheData = _memoryCache.Get<string>("Weather");
                int saveId = _memoryCache.Get<int>("EventId");
                if (cacheData != null && saveId == EventId)
                {
                    return Ok(cacheData);
                }
                var expirationTime = DateTimeOffset.Now.AddSeconds(60);
                string weath = _EventService.GetEventWeather(EventId);
                _memoryCache.Set("Weather", weath, expirationTime);
                _memoryCache.Set("EventId", EventId, expirationTime);
                return weath;
            }
            catch (Exception ex)
            {
                {
                    return BadRequest(ex.Message);
                }
            }
        }











    }

    

}
