// 1. SIDEBAR NAVIGATION
function showSidebar() {
  document.getElementById("sidebar").classList.add("open");
}

function hideSidebar() {
  document.getElementById("sidebar").classList.remove("open");
}

document.querySelectorAll('#sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    hideSidebar();
  });
});

// 2. ACTIVE NAV LINKS
function setActiveLinks() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "index.html": "home",
    "shopall.html": "shop",
    "about.html": "about",
    "contact.html": "contact",
    "cart.html": "cart",
  };
  const active = map[file];
  document.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
  if (active) {
    document.querySelectorAll(`a[data-page="${active}"]`)
      .forEach(a => a.classList.add("active"));
  }
}
setActiveLinks();

// 3. CART COUNT
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

// 4. AVATAR COLOR FUNCTION
function getAvatarColor(name) {
  const colors = [
    '#4457e7', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e84393', '#00b894', '#6c5ce7', '#fd79a8',
    '#0984e3', '#00cec9', '#fdcb6e', '#e17055'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// 5. UPDATE NAV USER
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

// 6. RUN UPDATE
updateNavUser();

document.addEventListener('DOMContentLoaded', function() {
  updateNavUser();
  updateCartCount();
});

window.addEventListener('pageshow', function() {
  updateNavUser();
  updateCartCount();
});

// 7. PRODUCT CLICK - REDIRECT TO PRODUCT PAGE
document.addEventListener('click', function(e) {
  const product = e.target.closest('.product');
  if (!product) return;
  
  if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
    return;
  }
  
  const productId = product.dataset.id;
  if (productId) {
    window.location.href = `product.html?id=${productId}`;
  }
});

// 8. ADD TO CART
document.addEventListener("click", function(e) {
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
    brand: btn.closest('.product')?.querySelector('h5')?.textContent || 'Product'
  };

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
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

// 9. TOAST NOTIFICATION
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

// 10. NEWSLETTER SUBSCRIBE
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("newsletterBtn");
  const email = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMessage");

  if (btn && email) {
    btn.addEventListener("click", function() {
      const emailValue = email.value.trim();

      if (!emailValue) {
        msg.textContent = "⚠️ Please enter your email address";
        msg.style.color = "#ff6b6b";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        msg.textContent = "⚠️ Please enter a valid email address";
        msg.style.color = "#ff6b6b";
        return;
      }

      const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]");
      if (!subscribers.includes(emailValue)) {
        subscribers.push(emailValue);
        localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
        msg.textContent = "✅ Subscribed successfully! 🎉";
        msg.style.color = "#51cf66";
      } else {
        msg.textContent = "📧 You're already subscribed!";
        msg.style.color = "#ffd43b";
      }

      email.value = "";
      clearTimeout(msg._timeout);
      msg._timeout = setTimeout(() => {
        msg.textContent = "";
      }, 5000);
    });

    email.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        btn.click();
      }
    });
  }
});

// 11. CAROUSEL / SLIDESHOW
(function() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.length;
  let autoplayInterval = null;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % totalSlides);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
      startAutoplay();
    });
  });

  const carousel = document.querySelector('.banner-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else {
          const prev = (currentSlide - 1 + totalSlides) % totalSlides;
          showSlide(prev);
        }
        startAutoplay();
      }
    });
  }

  showSlide(0);
  startAutoplay();
})();

// 12. SCROLL ANIMATIONS - RESET STAGGER PER SECTION
// Hide all products initially
document.querySelectorAll('.product').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});

// Use Intersection Observer
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const product = entry.target;
        
        // Find which section this product belongs to
        const section = product.closest('section');
        // Get ALL products in that section
        const productsInSection = section ? section.querySelectorAll('.product') : [];
        // Get this product's position WITHIN its section only
        const index = Array.from(productsInSection).indexOf(product);
        
        // Stagger starts from 0 for each section
        setTimeout(() => {
          product.style.opacity = '1';
          product.style.transform = 'translateY(0)';
        }, index * 60); // 60ms between products in same section
        
        observer.unobserve(product);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.product').forEach(el => {
    observer.observe(el);
  });
} else {
  // Fallback for older browsers
  function showProductsOnScroll() {
    const products = document.querySelectorAll('.product');
    products.forEach((product) => {
      const rect = product.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && product.style.opacity === '0') {
        const section = product.closest('section');
        const productsInSection = section ? section.querySelectorAll('.product') : [];
        const index = Array.from(productsInSection).indexOf(product);
        
        setTimeout(() => {
          product.style.opacity = '1';
          product.style.transform = 'translateY(0)';
        }, index * 60);
      }
    });
  }
  
  document.addEventListener('scroll', showProductsOnScroll);
  document.addEventListener('DOMContentLoaded', showProductsOnScroll);
}

console.log("✅ Reset stagger per section - works properly on all sections!");