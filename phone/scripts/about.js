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

// 6. SCROLL ANIMATIONS (Intersection Observer)
document.addEventListener('DOMContentLoaded', function() {
  // Update nav and cart first
  updateNavUser();
  updateCartCount();

  // Select all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-left, .slide-right, .zoom-in, .scale-in'
  );

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a class to trigger the animation
        entry.target.classList.add('visible');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset trigger
  });

  // Start observing each element
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// 7. NEWSLETTER SUBSCRIBE
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

console.log('✅ About page loaded successfully');