using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExampleApiServer.Models;
using System.Collections.Generic;
using System;
using ExampleApiServer.Services;

namespace ExampleApiServer.Controllers
{
	[Route("api/[controller]")]
	public class SamplesController : Controller
    {
		private readonly IDBConnectionService _dbConnection;

		public SamplesController(IDBConnectionService dbConnection)
		{
			_dbConnection = dbConnection;
		}

		// GET: api/Samples
		[HttpGet]
		public IEnumerable<string> Get()
		{
			return new string[] { "blue", "green" };
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
				
				return Json(new { });
			}
			catch (Exception e)
			{
				Console.WriteLine(e.ToString());
				return View(null);
			}
		}

		// Here is an example of hitting a specific route.
		[HttpGet("details")]
		public IEnumerable<string> Details()
		{
			return new string[] { "these are the details","blue", "green" };
		}
		
		// GET: Samples/Create
		[HttpPost("create/{color}/{count}")]
		public string Create(string color, int count)
		{
			Console.WriteLine(_dbConnection.SayHello());
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
