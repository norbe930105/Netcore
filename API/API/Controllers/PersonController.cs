using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : Controller
    {
        [HttpPost]
        [Route("find")]
        public Person Get([FromQuery] string name)
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                var ss = db.Persons.Include(x => x.Descriptions).Where(x => x.Name == name).FirstOrDefault();
                if (ss == null)
                {
                    Person res = new Person();
                    return res;
                }
                else
                {
                    return ss;
                }
                
            }
        }
        [HttpPost]
        [Route("create")]
        public Person Create([FromQuery] string name, string type, string phone, string date)
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                Person person = new Person();
                Reservation reserv = new Reservation();
                Description desc = new Description();
                person.Name = name;
                person.Phone = phone;
                string format = "MM/dd/yyyy";
                DateTime b = DateTime.ParseExact(date, format, CultureInfo.InvariantCulture);
                person.BirthDate = b;
                db.Add(person);
                db.SaveChanges();
                reserv.Name = name;
                reserv.Date = b;
                reserv.Favorite = true;
                reserv.Rate = 3;
                reserv.PersonId = person.Id;
                desc.Type = "Contact Type 1";
                desc.PersonId = person.Id;
                db.Add(reserv);
                db.Add(desc);
                db.SaveChanges();
                return person;
            }
        }
        [HttpPost]
        [Route("getperson")]
        public Person Getpers([FromQuery] int id)
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                var ss = db.Persons.Include(x => x.Descriptions).Where(x => x.Id == id).FirstOrDefault();
                if (ss == null)
                {
                    Person res = new Person();
                    return res;
                }
                else
                {
                    return ss;
                }
            }
        }
        [HttpPost]
        [Route("edit")]
        public Person Edit([FromQuery] string name, string type, string phone, string date, int id)
        {
            using (AplicationDBContext db = new AplicationDBContext())
            {
                var person = db.Persons.Include(x => x.Descriptions).Include(x => x.Reservations).Where(x => x.Id == id).FirstOrDefault();
                person.Name = name;
                person.Phone = phone;
                string format = "MM/dd/yyyy";
                DateTime b = DateTime.ParseExact(date, format, CultureInfo.InvariantCulture);
                person.BirthDate = b;
                person.Descriptions.ElementAt(0).Type = type;
                db.Entry(person).State = EntityState.Modified;
                db.SaveChanges();
                return person;
            }
        }
    }
}
