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
