using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReformApi.Data;
using ReformApi.DTOs;
using ReformApi.Models;
using System.Text.RegularExpressions;

namespace ReformApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ApplicationsController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> CreateApplication([FromBody] CreateApplicationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.CompanyName) ||
            string.IsNullOrWhiteSpace(request.ContactPerson) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Phone))
            return BadRequest(new { error = "Tüm zorunlu alanları doldurunuz." });

        if (!Regex.IsMatch(request.Email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
            return BadRequest(new { error = "Geçerli bir e-posta adresi giriniz." });

        if (!await _db.Categories.AnyAsync(c => c.Id == request.CategoryId))
            return BadRequest(new { error = "Geçersiz kategori seçimi." });

        var application = new Application
        {
            CategoryId = request.CategoryId,
            CompanyName = request.CompanyName,
            ContactPerson = request.ContactPerson,
            Email = request.Email,
            Phone = request.Phone,
            Description = request.Description ?? ""
        };

        _db.Applications.Add(application);
        await _db.SaveChangesAsync();

        return StatusCode(201, new { id = application.Id, message = "Başvurunuz başarıyla alındı." });
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetApplications([FromQuery] string? status, [FromQuery] int? categoryId)
    {
        var query = _db.Applications
            .Include(a => a.Category)
            .ThenInclude(c => c.Group)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status))
            query = query.Where(a => a.Status == status);
        if (categoryId.HasValue)
            query = query.Where(a => a.CategoryId == categoryId);

        var applications = await query
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new ApplicationResponse(
                a.Id, a.CategoryId, a.CompanyName, a.ContactPerson,
                a.Email, a.Phone, a.Description, a.Status, a.CreatedAt,
                a.Category.Name, a.Category.Group.Name
            ))
            .ToListAsync();

        return Ok(applications);
    }

    [HttpPatch("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        var validStatuses = new[] { "Yeni", "İncelendi", "İletişime Geçildi" };
        if (!validStatuses.Contains(request.Status))
            return BadRequest(new { error = "Geçersiz durum." });

        var application = await _db.Applications.FindAsync(id);
        if (application is null)
            return NotFound(new { error = "Başvuru bulunamadı." });

        application.Status = request.Status;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Durum güncellendi." });
    }
}
