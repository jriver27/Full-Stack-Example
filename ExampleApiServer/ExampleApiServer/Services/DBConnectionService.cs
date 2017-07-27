using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ExampleApiServer.Services
{
    public class DBConnectionService : IDBConnectionService
    {
		private IDbConnection _db;

		public DBConnectionService()
		{
			_db = new SqlConnection("Server=(localdb)\\ProjectsV13;Initial Catalog=ExampleDatabase;Integrated Security=True;Pooling=False;Connect Timeout=30");
		}

		public IDbConnection GetDB() {
			return _db;
		}
	}
}
