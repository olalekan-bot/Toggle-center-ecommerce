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

// 6. GET PRODUCT FROM URL
function getProductFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  if (!productId) {
    window.location.href = 'shopAll.html';
    return null;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    window.location.href = 'shopAll.html';
    return null;
  }

  return product;
}

// 7. RENDER PRODUCT DETAIL
function renderProductDetail(product) {
  // Breadcrumb
  document.getElementById('breadcrumbProduct').textContent = product.name;

  // Product Image
  document.getElementById('productImage').src = product.image;
  document.getElementById('productImage').alt = product.name;

  // Product Info
  document.getElementById('productBrand').textContent = product.brand;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').textContent = `₦${Number(product.price).toLocaleString()}`;

  // Stock Status
  const stockEl = document.getElementById('productStock');
  stockEl.innerHTML = `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>`;

  // Description
  const description = getProductDescription(product);
  document.getElementById('productDescription').textContent = description;

  // Specifications
  document.getElementById('specBrand').textContent = product.brand;
  document.getElementById('specColor').textContent = product.color || 'N/A';
  document.getElementById('specCollection').textContent = product.collection || 'N/A';
  document.getElementById('specCategory').textContent = product.category || 'N/A';

  // SKU
  document.getElementById('productSku').textContent = `TC-${String(product.id).padStart(4, '0')}`;

  // Reviews
  const reviews = getProductReviews(product.id);
  const avgRating = calculateAverageRating(reviews);

  // Rating Stars
  document.getElementById('productStars').textContent = generateStars(avgRating);
  document.getElementById('productReviewCount').textContent = `(${reviews.length} reviews)`;

  // Big Stars
  document.getElementById('avgStars').textContent = generateStars(avgRating);
  document.getElementById('avgRating').textContent = avgRating.toFixed(1);
  document.getElementById('totalReviews').textContent = `(${reviews.length} reviews)`;

  // Render Reviews
  renderReviews(reviews);

  // Set product ID for add to cart
  document.getElementById('addToCartBtn').dataset.id = product.id;

  // Render Related Products
  renderRelatedProducts(product);

  // Set document title
  document.title = `${product.name} - Toggle Center`;

  // Update cart count
  updateCartCount();

  // SCROLL ANIMATIONS 
  // Wait for DOM to fully render
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
          observer.unobserve(entry.target); // Only animate once
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

// 8. PRODUCT DESCRIPTION
function getProductDescription(product) {
  const descriptions = {
    'iPhone 17 Pro Max': 'The latest iPhone with A18 chip, 48MP camera, and all-day battery life. Experience the future of mobile technology.',
    'Samsung Galaxy S26': 'Premium Android smartphone with amazing camera, vibrant display, and long-lasting battery.',
    'Tecno Camon 40': 'Affordable smartphone with great camera quality and smooth performance for everyday use.',
    'Infinix Note 60': 'Budget-friendly smartphone with large display and battery life.',
    'Google Pixel 8': 'Pure Android experience with exceptional camera and AI features.',
    'iPad Pro M4': 'The ultimate tablet experience with M4 chip, stunning display, and powerful performance.',
    'Samsung Tab S9 Ultra': 'Premium Android tablet with S Pen support and amazing display quality.',
    'iPhone 16 Pro': 'Powerful iPhone with advanced camera system and exceptional performance.',
  };

  return descriptions[product.name] || `${product.brand} ${product.name} - High quality product with premium features. Shop now at Toggle Center.`;
}

// 9. REVIEW FUNCTIONS
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
  for (let i = 0; i < fullStars; i++) html += '★';
  if (halfStar) html += '★';
  for (let i = 0; i < emptyStars; i++) html += '☆';
  return html || '☆☆☆☆☆';
}

function renderReviews(reviews) {
  const container = document.getElementById('reviewsList');

  if (!reviews || reviews.length === 0) {
    container.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review this product!</p>';
    return;
  }

  container.innerHTML = reviews.map(review => `
    <div class="review-item">
      <div class="review-header">
        <strong>${review.name}</strong>
        <span class="review-rating">${generateStars(review.rating)}</span>
        <span class="review-date">${review.date}</span>
      </div>
      <p class="review-text">${review.text}</p>
    </div>
  `).join('');
}

// 10. RELATED PRODUCTS
function renderRelatedProducts(currentProduct) {
  const container = document.getElementById('relatedGrid');

  const related = products
    .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.collection === currentProduct.collection))
    .slice(0, 4);

  if (related.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#888;grid-column:1/-1;">No related products found.</p>';
    return;
  }

  container.innerHTML = related.map(product => `
    <div class="related-card" onclick="window.location.href='product.html?id=${product.id}'">
      <img src="${product.image}" alt="${product.name}" />
      <h5>${product.name}</h5>
      <p class="price">₦${Number(product.price).toLocaleString()}</p>
    </div>
  `).join('');
}

