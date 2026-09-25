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
