// تایمر معکوس - 9 روز دیگه ساعت 21:00
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 9);
launchDate.setHours(21, 0, 0, 0);

function updateTimer() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "<div class='timer-unit'><span class='timer-digit'>آغاز شد!</span></div>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatNumber = (num) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, (x) => persianNumbers[x]);
    };

    const formattedDays = formatNumber(days.toString().padStart(2, '0'));
    const formattedHours = formatNumber(hours.toString().padStart(2, '0'));
    const formattedMinutes = formatNumber(minutes.toString().padStart(2, '0'));
    const formattedSeconds = formatNumber(seconds.toString().padStart(2, '0'));

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerHTML = `
            <div class="timer-unit">
                <span class="timer-digit">${formattedDays}</span>
                <span class="timer-label">روز</span>
            </div>
            <div class="timer-unit">
                <span class="timer-digit">${formattedHours}</span>
                <span class="timer-label">ساعت</span>
            </div>
            <div class="timer-unit">
                <span class="timer-digit">${formattedMinutes}</span>
                <span class="timer-label">دقیقه</span>
            </div>
            <div class="timer-unit">
                <span class="timer-digit">${formattedSeconds}</span>
                <span class="timer-label">ثانیه</span>
            </div>
        `;
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

function setupFormStorage() {
    const form = document.querySelector('.email-form');
    if (!form) return console.log('❌ فرم پیدا نشد!');

    form.addEventListener('submit', function(e) {
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();

        if (!name || !email) {
            alert('❌ لطفا همه فیلدها رو پر کن!');
            e.preventDefault(); // جلوگیری از ارسال ناقص
            return;
        }

        alert(`✅ ثبت شد!\nاسم: ${name}\nایمیل: ${email}`);
    });

    console.log('✅ فرم آماده ارسال به شیت!');
}

// انیمیشن لوگو
function initLogoAnimation() {
    const logo = document.getElementById('logo');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(8deg)';
            this.style.filter = 'brightness(1.2) drop-shadow(0 0 25px #ff0080)';
            this.style.transition = 'all 0.4s ease';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
            this.style.transition = 'all 0.4s ease';
        });

        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.animation = 'none';
            this.style.transform = 'scale(1.3)';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.animation = 'float 4s ease-in-out infinite, glow-pulse 3s ease-in-out infinite';
            }, 300);
            
            createExplosionEffect();
        });

        logo.style.cursor = 'pointer';
    }
}

function createExplosionEffect() {
    const explosion = document.createElement('div');
    explosion.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 180px;
        height: 180px;
        background: radial-gradient(circle, 
            rgba(255, 20, 147, 0.8) 0%, 
            rgba(255, 140, 0, 0.6) 30%, 
            rgba(64, 224, 208, 0.4) 60%, 
            transparent 80%);
        border-radius: 50%;
        animation: gentle-explode 1.2s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 1200);
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 لندینگ لود شد!');
    setupFormStorage();
    initLogoAnimation();
    
    // نمایش تعداد ثبت‌های موجود
    const submissions = JSON.parse(localStorage.getItem('landingSubmissions') || '[]');
    console.log(`📊 تعداد ثبت‌های موجود: ${submissions.length}`);
});

// اضافه کردن انیمیشن‌ها به CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes gentle-explode {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(2); opacity: 0.6; }
        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
`;
document.head.appendChild(style);