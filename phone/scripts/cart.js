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

// 5. LOAD CART FROM LOCALSTORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartContent = document.querySelector(".cart-content");

// 6. UPDATE CART COUNT BADGE
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
  }
}

// 7. GO TO PRODUCT
function goToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

// 8. RENDER CART ITEMS
function renderCart() {
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    if (cartContent) cartContent.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    updateCartCount();
    
    // Trigger empty cart animation
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
    return;
  }

  if (cartContent) cartContent.style.display = 'flex';
  if (emptyCart) emptyCart.style.display = 'none';

  cartItemsContainer.innerHTML = cart.map((item, index) => {
    let product = products.find(p => p.name === item.title);
    if (!product) {
      product = products.find(p => item.title.includes(p.name) || p.name.includes(item.title));
    }
    const productId = product ? product.id : (index + 1);

    return `
    <div class="cart-item" data-index="${index}">
      <img src="${item.img}" alt="${item.title}" onclick="goToProduct(${productId})" style="cursor: pointer;" onerror="this.src='Image/placeholder.png'">
      <div class="cart-item-details">
        <h4 onclick="goToProduct(${productId})" style="cursor: pointer;">${item.title}</h4>
        <div class="brand">${item.brand || 'Product'}</div>
        <div class="price">${item.price}</div>
        <div class="cart-item-actions">
          <label>Quantity:</label>
          <div class="quantity-control">
            <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
            <span class="qty">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">✕</button>
        </div>
      </div>
    </div>
  `}).join('');

  updateTotals();
  updateCartCount();

  // SETUP SCROLL ANIMATIONS AFTER RENDER
  setTimeout(() => {
    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    // Remove any existing visible class (reset state)
    animatedElements.forEach(el => {
      el.classList.remove('visible');
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe each animated element
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }, 200);
}

// 9. UPDATE TOTALS
function updateTotals() {
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");

  if (!subtotalElement) return;

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[₦,]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 0 && subtotal < 200000 ? 5000 : 0;
  const total = subtotal + shipping;

  subtotalElement.textContent = `₦${subtotal.toLocaleString()}`;
  shippingElement.textContent = shipping > 0 ? `₦${shipping.toLocaleString()}` : 'Free';
  totalElement.textContent = `₦${total.toLocaleString()}`;
}

// 10. UPDATE QUANTITY
function updateQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      showToast('Item removed from cart');
    } else {
      showToast('Cart updated');
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// 11. REMOVE ITEM
function removeItem(index) {
  if (cart[index]) {
    const itemName = cart[index].title;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    showToast(`"${itemName}" removed from cart`);
  }
}

// 12. EVENT DELEGATION
document.addEventListener('click', function(e) {
  const target = e.target;

  // Handle quantity buttons
  const qtyBtn = target.closest('.qty-btn');
  if (qtyBtn) {
    e.stopPropagation();
    e.preventDefault();

    const index = parseInt(qtyBtn.dataset.index);
    const action = qtyBtn.dataset.action;

    if (!isNaN(index)) {
      if (action === 'increase') {
        updateQuantity(index, 1);
      } else if (action === 'decrease') {
        updateQuantity(index, -1);
      }
    }
    return;
  }

  // Handle remove button
  const removeBtn = target.closest('.remove-btn');
  if (removeBtn) {
    e.stopPropagation();
    e.preventDefault();

    const index = parseInt(removeBtn.dataset.index);
    if (!isNaN(index)) {
      removeItem(index);
    }
    return;
  }
});

// 13. TOAST NOTIFICATION
function showToast(message) {
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

  toast.textContent = message;
  toast.className = 'show';
  if (toast._timeout) clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.className = '';
  }, 2500);
}

// 14. CHECKOUT BUTTON
document.getElementById('checkoutBtn')?.addEventListener('click', function() {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[₦,]/g, ''));
    return sum + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 0 && subtotal < 200000 ? 5000 : 0;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  alert(`🛒 Order Summary\n\nItems: ${totalItems}\nSubtotal: ₦${subtotal.toLocaleString()}\nShipping: ${shipping > 0 ? '₦' + shipping.toLocaleString() : 'Free'}\nTotal: ₦${total.toLocaleString()}\n\nThank you for shopping with us! 🎉`);
});

// 15. NEWSLETTER
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
});

// 16. INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
  updateNavUser();
  renderCart();
  updateCartCount();
});

updateNavUser();

console.log('✅ Cart page loaded successfully');
console.log(`🛒 ${cart.length} items in cart`);