// -----------------------------
// NAVIGATION (Hamburger Toggle) - SIMPLIFIED
// -----------------------------
// Global hamburger toggle function - accessible from anywhere
window.toggleMobileMenu = function() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  
  if (navLinks && hamburger) {
    const isActive = navLinks.classList.contains('active');
    
    if (isActive) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navLinks.classList.add('active');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }
};

(function() {
  'use strict';
  
  function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    // Skip if already initialized
    if (hamburger.hasAttribute('data-menu-initialized')) return;
    hamburger.setAttribute('data-menu-initialized', 'true');
    
    // Simple click handler
    hamburger.onclick = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      window.toggleMobileMenu();
      return false;
    };
    
    // Touch support
    hamburger.ontouchend = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      window.toggleMobileMenu();
      return false;
    };
    
    // Prevent double-tap zoom
    hamburger.addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, { passive: false });
    
    // Close menu when clicking nav links (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          window.toggleMobileMenu();
        }
      });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        window.toggleMobileMenu();
      }
    });
  }
  
  // Initialize immediately
  setupHamburger();
  
  // Multiple fallbacks
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHamburger);
  }
  
  window.addEventListener('load', function() {
    setTimeout(setupHamburger, 50);
  });
  
  // Final fallbacks
  setTimeout(setupHamburger, 200);
  setTimeout(setupHamburger, 500);
})();

// Function to initialize all functionality
function init() {

    // Button hover animator (lightweight) - only for non-form buttons
    document.querySelectorAll('button:not([type="submit"])').forEach(btn => {
      if (!btn.closest('form')) {
        btn.style.transition = "transform 0.18s ease, box-shadow 0.18s ease";
        btn.addEventListener('mouseover', () => {
          btn.style.transform = "translateY(-2px) scale(1.02)";
          btn.style.boxShadow = "0 8px 22px rgba(3,13,28,0.08)";
        });
        btn.addEventListener('mouseout', () => {
          btn.style.transform = "none";
          btn.style.boxShadow = "none";
        });
      }
    });

    // Typing effect is handled separately below

    // Reveal feature cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.feature-card').forEach(card => observer.observe(card));

    // Careers modal functionality - REMOVED (now using careers.html page instead)
    // Careers links will navigate to careers.html page normally
  }
  
  // Initialize when DOM is ready - with multiple fallbacks
  function startInit() {
    try {
      init();
    } catch (error) {
      console.error('Initialization error:', error);
      // Retry after a short delay if initialization fails
      setTimeout(() => {
        try {
          init();
        } catch (retryError) {
          console.error('Retry initialization error:', retryError);
        }
      }, 100);
    }
  }
  
  // Multiple initialization strategies for maximum compatibility
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInit);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM is already ready
    startInit();
  } else {
    // Fallback: wait a bit and try
    setTimeout(startInit, 50);
  }
  
  // Additional fallback: try again after window load
  window.addEventListener('load', () => {
    setTimeout(() => {
      try {
        init();
      } catch (e) {
        console.error('Fallback initialization error:', e);
      }
    }, 100);
  });


// Careers modal removed - now using careers.html page

// Typing Effect - Smooth and Reliable
(function() {
  var lines = ["before failure.", "Cut unplanned downtime by 40%+.", "Turn sensor noise into actionable signals."];
  var currentLine = 0;
  var currentChar = 0;
  var isDeleting = false;
  var element = null;
  
  function animate() {
    if (!element) {
      element = document.getElementById('typing-text');
      if (!element) return;
    }
    
    var text = lines[currentLine];
    
    if (isDeleting) {
      element.textContent = text.substring(0, currentChar - 1);
      currentChar--;
      if (currentChar < 0) {
        isDeleting = false;
        currentLine = (currentLine + 1) % lines.length;
        setTimeout(animate, 600);
      } else {
        setTimeout(animate, 35);
      }
    } else {
      element.textContent = text.substring(0, currentChar + 1);
      currentChar++;
      if (currentChar >= text.length) {
        isDeleting = true;
        setTimeout(animate, 2500);
      } else {
        setTimeout(animate, 60);
      }
    }
  }
  
  function start() {
    element = document.getElementById('typing-text');
    if (element) {
      element.textContent = '';
      currentLine = 0;
      currentChar = 0;
      isDeleting = false;
      setTimeout(animate, 400);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
  window.addEventListener('load', start);
})();

