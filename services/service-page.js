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
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(stepGrid);

  function runSequence() {
    const DELAY = 3000;      // 🆕 الفاصل الزمني بين كل كارد (3 ثواني)
    const DURATION = 2800;   // 🆕 مدة بقاء التوهج (2.8 ثانية - أقل قليلاً من DELAY عشان يرتاح بين الكاردات)

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