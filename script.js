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
