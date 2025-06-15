using API.Services;
using DATA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _UserService; // Fix: Corrected the field name to match the constructor parameter

        public UsersController(UserService userService)
        {
            this._UserService = userService; // Fix: Corrected the field name to match the declaration
        }

        // get User [GET]
        [HttpGet]
        [Route("{UserId}")]
        public ActionResult<Event> GetUser(int UserId)
        {
            try
            {
                return Ok(_UserService.GetUser(UserId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // create new User [Post]
        [HttpPost]
        [Route("register")]
        public ActionResult<User> Register([FromBody] User u)
        {
            try
            {
                _UserService.CreateNewUser(u);
                return Ok(u); // מחזירים את המשתמש שנרשם
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }



}
