// 1. SIDEBAR NAVIGATION
function showSidebar() {
  document.getElementById("sidebar").classList.add("open");
}

function hideSidebar() {
  document.getElementById("sidebar").classList.remove("open");
}

document.querySelectorAll('#sidebar a').forEach(link => {
  link.addEventListener('click', hideSidebar);
});

// 2. ACTIVE NAV LINKS
function setActiveLinks() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = { "index.html": "home", "shopall.html": "shop", "about.html": "about", "contact.html": "contact", "cart.html": "cart" };
  const active = map[file];
  document.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
  if (active) {
    document.querySelectorAll(`a[data-page="${active}"]`).forEach(a => a.classList.add("active"));
  }
}
setActiveLinks();

// 3. GET AVATAR COLOR
function getAvatarColor(name) {
  const colors = ['#4457e7', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e84393', '#00b894', '#6c5ce7', '#fd79a8', '#0984e3', '#00cec9', '#fdcb6e', '#e17055'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// 4. UPDATE NAV USER
function updateNavUser() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const navText = document.getElementById('navUserText');
  const navIcon = document.getElementById('navUserIcon');
  const navAvatar = document.getElementById('navUserAvatar');
  const navLink = document.querySelector('#navUser a');

  const sideText = document.getElementById('sidebarNavUserText');
  const sideIcon = document.getElementById('sidebarNavUserIcon');
  const sideAvatar = document.getElementById('sidebarNavUserAvatar');
  const sideLink = document.querySelector('#sidebarNavUser a');

  if (user) {
    const firstLetter = user.name.charAt(0).toUpperCase();
    const color = getAvatarColor(user.name);

    if (navText) navText.textContent = user.name;
    if (navIcon) navIcon.style.display = 'none';
    if (navAvatar) {
      navAvatar.textContent = firstLetter;
      navAvatar.style.display = 'inline-flex';
      navAvatar.style.background = color;
      navAvatar.style.color = 'white';
    }
    if (navLink) {
      navLink.href = '#';
      navLink.onclick = function(e) {
        e.preventDefault();
        if (confirm('Logout ' + user.name + '?')) {
          localStorage.removeItem('currentUser');
          window.location.reload();
        }
      };
    }

    if (sideText) sideText.textContent = user.name;
    if (sideIcon) sideIcon.style.display = 'none';
    if (sideAvatar) {
      sideAvatar.textContent = firstLetter;
      sideAvatar.style.display = 'inline-flex';
      sideAvatar.style.background = color;
      sideAvatar.style.color = 'white';
    }
    if (sideLink) {
      sideLink.href = '#';
      sideLink.onclick = function(e) {
        e.preventDefault();
        if (confirm('Logout ' + user.name + '?')) {
          localStorage.removeItem('currentUser');
          window.location.reload();
        }
      };
    }

  } else {
    if (navText) navText.textContent = 'Log In';
    if (navIcon) navIcon.style.display = 'inline-flex';
    if (navAvatar) {
      navAvatar.style.display = 'none';
      navAvatar.textContent = '';
    }
    if (navLink) {
      navLink.href = 'login.html';
      navLink.onclick = null;
    }

    if (sideText) sideText.textContent = 'Log In';
    if (sideIcon) sideIcon.style.display = 'inline-flex';
    if (sideAvatar) {
      sideAvatar.style.display = 'none';
      sideAvatar.textContent = '';
    }
    if (sideLink) {
      sideLink.href = 'login.html';
      sideLink.onclick = null;
    }
  }
}

// 5. CART COUNT
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.remove("bump");
    void cartCount.offsetWidth;
    cartCount.classList.add("bump");
  }
}
updateCartCount();

// 6. RENDER PRODUCTS
const productsContainer = document.getElementById("productsContainer");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Get reviews from localStorage
function getProductReviews(productId) {
  const allReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
  return allReviews[productId] || [];
}

function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  let html = '';
  for (let i = 0; i < fullStars; i++) html += '⭐';
  if (halfStar) html += '⭐';
  for (let i = 0; i < emptyStars; i++) html += '☆';
  return html || '☆☆☆☆☆';
}

