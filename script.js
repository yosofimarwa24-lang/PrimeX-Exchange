document.addEventListener("DOMContentLoaded", () => {
    // === ۱. مدیریت منوی همبرگری در موبایل ===
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            // باز و بسته کردن منو با کلاس تعاملی open
            navLinks.classList.toggle("open");
            
            // تغییر آیکون منو بین حالت همبرگری (☰) و ضربدر (✕)
            if (navLinks.classList.contains("open")) {
                menuBtn.innerText = "✕";
                menuBtn.style.color = "#ff9f1c"; // تغییر رنگ آیکون به زرد زعفرانی صرافی
            } else {
                menuBtn.innerText = "☰";
                menuBtn.style.color = "#ffffff";
            }
        });
    }

    // === ۲. اسکرول نرم دکمه‌ها به بخش‌های مربوطه ===
    const viewRatesBtn = document.querySelector('.btn.outline[href="#rates"]');
    if (viewRatesBtn) {
        viewRatesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('.exchange-rates-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
