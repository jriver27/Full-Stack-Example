using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExampleApi.Models {
    public class Statuses
    {
        [Key]
        public int StatusId {get; set;}
        public string Status { get; set; }
    }
}
