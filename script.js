// ===== PRODUCT DATA =====
const products = [
  // BOYS CLOTHING
  { id: 1, name: "Boys Striped Polo Shirt", category: "boys", emoji: "👕", price: 3500, oldPrice: 4500, sizes: ["0-3m","3-6m","6-12m","1yr","2yr"], badge: "New", desc: "Adorable striped polo for baby boys" },
  { id: 2, name: "Boys Denim Shorts Set", category: "boys", emoji: "🩳", price: 5200, oldPrice: null, sizes: ["6-12m","1yr","2yr","3yr"], badge: null, desc: "Comfy denim shorts with matching top" },
  { id: 3, name: "Boys Formal Suit Set", category: "boys", emoji: "🤵", price: 8500, oldPrice: 10000, sizes: ["1yr","2yr","3yr","4yr","5yr"], badge: "Hot", desc: "Smart formal suit for special occasions" },
  { id: 4, name: "Boys Casual Jogger Set", category: "boys", emoji: "🩺", price: 4200, oldPrice: null, sizes: ["0-3m","3-6m","6-12m","1yr"], badge: null, desc: "Soft and cosy jogger set for baby boys" },

  // GIRLS CLOTHING
  { id: 5, name: "Girls Floral Gown", category: "girls", emoji: "👗", price: 4800, oldPrice: 6000, sizes: ["0-3m","3-6m","6-12m","1yr","2yr","3yr"], badge: "Popular", desc: "Beautiful floral dress for little princesses" },
  { id: 6, name: "Girls Tutu Dress", category: "girls", emoji: "🩱", price: 5500, oldPrice: null, sizes: ["6-12m","1yr","2yr","3yr","4yr"], badge: "New", desc: "Stunning tutu dress with ribbon bow" },
  { id: 7, name: "Girls Skirt & Blouse Set", category: "girls", emoji: "👚", price: 4000, oldPrice: 5000, sizes: ["1yr","2yr","3yr","4yr","5yr"], badge: null, desc: "Cute skirt and matching blouse set" },
  { id: 8, name: "Girls Ankara Gown", category: "girls", emoji: "🎀", price: 6000, oldPrice: 7500, sizes: ["0-3m","3-6m","6-12m","1yr","2yr"], badge: "Hot", desc: "Gorgeous Ankara fabric dress — uniquely Nigerian!" },

  // SHOES
  { id: 9, name: "Baby Boy Sneakers", category: "shoes", emoji: "👟", price: 3800, oldPrice: null, sizes: ["Size 16","Size 17","Size 18","Size 19","Size 20"], badge: null, desc: "Sporty sneakers for active little boys" },
  { id: 10, name: "Baby Girl Sandals", category: "shoes", emoji: "👡", price: 3200, oldPrice: 4000, sizes: ["Size 16","Size 17","Size 18","Size 19"], badge: "New", desc: "Cute strappy sandals for baby girls" },
  { id: 11, name: "Baby Soft Sole Booties", category: "shoes", emoji: "🥿", price: 2500, oldPrice: null, sizes: ["0-3m","3-6m","6-12m"], badge: null, desc: "Soft & safe first shoes for newborns" },
  { id: 12, name: "Kids School Shoes", category: "shoes", emoji: "👞", price: 4500, oldPrice: 5500, sizes: ["Size 20","Size 21","Size 22","Size 23","Size 24"], badge: null, desc: "Durable school shoes for toddlers" },

  // ACCESSORIES
  { id: 13, name: "Girls Hair Band Set (5pcs)", category: "accessories", emoji: "🎀", price: 1500, oldPrice: null, sizes: ["One Size"], badge: "Popular", desc: "Pack of 5 beautiful hair bands for girls" },
  { id: 14, name: "Baby Knit Hat", category: "accessories", emoji: "🧢", price: 1200, oldPrice: 1800, sizes: ["0-3m","3-6m","6-12m"], badge: null, desc: "Warm knitted hat for baby boys & girls" },
  { id: 15, name: "Baby Bow Headband", category: "accessories", emoji: "💝", price: 900, oldPrice: null, sizes: ["One Size"], badge: "New", desc: "Adorable bow headbands — multiple colours" },
  { id: 16, name: "Baby Socks Pack (3 pairs)", category: "accessories", emoji: "🧦", price: 1000, oldPrice: null, sizes: ["0-6m","6-12m","1-2yr"], badge: null, desc: "Soft anti-slip socks for babies" },

  // SETS
  { id: 17, name: "Newborn Gift Set", category: "sets", emoji: "🎁", price: 12000, oldPrice: 15000, sizes: ["0-3m","3-6m"], badge: "Hot", desc: "Complete newborn set — outfit, hat, socks & booties" },
  { id: 18, name: "Boys 3-Piece Casual Set", category: "sets", emoji: "👕", price: 7500, oldPrice: 9000, sizes: ["1yr","2yr","3yr","4yr"], badge: null, desc: "T-shirt, shorts and cap — stylish combo!" },
  { id: 19, name: "Girls 3-Piece Party Set", category: "sets", emoji: "🌸", price: 9000, oldPrice: 11000, sizes: ["1yr","2yr","3yr","4yr","5yr"], badge: "Popular", desc: "Dress, hair band & shoes — party ready!" },
  { id: 20, name: "Twin Baby Matching Set", category: "sets", emoji: "👫", price: 14000, oldPrice: 18000, sizes: ["0-3m","3-6m","6-12m","1yr"], badge: "New", desc: "Matching outfits for twin boys, girls or mixed!" },
];

// ===== STATE =====
let favorites = JSON.parse(localStorage.getItem('rkw_favorites') || '[]');
let orders = JSON.parse(localStorage.getItem('rkw_orders') || '[]');
let currentFilter = 'all';
let searchQuery = '';

