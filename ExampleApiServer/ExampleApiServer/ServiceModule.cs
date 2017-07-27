using Autofac;
using ExampleApiServer.Services;
using Microsoft.Extensions.Logging;

namespace ExampleApiServer
{
	public class ServiceModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.Register(c => new DBConnectionService())
				.As<IDBConnectionService>()
				.InstancePerLifetimeScope();
		}
	}
}
