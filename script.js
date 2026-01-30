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


