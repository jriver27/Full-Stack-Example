using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExampleApiServer.Models;
using System.Collections.Generic;
using System;
using ExampleApiServer.Services;
using Dapper;
using System.Data;

namespace ExampleApiServer.Controllers
{
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
				var Samples = db.Query("select * from Samples " +
					"right join Users on Users.UserId = Samples.CreatedBy " + 
					"right join Statuses on Statuses.StatusId = Samples.StatusId");

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

		// Here is an example of hitting a specific route.
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
		
		// GET: Samples/Create
		[HttpPost("create/{color}/{count}")]
		public string Create(string color, int count)
		{
			return "you hit create with the ${color}, and ${type}";
		}

		//      // POST: Samples/Create
		//      // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		//      // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		//      [HttpPost]
		//      [ValidateAntiForgeryToken]
		//      public async Task<IActionResult> Create([Bind("SampleId,StatusId,Barcode,CreatedAt,CreatedBy")] Samples samples)
		//      {
		//          if (ModelState.IsValid)
		//          {
		//              _context.Add(samples);
		//              await _context.SaveChangesAsync();
		//              return RedirectToAction("Index");
		//          }
		//          return View(samples);
		//      }

		//      // GET: Samples/Edit/5
		//      public async Task<IActionResult> Edit(int? id)
		//      {
		//          if (id == null)
		//          {
		//              return NotFound();
		//          }

		//          var samples = await _context.Samples.SingleOrDefaultAsync(m => m.SampleId == id);
		//          if (samples == null)
		//          {
		//              return NotFound();
		//          }
		//          return View(samples);
		//      }

		//      // POST: Samples/Edit/5
		//      // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		//      // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		//      [HttpPost]
		//      [ValidateAntiForgeryToken]
		//      public async Task<IActionResult> Edit(int id, [Bind("SampleId,StatusId,Barcode,CreatedAt,CreatedBy")] Samples samples)
		//      {
		//          if (id != samples.SampleId)
		//          {
		//              return NotFound();
		//          }

		//          if (ModelState.IsValid)
		//          {
		//              try
		//              {
		//                  _context.Update(samples);
		//                  await _context.SaveChangesAsync();
		//              }
		//              catch (DbUpdateConcurrencyException)
		//              {
		//                  if (!SamplesExists(samples.SampleId))
		//                  {
		//                      return NotFound();
		//                  }
		//                  else
		//                  {
		//                      throw;
		//                  }
		//              }
		//              return RedirectToAction("Index");
		//          }
		//          return View(samples);
		//      }

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
