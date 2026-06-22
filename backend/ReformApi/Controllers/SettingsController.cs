using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReformApi.Data;
using ReformApi.DTOs;
using ReformApi.Models;

namespace ReformApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly AppDbContext _db;

    public SettingsController(AppDbContext db) => _db = db;

    [HttpGet("social-media")]
    public async Task<IActionResult> GetSocialMedia()
    {
        var list = await _db.SocialMedias.Where(s => s.IsActive).ToListAsync();
        return Ok(list);
    }

    [HttpGet("social-media/all")]
    [Authorize]
    public async Task<IActionResult> GetAllSocialMedia()
    {
        var list = await _db.SocialMedias.ToListAsync();
        return Ok(list);
    }

    [HttpPost("social-media")]
    [Authorize]
    public async Task<IActionResult> CreateSocialMedia([FromBody] SocialMediaRequest request)
    {
        var item = new SocialMedia
        {
            Platform = request.Platform,
            Url = request.Url,
            Icon = request.Icon,
            IsActive = request.IsActive
        };
        _db.SocialMedias.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSocialMedia), new { id = item.Id }, item);
    }

    [HttpPut("social-media/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateSocialMedia(int id, [FromBody] SocialMediaRequest request)
    {
        var item = await _db.SocialMedias.FindAsync(id);
        if (item is null) return NotFound();

        item.Platform = request.Platform;
        item.Url = request.Url;
        item.Icon = request.Icon;
        item.IsActive = request.IsActive;

        await _db.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("social-media/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSocialMedia(int id)
    {
        var item = await _db.SocialMedias.FindAsync(id);
        if (item is null) return NotFound();

        _db.SocialMedias.Remove(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Sosyal medya hesabı silindi." });
    }

    [HttpGet("contact")]
    public async Task<IActionResult> GetContactInfo()
    {
        var list = await _db.ContactInfos.ToListAsync();
        return Ok(list);
    }

    [HttpPost("contact")]
    [Authorize]
    public async Task<IActionResult> UpsertContactInfo([FromBody] List<ContactInfoRequest> requests)
    {
        _db.ContactInfos.RemoveRange(_db.ContactInfos);
        foreach (var r in requests)
        {
            _db.ContactInfos.Add(new ContactInfo { Type = r.Type, Value = r.Value });
        }
        await _db.SaveChangesAsync();
        return Ok(await _db.ContactInfos.ToListAsync());
    }
}
