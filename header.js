document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    /* =========================================================
       NAVIGATION LINKS
    ========================================================= */

    const links = [
        ...document.querySelectorAll('.nav-link:not(.dropdown-toggle)')
    ];


    /* =========================================================
       DROPDOWNS
    ========================================================= */

    const dropdownItems = [
        ...document.querySelectorAll('.nav-dropdown')
    ];

    const closeDropdowns = () => {
        dropdownItems.forEach((item) => {
            item.classList.remove('is-open');

            const toggle = item.querySelector('.dropdown-toggle');

            toggle?.setAttribute('aria-expanded', 'false');
        });
    };

    dropdownItems.forEach((item) => {
        const toggle = item.querySelector('.dropdown-toggle');

        toggle?.setAttribute('aria-expanded', 'false');

        toggle?.addEventListener('click', (event) => {
            event.stopPropagation();

            const isOpen = item.classList.contains('is-open');

            // Close every dropdown
            closeDropdowns();

            // Open the clicked dropdown
            if (!isOpen) {
                item.classList.add('is-open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-dropdown')) {
            closeDropdowns();
        }
    });

    // Close dropdown with Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDropdowns();
        }
    });


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const setMenuState = (isOpen) => {
        navLinks?.classList.toggle('active', isOpen);
        menuToggle?.classList.toggle('active', isOpen);
        menuToggle?.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        // Close dropdowns when mobile menu closes
        if (!isOpen) {
            closeDropdowns();
        }
    };

    menuToggle?.addEventListener('click', () => {
        const isOpen = navLinks?.classList.contains('active');

        setMenuState(!isOpen);
    });


    /* =========================================================
       NORMAL NAVIGATION LINKS
    ========================================================= */

    links.forEach((link) => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });


    /* =========================================================
       HEADER SCROLL
    ========================================================= */

    window.addEventListener('scroll', () => {
        header?.classList.toggle(
            'scrolled',
            window.scrollY > 200
        );
    }, { passive: true });
});