using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThinkFunding.Api.DTOs;
using ThinkFunding.Api.Services;

namespace ThinkFunding.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        if (result == null)
            return Error("Invalid email or password");
        
        return Success(result);
    }
    
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var merchant = new Models.Merchant
        {
            LegalName = request.BusinessName,
            Email = request.Email,
            Phone = request.Phone,
            BusinessType = request.BusinessType,
            Source = "Direct"
        };
        
        // This would call merchant service to create
        return Success(new { Message = "Registration successful. Please check your email." });
    }
    
    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var result = await _authService.RefreshTokenAsync(request.RefreshToken);
        if (result == null)
            return Error("Invalid refresh token");
        
        return Success(result);
    }
    
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        var userId = User.FindFirst("id")?.Value;
        await _authService.LogoutAsync(userId ?? "");
        return Success(new { Message = "Logged out successfully" });
    }
    
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirst("id")?.Value;
        if (!int.TryParse(userIdClaim, out int userId))
            return Error("Invalid user token");
        
        var user = await _authService.GetUserByIdAsync(userId);
        if (user == null)
            return NotFoundError("User not found");
        
        return Success(user);
    }
}

public record RegisterRequest(
    [Required] string BusinessName,
    [Required][EmailAddress] string Email,
    [Required] string Password,
    string? Phone,
    string? BusinessType
);
