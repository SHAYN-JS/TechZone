// js/theme.js - Sayt rang rejimini (Dark/Light) boshqarish
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Helper to set icon
    function updateThemeIcon(isDark) {
        if (!themeIcon) return;
        // Reset classes first but keep base class if needed (usually fas)
        themeIcon.className = 'fas';

        if (isDark) {
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.add('fa-moon');
        }
    }

    // Sahifa yuklanganda saqlangan holatni (dark mode) tekshirish
    if (localStorage.getItem('dark-mode') === 'active') {
        body.classList.add('dark-mode');
        // Ikonka holati (aylanishi) - quyosh/oy animatsiyasi simulyatsiyasi
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    // Tugma bosilganda rejimni o'zgartirish
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isActive = body.classList.contains('dark-mode');

            updateThemeIcon(isActive);

            // Yangi holatni browser xotirasida saqlash
            localStorage.setItem('dark-mode', isActive ? 'active' : 'inactive');

            // Premium toast (optional, if main.js is loaded)
            if (typeof showPremiumToast === 'function') {
                showPremiumToast(isActive ? "Tun rejimi yoqildi" : "Kun rejimi yoqildi", "success");
            }
        });
    }
});