using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExampleApiServer.Services
{
    public class DBConnectionService : IDBConnectionService
    {
		public string SayHello()
		{
			return "hellow";
		}
    }
}
