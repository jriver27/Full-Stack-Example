using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExampleApiServer.Models;
using System.Collections.Generic;
using System;

namespace ExampleApiServer.Controllers
{
	[Route("api/[controller]")]
	public class SamplesController : Controller
    {
        private readonly ExampleDatabaseContext _context;

        public SamplesController(ExampleDatabaseContext context)
        {
            _context = context;    
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

				var samples = await _context.Samples
					.SingleOrDefaultAsync(m => m.SampleId == id);
				if (samples == null)
				{
					return NotFound();
				}

				return Json(samples);

			}
			catch (Exception e)
			{
				Console.WriteLine(e.ToString());
				return View(null);
			}
		}

		[HttpGet("/details")]
		public IEnumerable<string> Details()
		{

			return new string[] { "blue", "green" };
		}



		//// GET: Samples/Create
		//[HttpGet]
		//public string Create()
		//      {
		//          return "you hit create";
		//      }

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
