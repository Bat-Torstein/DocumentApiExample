//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DocumentApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class DocumentMeta
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public System.DateTime UploadTime { get; set; }
        public Nullable<System.DateTime> DeleteTime { get; set; }
        public int CollectionId { get; set; }
    
        public virtual DocumentCollection DocumentCollection { get; set; }
        public virtual DocumentContent DocumentContent { get; set; }
    }
}
