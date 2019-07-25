using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using WebAPI.DATA;
using WebAPI.Models;
using WebAPI.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using System.Web;

namespace WebAPI.Controllers
{


    [Produces("application/json")]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        readonly UserManager<IdentityUser> _userManager;
        readonly SignInManager<IdentityUser> _signInManager;
        readonly IEmailSender _emailSender;
        readonly ApplicationDbContext _dbContext;


        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IEmailSender emailSender, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _dbContext = dbContext;

        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {


            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var result = await _userManager.CreateAsync(user, credentials.Password);
            if (!result.Succeeded)
                return Conflict(result.Errors);
            var confirmationToken = _userManager.GenerateEmailConfirmationTokenAsync(user).Result;

            //Multiple Parameters
            var queryParams = new Dictionary<string, string>()
            {
                { "userId", user.Id },
                {"code", confirmationToken }
            };
            var url = QueryHelpers.AddQueryString("http://localhost:4200/authenticate", queryParams);

            await _emailSender.SendEmailAsync(credentials.Email, "Confirm your email",
               $"Please confirm your account by <a href='" + url + "'>clicking here</a>.");
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody]Credentials credentials)
        {
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            if (user == null)
            {
                return Unauthorized();
            }
            string code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var queryParams = new Dictionary<string, string>()
            {
                { "userId", user.Id },
                {"code", code }
            };
            var url = QueryHelpers.AddQueryString("http://localhost:4200/resetPassword", queryParams);
            await _emailSender.SendEmailAsync(credentials.Email, "Reset Password",
              $"Press here to reset password <a href='" + url + "'>clicking here</a>.");
            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCredentials ResetPasswordCredentials)
        {
            var user = await _userManager.FindByIdAsync(ResetPasswordCredentials.UserId);
            if (user == null)
            {
                return Unauthorized();
            }
            var result = await _userManager.ResetPasswordAsync(user, ResetPasswordCredentials.Code, ResetPasswordCredentials.Password);

            if (result.Succeeded)
            {
                return Ok(CreateToken(user));
            }
            return Unauthorized();
        }

        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromBody]ResetPasswordCredentials tokenConfirmation)
        {

            var user = _dbContext.Users.Find(tokenConfirmation.UserId);
            if (tokenConfirmation.UserId == null || tokenConfirmation.Code == null)
            {
                return Unauthorized();
            }

            var result = await _userManager.ConfirmEmailAsync(user, tokenConfirmation.Code);
            if (result.Succeeded)
            {
                return Ok(CreateToken(user));
            }
            return Unauthorized();
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByEmailAsync(credentials.Email);
            return Ok(CreateToken(user));
        }

        string CreateToken(IdentityUser user)
        {
            var claims = new Claim[]
          {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
          };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims, expires: DateTime.UtcNow.AddMinutes(60));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
       
    }
}
