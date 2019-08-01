using System.Collections.Generic;
using WebAPI.Models;

namespace StockWebApi.Interfaces
{
    public interface ISymbolRepository
    {
        IEnumerable<Symbol> GetPaginatedSymbols( int start,string searchString);
    }
}