// ==================
// SMOOTH SCROLL FIX
// ==================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==================
// MENU DATA (79 Dishes)
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
        { name: "Hot & Spicy Chilly Garlic Burger", subCat: "Premium", price: "₹129", bogo: true, spice: 3, desc: "Bold chilli garlic punch" },
        { name: "Crust & Chilly Special Burger", subCat: "Premium", price: "₹159", bogo: true, spice: 3, desc: "Our signature masterpiece" }
    ],
    cheeseBlast: [
        { name: "Cheese Blast Aloo Tikki", subCat: "Cheese Blast", price: "₹129", bogo: true, spice: 2, desc: "Molten cheese overload" },
        { name: "Cheese Blast Peri Peri", subCat: "Cheese Blast", price: "₹139", bogo: true, spice: 3, desc: "Spicy meets cheesy" },
        { name: "Cheese Blast Tandoori", subCat: "Cheese Blast", price: "₹139", bogo: true, spice: 3, desc: "Smoky cheese delight" },
        { name: "Cheese Blast Achari Masti", subCat: "Cheese Blast", price: "₹139", bogo: true, spice: 3, desc: "Tangy cheese fusion" },
        { name: "Cheese Blast Spicy Schezwan", subCat: "Cheese Blast", price: "₹149", bogo: true, spice: 3, desc: "Cheesy schezwan magic" },
        { name: "Cheese Blast Hot & Spicy Chilly Garlic", subCat: "Cheese Blast", price: "₹149", bogo: true, spice: 3, desc: "Ultimate spice bomb" },
        { name: "Cheese Blast Crust & Chilly Special", subCat: "Cheese Blast", price: "₹159", bogo: true, spice: 3, desc: "Premium signature loaded" }
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
        { name: "Hot & Spicy Chilly Garlic Sandwich", subCat: "Signature", price: "₹189", bogo: true, spice: 3, desc: "Chilli garlic explosion" },
        { name: "Tandoori Paneer Sandwich", subCat: "Premium", price: "₹199", bogo: true, spice: 3, desc: "Grilled paneer perfection" },
        { name: "Peri Peri Paneer Sandwich", subCat: "Premium", price: "₹199", bogo: true, spice: 3, desc: "Spicy paneer delight" },
        { name: "Afghani Garlic Paneer Sandwich", subCat: "Premium", price: "₹209", bogo: true, spice: 2, desc: "Garlic paneer creamy heaven" },
        { name: "Spicy Schezwan Paneer Sandwich", subCat: "Premium", price: "₹209", bogo: true, spice: 3, desc: "Indo-Chinese paneer" },
        { name: "Crust & Chilly Premium Sandwich", subCat: "Premium", price: "₹219", bogo: true, spice: 3, desc: "Our signature masterpiece" }
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
    frankie: [
        { name: "Veg Delight Frankie", subCat: "Classic", price: "₹129", bogo: false, spice: 1, desc: "Rolled veggie goodness" },
        { name: "Corn Delight Frankie", subCat: "Classic", price: "₹139", bogo: false, spice: 1, desc: "Sweet corn wrap" },
        { name: "Paneer Delight Frankie", subCat: "Signature", price: "₹139", bogo: false, spice: 2, desc: "Paneer wrapped joy" },
        { name: "Cheese Chilly Paneer Frankie", subCat: "Signature", price: "₹149", bogo: false, spice: 3, desc: "Cheesy chilli paneer" },
        { name: "Cheese Chilly Corn Frankie", subCat: "Signature", price: "₹149", bogo: false, spice: 2, desc: "Cheesy corn spice" },
        { name: "Tandoori Frankie", subCat: "Signature", price: "₹169", bogo: false, spice: 3, desc: "Smoky tandoori roll" },
        { name: "Peri Peri Frankie", subCat: "Signature", price: "₹169", bogo: false, spice: 3, desc: "Fiery peri wrap" },
        { name: "Crust & Chilly Special Frankie", subCat: "Premium", price: "₹189", bogo: false, spice: 3, desc: "Our signature roll" }
    ],
    tikka: [
        { name: "Veg Delight Tikka Pav", subCat: "Classic", price: "₹129", bogo: false, spice: 1, desc: "Veggie tikka pav" },
        { name: "Makhni Tikka Pav", subCat: "Classic", price: "₹139", bogo: false, spice: 2, desc: "Buttery makhani tikka" },
        { name: "Pizzeria Tikka Pav", subCat: "Signature", price: "₹159", bogo: true, spice: 2, desc: "Pizza style tikka" },
        { name: "1000 Island Tikka Pav", subCat: "Signature", price: "₹159", bogo: true, spice: 1, desc: "Creamy island tikka" },
        { name: "Achari Masti Tikka Pav", subCat: "Signature", price: "₹169", bogo: true, spice: 3, desc: "Pickled tikka delight" },
        { name: "Spicy Schezwan Tikka Pav", subCat: "Signature", price: "₹169", bogo: true, spice: 3, desc: "Schezwan fusion" },
        { name: "Indian Style Tikka Pav", subCat: "Signature", price: "₹169", bogo: true, spice: 3, desc: "Desi tikka special" },
        { name: "Tandoori Tikka Pav", subCat: "Premium", price: "₹179", bogo: true, spice: 3, desc: "Smoky tandoori bites" },
        { name: "Peri Peri Tikka Pav", subCat: "Premium", price: "₹179", bogo: true, spice: 3, desc: "Spicy peri tikka" },
        { name: "Afghani Garlic Tikka Pav", subCat: "Premium", price: "₹189", bogo: true, spice: 2, desc: "Creamy garlic tikka" },
        { name: "Hot & Spicy Chilly Garlic Tikka Pav", subCat: "Premium", price: "₹179", bogo: true, spice: 3, desc: "Extra spicy tikka" },
        { name: "Crust & Chilly Special Tikka Pav", subCat: "Premium", price: "₹199", bogo: true, spice: 3, desc: "Signature tikka pav" }
    ],
    fries: [
        { name: "Golden Fries", subCat: "Classic", price: "₹79", bogo: false, spice: 0, desc: "Crispy golden delight" },
        { name: "Peri Peri Fries", subCat: "Signature", price: "₹99", bogo: false, spice: 3, desc: "Fiery peri seasoning" },
        { name: "Cheesy Loaded Fries", subCat: "Premium", price: "₹119", bogo: false, spice: 1, desc: "Cheese loaded heaven" }
    ],
    maggi: [
        { name: "Masala Maggi", subCat: "Classic", price: "₹59", bogo: false, spice: 1, desc: "Nostalgic favorite" },
        { name: "Tadka Maggi", subCat: "Classic", price: "₹79", bogo: false, spice: 2, desc: "Extra tadka flavor" },
        { name: "Veg Loaded Maggi", subCat: "Signature", price: "₹89", bogo: false, spice: 2, desc: "Loaded with veggies" },
        { name: "Cheese Blast Maggi", subCat: "Premium", price: "₹99", bogo: false, spice: 1, desc: "Cheesy noodle bliss" },
        { name: "Cheese Blast Tadka Maggi", subCat: "Premium", price: "₹109", bogo: false, spice: 2, desc: "Cheesy spicy tadka" },
        { name: "Cheese Blast Veg Loaded Maggi", subCat: "Premium", price: "₹119", bogo: false, spice: 2, desc: "Ultimate loaded maggi" }
    ],
    mojitos: [
        { name: "Mint Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Classic fresh mint mojito" },
        { name: "Blue Lagoon Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Cool blue refreshment" },
        { name: "Blue Berry Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Sweet blueberry twist" },
        { name: "Green Apple Mojito", subCat: "Refreshing", price: "₹99", bogo: false, spice: 0, desc: "Tangy apple twist" }
    ]
};

