(function () {
  const stepGrid = document.querySelector('.step-grid');
  if (!stepGrid) return;

  const items = stepGrid.querySelectorAll('.step-item');
  if (!items.length) return;

  let triggered = false;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          runSequence();
          observer.disconnect(); // لا تتكرر الحركة
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(stepGrid);

  function runSequence() {
    const DELAY = 900;       // الفاصل الزمني بين كل كارد (~0.9 ثانية)
    const DURATION = 1100;   // مدة بقاء التوهج على الكارد

    items.forEach(function (item, i) {
      setTimeout(function () {
        item.classList.add('is-highlighted');
        setTimeout(function () {
          item.classList.remove('is-highlighted');
        }, DURATION);
      }, i * DELAY);
    });
  }
})();