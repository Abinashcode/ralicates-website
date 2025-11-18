// -----------------------------
// NAVIGATION (Hamburger Toggle)
// -----------------------------
(function() {
  'use strict';
  
  // Function to initialize all functionality
  function init() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // if elements missing, nothing to do
    if (hamburger && navLinks) {
      // Check if already initialized to prevent duplicate listeners
      if (hamburger.hasAttribute('data-menu-initialized')) {
        return;
      }
      hamburger.setAttribute('data-menu-initialized', 'true');
      
      const setOpen = (open) => {
        if (open) {
          navLinks.classList.add('active');
          hamburger.setAttribute('aria-expanded', 'true');
          hamburger.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      };

      // Toggle function
      const toggleMenu = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
        const isOpen = navLinks.classList.contains('active');
        setOpen(!isOpen);
        return false;
      };

      // Add multiple event listeners for better mobile support
      hamburger.addEventListener('click', toggleMenu, false);
      hamburger.addEventListener('touchend', toggleMenu, false);
      
      // Also handle touchstart to prevent double-tap zoom
      hamburger.addEventListener('touchstart', (e) => {
        e.preventDefault();
      }, { passive: false });

      // Close when clicking a nav link (mobile)
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          setOpen(false);
        }, false);
        a.addEventListener('touchend', () => {
          setOpen(false);
        }, false);
      });

      // Close when clicking outside the nav
      const outsideClickHandler = (e) => {
        if (!navLinks.classList.contains('active')) return;
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('click', outsideClickHandler, false);
      document.addEventListener('touchend', outsideClickHandler, false);

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
          setOpen(false);
        }
      }, false);
    } else {
      console.warn('Hamburger menu elements not found:', { hamburger: !!hamburger, navLinks: !!navLinks });
    }

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

    // Typing animation (rotating lines) - only on index page
    try {
      const typingEl = document.getElementById('typing-text');
      if (typingEl && typingEl.parentElement) {
        const lines = [
          "before failure.",
          "Cut unplanned downtime by 40%+.",
          "Turn sensor noise into actionable signals."
        ];
        let li = 0;
        let isRunning = true;
        const speed = 50;
        const pause = 2000;
        const wait = ms => new Promise(res => setTimeout(res, ms));

        // Clear initial text and start animation
        setTimeout(() => {
          if (typingEl && typingEl.parentElement) {
            // Clear the initial text
            typingEl.textContent = '';
            
            (async function loop() {
              try {
                while (isRunning && typingEl && typingEl.parentElement) {
                  const text = lines[li];
                  
                  // Type out the text character by character
                  typingEl.textContent = '';
                  for (let i = 0; i <= text.length; i++) {
                    if (!isRunning || !typingEl || !typingEl.parentElement) return;
                    typingEl.textContent = text.slice(0, i);
                    await wait(speed);
                  }
                  
                  // Pause with full text
                  await wait(pause);
                  
                  // Erase the text character by character
                  for (let i = text.length; i >= 0; i--) {
                    if (!isRunning || !typingEl || !typingEl.parentElement) return;
                    typingEl.textContent = text.slice(0, i);
                    await wait(speed / 2);
                  }
                  
                  // Move to next line
                  li = (li + 1) % lines.length;
                  await wait(500);
                }
              } catch (error) {
                console.error('Typing animation error:', error);
                // Fallback: show first line
                if (typingEl && typingEl.parentElement) {
                  typingEl.textContent = lines[0];
                }
              }
            })();
          }
        }, 300);
      }
    } catch (error) {
      console.error('Error initializing typing effect:', error);
    }

    // Reveal feature cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.feature-card').forEach(card => observer.observe(card));

    // Careers modal functionality - with error handling
    try {
      // More comprehensive selector to catch all career links
      const careersLinks = document.querySelectorAll('a[href="careers.html"], a[href*="careers"], a[href*="Careers"], a[href="/careers.html"], a[href*="/careers"]');
      const modalOverlay = document.getElementById('careersModal');
      
      if (careersLinks.length > 0) {
        if (!modalOverlay) {
          console.warn('Careers modal element not found');
        } else {
          careersLinks.forEach(link => {
            // Set href to # to prevent navigation
            link.setAttribute('href', '#');
            link.setAttribute('data-careers-modal', 'true');
            
            link.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              
              if (modalOverlay) {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
              }
              return false;
            }, false);
            
            // Also prevent default on mousedown as backup
            link.addEventListener('mousedown', function(e) {
              if (e.button === 0) { // Left click only
                e.preventDefault();
              }
            }, false);
          });

          // Close modal handlers
          const closeModal = () => {
            if (modalOverlay) {
              modalOverlay.classList.remove('active');
              document.body.style.overflow = '';
            }
          };

          const closeBtn = modalOverlay.querySelector('.modal-close');
          if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              closeModal();
            });
          }

          // Close on overlay click
          modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
              closeModal();
            }
          });

          // Close on Escape key
          const escapeHandler = (e) => {
            if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
              closeModal();
            }
          };
          document.addEventListener('keydown', escapeHandler);
        }
      } else {
        // If no careers links found, log for debugging
        console.log('No careers links found on this page');
      }
    } catch (error) {
      console.error('Error initializing careers modal:', error);
    }
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
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      if (hamburger && navLinks && !hamburger.hasAttribute('data-initialized')) {
        hamburger.setAttribute('data-initialized', 'true');
        // Re-initialize hamburger menu
        try {
          init();
        } catch (e) {
          console.error('Fallback initialization error:', e);
        }
      }
    }, 100);
  });
})();
