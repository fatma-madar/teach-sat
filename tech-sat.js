document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = [...document.querySelectorAll('.nav-link')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const revealItems = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    const services = document.querySelectorAll('.service-row');
    const languageSwitch = document.querySelector('.language-switch');
    const toast = document.querySelector('.site-toast');
    const backToTop = document.querySelector('.back-to-top');
    const faqItems = document.querySelectorAll('.faq-list details');
    const heroVisual = document.querySelector('.hero-visual');
    const networkCore = document.querySelector('.satellite-core');
    const networkStatus = document.querySelector('.network-status');
    const whyPoints = document.querySelectorAll('.why-point');
    const whyDisplay = document.querySelector('.why-display');
    const whyDisplayCaption = document.querySelector('.why-display-caption');

    faqItems.forEach((item) => {
        item.open = false;
    });
    
    const dropdownItems = [...document.querySelectorAll('.nav-item.has-dropdown')];
 
    const closeDropdowns = () => {
        dropdownItems.forEach((item) => {
            item.classList.remove('is-open');
            item.querySelector('.nav-caret-btn')?.setAttribute('aria-expanded', 'false');
        });
    };
 
    dropdownItems.forEach((item) => {
        const toggleBtn = item.querySelector('.nav-caret-btn');
        toggleBtn?.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = item.classList.contains('is-open');
            closeDropdowns();
            item.classList.toggle('is-open', !isOpen);
            toggleBtn.setAttribute('aria-expanded', String(!isOpen));
        });
    });
 
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-item.has-dropdown')) closeDropdowns();
    });
 
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeDropdowns();
    });

    const setMenuState = (isOpen) => {
        navLinks.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    menuToggle?.addEventListener('click', () => {
        setMenuState(!navLinks.classList.contains('active'));
    });

    links.forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 180;
        let currentId = 'hero';
        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop) currentId = section.id;
        });
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`));
    };

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 600);
        backToTop?.classList.toggle('visible', window.scrollY > 600);
        updateActiveLink();
    }, { passive: true });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));

    const formatCounter = (counter, value) => {
        const suffix = counter.dataset.suffix || '';
        const prefix = counter.dataset.prefix || '';
        const formatted = Number.isInteger(value) ? value.toLocaleString('en-US') : value.toFixed(1);
        counter.textContent = `${prefix}${formatted}${suffix}`;
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = Number(counter.dataset.value);
            const duration = 1100;
            const start = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                formatCounter(counter, target * eased);
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(counter);
        });
    }, { threshold: 0.7 });

    counters.forEach((counter) => counterObserver.observe(counter));

    services.forEach((service) => {
        service.addEventListener('pointermove', (event) => {
            const bounds = service.getBoundingClientRect();
            service.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
            service.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
        });
    });

    let toastTimer;
    languageSwitch?.addEventListener('click', () => {
        toast.textContent = 'النسخة الإنجليزية قيد الإعداد، ستبقى العربية مفعلة حاليًا.';
        toast.classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
    });

    networkCore?.addEventListener('click', () => {
        const isScanning = heroVisual.classList.toggle('is-scanning');
        networkCore.setAttribute('aria-pressed', String(isScanning));
        networkStatus.textContent = isScanning ? 'جاري فحص الإشارة...' : 'شبكة متصلة الآن';
        if (isScanning) {
            window.setTimeout(() => {
                if (!heroVisual.classList.contains('is-scanning')) return;
                networkStatus.textContent = 'الإشارة مستقرة • 99.9%';
            }, 1400);
        }
    });

    const selectWhyPoint = (point) => {
        whyPoints.forEach((item) => item.classList.remove('is-selected'));
        point.classList.add('is-selected');
        whyDisplay.innerHTML = `${point.dataset.whyTitle}<br><b>TECH SAT</b>`;
        whyDisplayCaption.textContent = point.dataset.whyCaption;
    };

    whyPoints.forEach((point) => {
        point.addEventListener('click', () => selectWhyPoint(point));
        point.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectWhyPoint(point);
            }
        });
    });

    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) otherItem.open = false;
            });
        });
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateActiveLink();
});
