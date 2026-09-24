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
