using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReformApi.Data;
using ReformApi.DTOs;
using ReformApi.Models;

namespace ReformApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SlidesController : ControllerBase
{
    private readonly AppDbContext _db;

    public SlidesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetSlides()
    {
        var slides = await _db.Slides
            .Where(s => s.IsActive)
            .OrderBy(s => s.SortOrder)
            .ToListAsync();
        return Ok(slides);
    }

    [HttpGet("all")]
    [Authorize]
    public async Task<IActionResult> GetAllSlides()
    {
        var slides = await _db.Slides.OrderBy(s => s.SortOrder).ToListAsync();
        return Ok(slides);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateSlide([FromBody] SlideRequest request)
    {
        var slide = new Slide
        {
            ImageUrl = request.ImageUrl,
            Title = request.Title,
            Subtitle = request.Subtitle,
            Description = request.Description,
            LinkUrl = request.LinkUrl,
            LinkText = request.LinkText,
            SortOrder = request.SortOrder,
            IsActive = request.IsActive
        };
        _db.Slides.Add(slide);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSlides), new { id = slide.Id }, slide);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateSlide(int id, [FromBody] SlideRequest request)
    {
        var slide = await _db.Slides.FindAsync(id);
        if (slide is null) return NotFound();

        slide.ImageUrl = request.ImageUrl;
        slide.Title = request.Title;
        slide.Subtitle = request.Subtitle;
        slide.Description = request.Description;
        slide.LinkUrl = request.LinkUrl;
        slide.LinkText = request.LinkText;
        slide.SortOrder = request.SortOrder;
        slide.IsActive = request.IsActive;

        await _db.SaveChangesAsync();
        return Ok(slide);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSlide(int id)
    {
        var slide = await _db.Slides.FindAsync(id);
        if (slide is null) return NotFound();

        _db.Slides.Remove(slide);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Slide silindi." });
    }
}
