// ===================================================
/* 🌟 ULTIMATE CLEAN ENGINE - script.js (Part 1) 🌟 */
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ۱. انیمیشن افزایش پویای شمارشگر اعداد کارت‌ها ---
    const startCounterAnimation = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        if (!isNaN(target)) {
            const totalSteps = 100; 
            const increment = target / totalSteps;
            let count = 0;

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = count.toFixed(2);
                    requestAnimationFrame(updateCount); 
                } else {
                    counter.innerText = target.toFixed(2);
                }
            };
            requestAnimationFrame(updateCount);
        }
    };

    // --- ۲. موتور ظهور نرم، ثانیه‌دار و هم‌تراز سکشن‌ها هنگام اسکرول صفحه ---
    const cyberSections = document.querySelectorAll('.about-us-section, .exchange-rates-section, .pie-chart-section, .trust-section');
    
    cyberSections.forEach(sec => {
        if (sec) {
            sec.classList.add('scroll-rotate-effect');
        }
    });

    const checkScrollIntersection = () => {
        cyberSections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                sec.classList.add('cyber-active');
                
                if (sec.classList.contains('exchange-rates-section')) {
                    const counters = sec.querySelectorAll('.count-up');
                    counters.forEach(counter => {
                        if(counter.innerText === "0" || counter.innerText === "0.00" || counter.innerText === "") {
                            startCounterAnimation(counter);
                        }
                    });
                }
            }
        });
    };

    window.addEventListener('scroll', checkScrollIntersection, { passive: true });
    checkScrollIntersection(); // اجرای اولیه برای المان‌های داخل ویوپورت

    // --- ۳. محاسبات هوشمند آنلاین ماشین‌حساب صرافی مروه ---
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

    // --- ۴. مدیریت منوی همبرگری واکنش‌گرای زبیده در موبایل ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.innerText = navLinks.classList.contains("open") ? "✕" : "☰";
        });
    }
    // --- ۵. چرخش سه‌بعدی کارت‌های نرخ ارز با لمس دست در موبایل و کلیک ---
    const cardContainers = document.querySelectorAll('.flip-card-container');
    cardContainers.forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return; 
            }
            container.classList.toggle('flipped');
        });
    });

    // --- ۶. آکاردئون سؤالات متداول FAQ نسرین جان ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const span = question.querySelector('span');
            if (answer) {
                answer.classList.toggle('d-none');
                if (span) span.innerText = answer.classList.contains('d-none') ? "+" : "−";
            }
        });
    });

    // --- ۷. ماژول جابه‌جایی تم شب و روز لوکس و بدون تداخل ---
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.className = document.body.classList.contains("light-theme") ? "fas fa-sun" : "fas fa-moon";
            }
        });
    }

    // --- ۸. موتور جامع ترجمه آنی کل متون بدون به هم ریختن چیدمان هیرو منو ---
    const langEnBtn = document.querySelector(".lang-en");
    const langFaBtn = document.querySelector(".lang-fa");
    const langBtnText = document.getElementById("langDropdown");
    const heroSloganCircle = document.querySelector(".hero-slogan");

    const translations = {
        en: {
            brand: "Global Exchange", slogan: "Fast • Reliable",
            heroTitle: "Your Trusted<br><span>Currency Exchange</span> Partner",
            heroDesc: "We provide fast, secure and reliable currency exchange services for individuals and businesses.",
            sloganCircle: "<span>More</span><br><strong>Than Just</strong><br><span>Exchange</span><i></i>"
        },
        fa: {
            brand: "صرافی جهانی", slogan: "سریع • مطمئن",
            heroTitle: "شریک قابل اعتماد شما<br>در <span>تبادلات اسعاری</span>",
            heroDesc: "ما خدمات صرافی سریع، مطمئن و قابل اعتمادی را برای افراد و شرکت‌ها فراهم می‌کنیم تا تراکنش‌های شما آسان‌تر و امن‌تر شود.",
            sloganCircle: "<span>بیشتر</span><br><strong>از یک</strong><br><span>صرافی</span><i></i>"
        }
    };

    const changeLanguage = (lang) => {
        if (langBtnText) langBtnText.innerHTML = lang === "en" ? "🌐 EN" : "🌐 FA";
        document.body.style.direction = lang === "fa" ? "rtl" : "ltr";
        document.body.style.textAlign = lang === "fa" ? "right" : "left";

        if (heroSloganCircle) {
            if (lang === "fa") {
                heroSloganCircle.style.right = "auto";
                heroSloganCircle.style.left = "8%";
            } else {
                heroSloganCircle.style.left = "auto";
                heroSloganCircle.style.right = "8%";
            }
            heroSloganCircle.innerHTML = translations[lang].sloganCircle;
        }

        const brandText = document.querySelector(".brand-text strong");
        const sloganText = document.querySelector(".brand-text small");
        const heroTitle = document.querySelector(".hero-content h1");
        const heroDesc = document.querySelector(".hero-content .description");

        if (brandText) brandText.innerText = translations[lang].brand;
        if (sloganText) sloganText.innerText = translations[lang].slogan;
        if (heroTitle) heroTitle.innerHTML = translations[lang].heroTitle;
        if (heroDesc) heroDesc.innerText = translations[lang].heroDesc;
    };

    if (langEnBtn) langEnBtn.addEventListener("click", (e) => { e.preventDefault(); changeLanguage("en"); });
    if (langFaBtn) langFaBtn.addEventListener("click", (e) => { e.preventDefault(); changeLanguage("fa"); });
});

// === ۹. شبیه‌ساز زنده نوسانات نرخ ارزها روی کارت‌ها هر ۴ ثانیه ===
setInterval(() => {
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        let currentPrice = parseFloat(counter.innerText);
        if (!isNaN(currentPrice) && currentPrice > 0) {
            const fluctuation = (Math.random() * 0.08 - 0.04);
            let newPrice = currentPrice + fluctuation;
            counter.innerText = newPrice.toFixed(2);
        }
    });
}, 4000);
    // --- 🌟 پچ فیکس قطعی مروه لیدر: دگرگونی آنی رنگ‌های کل صفحه 🌟 ---
    const themeToggle = document.getElementById("themeToggle");
    
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            // اضافه و حذف کردن کلاس لایت‌تم روی تگ اصلی بدنه سایت
            document.body.classList.toggle("light-theme");
            
            // تغییر آنی آیکون ماه و خورشید
            const icon = themeToggle.querySelector("i");
            if (icon) {
                if (document.body.classList.contains("light-theme")) {
                    icon.className = "fas fa-sun text-warning";
                } else {
                    icon.className = "fas fa-moon";
                }
            }
        });
    }
