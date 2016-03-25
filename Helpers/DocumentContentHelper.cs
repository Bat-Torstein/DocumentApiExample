
using DocumentApi.Models;
using System;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
using System.Transactions;
using System.Net.Http;

namespace DocumentApi.Helpers
{
    public class ContentStreamRowData
    {
        public string Path { get; set; }
        public byte[] Transaction { get; set; }
    }

    public class DocumentContentHelper
    {
        private const string RowDataStatement = @"SELECT Data.PathName() AS 'Path', GET_FILESTREAM_TRANSACTION_CONTEXT() AS 'Transaction' FROM DocumentContent WHERE Id = @id";

        public static void AddContentData(int id, DocumentEntities context, Stream stream)
        {
            var rowData =
                context.Database.SqlQuery<ContentStreamRowData>(RowDataStatement, new SqlParameter("id", id)).First();

            using (var destination = new SqlFileStream(rowData.Path, rowData.Transaction, FileAccess.Write))
            {
                var buffer = new byte[16 * 1024];
                int bytesRead;
                while ((bytesRead = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                        destination.Write(buffer, 0, bytesRead);
                }
            }
        }

        public static ByteArrayContent GetContentData(int id, DocumentEntities context, MemoryStream stream)
        {
            using (var tx = new TransactionScope())
            {
                var rowData =
                    context.Database.SqlQuery<ContentStreamRowData>(RowDataStatement, new SqlParameter("id", id)).First();

                using (var source = new SqlFileStream(rowData.Path, rowData.Transaction, FileAccess.Read))
                {
                    var buffer = new byte[16 * 1024];
                    int bytesRead;
                    while ((bytesRead = source.Read(buffer, 0, buffer.Length)) > 0)
                    {
                            stream.Write(buffer, 0, bytesRead);
                    }
                }
                tx.Complete();
            }

            return new ByteArrayContent(stream.GetBuffer());
        }
    }
}