using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace ExampleApiServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
			// DB Connection String 
			// Data Source=(localdb)\ProjectsV13;Initial Catalog=ExampleDatabase;Integrated Security=True;Pooling=False;Connect Timeout=30

			var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            host.Run();
        }
    }
}
