using Microsoft.EntityFrameworkCore;
using ReformApi.Models;

namespace ReformApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CategoryGroup> CategoryGroups => Set<CategoryGroup>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Application> Applications => Set<Application>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Slide> Slides => Set<Slide>();
    public DbSet<SocialMedia> SocialMedias => Set<SocialMedia>();
    public DbSet<ContactInfo> ContactInfos => Set<ContactInfo>();
    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CategoryGroup>(e =>
        {
            e.ToTable("category_groups");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasColumnName("name");
            e.Property(x => x.SortOrder).HasColumnName("sort_order");
            e.HasIndex(x => x.Name).IsUnique();
        });

        modelBuilder.Entity<Category>(e =>
        {
            e.ToTable("categories");
            e.HasKey(x => x.Id);
            e.Property(x => x.GroupId).HasColumnName("group_id");
            e.Property(x => x.Name).IsRequired().HasColumnName("name");
            e.Property(x => x.SortOrder).HasColumnName("sort_order");
            e.HasOne(x => x.Group)
                .WithMany(g => g.Categories)
                .HasForeignKey(x => x.GroupId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Application>(e =>
        {
            e.ToTable("applications");
            e.HasKey(x => x.Id);
            e.Property(x => x.CategoryId).HasColumnName("category_id");
            e.Property(x => x.CompanyName).IsRequired().HasColumnName("company_name");
            e.Property(x => x.ContactPerson).IsRequired().HasColumnName("contact_person");
            e.Property(x => x.Email).IsRequired().HasColumnName("email");
            e.Property(x => x.Phone).IsRequired().HasColumnName("phone");
            e.Property(x => x.Description).HasColumnName("description");
            e.Property(x => x.Status).HasDefaultValue("Yeni").HasColumnName("status");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("NOW()").HasColumnName("created_at");
            e.HasOne(x => x.Category)
                .WithMany(c => c.Applications)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<User>(e =>
        {
            e.ToTable("users");
            e.HasKey(x => x.Id);
            e.Property(x => x.Username).IsRequired().HasColumnName("username");
            e.Property(x => x.PasswordHash).IsRequired().HasColumnName("password_hash");
            e.HasIndex(x => x.Username).IsUnique();
        });

        modelBuilder.Entity<Slide>(e =>
        {
            e.ToTable("slides");
            e.HasKey(x => x.Id);
            e.Property(x => x.ImageUrl).IsRequired().HasColumnName("image_url");
            e.Property(x => x.Title).HasColumnName("title");
            e.Property(x => x.Subtitle).HasColumnName("subtitle");
            e.Property(x => x.Description).HasColumnName("description");
            e.Property(x => x.LinkUrl).HasColumnName("link_url");
            e.Property(x => x.LinkText).HasColumnName("link_text");
            e.Property(x => x.SortOrder).HasColumnName("sort_order");
            e.Property(x => x.IsActive).HasColumnName("is_active");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("NOW()").HasColumnName("created_at");
        });

        modelBuilder.Entity<SocialMedia>(e =>
        {
            e.ToTable("social_media");
            e.HasKey(x => x.Id);
            e.Property(x => x.Platform).IsRequired().HasColumnName("platform");
            e.Property(x => x.Url).IsRequired().HasColumnName("url");
            e.Property(x => x.Icon).HasColumnName("icon");
            e.Property(x => x.IsActive).HasColumnName("is_active");
        });

        modelBuilder.Entity<ContactInfo>(e =>
        {
            e.ToTable("contact_info");
            e.HasKey(x => x.Id);
            e.Property(x => x.Type).IsRequired().HasColumnName("type");
            e.Property(x => x.Value).IsRequired().HasColumnName("value");
        });

        modelBuilder.Entity<Project>(e =>
        {
            e.ToTable("projects");
            e.HasKey(x => x.Id);
            e.Property(x => x.ImageUrl).IsRequired().HasColumnName("image_url");
            e.Property(x => x.Title).IsRequired().HasColumnName("title");
            e.Property(x => x.Description).HasColumnName("description");
            e.Property(x => x.SortOrder).HasColumnName("sort_order");
            e.Property(x => x.IsActive).HasColumnName("is_active");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("NOW()").HasColumnName("created_at");
        });
    }
}
