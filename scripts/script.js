// Core Configuration
const config = {
    animations: {
        typing: {
            speed: 100,
            pause: 2000
        },
        transition: {
            duration: '0.3s',
            easing: 'ease'
        }
    },
    content: {
        words: ['Predictive Maintenance', 'Remote Diagnostics', 'Asset Management']
    }
};

// DOM Elements
const elements = {
    hero: document.querySelector('h1'),
    nav: {
        links: document.querySelector('.nav-links'),
        container: document.querySelector('.nav-container')
    },
    typed: document.getElementById('typed'),
    buttons: document.querySelectorAll('button')
};

// Navigation Handler
class Navigation {
    constructor() {
        this.hamburger = this.createHamburger();
        this.initializeEvents();
    }

    createHamburger() {
        const button = document.createElement('button');
        button.className = 'hamburger';
        button.innerHTML = '☰';
        button.setAttribute('aria-label', 'Toggle navigation');
        elements.nav.container?.appendChild(button);
        return button;
    }

    initializeEvents() {
        this.hamburger.addEventListener('click', () =>
            elements.nav.links?.classList.toggle('active')
        );
        this.initializeSmoothScroll();
    }

    initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
}

// Text Animation Handler
class TextAnimator {
    constructor(element, text) {
        this.element = element;
        this.text = text;
        this.charIndex = 0;
    }

    async animate() {
        if (!this.element) return;
        this.element.textContent = '';
        for (let char of this.text) {
            await this.wait(config.animations.typing.speed);
            this.element.textContent += char;
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Button Animation Handler
class ButtonAnimator {
    constructor(buttons) {
        this.buttons = buttons;
        this.initialize();
    }

    initialize() {
        this.buttons.forEach(button => {
            button.style.transition = `all ${config.animations.transition.duration} ${config.animations.transition.easing}`;

            button.addEventListener('mouseover', () => {
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            });

            button.addEventListener('mouseout', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = 'none';
            });
        });
    }
}

// ✅ Enhanced Typing Effect for 3 Lines
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
                await this.typeText(line);
                await this.wait(this.pause);
                await this.deleteText();
                await this.wait(500);
            }
        }
    }

    async typeText(text) {
        this.el.textContent = '';
        for (let char of text) {
            this.el.textContent += char;
            await this.wait(this.speed);
        }
    }

    async deleteText() {
        while (this.el.textContent.length > 0) {
            this.el.textContent = this.el.textContent.slice(0, -1);
            await this.wait(this.speed / 2);
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize Everything
window.addEventListener('load', () => {
    const navigation = new Navigation();
    const heroAnimator = new TextAnimator(elements.hero, elements.hero?.textContent || '');
    const buttonAnimator = new ButtonAnimator(elements.buttons);
    heroAnimator.animate();

    // ✅ Start multi-line typing effect on subtitle
    const lines = [
        "Diagnose problems before failure.",
        "Cut unplanned downtime by 40%+.",
        "Turn sensor noise into actionable signals."
    ];
    const subtitleTyper = new MultiLineTyper('#typing-text', lines, 80, 1500);
    subtitleTyper.start();
});

document.addEventListener('DOMContentLoaded', () => {
    // Animate feature cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
