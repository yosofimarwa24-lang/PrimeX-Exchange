// === ۱. مدیریت رویدادهای پس از بارگذاری کامل ساختار سند (DOM Unified Core) ===
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

    // --- ب) موتور فوق پیشرفته انیمیشن چرخشی سه‌بعدی اسکرول مروه (3D Matrix Scroll Observer) ---
    const animatedBlocks = document.querySelectorAll('.about-us-section, .exchange-rates-section, .pie-chart-section, .trust-section');
    
    // متصل کردن کلاس اولیه افکت سه‌بعدی چرخشی به سکشن‌های اصلی
    animatedBlocks.forEach(block => {
        if (block) block.classList.add('scroll-rotate-effect');
    });

    const scrollOptions = {
        threshold: 0.12, // انیمیشن زمانی که ۱۲٪ دایو دیده شد با زاویه سه بعدی روشن می‌شود
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cyber-active');
                
                // به محض رسیدن اسکرول به بخش نرخ ارز، انیمیشن صعودی اعداد هم کلید می‌خورد
                if (entry.target.classList.contains('exchange-rates-section')) {
                    const counters = entry.target.querySelectorAll('.count-up');
                    counters.forEach(counter => startCounterAnimation(counter));
                }
                observer.unobserve(entry.target); // غیرفعال‌سازی رادار پس از اجرا جهت بهینه‌سازی پردازنده
            }
        });
    }, scrollOptions);

    animatedBlocks.forEach(block => {
        if (block) scrollObserver.observe(block);
    });

    // --- ج) قابلیت چرخش سه‌بعدی کارت‌های نرخ ارز با کلیک و لمس دست در موبایل (Marwa Unique Click Flip) ---
    const cardContainers = document.querySelectorAll('.flip-card-container');
    cardContainers.forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', (e) => {
            // جلوگیری از تداخل کلیک دکمه تبدیل با چرخش کل کادر کارت
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            container.classList.toggle('flipped');
        });
    });

    // --- د) محاسبات ماشین‌حساب صرافی درون پنجره مودال پاپ‌آپ (Marwa) ---
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

    // --- ه) مدیریت منوی همبرگری باریک در نسخه موبایل (Zobaideh) ---
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

    // --- و) اسکرول نرم دکمه مشاهده نرخ‌ها به بخش مربوطه (Zobaideh) ---
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

    // --- ز) مدیریت کلیک‌های کشویی آکاردئون سؤالات متداول FAQ (Nasrin) ---
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

// === ۲. شبیه‌سازهای زمانی زنده صرافی (اجرا به صورت پس‌زمینه مستقل) ===

// --- الف) شبیه‌ساز زنده نوسانات نرخ ارزها روی کارت‌ها هر ۴ ثانیه (Marwa Stream) ---
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

// --- ب) شبیه‌ساز زنده نوسانات کادرهای نمودار متحرک هر ۲ ثانیه (Tahmina Stream) ---
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
