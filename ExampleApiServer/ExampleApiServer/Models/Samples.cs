using System;
using System.ComponentModel.DataAnnotations;

namespace ExampleApiServer.Models
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
