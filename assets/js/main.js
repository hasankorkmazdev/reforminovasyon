document.addEventListener('DOMContentLoaded', () => {
    // DOM Elementleri
    const preloader = document.getElementById('preloader');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const menuLinks = document.querySelectorAll('.nav-link-item, .dropdown-item');

    let currentIdx = 0;
    let autoPlayInterval;
    let isTransitioning = false;

    // Yüklenme Durumu (Preloader)
    window.addEventListener('load', () => {
        // En az 1 saniye preloader'ın gösterilmesi için yapay bekleme
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }
            // Sayfa yüklendikten sonra slider'ı başlat
            startAutoPlay();
        }, 1200);
    });

    // Aktif Sayfa / Slayt Rengini Çekme Mantığı
    const getActivePageColor = () => {
        const path = window.location.pathname;
        if (path.includes('refbrown')) return '#8B4513';
        if (path.includes('refblue')) return '#0F52BA';
        if (path.includes('refred')) return '#DC3545';
        if (path.includes('refgreen')) return '#28A745';

        // Anasayfa veya diğer sayfalarda aktif slider slaytının rengi
        if (slides.length > 0 && slides[currentIdx]) {
            return slides[currentIdx].getAttribute('data-color') || '#FF6B6B';
        }
        return '#FF6B6B'; // Varsayılan kurumsal renk
    };

    // Slayt Değiştirme Fonksiyonu
    const showSlide = (index) => {
        if (isTransitioning || slides.length === 0) return;
        isTransitioning = true;

        // Eski slayttan aktif sınıfını al
        slides[currentIdx].classList.remove('active');

        // Yeni dizini belirle
        currentIdx = (index + slides.length) % slides.length;

        const nextSlide = slides[currentIdx];
        nextSlide.classList.add('active');

        // Renk kodlarını al
        const targetColor = nextSlide.getAttribute('data-color');

        // CSS Değişkenlerini Güncelle (Arka Plan ve Sayfa Teması Rengi)
        document.documentElement.style.setProperty('--bg-color', targetColor);
        document.documentElement.style.setProperty('--theme-color', targetColor);

        // Geçiş süresi bitince kilit kaldırılır
        setTimeout(() => {
            isTransitioning = false;
        }, 1200);
    };

    let isAutoplayPaused = false;

    // Otomatik Slayt Döngüsü (Auto Play)
    const startAutoPlay = () => {
        if (slides.length === 0 || autoPlayInterval || isAutoplayPaused) return;
        autoPlayInterval = setInterval(() => {
            showSlide(currentIdx + 1);
        }, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Kontrol Butonları Dinleyicileri
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIdx + 1);
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentIdx - 1);
            resetAutoPlay();
        });
    }

    // Oynat/Durdur Buton Dinleyicisi
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        const playIcon = playPauseBtn.querySelector('.play-icon');

        playPauseBtn.addEventListener('click', () => {
            if (isAutoplayPaused) {
                // Oynat
                isAutoplayPaused = false;
                startAutoPlay();
                if (pauseIcon && playIcon) {
                    pauseIcon.classList.remove('d-none');
                    playIcon.classList.add('d-none');
                }
                playPauseBtn.setAttribute('aria-label', 'Slayt Gösterisini Durdur');
            } else {
                // Durdur
                isAutoplayPaused = true;
                stopAutoPlay();
                if (pauseIcon && playIcon) {
                    pauseIcon.classList.add('d-none');
                    playIcon.classList.remove('d-none');
                }
                playPauseBtn.setAttribute('aria-label', 'Slayt Gösterisini Başlat');
            }
        });
    }

    // Menü Linkleri Hover Etkileşimi
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const hoverColor = link.getAttribute('data-color');
            if (hoverColor) {
                document.documentElement.style.setProperty('--theme-color', hoverColor);
            }
        });

        link.addEventListener('mouseleave', () => {
            const activeColor = getActivePageColor();
            document.documentElement.style.setProperty('--theme-color', activeColor);
        });
    });

    // İlk Slayt Kurulumu
    if (slides.length > 0) {
        const initialColor = slides[0].getAttribute('data-color');
        document.documentElement.style.setProperty('--bg-color', initialColor);
        document.documentElement.style.setProperty('--theme-color', initialColor);
    } else {
        // Eğer slaytlar yoksa (about veya contact sayfasıysa), sayfanın kurumsal rengini ata
        const defaultColor = getActivePageColor();
        document.documentElement.style.setProperty('--bg-color', '#0d0d0d');
        document.documentElement.style.setProperty('--theme-color', defaultColor);
    }
});
