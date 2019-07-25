using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DATA;
using WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchlistController : ControllerBase
    {

        readonly ApplicationDbContext _dbContext;

        readonly UserManager<IdentityUser> _userManager;

        public WatchlistController(UserManager<IdentityUser> userManager,ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var watchlist=_dbContext.Watchlists.Include(s=>s.Symbol).Where(i => i.UserId == userId).Select(x=>x.Symbol).ToList();

            return Ok(watchlist);
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] List<Symbol> symbols)
        { 
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            DeleteWatchlist(userId);
            foreach(Symbol symbol in symbols)
            {
                Watchlist watchlist = new Watchlist();
 
                watchlist.SymbolId = symbol.Id;
                watchlist.UserId = userId;
                watchlist.CreatedById = userId;
                watchlist.DateCreated = DateTime.UtcNow;
                try
                {
                    _dbContext.Watchlists.Add(watchlist);
                }
                catch(Exception ex)
                {
                    return Ok(ex);
                }
            }
            _dbContext.SaveChanges();
            return Ok();
        }
       
        private bool DeleteWatchlist(string userId)
        {
            var oldList=_dbContext.Watchlists.Where(x => x.UserId == userId).ToList();
            foreach(var item in oldList)
            {
                _dbContext.Watchlists.Remove(item);
            }
            return true;
        }
    }
}
