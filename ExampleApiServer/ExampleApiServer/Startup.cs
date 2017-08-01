using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Autofac;

namespace ExampleApiServer
{
	public class Startup
    {

		public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
}

        public IConfigurationRoot Configuration { get; }

		// ConfigureServices is where you register dependencies. This gets
		// called by the runtime before the ConfigureContainer method, below.
		public void ConfigureServices(IServiceCollection services)
		{
			// Add services to the collection. Don't build or return
			// any IServiceProvider or the ConfigureContainer method
			// won't get called.
			services.AddMvc();
			services.AddCors(options =>
			{
				options.AddPolicy("AllowSpecificOrigin",
					builder => builder.WithOrigins("http://localhost:4200"));
			});
		}

		// ConfigureContainer is where you can register things directly
		// with Autofac. This runs after ConfigureServices so the things
		// here will override registrations made in ConfigureServices.
		// Don't build the container; that gets done for you. If you
		// need a reference to the container, you need to use the
		// "Without ConfigureContainer" mechanism shown later.
		public void ConfigureContainer(ContainerBuilder builder)
		{
			builder.RegisterModule(new ServiceModule());
		}
		
		// Configure is where you add middleware. This is called after
		// ConfigureContainer. You can use IApplicationBuilder.ApplicationServices
		// here if you need to resolve things from the container.
		public void Configure(
		  IApplicationBuilder app,
		  IHostingEnvironment env,
		  ILoggerFactory loggerFactory)
		{
			loggerFactory.AddConsole(this.Configuration.GetSection("Logging"));
			loggerFactory.AddDebug();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
			}

			app.UseStaticFiles();

			app.UseCors("AllowSpecificOrigin");

			app.UseMvc(routes => {
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
			});

		}
    }
}
