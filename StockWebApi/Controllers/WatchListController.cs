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
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchlistController : ControllerBase
    {

        readonly WatchlistRepository _repo;

        readonly UserManager<IdentityUser> _userManager;


        public WatchlistController(UserManager<IdentityUser> userManager, WatchlistRepository repo)
        {
            _userManager = userManager;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            List<Symbol> watchlist = _repo.GetWatchlistSymbols(userId).ToList();
            return Ok(watchlist);
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] List<Symbol> symbols)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            DeleteWatchlist(userId);
            foreach (Symbol symbol in symbols)
            {
                Watchlist watchlist = new Watchlist();

                watchlist.SymbolId = symbol.Id;
                watchlist.UserId = userId;
                watchlist.CreatedById = userId;
                watchlist.DateCreated = DateTime.UtcNow;
                try
                {
                    _repo.Add(watchlist);
                }
                catch (Exception ex)
                {
                    return Ok(ex);
                }
            }
            _repo.Save();
            return Ok();
        }

        private bool DeleteWatchlist(string userId)
        {
            var oldList = _repo.GetById(userId);
            foreach (var item in oldList)
            {
                _repo.Delete(item);
            }
            return true;
        }
    }
}
