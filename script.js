// ===================================================
/* 🌟 ULTIMATE CLEAN ENGINE - script.js (FIXED) 🌟 */
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ۱. ماژول اختصاصی ذخیره‌ساز هوشمند و جابه‌جایی تم شب و روز صرافی ---
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const icon = themeToggle.querySelector("i");
        
        // بررسی وضعیت تم ذخیره شده در رفرش‌های قبلی صفحه (تم سایبرپانک تیره پیش‌فرض است)
        const savedTheme = localStorage.getItem("theme");
        
        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
            if (icon) icon.className = "fas fa-sun";
            themeToggle.style.color = "#ff9f1c"; // رنگ زعفرانی صرافی برای خورشید
        } else {
            document.body.classList.remove("light-theme");
            if (icon) icon.className = "fas fa-moon";
            themeToggle.style.color = ""; // رنگ سفید پیش‌فرض ماه
        }

        // عملکرد سوئیچ با کلیک روی دکمه
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            
            if (document.body.classList.contains("light-theme")) {
                if (icon) icon.className = "fas fa-sun";
                themeToggle.style.color = "#ff9f1c";
                localStorage.setItem("theme", "light"); // ذخیره حالت روز
            } else {
                if (icon) icon.className = "fas fa-moon";
                themeToggle.style.color = "";
                localStorage.setItem("theme", "dark"); // ذخیره حالت شب
            }
        });
    }

    // --- ۲. انیمیشن افزایش پویای شمارشگر اعداد کارت‌ها ---
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

    // --- ۳. موتور ظهور نرم، ثانیه‌دار و هم‌تراز سکشن‌ها هنگام اسکرول صفحه ---
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

    // --- ۴. محاسبات هوشمند آنلاین ماشین‌حساب صرافی مروه ---
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

    // --- ۵. مدیریت منوی همبرگری واکنش‌گرای زبیده در موبایل ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.innerText = navLinks.classList.contains("open") ? "✕" : "☰";
        });
    }

    // --- ۶. چرخش سه‌بعدی کارت‌های نرخ ارز با لمس دست در موبایل و کلیک ---
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

