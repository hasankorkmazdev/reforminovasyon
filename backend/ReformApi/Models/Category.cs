using System.ComponentModel.DataAnnotations;

namespace ReformApi.Models;

public class Category
{
    public int Id { get; set; }

    public int GroupId { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public int SortOrder { get; set; }

    public CategoryGroup Group { get; set; } = null!;

    public List<Application> Applications { get; set; } = new();
}
