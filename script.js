// === ۱۰. جاوااسکریپت اختصاصی برنچ نسرین برای مدیریت کلیک‌های آکاردئون FAQ ===
document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const span = question.querySelector('span');
            
            // باز و بسته کردن لایه‌ی پاسخ به صورت انیمیشنی مینی‌مال
            if (answer.classList.contains('d-none')) {
                answer.classList.remove('d-none');
                span.innerText = "−";
                span.style.color = "#ff9f1c";
                question.style.backgroundColor = "rgba(255, 159, 28, 0.05)";
            } else {
                answer.classList.add('d-none');
                span.innerText = "+";
                span.style.color = "";
                question.style.backgroundColor = "";
            }
        });
    });

    // مدیریت ارسال شبیه‌سازی شده فرم تماس نسرین
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
});
document.addEventListener("DOMContentLoaded", () => {
    // ۱. فعال‌سازی فوری و اجباری انیمیشن ورود تمام دیوهای صرافی مروه
    const scrollElements = document.querySelectorAll('.about-us-section, .exchange-rates-section, .pie-chart-section, .trust-section, .contact-section, .footer-cinema');
    scrollElements.forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "all 0.6s ease";
    });

    // ۲. مدیریت منوی همبرگری موبایل زبیده
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.innerText = navLinks.classList.contains("open") ? "✕" : "☰";
        });
    }

    // ۳. انیمیشن فوری شمارشگر صعودی اعداد کارت‌ها
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

    // ۴. منطق نوسان زنده قیمت کریپتو تهمینه و مروه
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
            ethText.innerText = "$" + (eth + changeEth).toLocaleString('en-US', { minimumFractionDigits: 2 });
            ethText.className = changeEth >= 0 ? "mb-0 price-up" : "mb-0 price-down";
        }
    }, 2500);

    // ۵. فعال‌سازی باز و بسته شدن ۵ کالاپس کشویی نسرین جان
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const span = question.querySelector('span');
            if (answer) {
                answer.classList.toggle('d-none');
                span.innerText = answer.classList.contains('d-none') ? "+" : "−";
                question.style.backgroundColor = answer.classList.contains('d-none') ? "" : "rgba(255,159,28,0.08)";
            }
        });
    });
});
