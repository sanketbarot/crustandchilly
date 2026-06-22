/* ============================================
   CRUST & CHILLY v3.0 — Performance Optimized
   ============================================ */
(function() {
'use strict';

// ===== CONFIG =====
const VERSION = '3.0';
const PHONE = '917487980840';

// Clear old data on version mismatch
try {
  if (localStorage.getItem('cc_version') !== VERSION) {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('cc_version', VERSION);
  }
} catch(e) {}

// ===== DATA =====
const ITEMS = [
{id:1,n:'Crust Crunch Burger',c:'burgers',p:149,op:199,d:'Double patty, smoky sauce, cheese & onion rings',r:4.9,rc:324,tag:'Bestseller',sp:2,e:'🍔',bg:'#FFE8D6'},
{id:2,n:'Classic Cheese Burger',c:'burgers',p:119,op:0,d:'Patty, cheddar, lettuce, tomato',r:4.7,rc:189,tag:'Popular',sp:1,e:'🍔',bg:'#FFF3E0'},
{id:3,n:'Paneer Tikka Burger',c:'burgers',p:139,op:0,d:'Grilled paneer tikka, mint mayo',r:4.6,rc:203,tag:'',sp:2,e:'🍔',bg:'#E8F5E9'},
{id:4,n:'Spicy Aloo Burger',c:'burgers',p:89,op:0,d:'Crispy aloo tikki with spicy chutney',r:4.5,rc:278,tag:'',sp:2,e:'🍔',bg:'#FFFDE7'},
{id:5,n:'Mushroom Swiss Burger',c:'burgers',p:169,op:0,d:'Sautéed mushrooms, swiss cheese',r:4.7,rc:134,tag:'',sp:1,e:'🍔',bg:'#FFF8E1'},
{id:6,n:'BBQ Crunch Burger',c:'burgers',p:159,op:0,d:'BBQ sauce, caramelized onions, cheddar',r:4.8,rc:156,tag:'New',sp:1,e:'🍔',bg:'#FBE9E7'},
{id:7,n:'Veggie Supreme',c:'burgers',p:129,op:0,d:'Mixed veggie patty, avocado, sprouts',r:4.6,rc:167,tag:'',sp:1,e:'🍔',bg:'#E8F5E9'},
{id:8,n:'Mexican Burger',c:'burgers',p:149,op:0,d:'Beans patty, jalapeños, salsa',r:4.7,rc:198,tag:'',sp:3,e:'🍔',bg:'#FFEBEE'},
{id:9,n:'Peri Peri Burger',c:'burgers',p:159,op:0,d:'Peri peri patty, roasted peppers',r:4.8,rc:112,tag:'Popular',sp:3,e:'🍔',bg:'#FCE4EC'},
{id:10,n:'Double Trouble',c:'burgers',p:199,op:259,d:'Two patties, double cheese',r:4.9,rc:89,tag:'New',sp:2,e:'🍔',bg:'#FFF3E0'},
{id:11,n:'Corn & Bean Burger',c:'burgers',p:109,op:0,d:'Sweet corn & black bean patty',r:4.4,rc:145,tag:'',sp:1,e:'🍔',bg:'#F1F8E9'},
{id:12,n:'Tandoori Paneer Burger',c:'burgers',p:149,op:0,d:'Tandoori paneer, raita, pickled onion',r:4.8,rc:245,tag:'Bestseller',sp:2,e:'🍔',bg:'#FFCCBC'},
{id:13,n:'Spicy Paneer Wrap',c:'wraps',p:129,op:0,d:'Grilled paneer, spicy mayo in tortilla',r:4.8,rc:212,tag:'Popular',sp:2,e:'🌯',bg:'#E8F5E9'},
{id:14,n:'Veg Frankie Roll',c:'wraps',p:99,op:0,d:'Mixed veggie filling with chutney',r:4.5,rc:178,tag:'',sp:2,e:'🌯',bg:'#FFFDE7'},
{id:15,n:'Tandoori Paneer Roll',c:'wraps',p:139,op:0,d:'Tandoori paneer, mint chutney',r:4.7,rc:134,tag:'',sp:2,e:'🌯',bg:'#FCE4EC'},
{id:16,n:'Falafel Wrap',c:'wraps',p:139,op:0,d:'Crispy falafel, hummus, tahini',r:4.7,rc:98,tag:'New',sp:1,e:'🌯',bg:'#E8EAF6'},
{id:17,n:'Mushroom Cheese Roll',c:'wraps',p:129,op:0,d:'Mushrooms with melted cheese & herbs',r:4.5,rc:87,tag:'',sp:1,e:'🌯',bg:'#EFEBE9'},
{id:18,n:'Mexican Bean Wrap',c:'wraps',p:119,op:0,d:'Spicy beans, corn, cheese, salsa',r:4.6,rc:156,tag:'Popular',sp:2,e:'🌯',bg:'#FFEBEE'},
{id:19,n:'Schezwan Paneer Roll',c:'wraps',p:139,op:0,d:'Paneer in schezwan sauce',r:4.8,rc:234,tag:'Bestseller',sp:3,e:'🌯',bg:'#FBE9E7'},
{id:20,n:'Garden Fresh Wrap',c:'wraps',p:99,op:0,d:'Grilled veggies, hummus & greens',r:4.4,rc:112,tag:'',sp:1,e:'🌯',bg:'#E8F5E9'},
{id:21,n:'Chilly Cheese Fries',c:'fries',p:119,op:0,d:'Loaded fries, cheese, chilly flakes',r:4.9,rc:456,tag:'Must Try',sp:2,e:'🍟',bg:'#FFF9C4'},
{id:22,n:'Classic Salted Fries',c:'fries',p:69,op:0,d:'Golden fries with sea salt',r:4.5,rc:567,tag:'',sp:1,e:'🍟',bg:'#FFFDE7'},
{id:23,n:'Peri Peri Fries',c:'fries',p:99,op:0,d:'Fries in fiery peri peri seasoning',r:4.7,rc:234,tag:'',sp:3,e:'🍟',bg:'#FFEBEE'},
{id:24,n:'Loaded Nachos Fries',c:'fries',p:149,op:0,d:'Fries with nachos & jalapeños',r:4.8,rc:189,tag:'New',sp:2,e:'🍟',bg:'#FFF3E0'},
{id:25,n:'Garlic Butter Fries',c:'fries',p:89,op:0,d:'Fries in garlic butter with parmesan',r:4.6,rc:145,tag:'',sp:1,e:'🍟',bg:'#F1F8E9'},
{id:26,n:'Masala Magic Fries',c:'fries',p:79,op:0,d:'Indian spice fries with chaat masala',r:4.7,rc:312,tag:'Popular',sp:2,e:'🍟',bg:'#FCE4EC'},
{id:27,n:'Club Grilled Sandwich',c:'sandwiches',p:109,op:139,d:'Triple-layer grilled with cheese',r:4.7,rc:178,tag:'New',sp:1,e:'🥪',bg:'#FFF3E0'},
{id:28,n:'Paneer Tikka Sandwich',c:'sandwiches',p:119,op:0,d:'Grilled paneer tikka, bell peppers',r:4.6,rc:145,tag:'',sp:2,e:'🥪',bg:'#FCE4EC'},
{id:29,n:'Cheese Corn Sandwich',c:'sandwiches',p:99,op:0,d:'Sweet corn, cheese, mayo on multigrain',r:4.5,rc:123,tag:'',sp:1,e:'🥪',bg:'#FFF9C4'},
{id:30,n:'Bombay Masala Toast',c:'sandwiches',p:79,op:0,d:'Potato, beetroot, chutney & cheese',r:4.8,rc:389,tag:'Popular',sp:2,e:'🥪',bg:'#E8F5E9'},
{id:31,n:'Mushroom Melt Sandwich',c:'sandwiches',p:109,op:0,d:'Mushrooms, onions, swiss cheese',r:4.6,rc:98,tag:'',sp:1,e:'🥪',bg:'#EFEBE9'},
{id:32,n:'Veg Mayo Sandwich',c:'sandwiches',p:69,op:0,d:'Fresh veggies with creamy mayo',r:4.3,rc:234,tag:'',sp:1,e:'🥪',bg:'#E8F5E9'},
{id:33,n:'Mexican Grilled Sandwich',c:'sandwiches',p:129,op:0,d:'Beans, jalapeños, corn, cheese, salsa',r:4.7,rc:112,tag:'New',sp:3,e:'🥪',bg:'#FFEBEE'},
{id:34,n:'Chocolate Sandwich',c:'sandwiches',p:79,op:0,d:'Warm chocolate with banana',r:4.4,rc:198,tag:'',sp:1,e:'🥪',bg:'#EFEBE9'},
{id:35,n:'Pesto Veggie Sandwich',c:'sandwiches',p:119,op:0,d:'Basil pesto, zucchini, mozzarella',r:4.7,rc:89,tag:'',sp:1,e:'🥪',bg:'#E8F5E9'},
{id:36,n:'Spicy Aloo Sandwich',c:'sandwiches',p:89,op:0,d:'Spiced potato with chutney',r:4.5,rc:267,tag:'Popular',sp:2,e:'🥪',bg:'#FFF3E0'},
{id:37,n:'Masala Tikka Pav',c:'tikka-pav',p:99,op:0,d:'Spicy tikka masala with butter pav',r:4.9,rc:389,tag:'Bestseller',sp:3,e:'🌭',bg:'#FCE4EC'},
{id:38,n:'Cheese Tikka Pav',c:'tikka-pav',p:119,op:0,d:'Tikka with melted cheese on pav',r:4.8,rc:267,tag:'Popular',sp:2,e:'🌭',bg:'#FFF3E0'},
{id:39,n:'Paneer Tikka Pav',c:'tikka-pav',p:129,op:0,d:'Grilled paneer in rich gravy',r:4.7,rc:178,tag:'',sp:2,e:'🌭',bg:'#E8F5E9'},
{id:40,n:'Mushroom Tikka Pav',c:'tikka-pav',p:119,op:0,d:'Mushrooms in creamy tikka',r:4.5,rc:89,tag:'New',sp:2,e:'🌭',bg:'#EFEBE9'},
{id:41,n:'Special Mix Tikka Pav',c:'tikka-pav',p:139,op:0,d:'Paneer, mushroom & veggies',r:4.8,rc:198,tag:'',sp:2,e:'🌭',bg:'#FFF8E1'},
{id:42,n:'Schezwan Tikka Pav',c:'tikka-pav',p:109,op:0,d:'Fiery schezwan tikka',r:4.6,rc:156,tag:'',sp:3,e:'🌭',bg:'#FFEBEE'},
{id:43,n:'Jain Tikka Pav',c:'tikka-pav',p:99,op:0,d:'No onion no garlic tikka',r:4.5,rc:134,tag:'',sp:1,e:'🌭',bg:'#FFFDE7'},
{id:44,n:'Cheese Garlic Bites',c:'quick-bites',p:89,op:0,d:'Crispy bites with cheese & garlic',r:4.8,rc:267,tag:'Popular',sp:1,e:'🧀',bg:'#E3F2FD'},
{id:45,n:'Veg Spring Rolls',c:'quick-bites',p:99,op:0,d:'Crispy rolls with veggies',r:4.5,rc:189,tag:'',sp:1,e:'🧀',bg:'#E8F5E9'},
{id:46,n:'Corn Cheese Balls',c:'quick-bites',p:109,op:0,d:'Corn & cheese fried balls',r:4.7,rc:156,tag:'',sp:1,e:'🧀',bg:'#FFF9C4'},
{id:47,n:'Paneer Popcorn',c:'quick-bites',p:119,op:0,d:'Bite-sized paneer fried crispy',r:4.7,rc:145,tag:'New',sp:2,e:'🧀',bg:'#FCE4EC'},
{id:48,n:'Onion Rings',c:'quick-bites',p:79,op:0,d:'Thick onion rings, crispy',r:4.4,rc:198,tag:'',sp:1,e:'🧀',bg:'#FFFDE7'},
{id:49,n:'Nachos Grande',c:'quick-bites',p:149,op:0,d:'Loaded nachos with cheese',r:4.8,rc:178,tag:'Popular',sp:2,e:'🧀',bg:'#FFF3E0'},
{id:50,n:'Potato Wedges',c:'quick-bites',p:89,op:0,d:'Seasoned wedges with cream',r:4.5,rc:123,tag:'',sp:1,e:'🧀',bg:'#F1F8E9'},
{id:51,n:'Stuffed Mushrooms',c:'quick-bites',p:129,op:0,d:'Mushrooms with cheese & herbs',r:4.6,rc:98,tag:'',sp:1,e:'🧀',bg:'#EFEBE9'},
{id:52,n:'Crispy Corn',c:'quick-bites',p:99,op:0,d:'Crunchy fried corn, spicy',r:4.7,rc:234,tag:'Must Try',sp:2,e:'🧀',bg:'#FFF9C4'},
{id:53,n:'Coca-Cola',c:'cold-drinks',p:40,op:0,d:'Chilled 300ml',r:4.5,rc:890,tag:'',sp:1,e:'🥤',bg:'#FFEBEE'},
{id:54,n:'Thumbs Up',c:'cold-drinks',p:40,op:0,d:'Chilled 300ml',r:4.4,rc:678,tag:'',sp:1,e:'🥤',bg:'#E3F2FD'},
{id:55,n:'Sprite',c:'cold-drinks',p:40,op:0,d:'Chilled 300ml',r:4.5,rc:567,tag:'',sp:1,e:'🥤',bg:'#E8F5E9'},
{id:56,n:'Fresh Lime Soda',c:'cold-drinks',p:49,op:0,d:'Fresh lime with soda',r:4.7,rc:345,tag:'',sp:1,e:'🥤',bg:'#F1F8E9'},
{id:57,n:'Cold Coffee',c:'cold-drinks',p:79,op:0,d:'Creamy coffee with ice cream',r:4.8,rc:289,tag:'Popular',sp:1,e:'🥤',bg:'#EFEBE9'},
{id:58,n:'Mango Lassi',c:'cold-drinks',p:69,op:0,d:'Thick mango yogurt drink',r:4.6,rc:234,tag:'',sp:1,e:'🥤',bg:'#FFF9C4'},
{id:59,n:'Masala Chaas',c:'cold-drinks',p:39,op:0,d:'Spiced buttermilk with mint',r:4.5,rc:456,tag:'',sp:1,e:'🥤',bg:'#FFFDE7'},
{id:60,n:'Oreo Shake',c:'cold-drinks',p:99,op:0,d:'Thick oreo milkshake',r:4.8,rc:198,tag:'New',sp:1,e:'🥤',bg:'#F3E5F5'},
{id:61,n:'Berry Blast Mocktail',c:'mocktails',p:79,op:0,d:'Berries, soda, lime, mint',r:4.7,rc:198,tag:'',sp:1,e:'🍹',bg:'#F3E5F5'},
{id:62,n:'Virgin Mojito',c:'mocktails',p:89,op:0,d:'Lime, mint, soda, crushed ice',r:4.8,rc:345,tag:'Bestseller',sp:1,e:'🍹',bg:'#E8F5E9'},
{id:63,n:'Blue Lagoon',c:'mocktails',p:99,op:0,d:'Blue curacao, lemon, soda',r:4.6,rc:156,tag:'',sp:1,e:'🍹',bg:'#E3F2FD'},
{id:64,n:'Sunset Cooler',c:'mocktails',p:89,op:0,d:'Orange, grenadine, lime, soda',r:4.7,rc:123,tag:'New',sp:1,e:'🍹',bg:'#FFF3E0'},
{id:65,n:'Watermelon Fizz',c:'mocktails',p:79,op:0,d:'Watermelon, lime, sparkling soda',r:4.5,rc:89,tag:'',sp:1,e:'🍹',bg:'#FCE4EC'},
{id:66,n:'Mango Tango',c:'mocktails',p:99,op:0,d:'Mango, passion fruit, soda',r:4.8,rc:178,tag:'Popular',sp:1,e:'🍹',bg:'#FFF9C4'},
{id:67,n:'Burger Bonanza',c:'combos',p:199,op:289,d:'1 Burger + Fries + Cold Drink',r:4.9,rc:456,tag:'Combo',sp:1,e:'🍽️',bg:'#FFE8D6'},
{id:68,n:'Wrap & Roll Combo',c:'combos',p:349,op:499,d:'Sandwich + Wrap + 2 Mocktails',r:4.8,rc:234,tag:'Combo',sp:1,e:'🍽️',bg:'#E3F2FD'},
{id:69,n:'Family Feast',c:'combos',p:649,op:949,d:'2 Burgers + 2 Tikka Pav + Fries + 4 Drinks',r:4.9,rc:189,tag:'Combo',sp:1,e:'🍽️',bg:'#FFF3E0'},
{id:70,n:'Solo Crunch',c:'combos',p:149,op:199,d:'Burger + Small Fries + Drink',r:4.6,rc:345,tag:'Combo',sp:1,e:'🍽️',bg:'#FFFDE7'},
{id:71,n:'Couple Special',c:'combos',p:449,op:599,d:'2 Burgers + Fries + 2 Mocktails',r:4.8,rc:167,tag:'Combo',sp:1,e:'🍽️',bg:'#FCE4EC'},
{id:72,n:'Chilly Paneer Dry',c:'chilly-specials',p:149,op:0,d:'Crispy paneer in chilly sauce',r:4.8,rc:289,tag:'Bestseller',sp:3,e:'🔥',bg:'#FFEBEE'},
{id:73,n:'Chilly Mushroom',c:'chilly-specials',p:129,op:0,d:'Mushrooms in chilly garlic',r:4.6,rc:145,tag:'',sp:2,e:'🔥',bg:'#EFEBE9'},
{id:74,n:'Chilly Baby Corn',c:'chilly-specials',p:119,op:0,d:'Baby corn in schezwan',r:4.5,rc:123,tag:'',sp:2,e:'🔥',bg:'#FFF9C4'},
{id:75,n:'Chilly Noodles',c:'chilly-specials',p:109,op:0,d:'Noodles in chilly garlic',r:4.6,rc:234,tag:'Popular',sp:2,e:'🔥',bg:'#E8F5E9'},
{id:76,n:'Chilly Cheese Toast',c:'chilly-specials',p:89,op:0,d:'Toast with chilly cheese',r:4.7,rc:167,tag:'',sp:2,e:'🔥',bg:'#FFF3E0'},
{id:77,n:'Chilly Potato',c:'chilly-specials',p:99,op:0,d:'Honey chilli potato',r:4.8,rc:345,tag:'Popular',sp:2,e:'🔥',bg:'#FFFDE7'},
{id:78,n:'Chilly Manchurian',c:'chilly-specials',p:129,op:0,d:'Veg manchurian in chilly gravy',r:4.7,rc:198,tag:'Must Try',sp:3,e:'🔥',bg:'#FFEBEE'},
{id:79,n:'Schezwan Chilly Paneer',c:'chilly-specials',p:159,op:0,d:'Paneer in extra spicy schezwan',r:4.9,rc:278,tag:'New',sp:3,e:'🔥',bg:'#FBE9E7'}
];

const CATS = [
{id:'burgers',n:'Burgers',e:'🍔',ct:12},
{id:'wraps',n:'Wraps',e:'🌯',ct:8},
{id:'fries',n:'Fries',e:'🍟',ct:6},
{id:'sandwiches',n:'Sandwiches',e:'🥪',ct:10},
{id:'tikka-pav',n:'Tikka Pav',e:'🌭',ct:7},
{id:'quick-bites',n:'Quick Bites',e:'🧀',ct:9},
{id:'cold-drinks',n:'Cold Drinks',e:'🥤',ct:8},
{id:'mocktails',n:'Mocktails',e:'🍹',ct:6},
{id:'combos',n:'Combos',e:'🍽️',ct:5},
{id:'chilly-specials',n:'Chilly',e:'🔥',ct:8}
];

const TESTIMONIALS = [
{n:'Rahul K.',i:'RK',role:'Food Blogger',t:'Best veg burgers in Shela by far. The Crust Crunch is unreal - obsessed.',s:5},
{n:'Priya S.',i:'PS',role:'Regular Customer',t:'Tikka Pav here is dangerously addictive. Family favorite for late-night.',s:5},
{n:'Ankit M.',i:'AM',role:'Verified Customer',t:'Family Feast combo is incredible value. Fresh, fast, and packed with flavor.',s:5},
{n:'Sneha P.',i:'SP',role:'College Student',t:'Open till 3 AM = my new lifesaver. Wraps are always fresh.',s:5},
{n:'Karan D.',i:'KD',role:'Food Enthusiast',t:'Restaurant-quality chilly paneer. Hard to believe its all 100% vegetarian.',s:5}
];

// ===== STATE =====
let cart = [];
let favs = [];
try {
  cart = JSON.parse(localStorage.getItem('cc_cart') || '[]');
  favs = JSON.parse(localStorage.getItem('cc_favs') || '[]');
} catch(e) {}

let state = {
  cat: 'all',
  search: '',
  sort: 'default',
  price: 'all',
  spice: 'all',
  badge: '',
  favOnly: false
};

// ===== HELPERS =====
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const isFav = id => favs.indexOf(id) !== -1;
const spDots = lvl => '<i class="' + (1 <= lvl ? 'on' : '') + '"></i><i class="' + (2 <= lvl ? 'on' : '') + '"></i><i class="' + (3 <= lvl ? 'on' : '') + '"></i>';

function debounce(fn, wait) {
  let t;
  return function() {
    const args = arguments, ctx = this;
    clearTimeout(t);
    t = setTimeout(() => fn.apply(ctx, args), wait);
  };
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ===== CARD HTML =====
function cardHTML(item) {
  const fav = isFav(item.id);
  const tag = item.tag ? '<span class="pc-tag">' + escapeHTML(item.tag) + '</span>' : '';
  const old = item.op ? '<span class="old">₹' + item.op + '</span>' : '';
  
  return '<div class="pick-card">' +
    '<div class="pc-vis" style="background:' + item.bg + '" data-modal="' + item.id + '">' +
      tag +
      '<button class="pc-fav' + (fav ? ' on' : '') + '" data-fav="' + item.id + '" aria-label="Favorite">' + (fav ? '♥' : '♡') + '</button>' +
      '<div class="pc-spice">' + spDots(item.sp) + '</div>' +
      item.e +
    '</div>' +
    '<div class="pc-body">' +
      '<div class="pc-rate"><b>★ ' + item.r + '</b> · ' + item.rc + '</div>' +
      '<div class="pc-name" data-modal="' + item.id + '">' + escapeHTML(item.n) + '</div>' +
      '<div class="pc-desc">' + escapeHTML(item.d) + '</div>' +
      '<div class="pc-foot">' +
        '<div class="pc-price">₹' + item.p + old + '</div>' +
        '<button class="pc-add" data-add="' + item.id + '" aria-label="Add">+</button>' +
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
    r = r.filter(i => i.n.toLowerCase().indexOf(s) !== -1 || i.d.toLowerCase().indexOf(s) !== -1);
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
  
  if (state.favOnly) r = r.filter(i => isFav(i.id));
  
  switch(state.sort) {
    case 'pl': r.sort((a,b) => a.p - b.p); break;
    case 'ph': r.sort((a,b) => b.p - a.p); break;
    case 'r': r.sort((a,b) => b.r - a.r); break;
    case 'az': r.sort((a,b) => a.n.localeCompare(b.n)); break;
  }
  
  return r;
}

// ===== RENDERERS =====
function renderMenu() {
  const grid = $('#menuGrid');
  if (!grid) return;
  
  const items = getFiltered();
  
  if (items.length === 0) {
    grid.innerHTML = '';
    const nr = $('#mNone');
    if (nr) nr.style.display = 'block';
  } else {
    grid.innerHTML = items.map(cardHTML).join('');
    const nr = $('#mNone');
    if (nr) nr.style.display = 'none';
  }
  
  const mc = $('#menuCount');
  if (mc) mc.innerHTML = '<b>' + items.length + '</b> ' + (items.length === 1 ? 'dish' : 'dishes');
}

function renderPicks() {
  const track = $('#picksTrack');
  if (!track) return;
  const picks = ITEMS.filter(i => i.tag && i.tag !== 'Combo').slice(0, 8);
  track.innerHTML = picks.map(cardHTML).join('');
}

function renderCats() {
  const grid = $('#catsBento');
  if (!grid) return;
  grid.innerHTML = CATS.map(c =>
    '<a href="menu.html#' + c.id + '" class="cat-tile">' +
      '<span class="ct-emoji">' + c.e + '</span>' +
      '<span class="ct-name">' + c.n + '</span>' +
      '<span class="ct-count">' + c.ct + ' dishes</span>' +
    '</a>'
  ).join('');
}

function renderCombos() {
  const grid = $('#combosCards');
  if (!grid) return;
  const combos = ITEMS.filter(i => i.c === 'combos');
  grid.innerHTML = combos.map(c =>
    '<div class="combo-tile">' +
      '<span class="ct-stamp">' + c.tag + '</span>' +
      '<div class="ct-icon">' + c.e + '</div>' +
      '<h3 class="ct-title">' + escapeHTML(c.n) + '</h3>' +
      '<p class="ct-desc">' + escapeHTML(c.d) + '</p>' +
      '<div class="ct-bottom">' +
        '<div class="ct-prices"><b>₹' + c.p + '</b>' + (c.op ? '<span>₹' + c.op + '</span>' : '') + '</div>' +
        '<button class="ct-add" data-add="' + c.id + '">Add +</button>' +
      '</div>' +
    '</div>'
  ).join('');
}

function renderTestimonials() {
  const track = $('#testiTrack');
  if (!track) return;
  track.innerHTML = TESTIMONIALS.map(t =>
    '<div class="testi-card">' +
      '<div class="tc-quote">"</div>' +
      '<p class="tc-text">' + escapeHTML(t.t) + '</p>' +
      '<div class="tc-author">' +
        '<div class="tc-avatar">' + t.i + '</div>' +
        '<div>' +
          '<span class="tc-name">' + escapeHTML(t.n) + '</span>' +
          '<span class="tc-role">' + escapeHTML(t.role) + '</span>' +
        '</div>' +
      '</div>' +
    '</div>'
  ).join('');
}

// ===== CART =====
function saveCart() {
  try { localStorage.setItem('cc_cart', JSON.stringify(cart)); } catch(e) {}
}

function saveFavs() {
  try { localStorage.setItem('cc_favs', JSON.stringify(favs)); } catch(e) {}
}

function updateCart() {
  const count = cart.reduce((s,c) => s + c.q, 0);
  const total = cart.reduce((s,c) => s + c.p * c.q, 0);
  
  const cb = $('#cartBadge');
  if (cb) {
    cb.textContent = count;
    cb.classList.toggle('show', count > 0);
  }
  
  const ic = $('#scItemCount');
  if (ic) ic.textContent = count + (count === 1 ? ' item' : ' items');
  
  const body = $('#scBody');
  const foot = $('#scFoot');
  const tot = $('#scTotal');
  
  if (!body) return;
  
  if (cart.length === 0) {
    body.innerHTML = '<div class="sc-empty"><div class="sce-circle">🛒</div><p>No items yet</p><small>Start adding to see them here</small></div>';
    if (foot) foot.style.display = 'none';
    return;
  }
  
  if (foot) foot.style.display = 'block';
  if (tot) tot.textContent = '₹' + total;
  
  body.innerHTML = cart.map(c => {
    const item = ITEMS.find(i => i.id === c.id);
    if (!item) return '';
    return '<div class="sc-item">' +
      '<div class="sci-img" style="background:' + item.bg + '">' + item.e + '</div>' +
      '<div class="sci-info">' +
        '<div class="sci-name">' + escapeHTML(item.n) + '</div>' +
        '<div class="sci-price">₹' + (item.p * c.q) + '</div>' +
        '<div class="sci-qty">' +
          '<button class="qb" data-qty="' + c.id + ',-1">−</button>' +
          '<span class="qn">' + c.q + '</span>' +
          '<button class="qb" data-qty="' + c.id + ',1">+</button>' +
        '</div>' +
      '</div>' +
      '<button class="sci-rm" data-rm="' + c.id + '" aria-label="Remove">✕</button>' +
    '</div>';
  }).join('');
  
  const wa = $('#scWA');
  if (wa) {
    let m = 'Hi Crust & Chilly! I would like to place this order:\n\n';
    cart.forEach(c => {
      const item = ITEMS.find(i => i.id === c.id);
      if (item) m += '• ' + item.n + ' × ' + c.q + ' — ₹' + (item.p * c.q) + '\n';
    });
    m += '\nTotal: ₹' + total + '\n\nPlease confirm. Thank you!';
    wa.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(m);
  }
}

function updateFavs() {
  const b = $('#favBadge');
  if (b) {
    b.textContent = favs.length;
    b.classList.toggle('show', favs.length > 0);
  }
}

// ===== MODAL =====
function openModal(id) {
  const item = ITEMS.find(i => i.id === id);
  if (!item) return;
  const modal = $('#detailModal');
  const ov = $('#modOv');
  const body = $('#modBody');
  
  const spiceLabel = ['', 'Mild', 'Medium', 'Hot'][item.sp];
  const tagPill = item.tag ? '<span class="dm-pill" style="background:#FEF3C7;color:#B45309">' + escapeHTML(item.tag) + '</span>' : '';
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
        '<button class="cta-btn cta-red" data-modal-add="' + item.id + '">Add to Cart</button>' +
        '<button class="cta-btn cta-ghost" data-modal-fav="' + item.id + '">' + (isFav(item.id) ? '♥ Saved' : '♡ Save') + '</button>' +
      '</div>' +
    '</div>';
  
  modal.classList.add('show');
  ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const m = $('#detailModal');
  const o = $('#modOv');
  if (m) m.classList.remove('show');
  if (o) o.classList.remove('show');
  document.body.style.overflow = '';
}

// ===== ACTIONS =====
function addToCart(id) {
  const ex = cart.find(c => c.id === id);
  if (ex) {
    ex.q++;
  } else {
    const item = ITEMS.find(i => i.id === id);
    if (item) cart.push({id: id, p: item.p, q: 1});
  }
  saveCart();
  updateCart();
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

function toggleFav(id) {
  if (isFav(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
  }
  saveFavs();
  updateFavs();
  
  // Update UI
  $$('[data-fav="' + id + '"]').forEach(btn => {
    const on = isFav(id);
    btn.classList.toggle('on', on);
    btn.textContent = on ? '♥' : '♡';
  });
  
  // Re-render menu if on menu page (for fav filter)
  if (document.body.classList.contains('pg-menu') && state.favOnly) {
    renderMenu();
  }
}

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
  if (sc) sc.style.display = 'none';
  
  $$('.cat-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
  
  const ss = $('#sortSel'); if (ss) ss.value = 'default';
  const ps = $('#priceSel'); if (ps) ps.value = 'all';
  const sps = $('#spiceSel'); if (sps) sps.value = 'all';
  
  $$('.fp-tag').forEach(b => b.classList.remove('on'));
  const ff = $('#favFilter'); if (ff) ff.classList.remove('on');
  
  renderMenu();
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
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
    }, 50);
  });
}

// ===== EVENT DELEGATION =====
function setupDelegation() {
  document.addEventListener('click', e => {
    const target = e.target;
    
    // Add to cart
    const addBtn = target.closest('[data-add]');
    if (addBtn) {
      e.stopPropagation();
      const id = parseInt(addBtn.dataset.add);
      addToCart(id);
      const orig = addBtn.textContent;
      addBtn.textContent = '✓';
      addBtn.style.background = '#25D366';
      setTimeout(() => {
        addBtn.textContent = orig;
        addBtn.style.background = '';
      }, 800);
      return;
    }
    
    // Open modal
    const modalTrigger = target.closest('[data-modal]');
    if (modalTrigger && !target.closest('[data-fav]')) {
      openModal(parseInt(modalTrigger.dataset.modal));
      return;
    }
    
    // Toggle favorite
    const favBtn = target.closest('[data-fav]');
    if (favBtn) {
      e.stopPropagation();
      toggleFav(parseInt(favBtn.dataset.fav));
      return;
    }
    
    // Cart quantity
    const qtyBtn = target.closest('[data-qty]');
    if (qtyBtn) {
      const [id, delta] = qtyBtn.dataset.qty.split(',').map(Number);
      changeQty(id, delta);
      return;
    }
    
    // Cart remove
    const rmBtn = target.closest('[data-rm]');
    if (rmBtn) {
      removeFromCart(parseInt(rmBtn.dataset.rm));
      return;
    }
    
    // Modal add
    const modalAdd = target.closest('[data-modal-add]');
    if (modalAdd) {
      addToCart(parseInt(modalAdd.dataset.modalAdd));
      closeModal();
      return;
    }
    
    // Modal fav
    const modalFav = target.closest('[data-modal-fav]');
    if (modalFav) {
      const id = parseInt(modalFav.dataset.modalFav);
      toggleFav(id);
      modalFav.textContent = isFav(id) ? '♥ Saved' : '♡ Save';
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
    }, 500);
  });
  
  // Setup event delegation
  setupDelegation();
  
  // Scroll handler (throttled)
  const topbar = $('#topbar');
  const backTop = $('#backTop');
  const floatWA = $('#floatWA');
  
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (topbar && !document.body.classList.contains('pg-menu')) {
        topbar.classList.toggle('scrolled', y > 50);
      }
      if (backTop) backTop.classList.toggle('show', y > 400);
      if (floatWA && !floatWA.classList.contains('show') && y > 300) {
        floatWA.classList.add('show');
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  
  // Back to top
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
  
  // Mobile menu
  const menuToggle = $('#menuToggle');
  const mobNav = $('#mobNav');
  const navOv = $('#navOv');
  
  function closeMobNav() {
    if (mobNav) mobNav.classList.remove('open');
    if (menuToggle) menuToggle.classList.remove('on');
    if (navOv) navOv.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobNav && mobNav.classList.contains('open');
      if (isOpen) {
        closeMobNav();
      } else {
        if (mobNav) mobNav.classList.add('open');
        menuToggle.classList.add('on');
        if (navOv) navOv.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  
  if (navOv) navOv.addEventListener('click', closeMobNav);
  $$('.mob-nav a').forEach(a => a.addEventListener('click', closeMobNav));
  $$('.top-nav a').forEach(a => a.addEventListener('click', closeMobNav));
  
  // Cart drawer
  const cartOv = $('#cartOv');
  const sideCart = $('#sideCart');
  
  function openCart() {
    if (sideCart) sideCart.classList.add('open');
    if (cartOv) cartOv.classList.add('show');
    document.body.style.overflow = 'hidden';
    updateCart();
  }
  
  function closeCart() {
    if (sideCart) sideCart.classList.remove('open');
    if (cartOv) cartOv.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  const cartTrigger = $('#cartTrigger');
  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  
  const scClose = $('#scClose');
  if (scClose) scClose.addEventListener('click', closeCart);
  
  if (cartOv) cartOv.addEventListener('click', closeCart);
  
  const scClear = $('#scClear');
  if (scClear) {
    scClear.addEventListener('click', () => {
      cart = [];
      saveCart();
      updateCart();
    });
  }
  
  // Fav trigger
  const favTrigger = $('#favTrigger');
  if (favTrigger) {
    favTrigger.addEventListener('click', () => {
      if (document.body.classList.contains('pg-menu')) {
        state.favOnly = !state.favOnly;
        const ff = $('#favFilter');
        if (ff) ff.classList.toggle('on', state.favOnly);
        renderMenu();
      } else {
        window.location.href = 'menu.html';
      }
    });
  }
  
  // Modal close
  const modClose = $('#modClose');
  if (modClose) modClose.addEventListener('click', closeModal);
  const modOv = $('#modOv');
  if (modOv) modOv.addEventListener('click', closeModal);
  
  // Picks arrows
  const picksTrack = $('#picksTrack');
  const picksPrev = $('#picksPrev');
  const picksNext = $('#picksNext');
  if (picksPrev && picksTrack) {
    picksPrev.addEventListener('click', () => {
      picksTrack.scrollBy({left: -260, behavior: 'smooth'});
    });
  }
  if (picksNext && picksTrack) {
    picksNext.addEventListener('click', () => {
      picksTrack.scrollBy({left: 260, behavior: 'smooth'});
    });
  }
  
  // ESC to close
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
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
    $$('[data-anim]').forEach(el => obs.observe(el));
  } else {
    $$('[data-anim]').forEach(el => el.classList.add('vis'));
  }
  
  // Initial cart/favs UI
  updateCart();
  updateFavs();
  
  // Page-specific init
  if (document.body.classList.contains('pg-menu')) {
    initMenuPage();
  } else {
    initHomePage();
  }
}

function initHomePage() {
  renderPicks();
  renderCats();
  renderCombos();
  renderTestimonials();
  animateCounters();
}

function initMenuPage() {
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
        history.replaceState(null, '', state.cat === 'all' ? 'menu.html' : 'menu.html#' + state.cat);
      } catch(e) {}
    });
  });
  
  // Search (debounced)
  const searchIn = $('#searchIn');
  const searchClear = $('#searchClear');
  if (searchIn) {
    const onSearch = debounce(e => {
      state.search = e.target.value.toLowerCase().trim();
      if (searchClear) searchClear.style.display = state.search ? 'block' : 'none';
      renderMenu();
    }, 200);
    searchIn.addEventListener('input', onSearch);
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchIn) searchIn.value = '';
      state.search = '';
      searchClear.style.display = 'none';
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
  
  // Filter selects
  const sortSel = $('#sortSel');
  if (sortSel) sortSel.addEventListener('change', e => { state.sort = e.target.value; renderMenu(); });
  
  const priceSel = $('#priceSel');
  if (priceSel) priceSel.addEventListener('change', e => { state.price = e.target.value; renderMenu(); });
  
  const spiceSel = $('#spiceSel');
  if (spiceSel) spiceSel.addEventListener('change', e => { state.spice = e.target.value; renderMenu(); });
  
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
  
  // Fav filter
  const favFilter = $('#favFilter');
  if (favFilter) {
    favFilter.addEventListener('click', () => {
      state.favOnly = !state.favOnly;
      favFilter.classList.toggle('on', state.favOnly);
      renderMenu();
    });
  }
}

// ===== PUBLIC API =====
window.CC = {
  add: addToCart,
  qty: changeQty,
  rm: removeFromCart,
  fav: toggleFav,
  modal: openModal,
  closeM: closeModal,
  reset: resetFilters
};

// ===== START =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();