using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Watchlist : ModelBase
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int SymbolId { get; set; }

        public Symbol Symbol { get; set; }

    }
}
