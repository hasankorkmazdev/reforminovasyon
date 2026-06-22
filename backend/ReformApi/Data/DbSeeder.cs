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
                Title = "Karma Konut Projesi",
                Description = "Modern mimari anlayışıyla tasarlanmış 450 dairelik premium konut projesi. Tamamlanma: 2025.",
                SortOrder = 1,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
                Title = "Ticari Ofis Kulesi",
                Description = "Şehir merkezinde 35 katlı çevre dostu ofis binası. LEED Platinum sertifikalı.",
                SortOrder = 2,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
                Title = "Endüstriyel Tesis",
                Description = "10.000 m² kapalı alana sahip yüksek teknoloji üretim tesisi. Altyapı ve çelik konstrüksiyon dahil.",
                SortOrder = 3,
                IsActive = true
            },
            new()
            {
                ImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
                Title = "Lüks Vila Projesi",
                Description = "Doğayla iç içe, özel havuzlu 5 adet lüks vila. Akıllı ev sistemleri ve özel peyzaj tasarımı.",
                SortOrder = 4,
                IsActive = true
            }
        };
        db.Projects.AddRange(projects);

        db.SaveChanges();
    }
}
