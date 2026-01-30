/* ===================================
   The Bakery Shop - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initBreadcrumbTrail();
});

/* ===================================
   Navbar Scroll Effect
   =================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ===================================
    Mobile Menu Toggle
    =================================== */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (!menuBtn) return;

    // Create mobile menu once during initialization
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = createMobileMenu(navLinks, navCta);
        document.body.appendChild(mobileMenu);
        
        // Attach event listeners once during creation
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

/**
 * Creates the mobile menu element
 */
function createMobileMenu(navLinks, navCta) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Build links dynamically from existing nav
    let linksHtml = '';
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            linksHtml += `<li><a href="${link.getAttribute('href')}">${link.textContent}</a></li>`;
        });
    }
    
    // Get CTA link from existing nav
    const ctaHref = navCta ? navCta.getAttribute('href') : 'https://www.redbubble.com/people/the-bakery-shop/';
    const ctaText = navCta ? navCta.textContent.trim() : 'Visit Shop';
    
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <ul class="mobile-nav-links">
                ${linksHtml}
            </ul>
            <a href="${ctaHref}" target="_blank" rel="noopener noreferrer" class="mobile-nav-cta">${ctaText}</a>
        </div>
    `;
    
    return mobileMenu;
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll(
        '.about-content, .product-card, .contact-card, .section-header'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/* ===================================
   Smooth Scroll for Anchor Links
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
    Parallax Effect on Hero
    =================================== */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroLogoContainer = document.querySelector('.hero-logo-container');
    let ticking = false;

    // Apply parallax to container instead of logo to avoid CSS animation conflict
    if (hero && heroLogoContainer) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = hero.offsetHeight;
                    
                    if (scrolled < heroHeight) {
                        heroLogoContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

/* ===================================
   Breadcrumb Cursor Trail (Hero Only)
   =================================== */
function initBreadcrumbTrail() {
    // Skip on touch devices - no cursor to follow
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const hero = document.querySelector('#home');
    if (!hero) return;

    const PARTICLE_COUNT = 8;
    const positions = [];
    let isInHero = false;
    let animationId = null;

    // Create trail container and particles (fixed pool - no creation/destruction)
    const trail = document.createElement('div');
    trail.className = 'breadcrumb-trail';
    trail.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.className = 'breadcrumb-particle';
        trail.appendChild(particle);
        positions.push({ x: 0, y: 0 });
    }

    document.body.appendChild(trail);
    const particles = trail.querySelectorAll('.breadcrumb-particle');

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if mouse is within hero section bounds
        const heroRect = hero.getBoundingClientRect();
        const wasInHero = isInHero;
        isInHero = (
            e.clientX >= heroRect.left &&
            e.clientX <= heroRect.right &&
            e.clientY >= heroRect.top &&
            e.clientY <= heroRect.bottom
        );

        // Start animation loop when entering hero
        if (isInHero && !wasInHero && !animationId) {
            animationId = requestAnimationFrame(updateTrail);
        }
    });

    // Animation loop - only runs when cursor is in hero
    function updateTrail() {
        if (!isInHero) {
            // Fade out particles when leaving hero
            particles.forEach(p => p.style.opacity = '0');
            animationId = null;
            return;
        }

        // Update positions with trailing effect
        positions[0].x += (mouseX - positions[0].x) * 0.3;
        positions[0].y += (mouseY - positions[0].y) * 0.3;

        for (let i = 1; i < PARTICLE_COUNT; i++) {
            positions[i].x += (positions[i - 1].x - positions[i].x) * 0.3;
            positions[i].y += (positions[i - 1].y - positions[i].y) * 0.3;
        }

        // Apply transforms to particles
        particles.forEach((particle, i) => {
            const opacity = 1 - (i / PARTICLE_COUNT) * 0.8;
            particle.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
            particle.style.opacity = opacity;
        });

        animationId = requestAnimationFrame(updateTrail);
    }
}