let currentCategory = 'burgers';
let currentFilter = 'all';
let currentSearch = '';

// LOADER
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
        setTimeout(checkCounters, 300);
    }, 1500);
});

// LIVE STATUS
function updateLiveStatus() {
    const now = new Date();
    const hour = now.getHours();
    const statusEl = document.getElementById('liveStatus');
    if (!statusEl) return;
    
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

function vegBadgeHTML() {
    return `<div class="card-veg-mark"><span class="veg-square"><span class="veg-circle"></span></span></div>`;
}

// LOAD MENU
function loadMenu() {
    const grid = document.getElementById('menuGrid');
    const countEl = document.getElementById('menuCount');
    let items = menuData[currentCategory] || [];
    
    if (currentFilter === 'bogo') items = items.filter(i => i.bogo);
    if (currentFilter === 'spicy') items = items.filter(i => i.spice >= 3);
    if (currentFilter === 'mild') items = items.filter(i => i.spice <= 1);
    
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
        countEl.textContent = '';
        return;
    }
    
    grid.innerHTML = items.map((item, index) => {
        const spiceIcons = '🌶️'.repeat(item.spice);
        return `
        <div class="menu-card" style="animation-delay: ${index * 0.05}s">
            ${vegBadgeHTML()}
            ${item.bogo ? '<span class="bogo-badge">🎁 BOGO</span>' : ''}
            <span class="sub-cat">${item.subCat}</span>
            <div class="menu-card-header">
                <h4>${item.name}</h4>
                <span class="price">${item.price}</span>
            </div>
            <p>${item.desc}</p>
            <div class="menu-card-footer">
                <div class="spice-level">${spiceIcons || '❄️'}</div>
                <a href="tel:9664870840" class="order-btn">
                    Order <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
        `;
    }).join('');
    
    countEl.textContent = `Showing ${items.length} delicious ${items.length === 1 ? 'item' : 'items'}`;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        loadMenu();
    });
});

