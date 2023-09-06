using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        // This is needed because we're not inside the context of our API project and we need to access the HTTP context. And we can do that via this interface because our HTTP context contains our user objects, and from our user objects we can get access to the claims inside the token.
        public UserAccessor(IHttpContextAccessor httpContextAccessor)

        {
            _httpContextAccessor = httpContextAccessor;

        }
        public string GetUserName()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}