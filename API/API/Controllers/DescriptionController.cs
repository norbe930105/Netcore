using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class DescriptionController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Description> Get()
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                return db.Descriptions.ToList();
            }
        }
    }
}