document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter;
        loadMenu();
    });
});

document.getElementById('menuSearch').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    loadMenu();
});

loadMenu();

// STATS COUNTER
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
    const stats = document.querySelectorAll('.hs-num');
    if (!stats.length || countersStarted) return;
    
    const rect = stats[0].getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersStarted = true;
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            animateCounter(stat, target);
        });
    }
}

window.addEventListener('scroll', checkCounters);

// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');
    
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
        backTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backTop.classList.remove('show');
    }
});

document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// REVIEWS SLIDER
const track = document.getElementById('reviewsTrack');
const dotsContainer = document.getElementById('reviewDots');
const cards = document.querySelectorAll('.review-card');
let currentReview = 0;

cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToReview(i));
    dotsContainer.appendChild(dot);
});

function goToReview(index) {
    currentReview = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.review-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

document.getElementById('prevReview').addEventListener('click', () => {
    currentReview = (currentReview - 1 + cards.length) % cards.length;
    goToReview(currentReview);
});

document.getElementById('nextReview').addEventListener('click', () => {
    currentReview = (currentReview + 1) % cards.length;
    goToReview(currentReview);
});

setInterval(() => {
    currentReview = (currentReview + 1) % cards.length;
    goToReview(currentReview);
}, 5000);

// FAQ ACCORDION
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// FORMS
document.getElementById('reservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const guests = document.getElementById('guests').value;
    const msg = document.getElementById('message').value;
    
    const whatsappMsg = `Hello Crust & Chilly! 🍔%0A%0A👤 Name: ${name}%0A📞 Phone: ${phone}%0A📅 Date: ${date}%0A👥 Guests/Order Size: ${guests}%0A📝 Message: ${msg || 'None'}`;
    
    window.open(`https://wa.me/919664870840?text=${whatsappMsg}`, '_blank');
    e.target.reset();
    alert('✅ Redirecting to WhatsApp!');
});

document.getElementById('date').min = new Date().toISOString().split('T')[0];

console.log('🔥 Crust & Chilly Premium Loaded! 79 Dishes • 100% Pure Veg • Open till 12 AM 🌱');