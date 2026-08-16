// NEWSLETTER SUBSCRIBE
document.addEventListener('DOMContentLoaded', function() {
  const newsletterBtn = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMessage = document.getElementById('newsletterMessage');
  
  if (newsletterBtn && newsletterEmail) {
    newsletterBtn.addEventListener('click', function() {
      const email = newsletterEmail.value.trim();
      
      // Validate email
      if (!email) {
        showNewsletterMessage('⚠️ Please enter your email address', '#ff6b6b');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNewsletterMessage('⚠️ Please enter a valid email address', '#ff6b6b');
        return;
      }
      
      // Success - Save to localStorage (or you can send to server)
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        showNewsletterMessage('✅ Subscribed successfully! 🎉', '#51cf66');
      } else {
        showNewsletterMessage('📧 You\'re already subscribed!', '#ffd43b');
      }
      
      // Clear input
      newsletterEmail.value = '';
    });
    
    // Allow Enter key to submit
    newsletterEmail.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        newsletterBtn.click();
      }
    });
  }
  
  function showNewsletterMessage(message, color) {
    const msg = document.getElementById('newsletterMessage');
    if (msg) {
      msg.textContent = message;
      msg.style.color = color;
      // Auto-hide after 5 seconds
      clearTimeout(msg._timeout);
      msg._timeout = setTimeout(() => {
        msg.textContent = '';
      }, 5000);
    }
  }
});