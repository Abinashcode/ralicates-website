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
      const setOpen = (open) => {
        if (open) {
          navLinks.classList.add('active');
          hamburger.setAttribute('aria-expanded', 'true');
        } else {
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      };

      hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = navLinks.classList.contains('active');
        setOpen(!isOpen);
      });

      // Close when clicking a nav link (mobile)
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setOpen(false));
      });

      // Close when clicking outside the nav
      document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          setOpen(false);
        }
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
      });
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
    const typingEl = document.getElementById('typing-text');
    if (typingEl) {
      const lines = [
        "before failure.",
        "Cut unplanned downtime by 40%+.",
        "Turn sensor noise into actionable signals."
      ];
      let li = 0;
      const speed = 36;
      const pause = 1400;
      const wait = ms => new Promise(res => setTimeout(res, ms));

      (async function loop() {
        while (true) {
          const text = lines[li];
          typingEl.textContent = '';
          for (let i = 0; i <= text.length; i++) {
            typingEl.textContent = text.slice(0, i);
            await wait(speed);
          }
          await wait(pause);
          for (let i = text.length; i >= 0; i--) {
            typingEl.textContent = text.slice(0, i);
            await wait(speed / 2);
          }
          li = (li + 1) % lines.length;
          await wait(300);
        }
      })();
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
      const careersLinks = document.querySelectorAll('a[href="careers.html"], a[href*="careers"], a[href*="Careers"]');
      const modalOverlay = document.getElementById('careersModal');
      
      if (careersLinks.length > 0) {
        if (!modalOverlay) {
          console.warn('Careers modal element not found');
        } else {
          careersLinks.forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (modalOverlay) {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
              }
            });
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
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
              closeModal();
            }
          });
        }
      }
    } catch (error) {
      console.error('Error initializing careers modal:', error);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }
})();
