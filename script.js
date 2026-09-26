// ===================================================
/* 🌟 ULTIMATE 3D PORTAL ENGINE - script.js (Part 1) */
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ۱. انیمیشن صعودی پویای شمارشگر اعداد کارت‌های مروه جان ---
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

    // --- ۲. 🌟 موتور ماتریکس چرخش ۳D و پشت‌ورو شدن اجباری دیوها با اسکرول (Up & Down) 🌟 ---
    const cyberSections = document.querySelectorAll('.about-us-section, .exchange-rates-section, .pie-chart-section, .trust-section');
    
    cyberSections.forEach(sec => {
        if (sec) {
            sec.classList.add('scroll-rotate-effect');
            // فعال‌سازی شتاب‌دهنده سخت‌افزاری مرورگر برای چرخش واقعی
            sec.style.transformOrigin = "center top";
        }
    });

    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // اجرای فوری انیمیشن مگنتیک با چرخش محسوس کل محتویات بدنه
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        let delta = currentScroll - lastScrollTop;
        
        cyberSections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                
                // محاسبه زاویه چرخش پویا بر اساس شدت و جهت اسکرول دست کاربر
                let rotationAngle = Math.min(Math.max(delta * 0.12, -15), 15);
                
                if (currentScroll > lastScrollTop) {
                    // اسکرول به سمت پایین: محتویات رو به جلو کج می‌شوند
                    sec.style.transform = `perspective(1200px) translateY(0) rotateX(${rotationAngle}deg) scale(1)`;
                    sec.style.opacity = "1";
                    sec.style.filter = "blur(0px)";
                } else {
                    // اسکرول به سمت بالا: کل دیوها پشت و رو شده و تاب می‌خورند!
                    sec.style.transform = `perspective(1200px) translateY(-20px) rotateX(${rotationAngle}deg) scale(0.97)`;
                    sec.style.filter = "blur(0.5px)";
                }
                sec.classList.add('cyber-active');
                
                if (sec.classList.contains('exchange-rates-section')) {
                    const counters = sec.querySelectorAll('.count-up');
                    counters.forEach(counter => {
                        if(counter.innerText === "0" || counter.innerText === "0.00") {
                            startCounterAnimation(counter);
                        }
                    });
                }
            }
        });
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });

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
    // --- ۵. افکت مگنتیک سه‌بعدی ماوس روی کارت‌های صرافی مروه و تهمینه ---
    const premiumCards = document.querySelectorAll('.modern-feature-card, .flip-card-front, .feature-card');
    
    premiumCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const angleX = (yc - y) / 10; 
            const angleY = (x - xc) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale(1.04)`;
            card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 35px rgba(0, 245, 212, 0.3)`;
            card.style.transition = "transform 0.05s ease-out, box-shadow 0.05s ease-out";
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
            card.style.boxShadow = "";
            card.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        });
    });

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

    // --- ۷. آکاردئون سؤالات متداول FAQ نسرین جان ---
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
});

// === ۸. شبیه‌ساز زنده نوسانات نرخ ارزها روی کارت‌ها هر ۴ ثانیه (Marwa Stream) ===
setInterval(() => {
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        let currentPrice = parseFloat(counter.innerText);
        if (!isNaN(currentPrice) && currentPrice > 0) {
            const fluctuation = (Math.random() * 0.08 - 0.04);
            let newPrice = currentPrice + fluctuation;
            counter.innerText = newPrice.toFixed(2);

            const card = counter.closest('.flip-card-front');
            if (card) {
                const badge = card.querySelector('.badge');
                if (badge) {
                    if (fluctuation >= 0) {
                        badge.className = "badge bg-success-subtle text-success border border-success rounded-pill px-2 py-1 small";
                        badge.innerText = "+" + (Math.random() * 0.25).toFixed(2) + "%";
                    } else {
                        badge.className = "badge bg-danger-subtle text-danger border border-danger rounded-pill px-2 py-1 small";
                        badge.innerText = "-" + (Math.random() * 0.25).toFixed(2) + "%";
                    }
                }
            }
        }
    });
}, 4000);

// === ۹. شبیه‌ساز زنده نوسانات کادرهای نمودار متحرک تهمینه هر ۲ ثانیه (Tahmina Stream) ===
setInterval(() => {
    const bars = document.querySelectorAll('.chart-bar');
    const rateBadge = document.querySelector('.item-rate-badge');
    
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 75) + 25;
        bar.style.height = randomHeight + '%';
    });

    if (rateBadge) {
        const randomRate = (Math.random() * 0.4).toFixed(2);
        rateBadge.innerText = "+" + randomRate + "%";
    }
}, 2000);
    // اضافه شدن سکشن تیم ما به رادار تعاملی چرخشی سه‌بعدی اسکرول مروه
    const animatedBlocks = document.querySelectorAll('.about-us-section, .team-section, .exchange-rates-section, .pie-chart-section, .trust-section');
