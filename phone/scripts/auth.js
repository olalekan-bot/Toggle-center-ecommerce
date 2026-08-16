// TOAST NOTIFICATION
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.style.background = isError ? '#e74c3c' : '#222';
  toast.classList.add("show");

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// FORMAT NAME - CAPITALIZE FIRST LETTER
function formatName(name) {
  const nameParts = name.trim().split(/\s+/);
  const formattedParts = nameParts.map(part => {
    if (part.length === 0) return part;
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });
  return formattedParts.join(' ');
}

// SIGNUP FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      let name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;
      const terms = document.getElementById('termsCheckbox').checked;

      if (!name) {
        showToast('⚠️ Please enter your full name', true);
        return;
      }

      name = formatName(name);

      if (!email) {
        showToast('⚠️ Please enter your email address', true);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('⚠️ Please enter a valid email address', true);
        return;
      }

      if (password.length < 6) {
        showToast('⚠️ Password must be at least 6 characters', true);
        return;
      }

      if (password !== confirmPassword) {
        showToast('⚠️ Passwords do not match', true);
        return;
      }

      if (!terms) {
        showToast('⚠️ Please agree to the Terms of Service', true);
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        showToast('⚠️ An account with this email already exists', true);
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }));

      showToast('✅ Account created successfully! Welcome ' + name + '!');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }

  // LOGIN FUNCTIONALITY
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      if (!email) {
        showToast('⚠️ Please enter your email address', true);
        return;
      }

      if (!password) {
        showToast('⚠️ Please enter your password', true);
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        showToast('⚠️ Invalid email or password', true);
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      showToast('Welcome back, ' + user.name + '!');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // GOOGLE BUTTON
  const googleBtn = document.querySelector('.social-btn.google');
  if (googleBtn) {
    googleBtn.addEventListener('click', function() {
      showToast('Google login coming soon!');
    });
  }
});

console.log('✅ Auth system loaded successfully');