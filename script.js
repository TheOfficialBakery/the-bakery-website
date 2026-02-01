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
let mobileMenuInitialized = false;

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (!menuBtn) return;

    // Prevent duplicate initialization
    if (mobileMenuInitialized) return;
    mobileMenuInitialized = true;

    // Create mobile menu once during initialization
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = createMobileMenu(navLinks, navCta);
        document.body.appendChild(mobileMenu);
        
        // Attach event listeners once during creation
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    function closeMenu() {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        }
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isExpanded);

        if (isExpanded) {
            const firstLink = mobileMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        } else {
            menuBtn.focus();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * Creates the mobile menu element
 */
function createMobileMenu(navLinks, navCta) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobile-nav';
    
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
    const GRAVITY = 0.15;
    const SPAWN_INTERVAL = 80; // ms between spawning new crumbs
    
    let isInHero = false;
    let animationId = null;
    let lastSpawnTime = 0;
    let currentIndex = 0;

    // Create trail container and particles (fixed pool - no creation/destruction)
    const trail = document.createElement('div');
    trail.className = 'breadcrumb-trail';
    trail.setAttribute('aria-hidden', 'true');

    const crumbs = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.className = 'breadcrumb-particle';
        trail.appendChild(particle);
        crumbs.push({
            el: particle,
            x: 0,
            y: 0,
            vy: 0, // vertical velocity for gravity
            vx: 0, // slight horizontal drift
            opacity: 0,
            active: false
        });
    }

    document.body.appendChild(trail);

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Cache hero bounds to avoid layout thrashing in mousemove
    let heroBounds = { top: 0, right: 0, bottom: 0, left: 0 };

    function updateHeroBounds() {
        const rect = hero.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        heroBounds = {
            top: rect.top + scrollY,
            right: rect.right + scrollX,
            bottom: rect.bottom + scrollY,
            left: rect.left + scrollX
        };
    }

    // Initialize bounds and keep them updated as layout stabilizes/changes
    updateHeroBounds();
    window.addEventListener('load', updateHeroBounds);
    window.addEventListener('resize', updateHeroBounds);

    // Observe hero size changes without per-mousemove layout reads
    if (window.ResizeObserver) {
        const heroResizeObserver = new ResizeObserver(() => {
            updateHeroBounds();
        });
        heroResizeObserver.observe(hero);
    }
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if mouse is within hero section bounds using cached document coordinates
        const wasInHero = isInHero;
        isInHero = (
            e.pageX >= heroBounds.left &&
            e.pageX <= heroBounds.right &&
            e.pageY >= heroBounds.top &&
            e.pageY <= heroBounds.bottom
        );

        // Start animation loop when entering hero
        if (isInHero && !wasInHero && !animationId) {
            animationId = requestAnimationFrame(updateTrail);
        }
    });

    // Animation loop - only runs when cursor is in hero
    function updateTrail(timestamp) {
        if (!isInHero) {
            // Fade out all particles when leaving hero
            crumbs.forEach(c => {
                c.opacity = 0;
                c.active = false;
                c.el.style.opacity = '0';
            });
            animationId = null;
            return;
        }

        // Spawn new crumb at cursor position periodically
        if (timestamp - lastSpawnTime > SPAWN_INTERVAL) {
            const crumb = crumbs[currentIndex];
            crumb.x = mouseX;
            crumb.y = mouseY;
            crumb.vy = 0.5 + Math.random() * 0.5; // initial downward velocity
            crumb.vx = (Math.random() - 0.5) * 1.5; // slight random horizontal drift
            crumb.opacity = 1;
            crumb.active = true;
            
            currentIndex = (currentIndex + 1) % PARTICLE_COUNT;
            lastSpawnTime = timestamp;
        }

        // Update each crumb with gravity
        crumbs.forEach(crumb => {
            if (!crumb.active) return;

            // Apply gravity
            crumb.vy += GRAVITY;
            crumb.y += crumb.vy;
            crumb.x += crumb.vx;

            // Fade out as it falls
            crumb.opacity -= 0.02;

            if (crumb.opacity <= 0) {
                crumb.opacity = 0;
                crumb.active = false;
            }

            // Apply to DOM
            crumb.el.style.transform = `translate(${crumb.x}px, ${crumb.y}px)`;
            crumb.el.style.opacity = crumb.opacity;
        });

        animationId = requestAnimationFrame(updateTrail);
    }
}