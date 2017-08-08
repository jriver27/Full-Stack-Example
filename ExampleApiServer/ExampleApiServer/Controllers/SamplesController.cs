using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExampleApiServer.Models;
using System.Collections.Generic;
using System;
using ExampleApiServer.Services;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace ExampleApiServer.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class SamplesController : Controller
    {
		private readonly IDbConnection db;

		public SamplesController(IDBConnectionService dbConnection)
		{
			db = dbConnection.GetDB();
		}

		// GET: api/Samples
		[HttpGet]
		public async Task<IActionResult> Get()
		{
			try
			{
				var Samples = db.Query("GetAllSamplesWithUserAndStatusInfo", commandType: CommandType.StoredProcedure);

				return Json(Samples);
			}
			catch (Exception e)
			{
				Console.WriteLine(e.ToString());
				return NotFound();
			}
        }

		// GET: api/Samples/3
		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int? id)
		{
			try
			{
				if (id == null)
				{
					return NotFound();
				}

				List<Samples> samples = (List<Samples>)db.Query<Samples>($"SELECT * FROM SAMPLES WHERE SAMPLEID = {id}");

				if (samples.Count == 0)
				{
					return NotFound();
				}

				return Json(samples.First());
			}
			catch (Exception e)
			{
				Console.WriteLine(e.ToString());
				return NotFound();
			}
		}

		[HttpGet("byStatus/{statusId}")]
		public async Task<IActionResult> ByStatus(int statusId)
		{
			try
			{
				List<Samples> samples = (List<Samples>)db.Query<Samples>
					("SELECT * FROM Statuses " +
					"RIGHT JOIN SAMPLES ON SAMPLES.STATUSID = STATUSES.STATUSID " +
					$"WHERE STATUSES.STATUSID = {statusId}");

				if (samples.Count == 0)
				{
					return NotFound();
				}

				return Json(samples);

			} catch(Exception e)
			{
				return NotFound();
			}
		}

		[HttpGet("byUserName/{userName}")]
		public async Task<IActionResult> ByUserName(string userName)
		{
			try
			{
				List<Samples> samples = (List<Samples>)db.Query<Samples>
					("SELECT * FROM Samples " +
						"Left JOIN Users ON Users.UserId = Samples.CreatedBy " +
						$"WHERE Users.FirstName LIKE '%{userName}%'");

				if (samples.Count == 0)
				{
					return NotFound();
				}

				return Json(samples);

			}
			catch (Exception e)
			{
				return NotFound();
			}
		}


		//      // POST: Samples/Create
		//      // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		//      // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost("create")]
		public async Task<IActionResult> Create([Bind("SampleId, StatusId, Barcode, CreatedAt, CreatedBy")] Samples samples)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var result = db.Execute(@"INSERT INTO [dbo].[Samples]([SampleId], [StatusId], [Barcode], [CreatedAt], [CreatedBy])
						VALUES(@SampleId, @StatusId, @Barcode, @CreatedAt, @CreatedBy)", samples);

					return Json(result);
				}
				return NotFound();
			} catch(Exception e)
			{
				return NotFound();
			}
		}

		// POST: Samples/Edit/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost("edit")]
		public async Task<IActionResult> Edit([FromBody] Samples sample)
		{
			try
			{

				var savedSample = db.Query("EditSample",
					new {
						id = sample.SampleId,
						barcode = sample.Barcode,
						userId = sample.CreatedBy,
						statusId = sample.StatusId
					}, commandType: CommandType.StoredProcedure);
				return Json(sample);
			}
			catch (Exception e)
			{

				return NotFound();
			}
		}

		//      // GET: Samples/Delete/5
		//      public async Task<IActionResult> Delete(int? id)
		//      {
		//          if (id == null)
		//          {
		//              return NotFound();
		//          }

		//          var samples = await _context.Samples
		//              .SingleOrDefaultAsync(m => m.SampleId == id);
		//          if (samples == null)
		//          {
		//              return NotFound();
		//          }

		//          return View(samples);
		//      }

		//      // POST: Samples/Delete/5
		//      [HttpPost, ActionName("Delete")]
		//      [ValidateAntiForgeryToken]
		//      public async Task<IActionResult> DeleteConfirmed(int id)
		//      {
		//          var samples = await _context.Samples.SingleOrDefaultAsync(m => m.SampleId == id);
		//          _context.Samples.Remove(samples);
		//          await _context.SaveChangesAsync();
		//          return RedirectToAction("Index");
		//      }

		//      private bool SamplesExists(int id)
		//      {
		//          return _context.Samples.Any(e => e.SampleId == id);
		//      }
	}
}
