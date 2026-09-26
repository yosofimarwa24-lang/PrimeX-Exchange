// === ۱. مدیریت رویدادهای پس از بارگذاری کامل ساختار سند (DOM) ===
document.addEventListener("DOMContentLoaded", () => {
    
    // --- الف) انیمیشن هوشمند افزایش پویای نرخ ارزها از صفر تا مقدار واقعی (Marwa) ---
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
                    setTimeout(updateCount, 20); 
                } else {
                    counter.innerText = target.toFixed(2);
                }
            };
            updateCount();
        }
    };

    // اجرای انیمیشن دقیقاً زمانی که کاربر به بخش نرخ ارز می‌رسد
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => startCounterAnimation(counter));
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const ratesSection = document.querySelector('.exchange-rates-section');
    if (ratesSection) {
        observer.observe(ratesSection);
    }

    // --- ب) محاسبات ماشین‌حساب صرافی درون پنجره مودال پاپ‌آپ (Marwa) ---
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

    // --- ج) مدیریت منوی همبرگری در نسخه موبایل (Zobaideh) ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            if (navLinks.classList.contains("open")) {
                menuBtn.innerText = "✕";
                menuBtn.style.color = "#ff9f1c"; 
            } else {
                menuBtn.innerText = "☰";
                menuBtn.style.color = "#ffffff";
            }
        });
    }

    // --- د) اسکرول نرم دکمه مشاهده نرخ‌ها به بخش مربوطه (Zobaideh) ---
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

    // --- ه) انیمیشن ورود نرم و هماهنگ سکشن‌ها با اسکرول (Tahmina) ---
    const trustElements = document.querySelectorAll('.trust-section, .services-section');
    trustElements.forEach(el => {
        if (el && el.classList) {
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
        if (trustObserver && el) {
            trustObserver.observe(el);
        }
    });

    // --- و) مدیریت کلیک‌های کشویی آکاردئون سؤالات متداول FAQ (Nasrin) ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const span = question.querySelector('span');
            
            if (answer && answer.classList) {
                if (answer.classList.contains('d-none')) {
                    answer.classList.remove('d-none');
                    if (span) {
                        span.innerText = "−";
                        span.style.color = "#ff9f1c";
                    }
                    question.style.backgroundColor = "rgba(255, 159, 28, 0.05)";
                } else {
                    answer.classList.add('d-none');
                    if (span) {
                        span.innerText = "+";
                        span.style.color = "";
                    }
                    question.style.backgroundColor = "";
                }
            }
        });
    });
});

// === ۲. شبیه‌سازهای زمانی زنده صرافی (اجرا به صورت پس‌زمینه) ===

// --- الف) شبیه‌ساز زنده نوسانات نرخ ارزها روی کارت‌ها هر ۴ ثانیه (Marwa) ---
setInterval(() => {
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        let currentPrice = parseFloat(counter.innerText);
        if (!isNaN(currentPrice) && currentPrice > 0) {
            const fluctuation = (Math.random() * 0.1 - 0.05);
            let newPrice = currentPrice + fluctuation;
            counter.innerText = newPrice.toFixed(2);

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
}, 4000);

// --- ب) شبیه‌ساز زنده نوسانات کادرهای نمودار متحرک هر ۲ ثانیه (Tahmina) ---
setInterval(() => {
    const bars = document.querySelectorAll('.chart-bar');
    const rateBadge = document.querySelector('.item-rate-badge');
    
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 80) + 20;
        bar.style.height = randomHeight + '%';
    });

    if (rateBadge) {
        const randomRate = (Math.random() * 0.5).toFixed(2);
        rateBadge.innerText = "+" + randomRate + "%";
    }
}, 2000);
// === ۱۱. قابلیت چرخش کارت‌های نرخ ارز با کلیک و لمس دست در موبایل (Marwa Unique Click Flip) ===
document.addEventListener("DOMContentLoaded", () => {
    const cardContainers = document.querySelectorAll('.flip-card-container');

    cardContainers.forEach(container => {
        // تغییر نشانگر ماوس به دست برای راهنمایی کاربر
        container.style.cursor = 'pointer';

        container.addEventListener('click', (e) => {
            // اگر کاربر روی دکمه تبدیل داخل کارت کلیک کرد، کارت برنگردد
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            
            // باز و بسته کردن کلاس چرخشی
            container.classList.toggle('flipped');
        });
    });
});
// === ۱۲. موتور انیمیشن چرخشی اسکرول موبایل و کامپیوتر مروه (Intersection Observer) ===
document.addEventListener("DOMContentLoaded", () => {
    const animatedBlocks = document.querySelectorAll('.scroll-rotate-effect');
    
    const scrollOptions = {
        threshold: 0.12, // انیمیشن زمانی که ۱۲٪ دیو دیده شد روشن می‌شود
        rootMargin: "0px 0px -40px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cyber-active');
                // اگر می‌خواهی انیمیشن فقط یک‌بار اجرا شود، خط زیر را نگه‌دار:
                observer.unobserve(entry.target); 
            }
        });
    }, scrollOptions);

    animatedBlocks.forEach(block => {
        if (block) scrollObserver.observe(block);
    });
});
