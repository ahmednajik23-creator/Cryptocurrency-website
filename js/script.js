/* ==============================================================
   ملف JavaScript الرئيسي - CoinFuture (نسخة زر الدخول المؤقت)
   ============================================================== */

// ==============================================================
// 🔓 زر مؤقت للدخول - يسمح بالدخول فوراً
// ==============================================================

// ---------- تسجيل الدخول فوراً عند تحميل الصفحة ----------
(function() {
    // تعيين حالة تسجيل الدخول
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'guest@coinfuture.com');
    console.log('✅ تم تسجيل الدخول تلقائياً');
})();

// ---------- دالة التحقق من الصلاحية (دائماً تسمح بالدخول) ----------
function checkAuth() {
    // دائماً نجعل المستخدم مسجل دخول
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'guest@coinfuture.com');
    
    const currentPage = window.location.pathname.split('/').pop();
    
    // إذا كانت الصفحة هي login.html، انتقل مباشرة إلى index.html
    if (currentPage === 'login.html') {
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// ---------- دالة تسجيل الدخول (دخول فوري) ----------
function handleLogin(e) {
    if (e) e.preventDefault();
    
    // تسجيل الدخول مباشرة
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'guest@coinfuture.com');
    
    // التحويل إلى الصفحة الرئيسية
    window.location.href = 'index.html';
}

// ---------- دالة الدخول السريع (زر الدخول المؤقت) ----------
function quickLogin(e) {
    if (e) e.preventDefault();
    
    // رسالة تأكيد
    alert('✅ تم تسجيل الدخول بنجاح! جاري التحويل...');
    
    // تسجيل الدخول
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'guest@coinfuture.com');
    
    // التحويل إلى الصفحة الرئيسية
    window.location.href = 'index.html';
}

// ---------- دالة تسجيل الخروج ----------
function handleLogout(e) {
    if (e) e.preventDefault();
    
    // عند الخروج، نعيد تعيين الحالة كضيف
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'guest@coinfuture.com');
    
    // العودة إلى صفحة تسجيل الدخول
    window.location.href = 'login.html';
}

// ---------- إخفاء شاشة التحميل ----------
function hideLoading() {
    const loading = document.getElementById('loading');
    const app = document.getElementById('app');
    
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                if (app) app.style.display = 'block';
            }, 500);
        }, 800);
    }
}

// ---------- الـ Navbar اللاصق ----------
function stickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const sticky = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
}

// ---------- القائمة المتنقلة (Mobile Menu) ----------
function mobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// ---------- التمرير السلس (Smooth Scroll) ----------
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ---------- العداد المتحرك (Animated Counter) ----------
function animatedCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.round(current).toLocaleString();
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(counter);
    });
}

// ---------- زر العودة للأعلى (Back to Top) ----------
function backToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backBtn.style.display = 'block';
        } else {
            backBtn.style.display = 'none';
        }
    });
    
    backBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------- حاسبة التداول ----------
