using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ExampleApiServer.Models;

namespace ExampleApiServer.Models
{
    public partial class ExampleDatabaseContext : DbContext
    {
		public ExampleDatabaseContext(DbContextOptions<ExampleDatabaseContext> options) : base(options)
		{ }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

		public DbSet<ExampleApiServer.Models.Samples> Samples { get; set; }
    }
}