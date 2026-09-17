document.addEventListener('DOMContentLoaded', () => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const revealItems = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    const services = document.querySelectorAll('.service-row');
    const toast = document.querySelector('.site-toast');
    const backToTop = document.querySelector('.back-to-top');
    const faqItems = document.querySelectorAll('.faq-list details');
    const heroVisual = document.querySelector('.hero-visual');
    const networkCore = document.querySelector('.satellite-core');
    const networkStatus = document.querySelector('.network-status');
    const whyPoints = document.querySelectorAll('.why-point');
    const whyDisplay = document.querySelector('.why-display');
    const whyDisplayCaption = document.querySelector('.why-display-caption');


    /* =========================================================
       FAQ INITIAL STATE
    ========================================================= */

    faqItems.forEach((item) => {
        item.open = false;
    });


    /* =========================================================
       SCROLL
    ========================================================= */

    window.addEventListener('scroll', () => {
        backToTop?.classList.toggle(
            'visible',
            window.scrollY > 600
        );
    }, { passive: true });


    /* =========================================================
       REVEAL ANIMATIONS
    ========================================================= */

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });


    /* =========================================================
       COUNTERS
    ========================================================= */

    const formatCounter = (counter, value) => {
        const suffix = counter.dataset.suffix || '';
        const prefix = counter.dataset.prefix || '';

        const formatted = Number.isInteger(value)
            ? value.toLocaleString('en-US')
            : value.toFixed(1);

        counter.textContent = `${prefix}${formatted}${suffix}`;
    };

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.value);
                const duration = 1100;
                const start = performance.now();

                const tick = (now) => {
                    const progress = Math.min(
                        (now - start) / duration,
                        1
                    );

                    const eased = 1 - Math.pow(1 - progress, 3);

                    formatCounter(
                        counter,
                        target * eased
                    );

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    }
                };

                requestAnimationFrame(tick);
                observer.unobserve(counter);
            });
        },
        {
            threshold: 0.7
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    /* =========================================================
       SERVICES POINTER EFFECT
    ========================================================= */

    services.forEach((service) => {
        service.addEventListener('pointermove', (event) => {
            const bounds = service.getBoundingClientRect();

            service.style.setProperty(
                '--pointer-x',
                `${event.clientX - bounds.left}px`
            );

            service.style.setProperty(
                '--pointer-y',
                `${event.clientY - bounds.top}px`
            );
        });
    });


    /* =========================================================
       SATELLITE NETWORK INTERACTION
    ========================================================= */

    networkCore?.addEventListener('click', () => {
        if (!heroVisual || !networkStatus) return;

        const isScanning =
            heroVisual.classList.toggle('is-scanning');

        networkCore.setAttribute(
            'aria-pressed',
            String(isScanning)
        );

        networkStatus.textContent = isScanning
            ? 'جاري فحص الإشارة...'
            : 'شبكة متصلة الآن';

        if (isScanning) {
            window.setTimeout(() => {
                if (!heroVisual.classList.contains('is-scanning')) {
                    return;
                }

                networkStatus.textContent =
                    'الإشارة مستقرة • 99.9%';
            }, 1400);
        }
    });


    /* =========================================================
       WHY TECH SAT
    ========================================================= */

    const selectWhyPoint = (point) => {
        if (!whyDisplay || !whyDisplayCaption) return;

        whyPoints.forEach((item) => {
            item.classList.remove('is-selected');
        });

        point.classList.add('is-selected');

        whyDisplay.innerHTML =
            `${point.dataset.whyTitle}<br><b>TECH SAT</b>`;

        whyDisplayCaption.textContent =
            point.dataset.whyCaption;
    };

    whyPoints.forEach((point) => {
        point.addEventListener('click', () => {
            selectWhyPoint(point);
        });

        point.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectWhyPoint(point);
            }
        });
    });


    /* =========================================================
       FAQ
    ========================================================= */

    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });


    /* =========================================================
       BACK TO TOP
    ========================================================= */

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

    updateActiveLink();

    /* ============================================================
   الحركة التلقائية لسيكشن "لماذا Tech Sat"
   ============================================================ */
(function () {
  const whySection = document.querySelector('.why-section');
  const points = document.querySelectorAll('.why-point');

  if (!whySection || !points.length) return;

  let whyTriggered = false;

  function activatePoint(point) {
    points.forEach(function (p) { p.classList.remove('is-selected'); });
    point.classList.add('is-selected');

    const title = point.dataset.whyTitle || '';
    const caption = point.dataset.whyCaption || '';

    const display = document.querySelector('.why-display');
    const displayCaption = document.querySelector('.why-display-caption');

    if (display) display.innerHTML = `${title}<br><b>TECH SAT</b>`;
    if (displayCaption) displayCaption.textContent = caption;
  }

  function runWhySequence() {
const DELAY = 1900; // 1.5 ثانية - أسرع
    points.forEach(function (point, i) {
      setTimeout(function () {
        activatePoint(point);
      }, i * DELAY);
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !whyTriggered) {
          whyTriggered = true;
          runWhySequence();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(whySection);





})();