function setupTradingCalculator() {
    const coinPrices = {
        bitcoin: 62450,
        ethereum: 3200,
        bnb: 520,
        solana: 145
    };
    
    // شراء
    const buyCoin = document.getElementById('buyCoin');
    const buyAmount = document.getElementById('buyAmount');
    const buyPrice = document.getElementById('buyPrice');
    const buyTotal = document.getElementById('buyTotal');
    
    if (buyCoin && buyAmount && buyPrice && buyTotal) {
        function updateBuy() {
            const coin = buyCoin.value;
            const price = coinPrices[coin] || 0;
            const amount = parseFloat(buyAmount.value) || 0;
            buyPrice.value = `$${price.toFixed(2)}`;
            buyTotal.value = `$${(amount * price).toFixed(2)}`;
        }
        buyCoin.addEventListener('change', updateBuy);
        buyAmount.addEventListener('input', updateBuy);
        updateBuy();
    }
    
    // بيع
    const sellCoin = document.getElementById('sellCoin');
    const sellAmount = document.getElementById('sellAmount');
    const sellPrice = document.getElementById('sellPrice');
    const sellTotal = document.getElementById('sellTotal');
    
    if (sellCoin && sellAmount && sellPrice && sellTotal) {
        function updateSell() {
            const coin = sellCoin.value;
            const price = coinPrices[coin] || 0;
            const amount = parseFloat(sellAmount.value) || 0;
            sellPrice.value = `$${price.toFixed(2)}`;
            sellTotal.value = `$${(amount * price).toFixed(2)}`;
        }
        sellCoin.addEventListener('change', updateSell);
        sellAmount.addEventListener('input', updateSell);
        updateSell();
    }
    
    // تحويل
    const exchangeForm = document.getElementById('exchangeForm');
    if (exchangeForm) {
        exchangeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const from = document.getElementById('exchangeFrom').value;
            const to = document.getElementById('exchangeTo').value;
            const amount = parseFloat(document.getElementById('exchangeAmount').value) || 0;
            const resultEl = document.getElementById('exchangeResult');
            
            const fromPrice = coinPrices[from] || 0;
            const toPrice = coinPrices[to] || 0;
            const result = (amount * fromPrice) / toPrice;
            
            resultEl.textContent = `${amount} ${from.toUpperCase()} = ${result.toFixed(6)} ${to.toUpperCase()}`;
        });
    }
}

// ---------- نموذج الاتصال ----------
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const resultEl = document.getElementById('contactResult');
        
        if (!name || name.length < 2) {
            resultEl.textContent = 'الرجاء إدخال اسم صحيح (على الأقل حرفين)';
            resultEl.style.color = '#e74c3c';
            return;
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            resultEl.textContent = 'الرجاء إدخال بريد إلكتروني صحيح';
            resultEl.style.color = '#e74c3c';
            return;
        }
        
        if (!subject || subject.length < 3) {
            resultEl.textContent = 'الرجاء إدخال موضوع صحيح';
            resultEl.style.color = '#e74c3c';
            return;
        }
        
        if (!message || message.length < 10) {
            resultEl.textContent = 'الرجاء كتابة رسالة أطول (على الأقل 10 أحرف)';
            resultEl.style.color = '#e74c3c';
            return;
        }
        
        resultEl.textContent = `✅ شكراً ${name}، تم استلام رسالتك بنجاح! سنرد عليك قريباً.`;
        resultEl.style.color = '#27ae60';
        form.reset();
    });
}

// ---------- عرض بيانات الأسواق ----------
function renderMarkets() {
    const tbody = document.getElementById('marketData');
    if (!tbody) return;
    
    const marketData = [
        { coin: 'Bitcoin', symbol: 'BTC', price: 62450, change: 2.5, marketCap: '1.2T', volume: '28B' },
        { coin: 'Ethereum', symbol: 'ETH', price: 3200, change: 1.8, marketCap: '380B', volume: '15B' },
        { coin: 'BNB', symbol: 'BNB', price: 520, change: -0.5, marketCap: '85B', volume: '2.1B' },
        { coin: 'Solana', symbol: 'SOL', price: 145, change: 3.2, marketCap: '65B', volume: '1.8B' },
        { coin: 'Cardano', symbol: 'ADA', price: 0.62, change: -1.2, marketCap: '22B', volume: '0.9B' },
        { coin: 'XRP', symbol: 'XRP', price: 0.58, change: 0.8, marketCap: '32B', volume: '1.5B' },
        { coin: 'Dogecoin', symbol: 'DOGE', price: 0.12, change: 5.6, marketCap: '17B', volume: '2.3B' },
        { coin: 'Litecoin', symbol: 'LTC', price: 78, change: -0.3, marketCap: '5.8B', volume: '0.6B' }
    ];
    
    function render(data) {
        tbody.innerHTML = data.map(item => {
            const changeClass = item.change >= 0 ? 'positive' : 'negative';
            const changeSymbol = item.change >= 0 ? '+' : '';
            return `
                <tr>
                    <td><strong>${item.coin}</strong> (${item.symbol})</td>
                    <td>$${item.price.toLocaleString()}</td>
                    <td class="${changeClass}">${changeSymbol}${item.change}%</td>
                    <td>$${item.marketCap}</td>
                    <td>$${item.volume}</td>
                </tr>
            `;
        }).join('');
    }
    
    render(marketData);
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const filtered = marketData.filter(item => 
                item.coin.toLowerCase().includes(query) || 
                item.symbol.toLowerCase().includes(query)
            );
            render(filtered);
        });
    }
    
    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filter = this.value;
            let filtered = [...marketData];
            if (filter === 'gainers') {
                filtered = filtered.filter(item => item.change >= 0);
            } else if (filter === 'losers') {
                filtered = filtered.filter(item => item.change < 0);
            }
            render(filtered);
        });
    }
}

