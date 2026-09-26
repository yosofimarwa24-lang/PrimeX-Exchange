// ===================================================
/* 🌟 UNIFIED CORE ENGINE - script.js برنچ نسرین (تکه اول) */
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

    // ۱. فعال‌سازی فوری و اجباری انیمیشن ورود تمام دیوهای صرافی 
    const scrollElements = document.querySelectorAll('.about-us-section, .exchange-rates-section, .pie-chart-section, .trust-section, .contact-section, .footer-cinema');
    scrollElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = "all 0.6s ease";
        }
    });

    // ۲. مدیریت منوی همبرگری موبایل 
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.innerText = navLinks.classList.contains("open") ? "✕" : "☰";
        });
    }

    // ۳. انیمیشن فوری شمارشگر صعودی اعداد کارت‌های مروه جان
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        if (!isNaN(target)) {
            let count = 0;
            const updateCount = () => {
                if (count < target) {
                    count += target / 80;
                    counter.innerText = count.toFixed(2);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toFixed(2);
                }
            };
            updateCount();
        }
    });

    // .منطق نوسان زنده قیمت کریپتو   
    setInterval(() => {
        const btcText = document.getElementById('btc-price');
        const ethText = document.getElementById('eth-price');
        if (btcText) {
            let btc = parseFloat(btcText.innerText.replace(/[\$,]/g, '')) || 64250;
            let change = (Math.random() * 40 - 20);
            btcText.innerText = "$" + (btc + change).toLocaleString('en-US', { minimumFractionDigits: 2 });
            btcText.className = change >= 0 ? "mb-0 price-up" : "mb-0 price-down";
        }
        if (ethText) {
            let eth = parseFloat(ethText.innerText.replace(/[\$,]/g, '')) || 3450;
            let changeEth = (Math.random() * 4 - 2);
            ethText.innerText = "$" + (changeEth + eth).toLocaleString('en-US', { minimumFractionDigits: 2 });
            ethText.className = changeEth >= 0 ? "mb-0 price-up" : "mb-0 price-down";
        }
    }, 2500);

    // ۵. مدیریت ارسال شبیه‌سازی شده فرم تماس  
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formMessage.innerText = "⏳ Sending your message securely...";
            formMessage.style.color = "#ff9f1c";
            
            setTimeout(() => {
                formMessage.innerText = "✓ Message sent successfully! We'll contact you soon.";
                formMessage.style.color = "#28a745";
                contactForm.reset();
            }, 2000);
        });
    }
    // ===================================================
    /* 🌟 پچ ۱۰۰٪ قطعی برای رندر کشویی و روان کالاپس‌ها بدون تداخل */
    // ===================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.style.cursor = 'pointer';

        question.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const currentBtn = e.currentTarget;
            // پیدا کردن لایه دقیق پاسخ زیر دکمه
            const answer = currentBtn.nextElementSibling;
            // پیدا کردن آیکون مثبت و منفی با کلاس جدید تگ‌ها
            const iconSpan = currentBtn.querySelector('.badge-icon') || currentBtn.querySelector('.text-warning');

            if (answer) {
                // چک کردن باز یا بسته بودن کشو با بررسی کلاس d-none
                if (answer.classList.contains('d-none')) {
                    
                    // بستن تمام کالاپس‌های باز دیگر برای انضباط کادر صرافی
                    document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('d-none'));
                    document.querySelectorAll('.faq-question .badge-icon, .faq-question .text-warning').forEach(span => {
                        if (span) span.innerText = "+";
                    });
                    document.querySelectorAll('.faq-question').forEach(btn => btn.style.backgroundColor = "");

                    // باز کردن کشوی کلیک شده با تغییر علامت به منهای زرد زعفرانی
                    answer.classList.remove('d-none');
                    currentBtn.style.backgroundColor = "rgba(255, 159, 28, 0.08)";
                    if (iconSpan) {
                        iconSpan.innerText = "−";
                    }
                    
                } else {
                    // بسته شدن کشو با کلیک مجدد
                    answer.classList.add('d-none');
                    currentBtn.style.backgroundColor = "";
                    if (iconSpan) {
                        iconSpan.innerText = "+";
                    }
                }
            }
        });
    });

    // --- ۶. محاسبات آنلاین ماشین‌حساب صرافی درون پنجره مودال پاپ‌آ‌پ مروه ---
    const amountInput = document.getElementById('convertAmount');
    const currencySelect = document.getElementById('targetCurrency');
    const resultDisplay = document.getElementById('calculationResult');

    if (amountInput && currencySelect && resultDisplay) {
        const calculateExchange = () => {
            const amount = parseFloat(amountInput.value) || 0;
            const rate = parseFloat(currencySelect.value) || 0;
            const total = amount * rate;
            resultDisplay.innerText = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " AFN";
        };
        amountInput.addEventListener('input', calculateExchange);
        currencySelect.addEventListener('change', calculateExchange);
    }
});
