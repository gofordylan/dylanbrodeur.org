// ================================
// Main Interactive Features
// Organic Theme
// ================================

// ================================
// Mobile Menu
// ================================
class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.menuToggle || !this.navMenu) return;

        this.menuToggle.addEventListener('click', () => this.toggle());

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) this.close();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.navMenu.classList.add('active');
        this.menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.navMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ================================
// Navigation Scroll Effect
// ================================
class NavScroll {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        if (!this.nav) return;
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScroll = window.scrollY;

        // Add background on scroll
        if (currentScroll > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

// ================================
// Scroll Reveal Animations
// ================================
class ScrollReveal {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.journeyItems = document.querySelectorAll('.journey-item');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        } else {
            this.showAll();
        }
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.sections.forEach(section => observer.observe(section));

        // Stagger journey items
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    journeyObserver.unobserve(entry.target);
                }
            });
        }, options);

        this.journeyItems.forEach(item => journeyObserver.observe(item));
    }

    showAll() {
        this.sections.forEach(section => section.classList.add('visible'));
        this.journeyItems.forEach(item => item.classList.add('visible'));
    }
}

// ================================
// Active Section Tracker
// ================================
class ActiveSectionTracker {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.update(), { passive: true });
        this.update();
    }

    update() {
        const scrollPos = window.scrollY + 150;

        this.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                this.setActive(id);
            }
        });
    }

    setActive(id) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
}

// ================================
// Smooth Scroll
// ================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e, link));
        });
    }

    handleClick(e, link) {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }
}

// ================================
// Initialize
// ================================
function init() {
    new MobileMenu();
    new NavScroll();
    new ScrollReveal();
    new ActiveSectionTracker();
    new SmoothScroll();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
