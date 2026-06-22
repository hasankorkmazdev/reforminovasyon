namespace ReformApi.DTOs;

public record CreateApplicationRequest(
    int CategoryId,
    string CompanyName,
    string ContactPerson,
    string Email,
    string Phone,
    string? Description
);

public record UpdateStatusRequest(string Status);

public record ApplicationResponse(
    int Id,
    int CategoryId,
    string CompanyName,
    string ContactPerson,
    string Email,
    string Phone,
    string? Description,
    string Status,
    DateTime CreatedAt,
    string CategoryName,
    string GroupName
);

public record LoginRequest(string Username, string Password);

public record LoginResponse(string Token, string Username);

public record SlideRequest(
    string ImageUrl,
    string? Title,
    string? Subtitle,
    string? Description,
    string? LinkUrl,
    string? LinkText,
    int SortOrder,
    bool IsActive
);

public record ProjectRequest(
    string ImageUrl,
    string Title,
    string? Description,
    int SortOrder,
    bool IsActive
);

public record SocialMediaRequest(string Platform, string Url, string? Icon, bool IsActive);

public record ContactInfoRequest(string Type, string Value);
