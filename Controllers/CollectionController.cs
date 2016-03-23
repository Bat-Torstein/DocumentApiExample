using DocumentApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                var list = await context.DocumentCollection.ToListAsync();
                return Ok(list);
            }
        }

        // GET api/collection/5
        public async Task<IHttpActionResult> GetCollection(int id)
        {
            using (var context = new DocumentEntities())
            {
                var document = await context.DocumentCollection.FirstOrDefaultAsync(d => d.Id == id);

                if (document != null)
                {
                    return Ok(document);
                }

            }

            return NotFound();
        }

        // POST api/collection
        public void Post([FromBody]string value)
        {
        }

        // PUT api/collection/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/collection/5
        public void Delete(int id)
        {
        }
    }
}