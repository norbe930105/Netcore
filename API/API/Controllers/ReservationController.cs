using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : Controller
    {
        [HttpGet]
        public IEnumerable<Reservation> Get()
        {
                using (AplicationDBContext db = new AplicationDBContext())
                {
                   var auth =  db.Reservations.ToList();
                return auth;
                }
        }

        [HttpPost]
        [Route("orderby")]
        public IEnumerable<Reservation> OrderBy([FromQuery] string filtro)
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                List<Reservation> reserv = db.Reservations.ToList();
                if (filtro == "dateasc")
                {
                    reserv = reserv.OrderBy(r => r.Date).ToList();
                    return reserv;
                }
                if (filtro == "datedesc")
                {
                    reserv = reserv.OrderByDescending(r => r.Date).ToList();
                    return reserv;
                }
                if (filtro == "alphasc")
                {
                    reserv = reserv.OrderBy(r => r.Name).ToList();
                    return reserv;
                }
                if (filtro == "alphdesc")
                {
                    reserv = reserv.OrderByDescending(r => r.Name).ToList();
                    return reserv;
                }
                if (filtro == "rate")
                {
                    reserv = reserv.OrderBy(r => r.Rate).ToList();
                    return reserv;
                }
                return reserv;
            }
        }

        [HttpPost]
        [Route("favorite")]
        public Reservation Favorite([FromQuery] int id)
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                Reservation reserv = db.Reservations.Find(id);
                if (reserv.Favorite == true)
                {
                    reserv.Favorite = false;
                } else
                {
                    reserv.Favorite = true;
                }
                db.SaveChanges();
                return reserv;
            }
        }
    }
}
