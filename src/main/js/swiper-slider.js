import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

new Swiper('.swiper', {
  speed: 10000,
  loop: true,

  autoplay: {
    delay: 0,
  },

  effect: 'cube',
  cubeEffect: {
    slideShadows: true,
  },
  
});

new Swiper('.swiper-episodes', {
  speed: 5000,
  loop: true,

  autoplay: {
    delay: 3000,
  },

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  
});

new Swiper('.swiper-characters', {
  speed: 5000,
  loop: true,

  autoplay: {
    delay: 3000,
  },

 effect: 'coverflow',
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
  },
  
});