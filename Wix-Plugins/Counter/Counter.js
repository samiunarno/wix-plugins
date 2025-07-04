// Counter Function
function animateCounter(element, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.text = `${value}${end > 100 ? '+' : '%'}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// On Page Ready
$w.onReady(function () {
  animateCounter($w("#text53"), 0, 10, 3000);    // 10+ Years Experience
  animateCounter($w("#text54"), 0, 99, 2000);    // 99% Accuracy Rate
  animateCounter($w("#text55"), 0, 500, 3000);   // 500+ Positive Reviews
  animateCounter($w("#text56"), 0, 600, 1500);   // 600+ Trusted Partners
});
