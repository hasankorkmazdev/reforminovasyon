namespace ReformApi.Models;

public class ContactInfo
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty; // phone, email, address, map_lat, map_lng, map_address
    public string Value { get; set; } = string.Empty;
}
