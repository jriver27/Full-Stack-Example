using System.ComponentModel.DataAnnotations;

namespace ExampleApiServer.Models
{
	public class Statuses
    {
        [Key]
        public int StatusId {get; set;}
        public string Status { get; set; }
    }
}
