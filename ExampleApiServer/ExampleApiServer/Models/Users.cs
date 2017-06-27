using System.ComponentModel.DataAnnotations;

namespace ExampleApiServer.Models
{
	public class Users
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
}