// 11. QUANTITY SELECTOR
let quantity = 1;
let currentProduct = null;

document.getElementById('qtyDecrease').addEventListener('click', function() {
  if (quantity > 1) {
    quantity--;
    document.getElementById('qtyNumber').textContent = quantity;
  }
});

document.getElementById('qtyIncrease').addEventListener('click', function() {
  if (quantity < 10) {
    quantity++;
    document.getElementById('qtyNumber').textContent = quantity;
  }
});

// 12. ADD TO CART
function showToast(productName, action, totalItems) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }

  if (toast._timeout) {
    clearTimeout(toast._timeout);
  }

  const emoji = action === 'added' ? '🛒' : '🔄';
  const actionText = action === 'added' ? 'added to' : 'updated in';

  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 20px; flex-shrink: 0;">${emoji}</span>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${productName}</div>
        <div style="font-size: 12px; opacity: 0.9;">
          ${actionText} cart • <strong>${totalItems}</strong> item${totalItems > 1 ? 's' : ''} total
        </div>
      </div>
    </div>
  `;

  toast.className = '';
  toast.style.cssText = '';
  toast.classList.add('show');

  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

document.getElementById('addToCartBtn').addEventListener('click', function() {
  if (!currentProduct) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(item => item.title === currentProduct.name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: Date.now() + Math.random(),
      title: currentProduct.name,
      price: `₦${Number(currentProduct.price).toLocaleString()}`,
      img: currentProduct.image,
      quantity: quantity,
      brand: currentProduct.brand
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  showToast(currentProduct.name, 'added', totalItems);
});

// 13. REVIEW MODAL
const reviewModal = document.getElementById('reviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');
let selectedRating = 0;

document.getElementById('writeReviewBtn').addEventListener('click', function() {
  if (!currentProduct) return;
  document.getElementById('reviewProductTitle').textContent = `Write a Review for ${currentProduct.name}`;
  document.getElementById('reviewText').value = '';
  document.getElementById('reviewName').value = '';
  selectedRating = 0;
  resetStars();
  reviewModal.style.display = 'flex';
});

closeReviewModal.addEventListener('click', function() {
  reviewModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target === reviewModal) {
    reviewModal.style.display = 'none';
  }
});

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function() {
    selectedRating = parseInt(this.dataset.value);
    updateStars(selectedRating);
  });

  star.addEventListener('mouseover', function() {
    const val = parseInt(this.dataset.value);
    updateStars(val);
  });

  star.addEventListener('mouseout', function() {
    updateStars(selectedRating);
  });
});

function resetStars() {
  document.querySelectorAll('.star').forEach(s => {
    s.textContent = '☆';
    s.style.color = '#ddd';
  });
}

function updateStars(rating) {
  document.querySelectorAll('.star').forEach(s => {
    const val = parseInt(s.dataset.value);
    if (val <= rating) {
      s.textContent = '★';
      s.style.color = '#f4b400';
    } else {
      s.textContent = '☆';
      s.style.color = '#ddd';
    }
  });
}

document.getElementById('submitReview').addEventListener('click', function() {
  if (selectedRating === 0) {
    showToast('⚠️ Please select a rating');
    return;
  }

  const reviewText = document.getElementById('reviewText').value.trim();
  if (!reviewText) {
    showToast('⚠️ Please write a review');
    return;
  }

  const reviewName = document.getElementById('reviewName').value.trim() || 'Anonymous';

  const allReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
  if (!allReviews[currentProduct.id]) {
    allReviews[currentProduct.id] = [];
  }
  allReviews[currentProduct.id].push({
    name: reviewName,
    rating: selectedRating,
    text: reviewText,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('productReviews', JSON.stringify(allReviews));

  reviewModal.style.display = 'none';
  showToast('✅ Review submitted successfully!');

  setTimeout(() => {
    location.reload();
  }, 1000);
});

// 14. SHARE BUTTONS
document.getElementById('shareFacebook').addEventListener('click', function(e) {
  e.preventDefault();
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
});

document.getElementById('shareTwitter').addEventListener('click', function(e) {
  e.preventDefault();
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out ' + currentProduct?.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
});

document.getElementById('shareWhatsApp').addEventListener('click', function(e) {
  e.preventDefault();
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out ' + currentProduct?.name + ' at ' + window.location.href)}`, '_blank');
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
const product = getProductFromURL();
if (product) {
  currentProduct = product;
  renderProductDetail(product);
}

// Update nav and cart on load
document.addEventListener('DOMContentLoaded', function() {
  updateNavUser();
  updateCartCount();
});

console.log('✅ Product page loaded successfully');