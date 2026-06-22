using System.ComponentModel.DataAnnotations;

namespace ReformApi.Models;

public class CategoryGroup
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public int SortOrder { get; set; }

    public List<Category> Categories { get; set; } = new();
}
