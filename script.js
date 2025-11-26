const launchDate = new Date(2025, 10, 10, 23, 0, 0, 0); // 10 نوامبر 2025 ساعت 23:00

function updateTimer() {
    const now = new Date().getTime();
    const distance = launchDate - now;
    const timerElement = document.getElementById('timer');

    if (!timerElement) return;

    const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const format = num => num.toString().padStart(2, '0').split('').map(d => persian[d]).join('');

    if (distance < 0) {
        clearInterval(timerInterval);
        timerElement.innerHTML = `
            <div class="timer-unit"><span class="timer-digit">۰۰</span><span class="timer-label">روز</span></div>
            <div class="timer-unit"><span class="timer-digit">۰۰</span><span class="timer-label">ساعت</span></div>
            <div class="timer-unit"><span class="timer-digit">۰۰</span><span class="timer-label">دقیقه</span></div>
            <div class="timer-unit"><span class="timer-digit">۰۰</span><span class="timer-label">ثانیه</span></div>
        `;
        timerElement.classList.add('launched');
        document.querySelector('.timer-container').classList.add('launched');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `
        <div class="timer-unit"><span class="timer-digit">${format(days)}</span><span class="timer-label">روز</span></div>
        <div class="timer-unit"><span class="timer-digit">${format(hours)}</span><span class="timer-label">ساعت</span></div>
        <div class="timer-unit"><span class="timer-digit">${format(minutes)}</span><span class="timer-label">دقیقه</span></div>
        <div class="timer-unit"><span class="timer-digit">${format(seconds)}</span><span class="timer-label">ثانیه</span></div>
    `;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// انفجار خودکار + انیمیشن لوگو
document.addEventListener("DOMContentLoaded", () => {
    // انفجار بزرگ موقع لود
    setTimeout(() => {
        const boom = document.createElement('div');
        boom.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 400px; height: 400px; border-radius: 50%;
            background: radial-gradient(circle, rgba(255,20,147,1) 0%, rgba(255,140,0,0.8) 40%, transparent 70%);
            animation: gentle-explode 1.8s ease-out forwards; pointer-events: none; z-index: 9999;
        `;
        document.body.appendChild(boom);
        setTimeout(() => boom.remove(), 1800);
    }, 600);

    // کلیک لوگو
    const logo = document.getElementById('logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            logo.style.transform = 'scale(1.6) rotate(15deg)';
            setTimeout(() => logo.style.transform = '', 500);
        });
    }
});