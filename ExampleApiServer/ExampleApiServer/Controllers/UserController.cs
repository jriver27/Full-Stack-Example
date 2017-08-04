using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using ExampleApiServer.Services;
using Dapper;
using ExampleApiServer.Models;


namespace ExampleApiServer.Controllers
{
	[Produces("application/json")]
	[Route("api/User")]
	public class UserController : Controller
	{
		private readonly IDbConnection db;

		public UserController(IDBConnectionService dbConnection)
		{
			db = dbConnection.GetDB();
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int? id)
		{
			try
			{
				if (id == null)
				{
					return NotFound();
				}

				var userSamples = db.Query("UserAllSamples",
					new { userID = id }, commandType: CommandType.StoredProcedure);

				return Json(userSamples);
			}
			catch (Exception e)
			{
				//Logger.log(this.ToString, e.ToString());
				Console.WriteLine(e.ToString());
				return NotFound();
			}
		}

		[HttpGet("all")]
		public async Task<IActionResult> Get()
		{
			try
			{

				var allUsers = db.Query("AllUsers", commandType: CommandType.StoredProcedure);

				return Json(allUsers);
			}
			catch (Exception e)
			{
				//Logger.log(this.ToString, e.ToString());
				Console.WriteLine(e.ToString());
				return NotFound();
			}
		}
	}
}