using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Description
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int PersonId { get; set; }
    }
}
