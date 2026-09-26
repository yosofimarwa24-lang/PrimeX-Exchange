<<<<<<< HEAD
<<<<<<< HEAD
// انیمیشن افزایش نرم و پویای نرخ ارزها از صفر تا مقدار واقعی
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.count-up');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const speed = 40; // سرعت افزایش اعداد
        const increment = target / speed;
        
        let count = 0;
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = count.toFixed(2);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toFixed(2);
            }
        };
        
        updateCount();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // === ۱. انیمیشن هوشمند اسکرول و شمارشگر اعداد ===
    const startCounterAnimation = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const totalSteps = 150; 
        const increment = target / totalSteps;
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = count.toFixed(2);
                setTimeout(updateCount, 25); 
            } else {
                counter.innerText = target.toFixed(2);
            }
        };
        updateCount();
    };

    // اجرای انیمیشن دقیقاً زمانی که کاربر به بخش نرخ ارز می‌رسد
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => startCounterAnimation(counter));
                observer.unobserve(entry.target); // پس از یک‌بار اجرا متوقف می‌شود
            }
        });
    }, observerOptions);

    const ratesSection = document.querySelector('.exchange-rates-section');
    if (ratesSection) {
        observer.observe(ratesSection);
    }

    // === ۲. شبیه‌ساز زنده نوسانات قیمت صرافی ===
    setInterval(() => {
        const counters = document.querySelectorAll('.count-up');
        counters.forEach(counter => {
            let currentPrice = parseFloat(counter.innerText);
            if (!isNaN(currentPrice) && currentPrice > 0) {
                // ایجاد یک نوسان تصادفی بسیار کوچک بین -0.05 تا +0.05
                const fluctuation = (Math.random() * 0.1 - 0.05);
                let newPrice = currentPrice + fluctuation;
                counter.innerText = newPrice.toFixed(2);

                // پیدا کردن کارت مادر برای تغییر رنگ نئونی بر اساس صعودی یا نزولی شدن
                const card = counter.closest('.flip-card-front');
                if (card) {
                    const badge = card.querySelector('.badge');
                    if (badge) {
                        if (fluctuation >= 0) {
                            badge.className = "badge bg-success-subtle text-success border border-success rounded-pill px-2 py-1 small";
                            badge.innerText = "+" + (Math.random() * 0.3).toFixed(2) + "%";
                        } else {
                            badge.className = "badge bg-danger-subtle text-danger border border-danger rounded-pill px-2 py-1 small";
                            badge.innerText = "-" + (Math.random() * 0.3).toFixed(2) + "%";
                        }
                    }
                }
            }
        });
    }, 4000); // هر ۴ ثانیه یک‌بار قیمت‌ها به صورت زنده تغییر می‌کنند
});
// === ۴. محاسبات ماشین‌حساب صرافی درون پنجره مودال ===
document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById('convertAmount');
    const currencySelect = document.getElementById('targetCurrency');
    const resultDisplay = document.getElementById('calculationResult');

    const calculateExchange = () => {
        const amount = parseFloat(amountInput.value) || 0;
        const rate = parseFloat(currencySelect.value) || 0;
        const total = amount * rate;
        
        // نمایش نتیجه با فرمت پولی منظم
        resultDisplay.innerText = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " AFN";
    };

    if (amountInput && currencySelect) {
        amountInput.addEventListener('input', calculateExchange);
        currencySelect.addEventListener('change', calculateExchange);
    }
});
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

=======
// === ۶. جاوااسکریپت اختصاصی برنچ تهمینه برای انیمیشن ورود و اسکرول نرم ===
document.addEventListener("DOMContentLoaded", () => {
    const trustElements = document.querySelectorAll('.trust-section, .services-section');
    
    // متصل کردن انیمیشن ورود نرم به سکشن‌های تهمینه
    trustElements.forEach(el => {
        if(typeof el.classList.add === 'function') {
            el.classList.add('reveal-on-scroll');
        }
    });

    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                trustObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    trustElements.forEach(el => {
        if(typeof trustObserver.observe === 'function') {
            trustObserver.observe(el);
        }
    });
});
// === ۷. شبیه‌ساز زنده نوسانات کادرهای نمودار متحرک تهمینه ===
setInterval(() => {
    const bars = document.querySelectorAll('.chart-bar');
    const rateBadge = document.querySelector('.item-rate-badge');
    
    bars.forEach(bar => {
        // تولید رندوم ارتفاع ستون‌های نمودار بین ۲۰ تا ۱۰۰ درصد
        const randomHeight = Math.floor(Math.random() * 80) + 20;
        bar.style.height = randomHeight + '%';
    });

    if (rateBadge) {
        const randomRate = (Math.random() * 0.5).toFixed(2);
        rateBadge.innerText = "+" + randomRate + "%";
    }
}, 2000);
>>>>>>> tahmina
=======
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
>>>>>>> nasrin
