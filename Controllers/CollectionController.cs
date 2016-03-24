using DocumentApi.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace DocumentApi.Controllers
{
    public class CollectionController : ApiController
    {
        // GET api/collection
        [HttpGet]
        public async Task<IHttpActionResult> GetCollections()
        {
            using (var context = new DocumentEntities())
            {
                var list = await context.DocumentCollection.Where(c => c.DeleteTime == null).ToListAsync();
                
                return Ok(list);
            }
        }

        // GET api/collection/5
        public async Task<IHttpActionResult> GetCollection(int id)
        {
            using (var context = new DocumentEntities())
            {
                var collection = await context.DocumentCollection.Where(c => c.Id == id && c.DeleteTime == null)
                    .Select(c => new {
                        Id = c.Id,
                        Name = c.Name,
                        DocumentMeta = c.DocumentMeta.Where(d => d.DeleteTime == null)
                    }).FirstOrDefaultAsync();

                if (collection != null)
                {
                    return Ok(collection);
                }

            }

            return NotFound();
        }

        // POST api/collection
        [HttpPost]
        public async Task<IHttpActionResult> Create([FromBody] DocumentCollection collection)
        {
            using (var context = new DocumentEntities())
            {
                context.DocumentCollection.Add(collection);
                await context.SaveChangesAsync();

                return Ok(collection);
            }
        }

        // PUT api/collection/5
        public void Put(int id, [FromBody]string value)
        {
            throw new NotImplementedException();
        }

        // DELETE api/collection/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            using (var context = new DocumentEntities())
            {
                var collection = await context.DocumentCollection.FirstOrDefaultAsync(c => c.Id == id && c.DeleteTime == null);

                if (collection != null)
                {
                    collection.DeleteTime = DateTime.Now;
                    context.SaveChanges();

                    return Ok();
                }

            }

            return NotFound();
        }
    }
}