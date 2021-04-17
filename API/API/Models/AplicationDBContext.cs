
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class AplicationDBContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(local);initial catalog=test;Integrated Security=True");
        }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Description> Descriptions { get; set; }
    }
}
