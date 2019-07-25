using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;

        public ApiController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;

        }

        [HttpGet("history")]
         public async Task<IActionResult> HistoricalAsync()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.worldtradingdata.com/api/v1/history?symbol=AAPL&date_from=2019-01-01&date_to=2019-02-01&sort=newest&api_token=X2OakA56FMUoz7c9wXr7nrE4pzfjqNuWcSafBcrTlH7TTraGNtCttnicDU3v");
            request.Headers.Add("accept", "application/json");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
             }
            return Ok(response);
        }

        [HttpGet("intraday")]
        public async Task<IActionResult> IntradayAsync()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://intraday.worldtradingdata.com/api/v1/intraday?symbol=AAPL&range=1&interval=1&api_token=X2OakA56FMUoz7c9wXr7nrE4pzfjqNuWcSafBcrTlH7TTraGNtCttnicDU3v");
            request.Headers.Add("accept", "application/json");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);
            return Ok();
        }
    }
}
