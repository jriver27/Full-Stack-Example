using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ExampleApiServer.Services;
using System.Data;
using Dapper;

namespace ExampleApiServer.Controllers
{
	[Produces("application/json")]
	[Route("api/Status")]
	public class StatusController : Controller
	{
		private readonly IDbConnection db;

		public StatusController(IDBConnectionService dbConnection)
		{
			db = dbConnection.GetDB();
		}

		// GET: api/Status
		[HttpGet]
		public async Task<IActionResult> Get()
		{
			try
			{
				var Statuses = db.Query("Select s.StatusId, s.Status From Statuses s");

				return Json(Statuses);
			}
			catch (Exception e)
			{
				Console.WriteLine(e.ToString());
				return NotFound();
			}
		}
	}
}