// ===================================================
/* 🌟 ULTIMATE CLEAN ENGINE - script.js (COMPLETE ENGINE) 🌟 */
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ۱. ماژول اختصاصی ذخیره‌ساز هوشمند و جابه‌جایی تم شب و روز صرافی ---
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const icon = themeToggle.querySelector("i");
        const savedTheme = localStorage.getItem("theme");
        
        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
            if (icon) icon.className = "fas fa-sun";
            themeToggle.style.color = "#ff9f1c";
        } else {
            document.body.classList.remove("light-theme");
            if (icon) icon.className = "fas fa-moon";
            themeToggle.style.color = ""; 
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            if (document.body.classList.contains("light-theme")) {
                if (icon) icon.className = "fas fa-sun";
                themeToggle.style.color = "#ff9f1c";
                localStorage.setItem("theme", "light");
            } else {
                if (icon) icon.className = "fas fa-moon";
                themeToggle.style.color = "";
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // --- ۲. انیمیشن افزایش پویای شمارشگر اعداد کارت‌ها ---
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

    // --- ۳. موتور ظهور نرم و هم‌تراز سکشن‌ها هنگام اسکرول صفحه ---
    const cyberSections = document.querySelectorAll('.about-us-section, .exchange-rates-section, .pie-chart-section, .trust-section');
    cyberSections.forEach(sec => { if (sec) sec.classList.add('scroll-rotate-effect'); });

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
    checkScrollIntersection();

    // --- ۴. محاسبات هوشمند آنلاین ماشین‌حساب صرافی مروه ---
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

    // --- ۵. مدیریت منوی همبرگری زبیده در موبایل ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.innerText = navLinks.classList.contains("open") ? "✕" : "☰";
        });
    }

    // --- ۶. چرخش سه‌بعدی کارت‌های نرخ ارز با لمس دست و کلیک ---
    const cardContainers = document.querySelectorAll('.flip-card-container');
    cardContainers.forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return; 
            container.classList.toggle('flipped');
        });
    });
    const changeLanguage = (lang) => {
        if (langBtnText) langBtnText.innerHTML = lang === "en" ? "🌐 EN" : "🌐 FA";
        document.body.style.direction = lang === "fa" ? "rtl" : "ltr";
        document.body.style.textAlign = lang === "fa" ? "right" : "left";

        if (heroSloganCircle) {
            if (lang === "fa") {
                heroSloganCircle.style.right = "auto"; heroSloganCircle.style.left = "8%";
            } else {
                heroSloganCircle.style.left = "auto"; heroSloganCircle.style.right = "8%";
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

    // --- ۱۰. موتور پیشرفته اسکرول سه‌بعدی چسبنده و شناور هوشمند ---
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector(".hero-content");
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.25}px) rotateX(${scrolled * 0.01}deg)`;
            heroContent.style.opacity = `${1 - scrolled / 700}`;
        }
        const sloganBadge = document.querySelector(".hero-slogan");
        if (sloganBadge) {
            sloganBadge.style.transform = `translateY(${scrolled * 0.65}px) rotate(${scrolled * 0.1}deg)`;
        }
    }, { passive: true });

    // --- ۹. پچ اختصاصی تایمرهای هوشمند نوسان قیمت صرافی مروه جان ---
    const updateFluctuation = (counter) => {
        let currentPrice = parseFloat(counter.innerText);
        if (!isNaN(currentPrice) && currentPrice > 0) {
            const fluctuation = (Math.random() * 0.06 - 0.03); // نوسان ملایم
            let newPrice = currentPrice + fluctuation;
            counter.innerText = newPrice.toFixed(2);
            
            // افکت نوری لحظه‌ای در زمان تغییر قیمت
            counter.style.color = fluctuation > 0 ? "#00f5d4" : "#ff9f1c";
            setTimeout(() => { counter.style.color = ""; }, 500);
        }
    };

    // تایمر کوتاه (۲ ثانیه) برای ارزهای اصلی پر تراکنش مثل دلار و یورو
    setInterval(() => {
        const mainRates = document.querySelectorAll('.count-up.rate-fast');
        mainRates.forEach(counter => updateFluctuation(counter));
    }, 2000);

    // تایمر طولانی (۵ ثانیه) برای بقیه ارزهای فرعی
    setInterval(() => {
        const normalRates = document.querySelectorAll('.count-up.rate-slow');
        normalRates.forEach(counter => updateFluctuation(counter));
    }, 5000);
});
// === ۱۱. موتور پویای نوسان زنده ستون‌های نمودار لکوییدیتی بخش Trust ===
setInterval(() => {
    const chartBars = document.querySelectorAll('.live-chart-graphics .chart-bar');
    chartBars.forEach(bar => {
        // ایجاد یک ارتفاع تصادفی بین ۲5% تا ۹۵% برای حرکت طبیعی ستون‌ها
        const randomHeight = Math.floor(Math.random() * (95 - 25 + 1)) + 25;
        bar.style.height = randomHeight + '%';
    });
}, 800); // هر ۰.۸ ثانیه ستون‌ها بالا و پایین می‌روند
    // --- ۹. موتور هوشمند نوسان زنده و چشمک‌زن آنی قیمت‌های صرافی مروه جان ---
    const updateFluctuation = (counter) => {
        let currentPrice = parseFloat(counter.innerText);
        if (!isNaN(currentPrice) && currentPrice > 0) {
            const fluctuation = (Math.random() * 0.06 - 0.03); // تولید عدد نوسان تصادفی
            let newPrice = currentPrice + fluctuation;
            counter.innerText = newPrice.toFixed(2);
            
            // 🌟 پچ فیکس چشمک‌زن (Blink): افکت نوری آنی زمان تغییر عدد 🌟
            if (fluctuation > 0) {
                counter.classList.add('price-up-blink');
                setTimeout(() => { counter.classList.remove('price-up-blink'); }, 600);
            } else {
                counter.classList.add('price-down-blink');
                setTimeout(() => { counter.classList.remove('price-down-blink'); }, 600);
            }
        }
    };

    // تایمر کوتاه (۲ ثانیه) برای ارزهای اصلی پر تراکنش مثل دلار و یورو
    setInterval(() => {
        const mainRates = document.querySelectorAll('.count-up.rate-fast');
        mainRates.forEach(counter => updateFluctuation(counter));
    }, 2000);

    // تایمر طولانی (۵ ثانیه) برای بقیه ارزهای فرعی مثل پوند
    setInterval(() => {
        const normalRates = document.querySelectorAll('.count-up.rate-slow');
        normalRates.forEach(counter => updateFluctuation(counter));
    }, 5000);
// === ۱۲. موتور ذرات نئونی متحرک (نقطه‌های بزرگ و واضح) و تایپ خودکار صرافی   ===
document.addEventListener("DOMContentLoaded", () => {
    // الف) افکت تایپ خودکار متن هیرو
    const heroDesc = document.querySelector(".hero-content .description");
    if (heroDesc) {
        const originalText = heroDesc.innerText;
        heroDesc.innerText = "";
        let index = 0;
        
        const typeWriter = () => {
            if (index < originalText.length) {
                heroDesc.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 25);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // ب) ساخت ساختار ذرات شناور بزرگتر در پس‌زمینه سایت
    const createParticles = () => {
        const particleContainer = document.createElement("div");
        particleContainer.className = "cyber-particles-bg";
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 35; i++) { // تعداد متناسب برای بازدهی عالی و عدم شلوغی صفحه
            const particle = document.createElement("span");
            
            // 🌟 بزرگتر کردن اندازه نقطه‌ها (بین ۵ تا ۱۰ پیکسل) 🌟
            const randomSize = Math.random() * 5 + 5; 
            particle.style.width = randomSize + "px";
            particle.style.height = randomSize + "px";
            
            particle.style.left = Math.random() * 100 + "vw";
            particle.style.top = Math.random() * 100 + "vh";
            
            // رنگ‌بندی تصادفی بر اساس پالت فیروزه‌ای و طلایی شما
            particle.style.background = Math.random() > 0.5 ? "#00f5d4" : "#ff9f1c";
            particle.style.animationDuration = (Math.random() * 12 + 10) + "s"; // کمی آرام‌تر برای حرکت رویایی‌تر
            particle.style.animationDelay = (Math.random() * 6) + "s";
            
            particleContainer.appendChild(particle);
        }
    };
    createParticles();
});
// === ۱۲. موتور فوق پیشرفته و مستقل حباب‌های شیشه‌ای گرد صرافی مروه جان ===

// الف) افکت تایپ خودکار متن هیرو
setTimeout(() => {
    const heroDesc = document.querySelector(".hero-content .description");
    if (heroDesc) {
        const originalText = heroDesc.innerText;
        heroDesc.innerText = "";
        let index = 0;
        const typeWriter = () => {
            if (index < originalText.length) {
                heroDesc.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 25);
            }
        };
        typeWriter();
    }
}, 1000);

// ب) موتور اصلی و کاملاً مستقل ساخت حباب‌های شیشه‌ای بزرگ
(function() {
    function initBubbles() {
        // حذف کانتینر قدیمی برای جلوگیری از تداخل
        const oldBg = document.querySelector(".cyber-bubbles-bg");
        if (oldBg) oldBg.remove();

        const bubbleContainer = document.createElement("div");
        bubbleContainer.className = "cyber-bubbles-bg";
        document.body.appendChild(bubbleContainer);

        // تولید ۴۰ عدد حباب گرد شیشه‌ای کاملاً واضح
        for (let i = 0; i < 40; i++) {
            const bubble = document.createElement("span");
            
            // بزرگتر کردن ابعاد حباب‌ها برای وضوح عالی (بین ۱۲ تا ۲۴ پیکسل)
            const randomSize = Math.floor(Math.random() * 12) + 12; 
            bubble.style.width = randomSize + "px";
            bubble.style.height = randomSize + "px";
            
            // پخش متوازن در تمام صفحه
            bubble.style.left = (Math.random() * 98) + "vw";
            bubble.style.top = (Math.random() * 95) + "vh";
            
            // تنظیم رنگ‌های اصلی نئونی صرافی شما
            const isCyan = Math.random() > 0.5;
            bubble.style.borderColor = isCyan ? "#00f5d4" : "#ff9f1c";
            bubble.style.color = isCyan ? "#00f5d4" : "#ff9f1c";
            
            // زمان‌بندی انیمیشن صعود رویایی
            bubble.style.animationDuration = (Math.random() * 8 + 8) + "s";
            bubble.style.animationDelay = (Math.random() * 6) + "s";
            
            bubbleContainer.appendChild(bubble);
        }
    }

    // اجرای فوری موتور حباب‌ها
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initBubbles();
    } else {
        document.addEventListener("DOMContentLoaded", initBubbles);
    }
})();
   