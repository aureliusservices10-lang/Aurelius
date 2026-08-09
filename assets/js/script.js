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
});