// ---------- Scroll Reveal ----------
function scrollReveal() {
    const reveals = document.querySelectorAll('.feature-card, .coin-card, .stat-item, .why-item, .trading-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ---------- زر الدخول المؤقت - يظهر في الصفحات ----------
function setupTemporaryLoginButton() {
    // إنشاء زر مؤقت للدخول
    const tempBtn = document.createElement('button');
    tempBtn.id = 'tempLoginBtn';
    tempBtn.innerHTML = '🚀 دخول مؤقت';
    tempBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        background: linear-gradient(135deg, #f7931a, #e67e22);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(247, 147, 26, 0.5);
        transition: all 0.3s ease;
        display: none; /* مخفي افتراضياً */
    `;
    
    // إضافة الزر إلى الصفحة
    document.body.appendChild(tempBtn);
    
    // إظهار الزر فقط إذا لم يكن المستخدم مسجل دخول
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        tempBtn.style.display = 'block';
    }
    
    // حدث الضغط على الزر
    tempBtn.addEventListener('click', function() {
        // رسالة تأكيد
        alert('✅ تم تسجيل الدخول المؤقت بنجاح!');
        
        // تسجيل الدخول
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', 'temp@coinfuture.com');
        
        // إخفاء الزر
        tempBtn.style.display = 'none';
        
        // إعادة تحميل الصفحة
        window.location.reload();
    });
    
    // hover effect
    tempBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 6px 30px rgba(247, 147, 26, 0.7)';
    });
    
    tempBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(247, 147, 26, 0.5)';
    });
}

// ==============================================================
// 🚀 التهيئة الرئيسية
// ==============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ CoinFuture - تم تحميل الموقع بنجاح');
    console.log('🔓 زر الدخول المؤقت جاهز');
    console.log('👤 مرحباً بك في منصة CoinFuture');
    
    // 1. تأكد من تسجيل الدخول
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', 'guest@coinfuture.com');
    }
    
    // 2. إخفاء شاشة التحميل
    hideLoading();
    
    // 3. زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // 4. نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 5. زر الدخول السريع
    const quickBtn = document.getElementById('quickLoginBtn');
    if (quickBtn) {
        quickBtn.addEventListener('click', quickLogin);
    }
    
    // 6. تفعيل زر الدخول المؤقت
    setupTemporaryLoginButton();
    
    // 7. تفعيل الميزات
    mobileMenu();
    stickyNavbar();
    smoothScroll();
    animatedCounter();
    backToTop();
    setupTradingCalculator();
    setupContactForm();
    renderMarkets();
    scrollReveal();
    
    console.log('🚀 تم تهيئة الموقع بالكامل');
});

// ---------- إظهار التطبيق بعد التحميل الكامل ----------
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                const app = document.getElementById('app');
                if (app) app.style.display = 'block';
            }, 500);
        }, 500);
    }
});

console.log('✅ تم تحميل الملف بنجاح - مرحباً بك في CoinFuture');