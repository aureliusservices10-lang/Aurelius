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

// Search Overlay & Interactivity
document.addEventListener('DOMContentLoaded', function () {
    const searchToggleBtn = document.getElementById('headerSearchToggle');
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

    // B2B Quote Form Handling
    const b2bForm = document.getElementById('b2bQuoteForm');
    const feedbackMsg = document.getElementById('b2bFeedbackMsg');

    if (b2bForm) {
        b2bForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fullName = document.getElementById('b2bFullName')?.value || '';
            const companyName = document.getElementById('b2bCompanyName')?.value || '';

            if (feedbackMsg) {
                feedbackMsg.style.display = 'block';
                feedbackMsg.className = 'b2b-feedback-alert mt-3';
                feedbackMsg.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Thank you, <strong>${fullName}</strong>! Your quote request for <strong>${companyName}</strong> has been transmitted to our Perth Risk Advisory Team. We will contact you within 2 business hours.`;

                b2bForm.reset();
                setTimeout(() => {
                    feedbackMsg.style.display = 'none';
                }, 8000);
            }
        });
    }

    // Real-Time Scope & Quote Estimator Calculation
    const estGuards = document.getElementById('estGuards');
    const estHours = document.getElementById('estHours');
    const estFacility = document.getElementById('estFacility');
    const estGuardsVal = document.getElementById('estGuardsVal');
    const estHoursVal = document.getElementById('estHoursVal');
    const estSummary = document.getElementById('estSummary');
    const estCoverageType = document.getElementById('estCoverageType');
    const estApplyBtn = document.getElementById('estApplyBtn');

    function updateEstimator() {
        if (!estGuards || !estHours) return;
        const guards = estGuards.value;
        const hours = estHours.value;
        const facility = estFacility?.value || 'commercial';

        if (estGuardsVal) estGuardsVal.textContent = guards;
        if (estHoursVal) estHoursVal.textContent = `${hours} hrs`;

        let coverageDesc = 'Tier 1 Concierge & Access Patrol Coverage';
        if (facility === 'retail') coverageDesc = 'Loss Prevention & High-Visibility Floor Guarding';
        else if (facility === 'industrial') coverageDesc = 'Perimeter Barrier Security & Patrol Vehicle';
        else if (facility === 'event') coverageDesc = 'Executive Protection & Access Control Unit';

        if (estSummary) estSummary.textContent = `${guards} Master-Licensed Guard${guards > 1 ? 's' : ''} • ${hours} Hrs/Wk`;
        if (estCoverageType) estCoverageType.textContent = coverageDesc;
    }

    if (estGuards) estGuards.addEventListener('input', updateEstimator);
    if (estHours) estHours.addEventListener('input', updateEstimator);
    if (estFacility) estFacility.addEventListener('change', updateEstimator);

    if (estApplyBtn) {
        estApplyBtn.addEventListener('click', function () {
            // Switch to B2B Form Tab
            const b2bTabBtn = document.getElementById('b2b-form-tab');
            if (b2bTabBtn) b2bTabBtn.click();

            const reqInput = document.getElementById('b2bRequirements');
            if (reqInput && estSummary) {
                reqInput.value = `Estimated Requirement: ${estSummary.textContent} (${estCoverageType?.textContent || ''}).`;
            }
        });
    }

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

    // ================= SERVICES SCROLL-DRIVEN STEPPED EXPANDING ACCORDION =================
    const servicesSection = document.getElementById('Services');
    const servicesAccordion = document.getElementById('servicesAccordion');
    const serviceCards = document.querySelectorAll('.expanding-service-card');

    if (servicesSection && servicesAccordion && serviceCards.length > 0) {
        let activeIndex = -1;
        let isTicking = false;

        function setActiveCard(index) {
            if (index === activeIndex) return;
            activeIndex = index;

            serviceCards.forEach((card, idx) => {
                const progressFill = card.querySelector('.progress-fill');
                if (idx === index) {
                    card.classList.add('active');
                    if (progressFill) progressFill.style.width = '100%';
                } else {
                    card.classList.remove('active');
                    if (progressFill) progressFill.style.width = '0%';
                }
            });
        }

        function updateScrollAccordion() {
            const rect = servicesSection.getBoundingClientRect();
            const sectionHeight = servicesSection.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollDistance = sectionHeight - viewportHeight;

            if (scrollDistance <= 0) {
                if (activeIndex !== 0) setActiveCard(0);
                return;
            }

            // Calculate scroll progress through the section
            // Section top starts matching when rect.top <= 90 (below navbar)
            const topOffset = 90;
            const scrolled = -rect.top + topOffset;
            const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

            // Map progress to card indices [0, 1, 2, 3]
            const numCards = serviceCards.length;
            let targetIndex = Math.floor(progress * numCards);
            if (targetIndex >= numCards) targetIndex = numCards - 1;
            if (targetIndex < 0) targetIndex = 0;

            setActiveCard(targetIndex);
        }

        function onScroll() {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateScrollAccordion();
                    isTicking = false;
                });
                isTicking = true;
            }
        }

        // Direct card click: expand immediately & smooth scroll to that card's scroll step
        serviceCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-expand-cta')) return;
                setActiveCard(idx);

                const rect = servicesSection.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const sectionHeight = servicesSection.offsetHeight;
                const viewportHeight = window.innerHeight;
                const scrollDistance = sectionHeight - viewportHeight;

                if (scrollDistance > 0) {
                    const targetScroll = sectionTop + ((idx + 0.15) / serviceCards.length) * scrollDistance - 90;
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        // Initial trigger
        updateScrollAccordion();
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