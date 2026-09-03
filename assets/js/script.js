// Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header-section');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Preloader Hide
window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("preloader-hidden");
        }, 1000);
    }
});

// Search Overlay & Interactivity & Mobile Navbar Auto-Collapse
document.addEventListener('DOMContentLoaded', function () {
    // ================= MOBILE NAVBAR AUTO-CLOSE CONTROLLER =================
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const navbarToggler = document.querySelector('.navbar-toggler');

    function closeMobileNavbar() {
        if (!navbarCollapse) return;
        if (navbarCollapse.classList.contains('show') || navbarCollapse.classList.contains('collapsing')) {
            if (window.bootstrap && window.bootstrap.Collapse) {
                const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            } else if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                navbarToggler.click();
            }
        }
    }

    if (navbarCollapse) {
        // Close navbar automatically when clicking any link/tab inside the collapse,
        // EXCEPT dropdown toggles (Services, Industries) which open submenus.
        const navInteractiveLinks = navbarCollapse.querySelectorAll('a:not(.dropdown-toggle):not([data-bs-toggle="dropdown"])');
        navInteractiveLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMobileNavbar();
            });
        });

        // Close navbar if clicking anywhere outside of it on mobile/tablet
        document.addEventListener('click', function (event) {
            if (navbarCollapse.classList.contains('show')) {
                const isClickInside = navbarCollapse.contains(event.target) || (navbarToggler && navbarToggler.contains(event.target));
                if (!isClickInside) {
                    closeMobileNavbar();
                }
            }
        });
    }

    // Also close mobile menu if brand logo is clicked
    const brandLogo = document.querySelector('.navbar-brand');
    if (brandLogo) {
        brandLogo.addEventListener('click', function () {
            closeMobileNavbar();
        });
    }

    const searchToggleBtn = document.getElementById('headerSearchToggle');
    if (searchToggleBtn) {
        searchToggleBtn.addEventListener('click', function () {
            closeMobileNavbar();
        });
    }

    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchOverlayClose');
    const searchInput = document.getElementById('headerSearchInput');

    function openSearch() {
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            searchOverlay.setAttribute('aria-hidden', 'false');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 200);
            }
        }
    }

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            searchOverlay.setAttribute('aria-hidden', 'true');
        }
    }

    if (searchToggleBtn) searchToggleBtn.addEventListener('click', openSearch);
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

    if (searchOverlay) {
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay) closeSearch();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    const searchTags = document.querySelectorAll('.search-tag');
    searchTags.forEach(tag => {
        tag.addEventListener('click', closeSearch);
    });

    // Modal Trigger Buttons Handlers
    const triggerScreeningBtn = document.getElementById('triggerScreeningModal');
    const triggerLicenseBtn = document.getElementById('triggerLicenseModal');

    if (triggerScreeningBtn) {
        triggerScreeningBtn.addEventListener('click', function () {
            const screeningModalEl = document.getElementById('screeningModal');
            if (screeningModalEl && window.bootstrap) {
                const modal = new bootstrap.Modal(screeningModalEl);
                modal.show();
            }
        });
    }

    if (triggerLicenseBtn) {
        triggerLicenseBtn.addEventListener('click', function () {
            const licenseModalEl = document.getElementById('licenseModal');
            if (licenseModalEl && window.bootstrap) {
                const modal = new bootstrap.Modal(licenseModalEl);
                modal.show();
            }
        });
    }

    // Scroll-Triggered Reveals via Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .service-card, .ind-img-card, .why-card-premium, .testi-card-box, .leadership-card, .insight-post-card, .track-stat-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // ================= TRACK RECORD COUNTER ANIMATION =================
    const trackRecordSection = document.querySelector('.track-record-wrapper');
    if (trackRecordSection) {
        let countTriggered = false;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countTriggered) {
                    countTriggered = true;
                    animateTrackCounters();
                }
            });
        }, { threshold: 0.2 });

        counterObserver.observe(trackRecordSection);
    }

    function animateTrackCounters() {
        const counterElements = document.querySelectorAll('.track-num[data-target]');
        const duration = 2000; // 2 seconds count-up duration

        counterElements.forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const isComma = el.getAttribute('data-format') === 'comma';
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

            let startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease-out cubic formula for smooth deceleration
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * target;

                let formattedVal;
                if (decimals > 0) {
                    formattedVal = currentVal.toFixed(decimals);
                } else {
                    formattedVal = Math.floor(currentVal);
                    if (isComma) {
                        formattedVal = formattedVal.toLocaleString('en-US');
                    }
                }

                el.textContent = `${prefix}${formattedVal}${suffix}`;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    let finalVal = target;
                    if (decimals > 0) {
                        finalVal = target.toFixed(decimals);
                    } else if (isComma) {
                        finalVal = target.toLocaleString('en-US');
                    }
                    el.textContent = `${prefix}${finalVal}${suffix}`;
                }
            }

            window.requestAnimationFrame(step);
        });
    }

    // ================= HERO CONSTELLATION NETWORK CANVAS =================
    const heroCanvas = document.getElementById('heroNetworkCanvas');
    const heroSection = document.getElementById('Home');

    if (heroCanvas && heroSection) {
        const ctx = heroCanvas.getContext('2d');
        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;
        let particles = [];
        let animationFrameId = null;
        let isHeroVisible = true;

        const mouse = {
            x: null,
            y: null,
            radius: 160 // Connection radius to mouse cursor
        };

        // Resize Canvas with DPR for ultra-crisp Retina rendering
        function resizeCanvas() {
            const rect = heroSection.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = window.devicePixelRatio || 1;

            heroCanvas.width = width * dpr;
            heroCanvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            initParticles();
        }

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 1.8 + 1.2; // 1.2px - 3.0px

                // Varied golden & subtle navy tones for depth
                const isGold = Math.random() > 0.25;
                this.color = isGold ? '#D4AF37' : '#0A192F';
                this.alpha = isGold ? (Math.random() * 0.4 + 0.45) : 0.25;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges smoothly
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                // Interactive mouse repulsion / nudge
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius && dist > 0) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 0.6;
                        this.y -= (dy / dist) * force * 0.6;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function initParticles() {
            particles = [];
            // Dynamic particle count based on viewport area
            const density = (width * height) / 13000;
            const count = Math.min(Math.max(Math.floor(density), 35), 90);

            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        // Connect nearby particles with delicate golden lines
        function connectParticles() {
            const maxDistance = width < 768 ? 95 : 130;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const opacity = (1 - dist / maxDistance) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor if within range
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - particles[i].x;
                    const dy = mouse.y - particles[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const opacity = (1 - dist / mouse.radius) * 0.55;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation Loop
        function animate() {
            if (!isHeroVisible) return;

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        }

        // Track Mouse Position
        heroSection.addEventListener('mousemove', function (e) {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        heroSection.addEventListener('mouseleave', function () {
            mouse.x = null;
            mouse.y = null;
        });

        // Touch Interaction
        heroSection.addEventListener('touchmove', function (e) {
            if (e.touches.length > 0) {
                const rect = heroSection.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
            }
        }, { passive: true });

        heroSection.addEventListener('touchend', function () {
            mouse.x = null;
            mouse.y = null;
        });

        // Pause animation when hero is offscreen to save battery/resources
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroVisible = entry.isIntersecting;
                if (isHeroVisible) {
                    if (!animationFrameId) {
                        animate();
                    }
                } else {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            });
        }, { threshold: 0.05 });

        heroObserver.observe(heroSection);

        // Resize Listener
        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 150);
        });

        // Initial setup
        resizeCanvas();
        animate();
    }

    // Floating Back to Top Button Controller
    const backToTopBtns = document.querySelectorAll('.back-to-top-btn, .floating-btn-top');
    if (backToTopBtns.length > 0) {
        function checkScrollPos() {
            if (window.scrollY > 220) {
                backToTopBtns.forEach(btn => btn.classList.add('btn-visible'));
            } else {
                backToTopBtns.forEach(btn => btn.classList.remove('btn-visible'));
            }
        }
        window.addEventListener('scroll', checkScrollPos);
        checkScrollPos();

        backToTopBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }
});