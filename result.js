new Swiper('.swiper-container', {
  loop: true,
  speed: 800,
  scrollbar : {
    el : '.swiper-scrollbar',
    draggable: true,
    dragSize: 50,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
  },
  mousewheel: {
    invert: false,
  },
  autoHeight: true,
});