// Render products
products.forEach(product => {
  const productReviews = getProductReviews(product.id);
  const avgRating = calculateAverageRating(productReviews);

  productsContainer.innerHTML += `
    <div class="product-card fade-in" data-brand="${product.brand}" data-color="${product.color}" data-price="${product.price}" data-collection="${product.collection}" data-category="${product.category}" data-id="${product.id}" style="animation-delay: ${Math.random() * 0.2 + 0.05}s;">
      <div class="product">
        <img src="${product.image}" alt="${product.name}" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
        <p class="brand" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">${product.brand}</p>
        <h5 onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">${product.name}</h5>
        <div class="rating" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
          ${generateStars(avgRating)} <span>(${productReviews.length} reviews)</span>
        </div>
        <p class="price" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">₦${Number(product.price).toLocaleString()}</p>
        <p class="stock" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">✔ In Stock</p>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-currency="₦">Add to Cart</button>
        ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
      </div>
    </div>
  `;
});

// 7. ADD TO CART
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;

  const productName = btn.getAttribute('data-name');
  const productPrice = btn.getAttribute('data-price');
  const productImage = btn.getAttribute('data-image');
  const currency = btn.getAttribute('data-currency') || '₦';

  const product = {
    id: Date.now() + Math.random(),
    title: productName || 'Product',
    price: `${currency}${Number(productPrice || 0).toLocaleString()}`,
    img: productImage || '',
    quantity: 1,
    brand: btn.closest('.product-card')?.querySelector('h5')?.textContent || 'Product'
  };

  const existing = cart.find(item => item.title === product.title);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  showToast(product.title, 'added', totalItems);
});

// 8. PRODUCT CLICK - REDIRECT
document.addEventListener('click', function(e) {
  if (e.target.closest('.add-to-cart')) return;
  const productCard = e.target.closest('.product-card');
  if (!productCard) return;
  const productId = productCard.dataset.id;
  if (productId) window.location.href = `product.html?id=${productId}`;
});

// 9. TOAST
function showToast(productName, action, totalItems) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #222;
      color: white;
      padding: 14px 24px;
      border-radius: 10px;
      font-size: 15px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      z-index: 9999;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      transform: translateY(20px);
      max-width: 350px;
    `;
    document.body.appendChild(toast);
  }

  const emoji = action === 'added' ? '🛒' : '🔄';
  const actionText = action === 'added' ? 'added to' : 'updated in';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 24px;">${emoji}</span>
      <div>
        <div style="font-weight: 600; font-size: 15px;">${productName}</div>
        <div style="font-size: 13px; opacity: 0.9;">
          ${actionText} cart • <strong>${totalItems}</strong> item${totalItems > 1 ? 's' : ''} total
        </div>
      </div>
    </div>
  `;

  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  if (toast._timeout) clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 2500);
}

// 10. FILTER TOGGLES
document.querySelectorAll('.filter-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const symbol = this.querySelector('.symbol');
    content.classList.toggle('open');
    symbol.textContent = content.classList.contains('open') ? '−' : '+';
  });
});

// 11. PRICE SLIDER
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

if (priceRange && priceValue) {
  priceRange.addEventListener('input', function() {
    priceValue.textContent = `₦${Number(this.value).toLocaleString()}`;
    filterProducts();
  });
}

// 12. FILTER PRODUCTS
function filterProducts() {
  const maxPrice = Number(priceRange.value);
  const activeFilters = { collection: [], color: [], brand: [], category: [] };

  document.querySelectorAll('.filter-content input:checked').forEach(cb => {
    const type = cb.dataset.type;
    const value = cb.value.toLowerCase();
    if (value === 'all') {
      activeFilters[type] = ['all'];
    } else if (!activeFilters[type].includes('all')) {
      activeFilters[type].push(value);
    }
  });

  document.querySelectorAll('.product-card').forEach(card => {
    let visible = true;
    const productPrice = Number(card.dataset.price);

    if (productPrice > maxPrice) visible = false;

    if (visible) {
      for (const [key, values] of Object.entries(activeFilters)) {
        if (values.length > 0 && !values.includes('all')) {
          const dataVal = card.dataset[key]?.toLowerCase() || '';
          if (key === 'brand') {
            if (!values.some(v => dataVal.includes(v))) { visible = false; break; }
          } else if (!values.includes(dataVal)) {
            visible = false;
            break;
          }
        }
      }
    }
    card.style.display = visible ? 'block' : 'none';
  });
}

