using DocumentApi.Models;
using System;
using System.Data.Entity;
using System.Web.Http;
using System.Threading.Tasks;

namespace DocumentApi.Controllers
{
    public class DocumentController : ApiController
    {
        // DELETE api/document/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            using (var context = new DocumentEntities())
            {
                var documentMeta = await context.DocumentMeta.FirstOrDefaultAsync(d => d.Id == id && d.DeleteTime == null);

                if (documentMeta != null)
                {
                    documentMeta.DeleteTime = DateTime.Now;
                    context.SaveChanges();

                    return Ok();
                }

            }

            return NotFound();
        }

    }
}
