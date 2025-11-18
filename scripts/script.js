// -----------------------------
// NAVIGATION (Hamburger Toggle)
// -----------------------------

class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.addEvents();
    }

    addEvents() {
        if (this.hamburger && this.navLinks) {
            this.hamburger.addEventListener('click', () => {
                this.navLinks.classList.toggle('open'); // <---- IMPORTANT
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // if elements missing, nothing to do
  if (hamburger && navLinks) {
    const setOpen = (open) => {
      navLinks.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(Boolean(open)));
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!navLinks.classList.contains('active'));
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

  // Button hover animator (lightweight)
  document.querySelectorAll('button').forEach(btn => {
    btn.style.transition = "transform 0.18s ease, box-shadow 0.18s ease";
    btn.addEventListener('mouseover', () => {
      btn.style.transform = "translateY(-2px) scale(1.02)";
      btn.style.boxShadow = "0 8px 22px rgba(3,13,28,0.08)";
    });
    btn.addEventListener('mouseout', () => {
      btn.style.transform = "none";
      btn.style.boxShadow = "none";
    });
  });

  // Typing animation (rotating lines)
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
});

// -----------------------------
// BUTTON HOVER ANIMATION
// -----------------------------
class ButtonAnimator {
    constructor() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.transition = "all 0.3s ease";

            btn.addEventListener("mouseover", () => {
                btn.style.transform = "scale(1.05)";
                btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            });

            btn.addEventListener("mouseout", () => {
                btn.style.transform = "scale(1)";
                btn.style.boxShadow = "none";
            });
        });
    }
}

// -----------------------------
// MULTI-LINE TYPING ANIMATION
// -----------------------------
class MultiLineTyper {
    constructor(selector, lines, speed = 80, pause = 1500) {
        this.el = document.querySelector(selector);
        this.lines = lines;
        this.speed = speed;
        this.pause = pause;
    }

    async start() {
        if (!this.el) return;

        while (true) {
            for (let line of this.lines) {
                await this.type(line);
                await this.sleep(this.pause);
                await this.erase();
                await this.sleep(400);
            }
        }
    }

    async type(text) {
        this.el.textContent = "";
        for (let char of text) {
            this.el.textContent += char;
            await this.sleep(this.speed);
        }
    }

    async erase() {
        while (this.el.textContent.length > 0) {
            this.el.textContent = this.el.textContent.slice(0, -1);
            await this.sleep(this.speed / 2);
        }
    }

    sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}

// -----------------------------
// PAGE INITIALIZER
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {

    new Navigation();
    new ButtonAnimator();

    // Typing Text
    const typingLines = [
        "Diagnose problems before failure.",
        "Cut unplanned downtime by 40%+.",
        "Turn sensor noise into actionable signals."
    ];

    new MultiLineTyper("#typing-text", typingLines).start();

    // Fade-in animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("animate");
        });
    });

    document.querySelectorAll(".feature-card").forEach(card => observer.observe(card));
});
