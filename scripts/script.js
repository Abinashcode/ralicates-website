// Core Configuration
const config = {
    animations: {
        typing: { speed: 100, pause: 2000 },
        transition: { duration: '0.3s', easing: 'ease' }
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
    typed: document.querySelector('#typing-text'),
    buttons: document.querySelectorAll('button')
};

// Navigation Handler (NO new hamburger button created)
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.initializeEvents();
    }

    initializeEvents() {
        if (this.hamburger && elements.nav.links) {
            this.hamburger.addEventListener('click', () => {
                elements.nav.links.classList.toggle('open'); // MATCHING CSS
            });
        }

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
    }

    async animate() {
        if (!this.element || !this.text) return;
        this.element.textContent = this.text;
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

// Multi-line typing animation
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
                await this.wait(this.pause);
                await this.erase();
                await this.wait(500);
            }
        }
    }

    async type(text) {
        this.el.textContent = '';
        for (let c of text) {
            this.el.textContent += c;
            await this.wait(this.speed);
        }
    }

    async erase() {
        while (this.el.textContent.length > 0) {
            this.el.textContent = this.el.textContent.slice(0, -1);
            await this.wait(this.speed / 2);
        }
    }

    wait(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}

// Initialize everything ONCE
window.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ButtonAnimator(elements.buttons);
    new TextAnimator(elements.hero, elements.hero?.textContent).animate();

    // Typing effect
    const subtitleLines = [
        "Diagnose problems before failure.",
        "Cut unplanned downtime by 40%+.",
        "Turn sensor noise into actionable signals."
    ];
    new MultiLineTyper('#typing-text', subtitleLines).start();

    // Feature card fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate');
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.feature-card').forEach(card => observer.observe(card));
});
