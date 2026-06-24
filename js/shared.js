/* ============================================
   CRUST & CHILLY v5.0 — SHARED JS
   Cart · Favorites · Modal · Header · Customer Name
   ============================================ */
(function(){
'use strict';

// ===== Cache Clear on Version Change =====
try {
  if (localStorage.getItem('cc_version') !== VERSION) {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('cc_version', VERSION);
  }
} catch(e) {}

// ===== STATE =====
let cart = [];
let favs = [];
let customerName = '';

try {
  cart = JSON.parse(localStorage.getItem('cc_cart') || '[]');
  favs = JSON.parse(localStorage.getItem('cc_favs') || '[]');
  customerName = localStorage.getItem('cc_name') || '';
} catch(e) {}

// ===== HELPERS =====
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const isFav = id => favs.indexOf(id) !== -1;

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function debounce(fn, wait) {
  let t;
  return function() {
    const args = arguments, ctx = this;
    clearTimeout(t);
    t = setTimeout(() => fn.apply(ctx, args), wait);
  };
}

function spDots(lvl) {
  return '<i class="' + (1 <= lvl ? 'on' : '') + '"></i>' +
         '<i class="' + (2 <= lvl ? 'on' : '') + '"></i>' +
         '<i class="' + (3 <= lvl ? 'on' : '') + '"></i>';
}

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  let t = $('#toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ===== SAVE =====
function saveCart() {
  try { localStorage.setItem('cc_cart', JSON.stringify(cart)); } catch(e) {}
}
function saveFavs() {
  try { localStorage.setItem('cc_favs', JSON.stringify(favs)); } catch(e) {}
}
function saveName() {
  try { localStorage.setItem('cc_name', customerName); } catch(e) {}
}

// ===== CART =====
function addToCart(id) {
  const ex = cart.find(c => c.id === id);
  const item = ITEMS.find(i => i.id === id);
  if (!item) return;

  if (ex) {
    ex.q++;
  } else {
    cart.push({id: id, p: item.p, q: 1});
  }
  saveCart();
  updateCart();
  flashBadge('#cartBadge');
  showToast(item.n + ' added to cart');
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.q += delta;
    if (item.q <= 0) cart = cart.filter(c => c.id !== id);
  }
  saveCart();
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCart();
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  updateCart();
  showToast('Cart cleared');
}

function updateCart() {
  const count = cart.reduce((s,c) => s + c.q, 0);
  const total = cart.reduce((s,c) => s + c.p * c.q, 0);

  const cb = $('#cartBadge');
  if (cb) {
    cb.textContent = count;
    cb.classList.toggle('show', count > 0);
  }

  const ic = $('#cdCount');
  if (ic) ic.textContent = count + (count === 1 ? ' item' : ' items');

  const body = $('#cdBody');
  const foot = $('#cdFoot');
  const tot = $('#cdTotal');

  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML =
      '<div class="cd-empty">' +
        '<div class="cde-circle">🍽️</div>' +
        '<p>Your cart is empty</p>' +
        '<small>Add some dishes to get started</small>' +
      '</div>';
    if (foot) foot.hidden = true;
    return;
  }

  if (foot) foot.hidden = false;
  if (tot) tot.textContent = '₹' + total;

  body.innerHTML = cart.map(c => {
    const item = ITEMS.find(i => i.id === c.id);
    if (!item) return '';
    return '<div class="cd-item">' +
      '<div class="cdi-img" style="background:' + item.bg + '">' + item.e + '</div>' +
      '<div class="cdi-info">' +
        '<div class="cdi-name">' + escapeHTML(item.n) + '</div>' +
        '<div class="cdi-price">₹' + (item.p * c.q) + '</div>' +
        '<div class="cdi-qty">' +
          '<button class="qb" data-qty="' + c.id + ',-1" aria-label="Decrease">−</button>' +
          '<span class="qn">' + c.q + '</span>' +
          '<button class="qb" data-qty="' + c.id + ',1" aria-label="Increase">+</button>' +
        '</div>' +
      '</div>' +
      '<button class="cdi-rm" data-rm="' + c.id + '" aria-label="Remove">×</button>' +
    '</div>';
  }).join('');

  updateNameField();
  buildWALink(total);
}

function updateNameField() {
  const wrap = $('#cdNameWrap');
  const input = $('#cdNameInput');
  if (!wrap || !input) return;
  
  input.value = customerName;
  wrap.classList.toggle('has-name', customerName.trim().length >= 2);
}

function buildWALink(total) {
  const wa = $('#cdWA');
  if (!wa) return;

  const name = (customerName || '').trim();
  
  let m = 'Hi *Crust & Chilly* 👋\n\n';
  if (name) {
    m += 'My name is *' + name + '* and I\'d like to place this order:\n\n';
  } else {
    m += 'I\'d like to place this order:\n\n';
  }

  cart.forEach(c => {
    const item = ITEMS.find(i => i.id === c.id);
    if (item) m += '• ' + item.n + ' × ' + c.q + ' — ₹' + (item.p * c.q) + '\n';
  });

  m += '\n*Total: ₹' + total + '*\n\n';
  
  if (name) {
    m += 'Order Name: *' + name + '*\n';
  }
  m += 'Please confirm. Thank you! 🙏';

  wa.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(m);
}

// ===== CART CHECKOUT (with name validation) =====
function handleCheckout(e) {
  const name = (customerName || '').trim();
  
  if (name.length < 2) {
    e.preventDefault();
    
    const input = $('#cdNameInput');
    const err = $('#cdNameErr');
    const wrap = $('#cdNameWrap');
    
    if (input) {
      input.classList.add('err');
      input.focus();
      setTimeout(() => input.classList.remove('err'), 500);
    }
    if (err) {
      err.classList.add('show');
      err.textContent = name.length === 0 
        ? '⚠ Please enter your name to continue' 
        : '⚠ Name must be at least 2 characters';
    }
    if (wrap) {
      wrap.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    
    showToast('Please enter your name first');
    return false;
  }
  
  // Name is valid — show confirmation toast
  showToast('Sending order for ' + name + '...');
  return true;
}

// ===== FAVORITES =====
function toggleFav(id) {
  const item = ITEMS.find(i => i.id === id);
  if (isFav(id)) {
    favs = favs.filter(f => f !== id);
    if (item) showToast(item.n + ' removed from favorites');
  } else {
    favs.push(id);
    flashBadge('#favBadge');
    if (item) showToast(item.n + ' added to favorites ♥');
  }
  saveFavs();
  updateFavs();

  $$('[data-fav="' + id + '"]').forEach(btn => {
    const on = isFav(id);
    btn.classList.toggle('on', on);
    btn.innerHTML = on ? '♥' : '♡';
  });

  if (window.CC_onFavChange) window.CC_onFavChange(id);
}

function updateFavs() {
  const b = $('#favBadge');
  if (b) {
    b.textContent = favs.length;
    b.classList.toggle('show', favs.length > 0);
  }
}

function flashBadge(sel) {
  const el = $(sel);
  if (!el) return;
  el.style.transform = 'scale(1.4)';
  setTimeout(() => { el.style.transform = ''; }, 250);
}

// ===== MODAL =====
function openModal(id) {
  const item = ITEMS.find(i => i.id === id);
  if (!item) return;
  const modal = $('#modal');
  const ov = $('#modOv');
  const body = $('#modBody');
  if (!modal || !body) return;

  const spiceLabel = ['', 'Mild', 'Medium', 'Hot'][item.sp] || '';
  const tagPill = item.tag
    ? '<span class="dm-pill" style="background:#FEF3C7;color:#B45309">' + escapeHTML(item.tag) + '</span>'
    : '';
  const oldPrice = item.op ? '<span class="dm-old">₹' + item.op + '</span>' : '';

  body.innerHTML =
    '<div class="dm-vis" style="background:' + item.bg + '">' + item.e + '</div>' +
    '<div class="dm-body">' +
      '<div class="dm-pills">' +
        '<span class="dm-pill dmp-v">🌿 Vegetarian</span>' +
        '<span class="dm-pill dmp-s">🌶️ ' + spiceLabel + '</span>' +
        tagPill +
      '</div>' +
      '<h2 class="dm-name">' + escapeHTML(item.n) + '</h2>' +
      '<div class="dm-rate">⭐ ' + item.r + ' · ' + item.rc + ' reviews</div>' +
      '<p class="dm-desc">' + escapeHTML(item.d) + '</p>' +
      '<div class="dm-price-row">' +
        '<span class="dm-price">₹' + item.p + oldPrice + '</span>' +
      '</div>' +
      '<div class="dm-btns">' +
        '<button class="btn btn-spice" data-modal-add="' + item.id + '">Add to Cart</button>' +
        '<button class="btn btn-ghost" data-modal-fav="' + item.id + '">' + (isFav(item.id) ? '♥ Saved' : '♡ Save') + '</button>' +
      '</div>' +
    '</div>';

  modal.classList.add('show');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const m = $('#modal');
  const o = $('#modOv');
  if (m) m.classList.remove('show');
  if (o) o.classList.remove('show');
  document.body.style.overflow = '';
}

// ===== CART DRAWER =====
function openCart() {
  const cd = $('#cartDrawer');
  const ov = $('#cartOv');
  if (cd) cd.classList.add('open');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
  updateCart();
}

function closeCart() {
  const cd = $('#cartDrawer');
  const ov = $('#cartOv');
  if (cd) cd.classList.remove('open');
  if (ov) ov.classList.remove('show');
  document.body.style.overflow = '';
  
  // Hide error if any
  const err = $('#cdNameErr');
  if (err) err.classList.remove('show');
}

// ===== MOB NAV =====
function closeMobNav() {
  const mn = $('#navMob');
  const bg = $('#burger');
  const ov = $('#navOv');
  if (mn) mn.classList.remove('open');
  if (bg) bg.classList.remove('on');
  if (ov) ov.classList.remove('show');
  document.body.style.overflow = '';
}

function openMobNav() {
  const mn = $('#navMob');
  const bg = $('#burger');
  const ov = $('#navOv');
  if (mn) mn.classList.add('open');
  if (bg) bg.classList.add('on');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// ===== EVENT DELEGATION =====
function setupDelegation() {
  document.addEventListener('click', e => {
    const t = e.target;

    // Add to cart
    const addBtn = t.closest('[data-add]');
    if (addBtn) {
      e.stopPropagation();
      e.preventDefault();
      const id = parseInt(addBtn.dataset.add);
      addToCart(id);
      const orig = addBtn.innerHTML;
      addBtn.innerHTML = '✓';
      addBtn.style.background = '#6B7F3A';
      setTimeout(() => {
        addBtn.innerHTML = orig;
        addBtn.style.background = '';
      }, 800);
      return;
    }

    // Open modal
    const modalTrigger = t.closest('[data-modal]');
    if (modalTrigger && !t.closest('[data-fav]') && !t.closest('[data-add]')) {
      openModal(parseInt(modalTrigger.dataset.modal));
      return;
    }

    // Fav toggle
    const favBtn = t.closest('[data-fav]');
    if (favBtn) {
      e.stopPropagation();
      e.preventDefault();
      toggleFav(parseInt(favBtn.dataset.fav));
      return;
    }

    // Quantity buttons
    const qtyBtn = t.closest('[data-qty]');
    if (qtyBtn) {
      const parts = qtyBtn.dataset.qty.split(',').map(Number);
      changeQty(parts[0], parts[1]);
      return;
    }

    // Remove from cart
    const rmBtn = t.closest('[data-rm]');
    if (rmBtn) {
      removeFromCart(parseInt(rmBtn.dataset.rm));
      return;
    }

    // Modal add
    const modAdd = t.closest('[data-modal-add]');
    if (modAdd) {
      addToCart(parseInt(modAdd.dataset.modalAdd));
      closeModal();
      return;
    }

    // Modal fav
    const modFav = t.closest('[data-modal-fav]');
    if (modFav) {
      const id = parseInt(modFav.dataset.modalFav);
      toggleFav(id);
      modFav.textContent = isFav(id) ? '♥ Saved' : '♡ Save';
      return;
    }
  });
}

// ===== INIT =====
function init() {
  // Preloader
  window.addEventListener('load', () => {
    setTimeout(() => {
      const p = $('#preloader');
      if (p) p.classList.add('done');
    }, 400);
  });

  setupDelegation();

  // Scroll handler
  const topbar = $('#topbar');
  const backTop = $('#backTop');
  const floatWA = $('#floatWA');
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (topbar && !topbar.classList.contains('topbar-solid')) {
        topbar.classList.toggle('scrolled', y > 50);
      }
      if (backTop) backTop.classList.toggle('show', y > 400);
      if (floatWA && y > 300) floatWA.classList.add('show');
      else if (floatWA && y < 100) floatWA.classList.remove('show');
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  // Mobile menu
  const burger = $('#burger');
  const navOv = $('#navOv');

  if (burger) {
    burger.addEventListener('click', () => {
      const mn = $('#navMob');
      const isOpen = mn && mn.classList.contains('open');
      isOpen ? closeMobNav() : openMobNav();
    });
  }
  if (navOv) navOv.addEventListener('click', closeMobNav);
  $$('.nav-mob a').forEach(a => a.addEventListener('click', closeMobNav));

  // Cart drawer
  const cartBtn = $('#cartBtn');
  const cdClose = $('#cdClose');
  const cartOv = $('#cartOv');
  const cdClear = $('#cdClear');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cdClose) cdClose.addEventListener('click', closeCart);
  if (cartOv) cartOv.addEventListener('click', closeCart);
  if (cdClear) cdClear.addEventListener('click', clearCart);

  // Customer name input
  const nameInput = $('#cdNameInput');
  const nameErr = $('#cdNameErr');
  if (nameInput) {
    nameInput.value = customerName;
    nameInput.addEventListener('input', e => {
      customerName = e.target.value;
      saveName();
      updateNameField();
      
      // Hide error if user starts typing
      if (nameErr && customerName.trim().length >= 2) {
        nameErr.classList.remove('show');
        nameInput.classList.remove('err');
      }
      
      // Rebuild WA link with updated name
      const total = cart.reduce((s,c) => s + c.p * c.q, 0);
      buildWALink(total);
    });
  }

  // WhatsApp checkout button — validate name
  const wa = $('#cdWA');
  if (wa) {
    wa.addEventListener('click', handleCheckout);
  }

  // Fav button
  const favBtn = $('#favBtn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (document.body.classList.contains('pg-menu')) {
        if (window.CC_toggleFavFilter) window.CC_toggleFavFilter();
      } else {
        window.location.href = 'menu.html';
      }
    });
  }

  // Modal close
  const modClose = $('#modClose');
  const modOv = $('#modOv');
  if (modClose) modClose.addEventListener('click', closeModal);
  if (modOv) modOv.addEventListener('click', closeModal);

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
      closeMobNav();
    }
  });

  // Reveal animations
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('vis');
          obs.unobserve(en.target);
        }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -60px 0px'});
    $$('[data-anim]').forEach(el => obs.observe(el));
  } else {
    $$('[data-anim]').forEach(el => el.classList.add('vis'));
  }

  // Initial UI
  updateCart();
  updateFavs();
}

// ===== PUBLIC API =====
window.CC = {
  add: addToCart,
  qty: changeQty,
  rm: removeFromCart,
  fav: toggleFav,
  modal: openModal,
  closeM: closeModal,
  openCart: openCart,
  closeCart: closeCart,
  isFav: isFav,
  escapeHTML: escapeHTML,
  debounce: debounce,
  spDots: spDots,
  toast: showToast,
  $: $, $$: $$
};

// START
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();