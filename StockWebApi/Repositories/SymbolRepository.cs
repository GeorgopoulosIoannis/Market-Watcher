
using StockWebApi.Interfaces;
using System.Collections.Generic;
using System.Linq;
using WebAPI.CONSTANTS;
using WebAPI.DATA;
using WebAPI.Models;

namespace StockWebApi.Repositories
{
    public class SymbolRepository : ISymbolRepository
    {
        readonly ApplicationDbContext _dbContext;
        public SymbolRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Symbol> GetPaginatedSymbols(int start,string searchString = "")
        {
            return _dbContext.Symbols.Where(s => s.Name.Contains(searchString)).OrderBy(p => p.Id).Skip(start).Take(Constants.SYMBOLS_PER_PAGE);
        }

    }
}
