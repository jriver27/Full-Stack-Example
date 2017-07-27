using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ExampleApiServer.Services
{
    public interface IDBConnectionService
    {
		IDbConnection GetDB();
	}
}
