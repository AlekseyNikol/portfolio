// main.js
// если VSCode продолжает жаловаться, добавь первой строкой: // @ts-nocheck
console.log("counter.js загружен");

(function () {
  'use strict';


  const DEFAULT_DURATION = 1500;
  const EASE_OUT_QUAD = t => 1 - (1 - t) * (1 - t);
  const format = value => String(Math.round(value));

  function animateCount(el, target, duration = DEFAULT_DURATION) {
    const startTime = performance.now();
    const start = 0;
    const end = Number(target);
    if (Number.isNaN(end)) return;

    function frame(now) {
      const elapsed = now - startTime;
      const progressRaw = Math.min(elapsed / duration, 1);
      const progress = EASE_OUT_QUAD(progressRaw);
      const current = start + (end - start) * progress;
      el.textContent = format(current);

      if (progressRaw < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = format(end);
        el.dataset.animated = "true";
      }
    }

    requestAnimationFrame(frame);
  }

  function onIntersect(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target;
      if (numEl.dataset.animated === "true") {
        obs.unobserve(numEl);
        return;
      }
      const target = numEl.getAttribute('data-target') || numEl.textContent;
      // поддерживаем индивидуальную длительность через data-duration (ms)
      const dataDur = Number(numEl.getAttribute('data-duration'));
      const duration = Number.isFinite(dataDur) && dataDur > 0 ? dataDur : DEFAULT_DURATION;
      animateCount(numEl, target, duration);
      obs.unobserve(numEl);
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);

  function initCounters() {
    const counters = document.querySelectorAll('.num');
    counters.forEach(el => {
      el.textContent = '0';
      const t = Number(el.getAttribute('data-target') || el.textContent || 0);
      if (t <= 0) {
        el.textContent = format(t);
        el.dataset.animated = "true";
        return;
      }
      observer.observe(el);
    });
  }

  // Если подключаешь скрипт с defer — DOM уже готов; иначе слушаем:
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
