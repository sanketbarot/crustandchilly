/* ============================================
   CRUST & CHILLY — MENU PAGE JS
   ============================================ */
(function(){
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ===== STATE =====
const state = {
  cat: 'all',
  search: '',
  sort: 'default',
  price: 'all',
  spice: 'all',
  badge: '',
  favOnly: false
};

// ===== MENU CARD HTML =====
function menuCardHTML(item) {
  const fav = window.CC.isFav(item.id);
  const tag = item.tag ? '<span class="mc-tag">' + window.CC.escapeHTML(item.tag) + '</span>' : '';
  const old = item.op ? '<span class="old">₹' + item.op + '</span>' : '';
  const spice =
    '<i class="' + (1 <= item.sp ? 'on' : '') + '"></i>' +
    '<i class="' + (2 <= item.sp ? 'on' : '') + '"></i>' +
    '<i class="' + (3 <= item.sp ? 'on' : '') + '"></i>';

  return '<div class="menu-card" data-modal="' + item.id + '">' +
    '<div class="mc-vis" style="background:' + item.bg + '">' +
      tag +
      '<button class="mc-fav' + (fav ? ' on' : '') + '" data-fav="' + item.id + '" aria-label="Favorite">' + (fav ? '♥' : '♡') + '</button>' +
      '<div class="mc-spice">' + spice + '</div>' +
      item.e +
    '</div>' +
    '<div class="mc-body">' +
      '<div class="mc-rate"><b>★ ' + item.r + '</b> · ' + item.rc + '</div>' +
      '<div class="mc-name">' + window.CC.escapeHTML(item.n) + '</div>' +
      '<div class="mc-desc">' + window.CC.escapeHTML(item.d) + '</div>' +
      '<div class="mc-foot">' +
        '<div class="mc-price">₹' + item.p + old + '</div>' +
        '<button class="mc-add" data-add="' + item.id + '" aria-label="Add">+</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ===== FILTER LOGIC =====
function getFiltered() {
  let r = ITEMS.slice();

  if (state.cat !== 'all') r = r.filter(i => i.c === state.cat);

  if (state.search) {
    const s = state.search;
    r = r.filter(i =>
      i.n.toLowerCase().indexOf(s) !== -1 ||
      i.d.toLowerCase().indexOf(s) !== -1
    );
  }

  if (state.price !== 'all') {
    if (state.price === '0-100') r = r.filter(i => i.p < 100);
    else if (state.price === '100-150') r = r.filter(i => i.p >= 100 && i.p <= 150);
    else r = r.filter(i => i.p > 150);
  }

  if (state.spice !== 'all') r = r.filter(i => i.sp == state.spice);

  if (state.badge) {
    const b = state.badge.toLowerCase();
    r = r.filter(i => i.tag && i.tag.toLowerCase().indexOf(b) !== -1);
  }

  if (state.favOnly) r = r.filter(i => window.CC.isFav(i.id));

  switch (state.sort) {
    case 'pl': r.sort((a,b) => a.p - b.p); break;
    case 'ph': r.sort((a,b) => b.p - a.p); break;
    case 'r':  r.sort((a,b) => b.r - a.r); break;
    case 'az': r.sort((a,b) => a.n.localeCompare(b.n)); break;
  }
  return r;
}

// ===== RENDER =====
function renderMenu() {
  const grid = $('#menuGrid');
  const noRes = $('#mNone');
  if (!grid) return;

  const items = getFiltered();

  if (items.length === 0) {
    grid.innerHTML = '';
    if (noRes) noRes.hidden = false;
  } else {
    grid.innerHTML = items.map(menuCardHTML).join('');
    if (noRes) noRes.hidden = true;
  }

  const mc = $('#menuCount');
  if (mc) mc.innerHTML = '<b>' + items.length + '</b> ' + (items.length === 1 ? 'dish' : 'dishes');
}

// ===== RESET =====
function resetFilters() {
  state.cat = 'all';
  state.search = '';
  state.sort = 'default';
  state.price = 'all';
  state.spice = 'all';
  state.badge = '';
  state.favOnly = false;

  const si = $('#searchIn');
  if (si) si.value = '';
  const sc = $('#searchClear');
  if (sc) sc.hidden = true;

  $$('.cat-chip').forEach((c, i) => c.classList.toggle('active', i === 0));

  const ss = $('#sortSel'); if (ss) ss.value = 'default';
  const ps = $('#priceSel'); if (ps) ps.value = 'all';
  const sps = $('#spiceSel'); if (sps) sps.value = 'all';

  $$('.fp-tag').forEach(b => b.classList.remove('on'));
  const ff = $('#favFilter'); if (ff) ff.classList.remove('on');

  try {
    history.replaceState(null, '', 'menu.html');
  } catch(e) {}

  renderMenu();
}

// ===== INIT =====
function init() {
  // Initial render
  renderMenu();

  // Hash filter
  const hash = location.hash.replace('#', '');
  if (hash) {
    const chip = document.querySelector('.cat-chip[data-c="' + hash + '"]');
    if (chip) {
      $$('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.cat = hash;
      renderMenu();
      // Scroll to grid after small delay
      setTimeout(() => {
        const grid = $('#menuGrid');
        if (grid) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 300);
    }
  }

  // Category chips
  $$('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.cat = chip.dataset.c;
      renderMenu();
      try {
        history.replaceState(null, '',
          state.cat === 'all' ? 'menu.html' : 'menu.html#' + state.cat
        );
      } catch(e) {}
    });
  });

  // Search (debounced)
  const searchIn = $('#searchIn');
  const searchClear = $('#searchClear');
  if (searchIn) {
    const onSearch = window.CC.debounce(e => {
      state.search = e.target.value.toLowerCase().trim();
      if (searchClear) searchClear.hidden = !state.search;
      renderMenu();
    }, 220);
    searchIn.addEventListener('input', onSearch);
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchIn) searchIn.value = '';
      state.search = '';
      searchClear.hidden = true;
      renderMenu();
    });
  }

  // Filter panel toggle
  const filterToggle = $('#filterToggle');
  const filterPanel = $('#filterPanel');
  if (filterToggle && filterPanel) {
    filterToggle.addEventListener('click', () => {
      filterPanel.classList.toggle('show');
      filterToggle.classList.toggle('on');
    });
  }

  // Sort / Price / Spice
  const sortSel = $('#sortSel');
  if (sortSel) sortSel.addEventListener('change', e => {
    state.sort = e.target.value; renderMenu();
  });

  const priceSel = $('#priceSel');
  if (priceSel) priceSel.addEventListener('change', e => {
    state.price = e.target.value; renderMenu();
  });

  const spiceSel = $('#spiceSel');
  if (spiceSel) spiceSel.addEventListener('change', e => {
    state.spice = e.target.value; renderMenu();
  });

  // Badge tags
  $$('.fp-tag').forEach(b => {
    b.addEventListener('click', () => {
      const wasOn = b.classList.contains('on');
      $$('.fp-tag').forEach(x => x.classList.remove('on'));
      if (!wasOn) {
        b.classList.add('on');
        state.badge = b.dataset.b;
      } else {
        state.badge = '';
      }
      renderMenu();
    });
  });

  // Reset
  const fpReset = $('#fpReset');
  if (fpReset) fpReset.addEventListener('click', resetFilters);

  const nrReset = $('#nrReset');
  if (nrReset) nrReset.addEventListener('click', resetFilters);

  // Fav filter button (in tools row)
  const favFilter = $('#favFilter');
  if (favFilter) {
    favFilter.addEventListener('click', () => {
      state.favOnly = !state.favOnly;
      favFilter.classList.toggle('on', state.favOnly);
      renderMenu();
    });
  }

  // Expose for shared.js fav button (in header)
  window.CC_toggleFavFilter = () => {
    state.favOnly = !state.favOnly;
    if (favFilter) favFilter.classList.toggle('on', state.favOnly);
    renderMenu();
    // Scroll to grid
    const grid = $('#menuGrid');
    if (grid) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  // Re-render when fav changes (for fav filter view)
  window.CC_onFavChange = () => {
    if (state.favOnly) renderMenu();
  };

  // Expose reset to global CC
  if (window.CC) window.CC.reset = resetFilters;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();