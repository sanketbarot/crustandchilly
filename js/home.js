/* ============================================
   CRUST & CHILLY v5.0 — HOME PAGE JS
   Auto-sliding signature picks carousel
   ============================================ */
(function(){
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ===== CARD HTML =====
function pickCardHTML(item) {
  const fav = window.CC.isFav(item.id);
  const tag = item.tag ? '<span class="pc-tag">' + window.CC.escapeHTML(item.tag) + '</span>' : '';
  const old = item.op ? '<span class="old">₹' + item.op + '</span>' : '';

  return '<div class="pick-card" data-modal="' + item.id + '">' +
    '<div class="pc-vis" style="background:' + item.bg + '">' +
      tag +
      '<button class="pc-fav' + (fav ? ' on' : '') + '" data-fav="' + item.id + '" aria-label="Favorite">' + (fav ? '♥' : '♡') + '</button>' +
      '<div class="pc-spice">' + window.CC.spDots(item.sp) + '</div>' +
      item.e +
    '</div>' +
    '<div class="pc-body">' +
      '<div class="pc-rate"><b>★ ' + item.r + '</b> · ' + item.rc + ' reviews</div>' +
      '<div class="pc-name">' + window.CC.escapeHTML(item.n) + '</div>' +
      '<div class="pc-desc">' + window.CC.escapeHTML(item.d) + '</div>' +
      '<div class="pc-foot">' +
        '<div class="pc-price">₹' + item.p + old + '</div>' +
        '<button class="pc-add" data-add="' + item.id + '" aria-label="Add to cart">+</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ===== AUTO CAROUSEL =====
const carousel = {
  track: null,
  cards: [],
  dots: [],
  current: 0,
  total: 0,
  cardsPerView: 4,
  autoplayTimer: null,
  autoplayDelay: 4000,
  isPaused: false,
  isDragging: false,
  startX: 0,
  currentX: 0
};

function getCardsPerView() {
  const w = window.innerWidth;
  if (w <= 480) return 1;
  if (w <= 768) return 1;
  if (w <= 1024) return 3;
  return 4;
}

function buildCarousel(items) {
  const wrap = $('#picksWrap');
  if (!wrap) return;

  wrap.innerHTML = 
    '<div class="picks-track" id="picksTrack">' +
      items.map(pickCardHTML).join('') +
    '</div>';

  carousel.track = $('#picksTrack');
  carousel.cards = $$('.pick-card');
  carousel.total = items.length;
  carousel.cardsPerView = getCardsPerView();

  buildDots();
  goTo(0, false);
  startAutoplay();
  setupDragSupport();
}

function buildDots() {
  const dotsWrap = $('#picksDots');
  if (!dotsWrap) return;
  
  const pages = Math.max(1, carousel.total - carousel.cardsPerView + 1);
  const dotCount = Math.min(pages, 8);
  
  let html = '';
  for (let i = 0; i < dotCount; i++) {
    html += '<button class="picks-dot' + (i === 0 ? ' active' : '') + '" data-dot="' + i + '" aria-label="Slide ' + (i+1) + '"></button>';
  }
  dotsWrap.innerHTML = html;
  carousel.dots = $$('.picks-dot');

  carousel.dots.forEach(d => {
    d.addEventListener('click', () => {
      goTo(parseInt(d.dataset.dot));
      restartAutoplay();
    });
  });
}

function goTo(idx, smooth) {
  if (!carousel.track) return;
  
  const max = Math.max(0, carousel.total - carousel.cardsPerView);
  if (idx < 0) idx = max;
  if (idx > max) idx = 0;
  
  carousel.current = idx;

  // Calculate offset
  const card = carousel.cards[0];
  if (!card) return;
  
  const cardWidth = card.offsetWidth;
  const gap = 22;
  const offset = idx * (cardWidth + gap);

  carousel.track.style.transition = smooth === false ? 'none' : 'transform .6s cubic-bezier(.16,1,.3,1)';
  carousel.track.style.transform = 'translateX(-' + offset + 'px)';

  // Update dots
  const dotIdx = Math.min(idx, carousel.dots.length - 1);
  carousel.dots.forEach((d, i) => {
    d.classList.toggle('active', i === dotIdx);
  });
}

function next() {
  goTo(carousel.current + 1);
}

function prev() {
  goTo(carousel.current - 1);
}

function startAutoplay() {
  stopAutoplay();
  if (carousel.isPaused) return;
  carousel.autoplayTimer = setInterval(() => {
    if (!carousel.isPaused && !carousel.isDragging) next();
  }, carousel.autoplayDelay);
}

function stopAutoplay() {
  if (carousel.autoplayTimer) {
    clearInterval(carousel.autoplayTimer);
    carousel.autoplayTimer = null;
  }
}

function restartAutoplay() {
  stopAutoplay();
  setTimeout(startAutoplay, 500);
}

// ===== DRAG / SWIPE SUPPORT =====
function setupDragSupport() {
  const wrap = $('#picksWrap');
  if (!wrap || !carousel.track) return;

  let startX = 0;
  let currentX = 0;
  let dragging = false;
  let startTransform = 0;

  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function onStart(e) {
    dragging = true;
    carousel.isDragging = true;
    startX = getX(e);
    const matrix = window.getComputedStyle(carousel.track).transform;
    startTransform = matrix !== 'none' ? parseFloat(matrix.split(',')[4]) || 0 : 0;
    carousel.track.style.transition = 'none';
    stopAutoplay();
  }

  function onMove(e) {
    if (!dragging) return;
    currentX = getX(e);
    const diff = currentX - startX;
    carousel.track.style.transform = 'translateX(' + (startTransform + diff) + 'px)';
  }

  function onEnd() {
    if (!dragging) return;
    dragging = false;
    carousel.isDragging = false;
    
    const diff = currentX - startX;
    const threshold = 50;
    
    if (diff > threshold) {
      prev();
    } else if (diff < -threshold) {
      next();
    } else {
      goTo(carousel.current);
    }
    
    restartAutoplay();
  }

  // Touch
  wrap.addEventListener('touchstart', onStart, {passive: true});
  wrap.addEventListener('touchmove', onMove, {passive: true});
  wrap.addEventListener('touchend', onEnd);

  // Mouse (desktop)
  wrap.addEventListener('mousedown', e => {
    e.preventDefault();
    onStart(e);
  });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  // Pause on hover
  wrap.addEventListener('mouseenter', () => { carousel.isPaused = true; });
  wrap.addEventListener('mouseleave', () => { carousel.isPaused = false; });

  // Pause on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
}

// ===== RENDER PICKS =====
function renderPicks() {
  const wrap = $('#picksWrap');
  if (!wrap) return;
  const picks = ITEMS.filter(i => i.tag && i.tag !== 'Combo').slice(0, 8);
  buildCarousel(picks);
}

// ===== RENDER CATEGORIES =====
function renderCats() {
  const grid = $('#catsGrid');
  if (!grid) return;
  grid.innerHTML = CATS.map(c =>
    '<a href="menu.html#' + c.id + '" class="cat-tile">' +
      '<span class="ct-emoji">' + c.e + '</span>' +
      '<span class="ct-name">' + c.n + '</span>' +
      '<span class="ct-count">' + c.ct + ' dishes</span>' +
    '</a>'
  ).join('');
}

// ===== RENDER COMBOS =====
function renderCombos() {
  const grid = $('#combosGrid');
  if (!grid) return;
  const combos = ITEMS.filter(i => i.c === 'combos');
  grid.innerHTML = combos.map(c =>
    '<div class="combo-tile">' +
      '<span class="ct-stamp">' + window.CC.escapeHTML(c.tag) + '</span>' +
      '<div class="ct-icon">' + c.e + '</div>' +
      '<h3 class="ct-title">' + window.CC.escapeHTML(c.n) + '</h3>' +
      '<p class="ct-desc">' + window.CC.escapeHTML(c.d) + '</p>' +
      '<div class="ct-bottom">' +
        '<div class="ct-prices"><b>₹' + c.p + '</b>' + (c.op ? '<span>₹' + c.op + '</span>' : '') + '</div>' +
        '<button class="ct-add" data-add="' + c.id + '">Add +</button>' +
      '</div>' +
    '</div>'
  ).join('');
}

// ===== RENDER REVIEWS =====
function renderReviews() {
  const grid = $('#reviewsGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map(t =>
    '<div class="review-card">' +
      '<div class="rc-quote">"</div>' +
      '<p class="rc-text">' + window.CC.escapeHTML(t.t) + '</p>' +
      '<div class="rc-author">' +
        '<div class="rc-avatar">' + t.i + '</div>' +
        '<div>' +
          '<span class="rc-name">' + window.CC.escapeHTML(t.n) + '</span>' +
          '<span class="rc-role">' + window.CC.escapeHTML(t.role) + '</span>' +
        '</div>' +
      '</div>' +
    '</div>'
  ).join('');
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const isDecimal = target % 1 !== 0;
    let curr = 0;
    const step = target / 30;
    const interval = setInterval(() => {
      curr += step;
      if (curr >= target) {
        curr = target;
        clearInterval(interval);
      }
      el.textContent = isDecimal ? curr.toFixed(1) : Math.floor(curr);
    }, 45);
  });
}

// ===== RAIL ARROWS =====
function initRailButtons() {
  const prevBtn = $('#railPrev');
  const nextBtn = $('#railNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
}

// ===== RESIZE HANDLER =====
let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== carousel.cardsPerView) {
      carousel.cardsPerView = newCardsPerView;
      buildDots();
      goTo(0, false);
    } else {
      goTo(carousel.current, false);
    }
  }, 200);
}

// ===== INIT =====
function init() {
  renderPicks();
  renderCats();
  renderCombos();
  renderReviews();
  initRailButtons();
  setTimeout(animateCounters, 600);
  
  window.addEventListener('resize', handleResize, {passive: true});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();