// ===== FORMAT PRICE =====
function formatPrice(p) {
  return '₦' + p.toLocaleString('en-NG');
}

// ===== RENDER PRODUCTS =====
function renderProducts(list, containerId = 'productsGrid', showOrderBtn = true) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-mid)">
      <span style="font-size:3rem;display:block;margin-bottom:12px">😕</span>
      <p style="font-size:1.05rem">No items found. Try a different search!</p>
    </div>`;
    return;
  }
  list.forEach((p, i) => {
    const isFav = favorites.includes(p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = (i * 0.06) + 's';
    card.innerHTML = `
      <div class="product-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="fav-toggle ${isFav ? 'active' : ''}" onclick="toggleFavorite(${p.id}, this)" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <span>${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category.toUpperCase()}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-sizes">
          ${p.sizes.map(s => `<span class="size-tag">${s}</span>`).join('')}
        </div>
        <div class="product-price">
          ${formatPrice(p.price)}
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn btn-outline btn-sm" onclick="toggleFavorite(${p.id}, null)">
            <i class="${isFav ? 'fas' : 'far'} fa-heart" id="fav-icon-${p.id}"></i>
            ${isFav ? 'Saved' : 'Favorite'}
          </button>
          <button class="btn btn-coral btn-sm" onclick="orderNow(${p.id})">
            <i class="fab fa-whatsapp"></i> Order
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== FILTER PRODUCTS =====
function filterProducts(category, btn) {
  currentFilter = category;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyFilters();
}

function searchProducts() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase();
  applyFilters();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  searchQuery = '';
  applyFilters();
}

function applyFilters() {
  let filtered = products;
  if (currentFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilter);
  }
  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.desc.toLowerCase().includes(searchQuery)
    );
  }
  renderProducts(filtered);
}

// ===== TOGGLE FAVORITE =====
function toggleFavorite(productId, btn) {
  const idx = favorites.indexOf(productId);
  if (idx === -1) {
    favorites.push(productId);
    showToast('❤️ Added to Favorites!');
  } else {
    favorites.splice(idx, 1);
    showToast('💔 Removed from Favorites');
  }
  localStorage.setItem('rkw_favorites', JSON.stringify(favorites));
  updateBadges();
  applyFilters();
  if (document.getElementById('favoritesPage') && !document.getElementById('favoritesPage').classList.contains('hidden')) {
    renderFavorites();
  }
}

function renderFavorites() {
  const favProducts = products.filter(p => favorites.includes(p.id));
  const grid = document.getElementById('favoritesGrid');
  const empty = document.getElementById('favEmpty');
  if (favProducts.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    renderProducts(favProducts, 'favoritesGrid');
  }
}

// ===== ORDER NOW =====
function orderNow(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;

  // Save to orders
  const order = {
    id: Date.now(),
    productId: p.id,
    name: p.name,
    emoji: p.emoji,
    price: p.price,
    category: p.category,
    sizes: p.sizes,
    date: new Date().toLocaleDateString('en-NG', { day:'numeric', month:'long', year:'numeric' }),
    status: 'Sent to WhatsApp'
  };
  orders.unshift(order);
  localStorage.setItem('rkw_orders', JSON.stringify(orders));
  updateBadges();

  // Build WhatsApp message
  const sizesStr = p.sizes.join(', ');
  const msg = `Hello Rachel Kiddies Wears! 👋

I would like to order the following item:

🛍️ *Product:* ${p.name}
💰 *Price:* ${formatPrice(p.price)}
📦 *Category:* ${p.category.charAt(0).toUpperCase() + p.category.slice(1)}
📏 *Available Sizes:* ${sizesStr}

Please let me know how to proceed with my order.
Thank you! 😊`;

  const waNumber = '2349130432252';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  showToast('📦 Opening WhatsApp to place your order!');
}

// ===== RENDER ORDERS =====
function renderOrders() {
  const list = document.getElementById('ordersList');
  const empty = document.getElementById('ordersEmpty');
  if (orders.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    list.innerHTML = orders.map(o => `
      <div class="order-card">
        <div class="order-emoji">${o.emoji}</div>
        <div class="order-info">
          <div class="order-name">${o.name}</div>
          <div class="order-details">
            ${formatPrice(o.price)} &nbsp;|&nbsp; ${o.category.charAt(0).toUpperCase() + o.category.slice(1)}
            <br/>Sizes: ${o.sizes ? o.sizes.join(', ') : 'N/A'}
          </div>
          <span class="order-status">✅ ${o.status}</span>
          <div class="order-date">📅 Ordered on ${o.date}</div>
        </div>
        <button class="btn btn-coral btn-sm" onclick="reorder(${o.productId})">
          <i class="fab fa-whatsapp"></i> Reorder
        </button>
      </div>
    `).join('');
  }
}

function reorder(productId) {
  orderNow(productId);
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  // Hide all overlays
  document.querySelectorAll('.page-overlay').forEach(p => p.classList.add('hidden'));
  document.getElementById('mainSite').style.display = 'block';

  if (pageId === 'mainSite') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById('mainSite').style.display = 'none';
    const page = document.getElementById(pageId);
    if (page) {
      page.classList.remove('hidden');
      page.scrollTop = 0;
    }
    if (pageId === 'favoritesPage') renderFavorites();
    if (pageId === 'ordersPage') renderOrders();
  }
}

// ===== UPDATE BADGES =====
function updateBadges() {
  const fc = favorites.length;
  const oc = orders.length;
  document.querySelectorAll('#favBadge, #favBadge2').forEach(el => el.textContent = fc);
  document.querySelectorAll('#orderBadge, #orderBadge2').forEach(el => el.textContent = oc);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== HAMBURGER MENU =====
function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateBadges();
});
   
