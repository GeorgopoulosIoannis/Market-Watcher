using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StockWebApi.Repositories;
using WebAPI.CONSTANTS;
using WebAPI.DATA;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SymbolController : ControllerBase
    {

        readonly SymbolRepository _repo;
        public SymbolController( SymbolRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetPaginatedSymbols(string searchString = "", int currentPage = 1)
        {
            int start = (currentPage - 1) * Constants.SYMBOLS_PER_PAGE;
            try
            {
                List<Symbol> symbols = _repo.GetPaginatedSymbols(start, searchString).ToList();
                return Ok(symbols);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}