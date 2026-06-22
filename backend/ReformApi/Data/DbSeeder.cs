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

        db.SaveChanges();
    }
}
