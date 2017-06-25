using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace ExampleApi.Models
{
    public class Samples
    {
        [Key]
        public int SampleId {get; set;}
        public int StatusId {get; set;}
        public string Barcode { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}
