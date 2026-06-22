using System.ComponentModel.DataAnnotations;

namespace ReformApi.Models;

public class Application
{
    public int Id { get; set; }

    public int CategoryId { get; set; }

    [Required]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    public string ContactPerson { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Status { get; set; } = "Yeni";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Category Category { get; set; } = null!;
}
