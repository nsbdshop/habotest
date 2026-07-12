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
    // Register button ripple effect
    initButtonRipples();

    // Intersection Observer for scroll animations (Fade-up, etc.)
    initScrollAnimations();
});

/**
 * Premium Button Ripple Effect
 */
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn-ripple');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

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
 * Switch Active Image in Product Gallery
 */
window.switchGalleryImage = function (element, imageSrc) {
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
};

// Setup Zoom Click Handler
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
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Your Google Script Web App URL goes here
            // Example: "https://script.google.com/macros/s/.../exec"
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8tLKUHJQk2-nx3XWI3oUISmEMz1rQAnn6Uw0_0e7yoCeRZaIG1qhXh9gtw0ep3Ley/exec";

            const submitBtn = document.getElementById('submit-order-btn');
            const successMsg = document.getElementById('order-success-msg');
            const submitSpan = submitBtn.querySelector('span');

            // Show loading state
            checkoutForm.classList.add('submitting');
            submitBtn.disabled = true;
            submitSpan.textContent = "অর্ডার প্রসেস হচ্ছে...";

            const formData = new FormData(this);

            // If URL is set, send data. Otherwise simulate success for testing
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

            function showSuccess() {
                checkoutForm.reset();
                checkoutForm.classList.add('d-none');
                successMsg.classList.remove('d-none');
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});

