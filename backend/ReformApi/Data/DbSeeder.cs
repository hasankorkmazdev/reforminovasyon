using ReformApi.Models;

namespace ReformApi.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.CategoryGroups.Any()) return;

        var adminUser = new User
        {
            Username = "admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123")
        };
        db.Users.Add(adminUser);

        var groups = new (string Name, int Sort, string[] Categories)[]
        {
            ("Kaba İnşaat", 1, ["Demir İşleri", "Beton ve Kalıp İşleri", "Duvar ve Tuğla İşleri", "Çatı Sistemleri", "Temel ve Kazı İşleri"]),
            ("İç Mekan", 2, ["Kapı ve Pencere Doğrama", "Alçıpan ve Bölme Duvar", "Boya ve Alçı İşleri", "Parke ve Zemin Kaplama", "Merdiven ve Korkuluk"]),
            ("Islak Hacim", 3, ["Seramik ve Fayans", "Mermer ve Granit İşleri", "Sıhhi Tesisat", "Havuz ve Sauna Sistemleri", "Su Yalıtımı"]),
            ("Elektrik & Mekanik", 4, ["Elektrik Tesisatı", "Aydınlatma Sistemleri", "HVAC (Isıtma/Soğutma)", "Asansör Sistemleri", "Yangın ve Güvenlik Sistemleri", "Jeneratör ve Enerji Altyapısı"]),
            ("Dış Cephe", 5, ["Dış Cephe Kaplama", "Cam ve Giydirme Cephe", "İskele ve Dış Cephe Boya", "Çevre Düzenleme ve Peyzaj", "Teras ve Balkon Sistemleri"]),
            ("Mobilya & Dekorasyon", 6, ["Mutfak Dolapları", "Gömme Dolaplar", "Beyaz Eşya Entegrasyonu", "Perde ve Stor Sistemleri", "Ofis ve Çalışma Alanı Mobilyaları"]),
            ("Danışmanlık", 7, ["Proje Yönetimi", "Mimari Danışmanlık", "Statik Proje", "Maliyet ve Keşif", "Ruhsat ve İmar Danışmanlığı"])
        };

        foreach (var (name, sort, categories) in groups)
        {
            var group = new CategoryGroup { Name = name, SortOrder = sort };
            db.CategoryGroups.Add(group);
            db.SaveChanges();

            for (int i = 0; i < categories.Length; i++)
            {
                db.Categories.Add(new Category
                {
                    GroupId = group.Id,
                    Name = categories[i],
                    SortOrder = i + 1
                });
            }
        }

        var projects = new Project[]
        {
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
                Title = "RefGreen — Ekolojik & Sürdürülebilir Proje",
                Description = "Çevre dostu malzemeler ve yeşil enerji sistemleriyle tasarlanmış ekolojik yaşam alanı. Sıfır karbon ayak izi hedefiyle inşa edildi.",
                Color = "#28A745",
                SortOrder = 1,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
                Title = "RefBlue — Rezidans & Akıllı Ev Projesi",
                Description = "Akıllı ev teknolojileriyle donatılmış, şehir merkezinde 35 katlı lüks rezidans. Tam donanımlı yaşam alanları.",
                Color = "#0F52BA",
                SortOrder = 2,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
                Title = "RefRed — Ticari & Karma Yaşam Projesi",
                Description = "10.000 m² kapalı alana sahip yüksek teknoloji ticaret ve yaşam merkezi. Ofis, alışveriş ve konut bir arada.",
                Color = "#DC3545",
                SortOrder = 3,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
                Title = "RefBrown — Konsept Proje",
                Description = "Doğayla iç içe, özel havuzlu 5 adet lüks vila. Ahşap ve doğal taş dokularıyla özgün mimari tasarım.",
                Color = "#8B4513",
                SortOrder = 4,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
                Title = "RefWhite — Premium Konut Projesi",
                Description = "Modern beyaz mimarinin zarif çizgileriyle tasarlanmış 250 dairelik premium konut projesi. Ferah ve aydınlık yaşam alanları.",
                Color = "#F5F5F5",
                SortOrder = 5,
                IsActive = true
            }
        };
        db.Projects.AddRange(projects);

        db.SaveChanges();
    }
}
