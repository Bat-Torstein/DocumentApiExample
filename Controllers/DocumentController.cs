using DocumentApi.Models;
using System;
using System.Data.Entity;
using System.Web.Http;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web;
using System.IO;
using System.Collections.Generic;

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

        [HttpPost]
        public async Task<IHttpActionResult> Upload(int id)
        {

            // TODO: This code is not tested
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                return BadRequest("Unsupported media type");
            }

            try
            {
                var documents = await AddDocuments(Request);




                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }
        string PATH = HttpContext.Current.Server.MapPath("~/uploads/");
        public async Task<IEnumerable<FileInfo>> AddDocuments(HttpRequestMessage request)
        {
            var provider = new DocumentMultipartFormDataStreamProvider(PATH);

            await request.Content.ReadAsMultipartAsync(provider);

            var files = new List<FileInfo>();

            foreach (var file in provider.FileData)
            {
                files.Add(new FileInfo(file.LocalFileName));
            }

            return files;
        }
    }
}
