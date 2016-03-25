﻿using DocumentApi.Models;
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

            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                return BadRequest("Unsupported media type");
            }

            try
            {
                var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath("~/uploads/"));
                var content = new StreamContent(HttpContext.Current.Request.GetBufferlessInputStream(true));
                foreach (var header in Request.Content.Headers)
                {
                    content.Headers.TryAddWithoutValidation(header.Key, header.Value);
                }

                await content.ReadAsMultipartAsync(provider);

                using (var context = new DocumentEntities())
                {
                    foreach (var file in provider.FileData)
                    {
                        var documentMeta = new DocumentMeta
                        {
                            CollectionId = id,
                            FileName = file.Headers.ContentDisposition.Name.Trim(new char[] { '"' }).Replace("&", "and"),
                            UploadTime = DateTime.Now
                        };

                        context.DocumentMeta.Add(documentMeta);
                    }
                    context.SaveChanges();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }
    }
}
