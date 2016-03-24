using System.Net.Http;

public class DocumentMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
{

    public DocumentMultipartFormDataStreamProvider(string path) : base(path)
    {
    }

    public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
    {
        var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? headers.ContentDisposition.FileName : "NoName";
        return name.Trim(new char[] { '"' }).Replace("&", "and");
    }
}