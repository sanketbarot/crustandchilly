/* ==========================================
   CRUST & CHILLY - PRODUCTION SCRIPT
   Version 4.0 - All Bugs Fixed
   90+ Dishes | 100% Pure Veg
   ========================================== */
'use strict';

// ==================
// HELPERS
// ==================
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return str.replace(/[&<>"']/g, m => map[m]);
}

function debounce(fn, delay = 200) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function vegBadgeHTML() {
    return '<div class="card-veg-mark"><span class="veg-square"><span class="veg-circle"></span></span></div>';
}

// ==================
// MENU DATA (90+ Dishes)
// ==================
const menuData = {
    burgers: [
        { name: "Classic Burger", subCat: "Classic", price: "₹49", bogo: false, spice: 1, desc: "Timeless classic with fresh veggies" },
        { name: "Veg Delight Burger", subCat: "Classic", price: "₹59", bogo: false, spice: 1, desc: "Loaded with garden fresh vegetables" },
        { name: "Aloo Tikki Burger", subCat: "Classic", price: "₹69", bogo: false, spice: 2, desc: "Crispy potato patty perfection" },
        { name: "Makhani Burger", subCat: "Signature", price: "₹99", bogo: true, spice: 2, desc: "Rich buttery makhani flavor" },
        { name: "Peri Peri Burger", subCat: "Signature", price: "₹109", bogo: true, spice: 3, desc: "Fiery peri peri flavor explosion" },
        { name: "Tandoori Burger", subCat: "Signature", price: "₹109", bogo: true, spice: 3, desc: "Smoky tandoori taste" },
        { name: "Spicy Schezwan Burger", subCat: "Signature", price: "₹119", bogo: true, spice: 3, desc: "Indo-Chinese fusion delight" },
        { name: "Achari Masti Burger", subCat: "Signature", price: "₹119", bogo: true, spice: 3, desc: "Tangy pickle flavors" },
        { name: "Pizzeria Burger", subCat: "Signature", price: "₹119", bogo: true, spice: 2, desc: "Pizza meets burger magic" },
        { name: "Indian Style Burger", subCat: "Signature", price: "₹129", bogo: true, spice: 3, desc: "Bold desi flavors" },
        { name: "Afghani Burger", subCat: "Signature", price: "₹129", bogo: true, spice: 2, desc: "Creamy afghani goodness" },
        { name: "Hot & Spicy Chilli Garlic Burger", subCat: "Signature", price: "₹129", bogo: true, spice: 3, desc: "Bold chilli garlic punch" },
        { name: "Crust & Chilly Special Burger", subCat: "Signature", price: "₹149", bogo: true, spice: 3, desc: "Our signature masterpiece" }
    ],
    cheeseBurst: [
        { name: "Cheese Burst Aloo Tikki", subCat: "Premium", price: "₹129", bogo: true, spice: 2, desc: "Molten cheese overload with crispy tikki" },
        { name: "Cheese Burst Peri Peri", subCat: "Premium", price: "₹139", bogo: true, spice: 3, desc: "Spicy peri peri meets oozing cheese" },
        { name: "Cheese Burst Tandoori", subCat: "Premium", price: "₹139", bogo: true, spice: 3, desc: "Smoky tandoori cheese delight" },
        { name: "Cheese Burst Achari Masti", subCat: "Premium", price: "₹139", bogo: true, spice: 3, desc: "Tangy pickle cheese fusion" },
        { name: "Cheese Burst Spicy Schezwan", subCat: "Premium", price: "₹149", bogo: true, spice: 3, desc: "Cheesy schezwan magic" },
        { name: "Cheese Burst Hot & Spicy Chilli Garlic", subCat: "Premium", price: "₹149", bogo: true, spice: 3, desc: "Ultimate spice cheese bomb" },
        { name: "Cheese Burst Crust & Chilly Special", subCat: "Premium", price: "₹159", bogo: true, spice: 3, desc: "Premium signature cheese loaded" }
    ],
    slice: [
        { name: "Butter Slice", subCat: "Classic", price: "₹29", bogo: false, spice: 0, desc: "Simple buttery bliss" },
        { name: "Sing Sev Slice", subCat: "Classic", price: "₹35", bogo: false, spice: 1, desc: "Crunchy Gujarati style" },
        { name: "Jam Slice", subCat: "Classic", price: "₹39", bogo: false, spice: 0, desc: "Sweet fruity delight" },
        { name: "Chocolate Slice", subCat: "Classic", price: "₹39", bogo: false, spice: 0, desc: "Sweet chocolate love" },
        { name: "Cheese Slice", subCat: "Classic", price: "₹39", bogo: false, spice: 0, desc: "Melted cheese perfection" },
        { name: "Cheese Chutney Slice", subCat: "Classic", price: "₹49", bogo: false, spice: 2, desc: "Cheesy with green chutney" },
        { name: "Cheese Jam Slice", subCat: "Classic", price: "₹49", bogo: false, spice: 0, desc: "Sweet cheese fusion" },
        { name: "Cheese Chocolate Slice", subCat: "Classic", price: "₹49", bogo: false, spice: 0, desc: "Sweet & savory combo" }
    ],
    sandwich: [
        { name: "Veg Sandwich", subCat: "Classic", price: "₹79", bogo: false, spice: 1, desc: "Loaded with fresh veggies" },
        { name: "Veg Cheese Sandwich", subCat: "Classic", price: "₹109", bogo: false, spice: 1, desc: "Cheesy veg goodness" },
        { name: "Coleslaw Cheese Sandwich", subCat: "Classic", price: "₹109", bogo: false, spice: 1, desc: "Creamy coleslaw & cheese" },
        { name: "Cheese Chutney Sandwich", subCat: "Classic", price: "₹119", bogo: false, spice: 2, desc: "Cheese with tangy chutney" },
        { name: "Junglee Sandwich", subCat: "Signature", price: "₹169", bogo: true, spice: 2, desc: "Wild flavor combination" },
        { name: "Pizzeria Sandwich", subCat: "Signature", price: "₹179", bogo: true, spice: 2, desc: "Italian-Indian fusion" },
        { name: "1000 Island Sandwich", subCat: "Signature", price: "₹179", bogo: true, spice: 1, desc: "Creamy island dressing" },
        { name: "Peri Peri Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 3, desc: "Fiery peri peri kick" },
        { name: "Tandoori Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 3, desc: "Smoky grilled flavors" },
        { name: "Spicy Schezwan Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 3, desc: "Bold schezwan taste" },
        { name: "Afghani Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 2, desc: "Creamy afghani style" },
        { name: "Achari Masti Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 3, desc: "Pickled paradise" },
        { name: "Makhani Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 2, desc: "Rich buttery makhani" },
        { name: "Hot & Spicy Chilli Garlic Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 3, desc: "Chilli garlic explosion" },
        { name: "Tandoori Paneer Sandwich", subCat: "Premium", price: "₹199", bogo: true, spice: 3, desc: "Grilled paneer perfection" },
        { name: "Peri Peri Paneer Sandwich", subCat: "Premium", price: "₹199", bogo: true, spice: 3, desc: "Spicy paneer delight" },
        { name: "Afghani Garlic Paneer Sandwich", subCat: "Premium", price: "₹209", bogo: true, spice: 2, desc: "Garlic paneer creamy heaven" },
        { name: "Spicy Schezwan Paneer Sandwich", subCat: "Premium", price: "₹209", bogo: true, spice: 3, desc: "Indo-Chinese paneer" },
        { name: "Crust & Chilly Premium Sandwich", subCat: "Premium", price: "₹219", bogo: true, spice: 3, desc: "Our signature masterpiece" }
    ],
    frankie: [
        { name: "Veg Delight Frankie", subCat: "Classic", price: "₹129", bogo: false, spice: 1, desc: "Rolled veggie goodness" },
        { name: "Corn Delight Frankie", subCat: "Classic", price: "₹139", bogo: false, spice: 1, desc: "Sweet corn wrap" },
        { name: "Paneer Delight Frankie", subCat: "Classic", price: "₹139", bogo: false, spice: 2, desc: "Paneer wrapped joy" },
        { name: "Cheese Chilli Paneer Frankie", subCat: "Signature", price: "₹149", bogo: false, spice: 3, desc: "Cheesy chilli paneer roll" },
        { name: "Cheese Chilli Corn Frankie", subCat: "Signature", price: "₹149", bogo: false, spice: 2, desc: "Cheesy corn spice wrap" },
        { name: "Tandoori Frankie", subCat: "Signature", price: "₹169", bogo: false, spice: 3, desc: "Smoky tandoori roll" },
        { name: "Peri Peri Frankie", subCat: "Signature", price: "₹169", bogo: false, spice: 3, desc: "Fiery peri peri wrap" },
        { name: "Crust & Chilly Special Frankie", subCat: "Premium", price: "₹189", bogo: false, spice: 3, desc: "Our signature special roll" }
    ],
    tikka: [
        { name: "Veg Delight Tikka Pav", subCat: "Classic", price: "₹129", bogo: false, spice: 1, desc: "Veggie tikka with fresh pav" },
        { name: "Makhani Tikka Pav", subCat: "Classic", price: "₹139", bogo: false, spice: 2, desc: "Buttery makhani tikka" },
        { name: "Pizzeria Tikka Pav", subCat: "Signature", price: "₹159", bogo: true, spice: 2, desc: "Pizza style tikka pav" },
        { name: "1000 Island Tikka Pav", subCat: "Signature", price: "₹159", bogo: true, spice: 1, desc: "Creamy island tikka" },
        { name: "Achari Masti Tikka Pav", subCat: "Signature", price: "₹169", bogo: true, spice: 3, desc: "Pickled tikka delight" },
        { name: "Spicy Schezwan Tikka Pav", subCat: "Signature", price: "₹169", bogo: true, spice: 3, desc: "Schezwan fusion tikka" },
        { name: "Indian Style Tikka Pav", subCat: "Signature", price: "₹169", bogo: true, spice: 3, desc: "Desi tikka special" },
        { name: "Tandoori Tikka Pav", subCat: "Premium", price: "₹179", bogo: true, spice: 3, desc: "Smoky tandoori bites" },
        { name: "Peri Peri Tikka Pav", subCat: "Premium", price: "₹179", bogo: true, spice: 3, desc: "Spicy peri peri tikka" },
        { name: "Afghani Garlic Tikka Pav", subCat: "Premium", price: "₹189", bogo: true, spice: 2, desc: "Creamy garlic tikka" },
        { name: "Hot & Spicy Chilli Garlic Tikka Pav", subCat: "Premium", price: "₹179", bogo: true, spice: 3, desc: "Extra spicy chilli garlic tikka" },
        { name: "Crust & Chilly Special Tikka Pav", subCat: "Premium", price: "₹199", bogo: true, spice: 3, desc: "Signature tikka pav masterpiece" }
    ],
    fries: [
        { name: "Golden Fries", subCat: "Classic", price: "₹79", bogo: false, spice: 0, desc: "Crispy golden delight" },
        { name: "Peri Peri Fries", subCat: "Signature", price: "₹99", bogo: false, spice: 3, desc: "Fiery peri peri seasoning" },
        { name: "Cheesy Loaded Fries", subCat: "Premium", price: "₹119", bogo: false, spice: 1, desc: "Cheese loaded heaven" }
    ],
    maggi: [
        { name: "Classic Masala Maggi", subCat: "Classic", price: "₹59", bogo: false, spice: 1, desc: "Nostalgic masala favorite" },
        { name: "Tadka Maggi", subCat: "Classic", price: "₹79", bogo: false, spice: 2, desc: "Extra tadka flavor kick" },
        { name: "Veg Loaded Maggi", subCat: "Signature", price: "₹89", bogo: false, spice: 2, desc: "Loaded with fresh veggies" },
        { name: "Cheese Burst Maggi", subCat: "Premium", price: "₹99", bogo: false, spice: 1, desc: "Cheesy noodle bliss" },
        { name: "Cheese Burst Tadka Maggi", subCat: "Premium", price: "₹109", bogo: false, spice: 2, desc: "Cheesy spicy tadka noodles" },
        { name: "Cheese Burst Veg Loaded Maggi", subCat: "Premium", price: "₹119", bogo: false, spice: 2, desc: "Ultimate loaded cheesy maggi" }
    ],
    mojitos: [
        { name: "Mint Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Classic fresh mint mojito" },
        { name: "Blue Lagoon Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Cool blue refreshment" },
        { name: "Blue Berry Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Sweet blueberry twist" },
        { name: "Green Apple Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Tangy green apple twist" }
    ],
    addons: [
        { name: "Extra Paneer", subCat: "Add-on", price: "Ask", bogo: false, spice: 0, desc: "Add extra paneer to any dish" },
        { name: "Extra Cheese", subCat: "Add-on", price: "Ask", bogo: false, spice: 0, desc: "Add extra cheese layer" },
        { name: "Extra Veggies", subCat: "Add-on", price: "Ask", bogo: false, spice: 0, desc: "Add extra fresh vegetables" },
        { name: "Extra Tikki", subCat: "Add-on", price: "Ask", bogo: false, spice: 1, desc: "Add extra crispy tikki" },
        { name: "Cheese Tikki", subCat: "Add-on", price: "Ask", bogo: false, spice: 1, desc: "Add cheesy tikki patty" }
    ],
    drinks: [
        { name: "Coca-Cola", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Chilled classic Coca-Cola" },
        { name: "Thums Up", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Bold Thums Up taste" },
        { name: "Sprite", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Refreshing lemon-lime Sprite" },
        { name: "Fanta", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Orange Fanta fizz" },
        { name: "Limca", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Lemony Limca refresher" },
        { name: "Maaza", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Mango Maaza treat" },
        { name: "Bottled Water", subCat: "Cold Drink", price: "MRP", bogo: false, spice: 0, desc: "Pure bottled water" }
    ]
};

// ==================
// STATE
// ==================
let currentCategory = 'burgers';
let currentFilter = 'all';
let currentSearch = '';

// ==================
// LOADER
// ==================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = $('loader');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => {
                if (loader && loader.parentNode) loader.remove();
                checkCounters();
            }, 600);
        }
    }, 1200);
});

// ==================
// SMOOTH SCROLL
// ==================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==================
// LIVE STATUS
// ==================
function updateLiveStatus() {
    const statusEl = $('liveStatus');
    if (!statusEl) return;
    
    const hour = new Date().getHours();
    if (hour >= 11 && hour < 24) {
        statusEl.textContent = 'Open Now';
        statusEl.style.color = '#00A651';
    } else {
        statusEl.textContent = 'Closed Now';
        statusEl.style.color = '#EF4444';
    }
}
updateLiveStatus();
setInterval(updateLiveStatus, 60000);

// ==================
// LOAD MENU
// ==================
function loadMenu() {
    const grid = $('menuGrid');
    const countEl = $('menuCount');
    if (!grid) return;
    
    let items = menuData[currentCategory] || [];
    
    if (currentFilter === 'bogo') items = items.filter(i => i.bogo);
    else if (currentFilter === 'spicy') items = items.filter(i => i.spice >= 3);
    else if (currentFilter === 'mild') items = items.filter(i => i.spice <= 1);
    
    if (currentSearch) {
        items = items.filter(i => 
            i.name.toLowerCase().includes(currentSearch) || 
            i.desc.toLowerCase().includes(currentSearch) ||
            i.subCat.toLowerCase().includes(currentSearch)
        );
    }
    
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No dishes found</h3>
                <p>Try changing your filter or search term</p>
            </div>
        `;
        if (countEl) countEl.textContent = '';
        return;
    }
    
    const html = items.map((item, index) => {
        const spiceIcons = '🌶️'.repeat(item.spice);
        const priceClass = (item.price === 'Ask' || item.price === 'MRP') ? 'price price-ask' : 'price';
        
        return `
        <div class="menu-card" style="animation-delay:${Math.min(index * 0.04, 0.4)}s">
            ${vegBadgeHTML()}
            ${item.bogo ? '<span class="bogo-badge">🎁 BOGO</span>' : ''}
            <span class="sub-cat">${escapeHtml(item.subCat)}</span>
            <div class="menu-card-header">
                <h4>${escapeHtml(item.name)}</h4>
                <span class="${priceClass}">${escapeHtml(item.price)}</span>
            </div>
            <p>${escapeHtml(item.desc)}</p>
            <div class="menu-card-footer">
                <div class="spice-level" aria-label="Spice level ${item.spice}">${spiceIcons || '❄️'}</div>
                <a href="tel:9664870840" class="order-btn" aria-label="Order ${escapeHtml(item.name)}">
                    Order <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>`;
    }).join('');
    
    grid.innerHTML = html;
    
    if (countEl) {
        countEl.textContent = `Showing ${items.length} delicious ${items.length === 1 ? 'item' : 'items'}`;
    }
}

// ==================
// MENU EVENTS
// ==================
$$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        loadMenu();
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
});

$$('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        $$('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter;
        loadMenu();
    });
});

const menuSearch = $('menuSearch');
if (menuSearch) {
    menuSearch.addEventListener('input', debounce((e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        loadMenu();
    }, 250));
}

loadMenu();

// ==================
// STATS COUNTER
// ==================
function animateCounter(element, target, duration = 2000) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(target * easeProgress);
        if (progress < 1) requestAnimationFrame(update);
        else element.textContent = target;
    }
    requestAnimationFrame(update);
}

let countersStarted = false;
function checkCounters() {
    const stats = $$('.hs-num');
    if (!stats.length || countersStarted) return;
    
    const rect = stats[0].getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersStarted = true;
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            if (!isNaN(target)) animateCounter(stat, target);
        });
    }
}

if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                $$('.hs-num').forEach(stat => {
                    const target = parseInt(stat.dataset.count);
                    if (!isNaN(target)) animateCounter(stat, target);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    const firstStat = document.querySelector('.hs-num');
    if (firstStat) statsObserver.observe(firstStat);
} else {
    window.addEventListener('scroll', checkCounters, { passive: true });
}

// ==================
// MOBILE MENU - GUARANTEED FIX
// ==================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navMenuClose = document.getElementById('navMenuClose');
    
    console.log('Hamburger found:', hamburger); // Debug
    console.log('NavMenu found:', navMenu); // Debug
    
    function closeMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.add('hidden-overlay');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        if (hamburger) hamburger.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }
    
    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (hamburger && hamburger.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMenu(e);
        });
    }
    
    // Close on nav link click
    document.querySelectorAll('.nav-menu .nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            setTimeout(closeMenu, 150);
        });
    });
    
    // Close on overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }
    
    // Close button
    if (navMenuClose) {
        navMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }
    
    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) closeMenu();
    });
    
    // Mobile CTA buttons
    const mobileCta = document.querySelector('.mobile-cta-btn');
    if (mobileCta) {
        mobileCta.addEventListener('click', function() {
            setTimeout(closeMenu, 150);
        });
    }
    
    const mobileWa = document.querySelector('.mobile-wa-btn');
    if (mobileWa) {
        mobileWa.addEventListener('click', function() {
            setTimeout(closeMenu, 150);
        });
    }
});

// ==================
// NAVBAR SCROLL
// ==================
const navbar = $('navbar');
const backTopBtn = $('backTop');
let ticking = false;

function handleScroll() {
    const scrollY = window.scrollY;
    
    if (navbar) {
        if (scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
    
    if (backTopBtn) {
        if (scrollY > 400) backTopBtn.classList.add('show');
        else backTopBtn.classList.remove('show');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================
// REVIEWS SLIDER
// ==================
const track = $('reviewsTrack');
const dotsContainer = $('reviewDots');
const cards = $$('.review-card');
let currentReview = 0;
let reviewInterval;

if (track && dotsContainer && cards.length > 0) {
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'review-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to review ${i + 1}`);
        dot.addEventListener('click', () => {
            goToReview(i);
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });
    
    function goToReview(index) {
        currentReview = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        $$('.review-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }
    
    const prevBtn = $('prevReview');
    const nextBtn = $('nextReview');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentReview = (currentReview - 1 + cards.length) % cards.length;
            goToReview(currentReview);
            resetAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentReview = (currentReview + 1) % cards.length;
            goToReview(currentReview);
            resetAutoplay();
        });
    }
    
    function startAutoplay() {
        reviewInterval = setInterval(() => {
            currentReview = (currentReview + 1) % cards.length;
            goToReview(currentReview);
        }, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(reviewInterval);
        startAutoplay();
    }
    
    startAutoplay();
    
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        reviewsSlider.addEventListener('mouseenter', () => clearInterval(reviewInterval));
        reviewsSlider.addEventListener('mouseleave', startAutoplay);
    }
    
    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                currentReview = (currentReview + 1) % cards.length;
            } else {
                currentReview = (currentReview - 1 + cards.length) % cards.length;
            }
            goToReview(currentReview);
            resetAutoplay();
        }
    }
}

// ==================
// FAQ ACCORDION
// ==================
$$('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        
        $$('.faq-item').forEach(i => {
            i.classList.remove('active');
            const btn = i.querySelector('.faq-question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        
        if (!isActive) {
            item.classList.add('active');
            q.setAttribute('aria-expanded', 'true');
        }
    });
});

// ==================
// RESERVATION FORM
// ==================
const reservationForm = $('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const name = $('name')?.value?.trim() || '';
            const phone = $('phone')?.value?.trim() || '';
            const date = $('date')?.value || '';
            const guests = $('guests')?.value || '';
            const msg = $('message')?.value?.trim() || 'None';
            
            if (!name) {
                alert('⚠️ Please enter your name.');
                $('name')?.focus();
                return;
            }
            
            if (!phone || phone.length < 10) {
                alert('⚠️ Please enter a valid phone number.');
                $('phone')?.focus();
                return;
            }
            
            const whatsappMsg = 
                `Hello Crust & Chilly! 🍔%0A%0A` +
                `👤 Name: ${encodeURIComponent(name)}%0A` +
                `📞 Phone: ${encodeURIComponent(phone)}%0A` +
                `📅 Date: ${encodeURIComponent(date)}%0A` +
                `👥 Guests/Order Size: ${encodeURIComponent(guests)}%0A` +
                `📝 Message: ${encodeURIComponent(msg)}`;
            
            window.open(`https://wa.me/919664870840?text=${whatsappMsg}`, '_blank');
            e.target.reset();
            
            const dateEl = $('date');
            if (dateEl) dateEl.min = new Date().toISOString().split('T')[0];
            
            alert('✅ Redirecting to WhatsApp!');
        } catch (err) {
            console.error(err);
            alert('❌ Something went wrong. Please call +91 96648 70840');
        }
    });
}

const dateInput = $('date');
if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
}

// ==================
// PREVENT HORIZONTAL SCROLL
// ==================
window.addEventListener('scroll', () => {
    if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
    }
}, { passive: true });