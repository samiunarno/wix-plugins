$w.onReady(() => {
  const slidesData = [
    {
      id: 1,
      text: "For me, newplacement also means: seriously considering self-employment – and preparing it professionally."
    },
    {
      id: 2,
      text: "I help you rewrite your story – and take charge of the direction."
    },
    {
      id: 3,
      text: "I help you rewrite your story – and take charge of the direction."
    },
    {
      id: 4,
      text: "I help you rewrite your story – and take charge of the direction."
    }
  ];

  const slideDuration = 20000; // 20 seconds per slide
  let currentIndex = 0;
  let timerId;

  const repeater = $w('#slideshow1');

  function showSlide(index) {
    repeater.data = [slidesData[index]];

    $w('#slideshow1').hide('fade', { duration: 500 })
      .then(() => $w('#slideshow1').show('fade', { duration: 500 }));
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slidesData.length;
    showSlide(currentIndex);
    resetTimer();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
    showSlide(currentIndex);
    resetTimer();
  }

  function resetTimer() {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(nextSlide, slideDuration);
  }

  repeater.onItemReady(($item, itemData) => {
    $item('#text73').text = itemData.text;
  });

  showSlide(currentIndex);
  resetTimer();

  $w('#slideshowButton1').onClick(() => {
    clearTimeout(timerId);
    nextSlide();
  });

  $w('#slideshowButton2').onClick(() => {
    clearTimeout(timerId);
    prevSlide();
  });
});
