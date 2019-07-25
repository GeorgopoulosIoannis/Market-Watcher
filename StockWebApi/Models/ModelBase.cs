using System;

namespace WebAPI.Models
{
    public class ModelBase
    {
       

        public DateTime DateCreated { get; set; }

        public string CreatedById { get; set; }

        public DateTime? DateUpdated { get; set; }

        public string UpdatedById { get; set; }
    }
}