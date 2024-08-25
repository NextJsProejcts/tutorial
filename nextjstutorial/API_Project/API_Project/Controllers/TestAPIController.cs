using API_Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestAPIController : Controller
    {
        static public List<User> users = new List<User>();
        public TestAPIController()
        {
        }

        [HttpGet]
        public object getUsers()
        {
            return Ok(users);
        }

        [HttpPost]
        public object AddUser(User user)
        {
            users.Add(user);
            return Ok();
        }

        [HttpDelete]
        [Route("{username}")]
        public object DeleteUser(string username)
        {
            var user = users.FirstOrDefault(a => a.Username == username);
            users.Remove(user);
            return Ok();
        }

    }
}