document.querySelectorAll('.filter-content input').forEach(cb => cb.addEventListener('change', filterProducts));

// 13. AUTO-FILTER FROM URL
function applyAutoFilter() {
  const category = new URLSearchParams(window.location.search).get('category');
  if (!category) return;

  document.querySelectorAll('.filter-content input[data-type="collection"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.filter-content input[data-type="collection"]').forEach(cb => {
    if (cb.value.toLowerCase() === category.toLowerCase()) cb.checked = true;
  });
  const allCheckbox = document.querySelector('.filter-content input[data-type="collection"][value="all"]');
  if (allCheckbox) allCheckbox.checked = false;
  if (typeof filterProducts === 'function') filterProducts();
}

// 14. MOBILE FILTER TOGGLE
const filterToggleMobile = document.getElementById('filterToggleMobile');
const filtersSidebar = document.getElementById('filtersSidebar');

if (filterToggleMobile && filtersSidebar) {
  const overlay = document.createElement('div');
  overlay.className = 'filter-overlay';
  document.body.appendChild(overlay);

  const filterHeader = document.createElement('div');
  filterHeader.className = 'filter-header-mobile';
  filterHeader.innerHTML = `<h3>Filters</h3><button class="filter-close" id="filterClose">✕</button>`;
  filtersSidebar.prepend(filterHeader);

  filterToggleMobile.addEventListener('click', function(e) {
    e.preventDefault();
    if (window.innerWidth <= 800) {
      filtersSidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  function closeFilters() {
    filtersSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('filterClose')?.addEventListener('click', closeFilters);
  overlay.addEventListener('click', closeFilters);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeFilters(); });
  window.addEventListener('resize', function() { if (window.innerWidth > 800) closeFilters(); });
}

// 15. QUICK VIEW MODAL
const modal = document.getElementById('quickViewModal');
const closeModal = document.getElementById('closeQuickViewModal');

if (modal && closeModal) {
  closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quick-view') || e.target.closest('.quick-view')) {
      const productCard = e.target.closest('.product-card');
      if (productCard) {
        document.getElementById('modal-img').src = productCard.querySelector('img').src;
        document.getElementById('modal-title').textContent = productCard.querySelector('h5').textContent;
        document.getElementById('modal-price').textContent = productCard.querySelector('.price').textContent;
        modal.style.display = 'flex';
      }
    }
  });

  document.getElementById('modal-add-cart').addEventListener('click', function() {
    const title = document.getElementById('modal-title').textContent;
    const price = document.getElementById('modal-price').textContent;
    const img = document.getElementById('modal-img').src;

    const product = { id: Date.now() + Math.random(), title, price, img, quantity: 1 };
    const existing = cart.find(item => item.title === product.title);
    if (existing) existing.quantity++;
    else cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(product.title, 'added', cart.reduce((sum, item) => sum + item.quantity, 0));
    modal.style.display = 'none';
  });
}

// 16. NEWSLETTER
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('newsletterBtn');
  const email = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMessage');

  if (btn && email) {
    btn.addEventListener('click', function() {
      const emailValue = email.value.trim();
      if (!emailValue) {
        msg.textContent = '⚠️ Please enter your email address';
        msg.style.color = '#ff6b6b';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        msg.textContent = '⚠️ Please enter a valid email address';
        msg.style.color = '#ff6b6b';
        return;
      }
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (!subscribers.includes(emailValue)) {
        subscribers.push(emailValue);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        msg.textContent = '✅ Subscribed successfully! 🎉';
        msg.style.color = '#51cf66';
      } else {
        msg.textContent = '📧 You\'re already subscribed!';
        msg.style.color = '#ffd43b';
      }
      email.value = '';
      clearTimeout(msg._timeout);
      msg._timeout = setTimeout(() => { msg.textContent = ''; }, 5000);
    });
    email.addEventListener('keypress', function(e) { if (e.key === 'Enter') btn.click(); });
  }

  // 17. SCROLL ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});

// 18. INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
  updateNavUser();
  updateCartCount();
  applyAutoFilter();
});

setTimeout(applyAutoFilter, 500);

console.log('✅ shopAll.js loaded successfully');
console.log(`📦 ${products.length} products loaded`);
console.log(`🛒 ${cart.length} items in cart`);