using System.ComponentModel.DataAnnotations;

namespace API.Controllers.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        // Regex specifies password must contain a number, uppercase and lowercase letter, and be between 4 and 8 characters
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must meet criteria")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}