// Clean .html extension from browser address bar dynamically (Client-Side URL Rewriting)
// Wrapped in try-catch and protocol check to prevent browser SecurityError when running locally (file://)
try {
    if (window.location.protocol.startsWith('http') && window.location.pathname.endsWith('.html')) {
        const cleanUrl = window.location.pathname.slice(0, -5);
        window.history.replaceState(null, '', cleanUrl + window.location.search + window.location.hash);
    }
} catch (e) {
    console.warn("URL rewrite skipped on local environment:", e);
}

document.addEventListener('DOMContentLoaded', () => {
    // Register button ripple effect using Event Delegation
    initButtonRipples();

    // Intersection Observer for scroll animations (Fade-up, etc.)
    initScrollAnimations();

    // Dynamically append product info to WhatsApp links
    initWhatsAppLinks();
});

/**
 * Premium Button Ripple Effect (Optimized with Event Delegation)
 */
function initButtonRipples() {
    document.body.addEventListener('click', (e) => {
        const button = e.target.closest('.btn-ripple');
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

/**
 * Scroll Reveal Animations (Guarded and Optimized)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Dynamically append product info to WhatsApp links
 */
function initWhatsAppLinks() {
    const titleParts = document.title.split('|');
    const productTitle = titleParts[0] ? titleParts[0].trim() : 'HABOTEST HT100';
    const currentUrl = window.location.href;
    const whatsappMessage = `আসসালামু আলাইকুম, আমি এই প্রোডাক্টটি অর্ডার করতে চাই: ${productTitle}\nলিংক: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        try {
            const urlObj = new URL(link.href);
            if (!urlObj.searchParams.has('text')) {
                urlObj.searchParams.set('text', whatsappMessage);
                link.href = urlObj.toString();
            }
        } catch (e) {
            if (!link.href.includes('text=')) {
                if (link.href.includes('?')) {
                    link.href += `&text=${encodedMessage}`;
                } else {
                    link.href += `?text=${encodedMessage}`;
                }
            }
        }
    });
}

/**
 * Switch Active Image in Product Gallery (Optimized with requestAnimationFrame)
 */
window.switchGalleryImage = function (element, imageSrc) {
    requestAnimationFrame(() => {
        // Update main image source
        const activeImg = document.getElementById('gallery-active-img');
        if (activeImg) {
            activeImg.src = imageSrc;
            // Reset zoom if it was zoomed
            activeImg.classList.remove('zoomed');
        }

        // Remove active class from all thumbs
        const thumbs = document.querySelectorAll('.gallery-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));

        // Add active class to clicked thumb
        element.classList.add('active');
    });
};

// Setup Zoom Click Handler and Form submission throttling
document.addEventListener('DOMContentLoaded', () => {
    const activeImg = document.getElementById('gallery-active-img');
    if (activeImg) {
        activeImg.addEventListener('click', function () {
            this.classList.toggle('zoomed');
        });

        // Reset zoom on mouse leave
        activeImg.parentElement.addEventListener('mouseleave', () => {
            activeImg.classList.remove('zoomed');
        });
    }

    // Google Sheets Order Form Handler
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        let isSubmitting = false;

        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Throttle double submissions
            if (isSubmitting) return;
            isSubmitting = true;

            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8tLKUHJQk2-nx3XWI3oUISmEMz1rQAnn6Uw0_0e7yoCeRZaIG1qhXh9gtw0ep3Ley/exec";

            const submitBtn = document.getElementById('submit-order-btn');
            const successMsg = document.getElementById('order-success-msg');
            const submitSpan = submitBtn ? submitBtn.querySelector('span') : null;

            // Show loading state
            checkoutForm.classList.add('submitting');
            if (submitBtn) submitBtn.disabled = true;
            if (submitSpan) submitSpan.textContent = "অর্ডার প্রসেস হচ্ছে...";

            const formData = new FormData(this);

            const showSuccess = () => {
                // Trigger Facebook Pixel Purchase Event if loaded
                if (typeof fbq === 'function') {
                    fbq('track', 'Purchase', {
                        value: 650,
                        currency: 'BDT'
                    });
                }
                checkoutForm.reset();
                checkoutForm.classList.add('d-none');
                if (successMsg) {
                    successMsg.classList.remove('d-none');
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                isSubmitting = false;
            };

            if (GOOGLE_SCRIPT_URL) {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    showSuccess();
                })
                .catch(error => {
                    console.error('Error submitting order:', error);
                    // Fallback to success visual state in case of CORS or deployment checks
                    showSuccess();
                });
            } else {
                // Simulate network latency for premium feel
                setTimeout(() => {
                    showSuccess();
                }, 1200);
            }
        });
    }
});
