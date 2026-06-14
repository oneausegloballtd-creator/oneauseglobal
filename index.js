// Oneause Global Limited Javascript interactions

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navigation Header Scroll Effect ---
    const header = document.getElementById('mainHeader');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once initially

    // --- 2. Mobile Menu Toggle ---
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isOpened = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !isOpened);
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    mobileNavToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- 3. Scroll Active Link Indicator ---
    const sections = document.querySelectorAll('section');
    
    const activeLinkOnScroll = () => {
        let scrollPosition = window.scrollY + 120; // Offset for header
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', activeLinkOnScroll);

    // --- 4. Intersection Observer for Scroll Animations ---
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    
    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Once animated, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollAnimateElements.forEach(el => animateObserver.observe(el));

    // --- 5. Sectors Details Drawer Data & Logic ---
    const sectorData = {
        'real-estate': {
            badge: 'Real Estate',
            title: '🏠 Real Estate Solutions',
            body: 'We provide comprehensive real estate solutions that shape modern landscapes. Our focus integrates green building practices, smart technologies, and premium architectures to deliver assets of long-term appreciating value.',
            image: 'assets/real_estate.png',
            features: [
                'Property development (residential & commercial)',
                'Land acquisition and sales',
                'Property management',
                'Construction and infrastructure support'
            ],
            impact: 'We help bridge housing deficits, create jobs, and build modern communities.',
            color: 'var(--color-real-estate)',
            bgGlow: 'rgba(245, 158, 11, 0.15)'
        },
        'agriculture': {
            badge: 'Agriculture',
            title: '🌾 Agricultural Services',
            body: 'Our agricultural services focus on scaling crop production, processing raw farm goods, and coordinating local supply chains to ensure regional food security and farmer empowerment.',
            image: 'assets/agriculture.png',
            features: [
                'Crop production and large-scale farming',
                'Agro-processing and packaging',
                'Agricultural consulting and supply chain solutions',
                'Export of farm produce'
            ],
            impact: 'Boosts food security, empowers farmers, and strengthens Nigeria’s agricultural economy.',
            color: 'var(--color-agriculture)',
            bgGlow: 'rgba(16, 185, 129, 0.15)'
        },
        'entertainment': {
            badge: 'Entertainment',
            title: '🎵 Entertainment & Talent',
            body: 'We support and develop creative talent, funding content creation, event production, and music promotions that expand African cultural reach globally.',
            image: 'assets/entertainment.png',
            features: [
                'Music production and promotion',
                'Artist management',
                'Content creation and media distribution',
                'Event and show production'
            ],
            impact: 'Promotes African culture globally, creates jobs, and drives youth engagement.',
            color: 'var(--color-entertainment)',
            bgGlow: 'rgba(139, 92, 246, 0.15)'
        },
        'global-trade': {
            badge: 'Import & Export',
            title: '🚢 Importation & Exportation',
            body: 'We facilitate seamless global trade and international commerce, establishing reliable commodity and logistics channels between Nigeria and the global market.',
            image: 'assets/import_export.png',
            features: [
                'Importation of essential goods and equipment',
                'Exportation of agricultural and manufactured products',
                'Logistics and supply chain management',
                'Trade consulting services'
            ],
            impact: 'Strengthens international trade links and boosts economic diversification.',
            color: 'var(--color-global-trade)',
            bgGlow: 'rgba(59, 130, 246, 0.15)'
        }
    };

    const drawerOverlay = document.getElementById('sectorDrawerOverlay');
    const drawer = document.getElementById('sectorDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerContent = document.getElementById('drawerContent');

    const openDrawer = (sectorId) => {
        const data = sectorData[sectorId];
        if (!data) return;

        // Render features list
        const featuresHTML = data.features.map(feat => `
            <li>
                <svg class="drawer-check-icon" viewBox="0 0 24 24" style="color: ${data.color}">
                    <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>${feat}</span>
            </li>
        `).join('');

        // Populate drawer
        drawerContent.innerHTML = `
            <div class="drawer-banner-image" style="width: 100%; height: 220px; border-radius: 12px; overflow: hidden; margin-bottom: 2rem; border: 1px solid var(--glass-border);">
                <img src="${data.image}" alt="${data.badge}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span class="drawer-sector-badge" style="background: ${data.bgGlow}; color: ${data.color}; border: 1px solid ${data.color}33">${data.badge}</span>
            <h3 class="drawer-sector-title">${data.title}</h3>
            <p class="drawer-sector-body">${data.body}</p>
            <div class="drawer-features-list">
                <h4>Our Services</h4>
                <ul>
                    ${featuresHTML}
                </ul>
            </div>
            <div class="drawer-impact-box" style="margin-bottom: 2.5rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-left: 4px solid ${data.color}; border-radius: 8px;">
                <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary); font-family: var(--font-heading);">Our Impact</h4>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">${data.impact}</p>
            </div>
            <a href="#contact" class="btn btn-primary btn-block drawer-cta-btn" id="drawerContactBtn" style="background: linear-gradient(135deg, ${data.color}dd 0%, ${data.color} 100%); color: ${sectorId === 'real-estate' || sectorId === 'agriculture' ? '#000' : '#fff'}">
                Inquire About ${data.badge}
            </a>
        `;

        // Add drawer contact listener to close drawer when scrolling to contact
        const drawerCta = drawerContent.querySelector('.drawer-cta-btn');
        drawerCta.addEventListener('click', () => {
            closeDrawer();
        });

        // Show drawer
        drawerOverlay.setAttribute('aria-hidden', 'false');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scroll
    };

    const closeDrawer = () => {
        drawerOverlay.setAttribute('aria-hidden', 'true');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable page scroll
    };

    // Card click event listeners
    const sectorCards = document.querySelectorAll('.sector-card');
    sectorCards.forEach(card => {
        const learnMoreBtn = card.querySelector('button');
        const sectorId = card.getAttribute('data-sector');
        
        // Make the whole card clickable or trigger from button
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                openDrawer(sectorId);
            }
        });

        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openDrawer(sectorId);
            });
        }
    });

    // Footer links to trigger drawer
    const footerSectorLinks = document.querySelectorAll('[data-sector-link]');
    footerSectorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectorId = link.getAttribute('data-sector-link');
            openDrawer(sectorId);
        });
    });

    // Close listeners
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) {
            closeDrawer();
        }
    });

    // Keyboard ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawerOverlay.classList.contains('active')) {
            closeDrawer();
        }
    });

    // --- 6. Contact Form Validation & Submission ---
    const contactForm = document.getElementById('contactForm');
    const toastContainer = document.getElementById('toastContainer');
    const toastAlert = document.getElementById('toastAlert');
    const toastIcon = toastAlert.querySelector('.toast-icon');
    const toastMsg = toastAlert.querySelector('.toast-message');

    const showToast = (message, type = 'success') => {
        toastMsg.textContent = message;
        toastAlert.className = `toast-alert show ${type}`;
        
        if (type === 'success') {
            toastIcon.textContent = '✓';
        } else {
            toastIcon.textContent = '✗';
        }

        // Hide after 4 seconds
        setTimeout(() => {
            toastAlert.classList.remove('show');
        }, 4000);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');
        const submitBtn = document.getElementById('formSubmitBtn');

        let isValid = true;

        // Helper to show invalid status
        const setFieldState = (input, isValidField) => {
            const group = input.parentElement;
            if (isValidField) {
                group.classList.remove('invalid');
            } else {
                group.classList.add('invalid');
                isValid = false;
            }
        };

        // Name Validation
        setFieldState(nameInput, nameInput.value.trim().length > 0);
        
        // Email Validation
        setFieldState(emailInput, validateEmail(emailInput.value.trim()));
        
        // Subject Validation
        setFieldState(subjectInput, subjectInput.value.trim().length > 0);
        
        // Message Validation
        setFieldState(messageInput, messageInput.value.trim().length > 0);

        if (isValid) {
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            const origButtonText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <svg class="send-icon spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-dashoffset="16"/></svg>`;

            // Simulate server network latency
            setTimeout(() => {
                showToast('Thank you! Your inquiry has been sent. We will get back to you shortly.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = origButtonText;
            }, 1500);
        } else {
            showToast('Please correct the validation errors in the form.', 'error');
        }
    });

    // Clear validation error state when inputting text
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('invalid');
        });
    });

    // --- 7. Extra Smooth Scroll helper for scroll indicator arrow ---
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
