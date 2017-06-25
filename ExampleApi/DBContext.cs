using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ExampleApi.Models {
    public class BloggingContext : DbContext
    {
        public DbSet<Samples> Samples { get; set; }
        public DbSet<Statuses> Statuses { get; set; }
        public DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=blogging.db");
        }
    }
}