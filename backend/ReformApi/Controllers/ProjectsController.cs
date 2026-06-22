using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReformApi.Data;
using ReformApi.DTOs;
using ReformApi.Models;

namespace ReformApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProjectsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _db.Projects
            .Where(p => p.IsActive)
            .OrderBy(p => p.SortOrder)
            .ToListAsync();
        return Ok(projects);
    }

    [HttpGet("all")]
    [Authorize]
    public async Task<IActionResult> GetAllProjects()
    {
        var projects = await _db.Projects.OrderBy(p => p.SortOrder).ToListAsync();
        return Ok(projects);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateProject([FromBody] ProjectRequest request)
    {
        var project = new Project
        {
            ImageUrl = request.ImageUrl,
            Title = request.Title,
            Description = request.Description,
            SortOrder = request.SortOrder,
            IsActive = request.IsActive
        };
        _db.Projects.Add(project);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectRequest request)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        project.ImageUrl = request.ImageUrl;
        project.Title = request.Title;
        project.Description = request.Description;
        project.SortOrder = request.SortOrder;
        project.IsActive = request.IsActive;

        await _db.SaveChangesAsync();
        return Ok(project);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        _db.Projects.Remove(project);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Proje silindi." });
    }
}
