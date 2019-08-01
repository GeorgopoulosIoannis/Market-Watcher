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

        readonly ApplicationDbContext _dbContext;
        readonly SymbolRepository _repo;
        public SymbolController(ApplicationDbContext dbContext, SymbolRepository repo)
        {
            _dbContext = dbContext;
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


        // [HttpGet]
        // public async Task<IActionResult> Get(string searchString = "", int currentPage = 1)
        // {
        //     if (!string.IsNullOrEmpty(searchString))
        //     {
        //         var symbols = PaginatedSymbols(currentPage, searchString);
        //         return Ok(symbols);
        //     }
        //     else
        //     {

        //         var symbols = PaginatedSymbols(currentPage);
        //         return Ok(symbols);
        //     }
        // }


        // private List<Symbol> PaginatedSymbols(int currentPage = 1, string searchString = "")
        // {
        //     int start = (currentPage - 1) * Constants.SYMBOLS_PER_PAGE;
        //     return _dbContext.Symbols.Where(s => s.Name.Contains(searchString)).OrderBy(p => p.Id).Skip(start).Take(Constants.SYMBOLS_PER_PAGE).ToList();
        // }
    }
}