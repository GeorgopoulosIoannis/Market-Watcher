using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Symbol :ModelBase 
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Currency { get; set; }

        public string StockExchangeLong { get; set; }

        public IEnumerable<Watchlist> Watchlists { get; internal set; }
    }
}
