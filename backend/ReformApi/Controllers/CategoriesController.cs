using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReformApi.Data;
using ReformApi.Models;
using System.Text.RegularExpressions;

namespace ReformApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CategoriesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var groups = await _db.CategoryGroups
            .OrderBy(g => g.SortOrder)
            .Select(g => new
            {
                g.Id,
                g.Name,
                g.SortOrder,
                Categories = g.Categories
                    .OrderBy(c => c.SortOrder)
                    .Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.SortOrder,
                        ApplicationCount = c.Applications.Count
                    })
            })
            .ToListAsync();

        return Ok(groups);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest request)
    {
        if (!await _db.CategoryGroups.AnyAsync(g => g.Id == request.GroupId))
            return BadRequest(new { error = "Geçersiz grup." });

        var category = new Category { GroupId = request.GroupId, Name = request.Name, SortOrder = request.SortOrder };
        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, new { category.Id, category.Name, category.SortOrder });
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CreateCategoryRequest request)
    {
        var category = await _db.Categories.Include(c => c.Group).FirstOrDefaultAsync(c => c.Id == id);
        if (category is null)
            return NotFound(new { error = "Kategori bulunamadı." });

        if (!await _db.CategoryGroups.AnyAsync(g => g.Id == request.GroupId))
            return BadRequest(new { error = "Geçersiz grup." });

        category.Name = request.Name;
        category.GroupId = request.GroupId;
        category.SortOrder = request.SortOrder;
        await _db.SaveChangesAsync();

        return Ok(new { category.Id, category.Name, category.GroupId, category.SortOrder });
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _db.Categories.Include(c => c.Applications).FirstOrDefaultAsync(c => c.Id == id);
        if (category is null)
            return NotFound(new { error = "Kategori bulunamadı." });

        if (category.Applications.Count > 0)
            return BadRequest(new { error = "Bu kategoride başvuru olduğu için silinemez." });

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Kategori silindi." });
    }
}

public record CreateCategoryRequest(int GroupId, string Name, int SortOrder);
