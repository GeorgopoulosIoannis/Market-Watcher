using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Credentials
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ResetPasswordCredentials
    {
        public string UserId { get; set; }

        public string Code { get; set; }

        public string Password { get; set; }
    }
}
