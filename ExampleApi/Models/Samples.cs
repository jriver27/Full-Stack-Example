using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace ExampleApi.Models
{
    public class Samples
    {
        public string Barcode { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public int StatusId { get; set; }
    }
}
