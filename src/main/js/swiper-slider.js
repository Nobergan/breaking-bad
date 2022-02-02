import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-cube';

const swiper = new Swiper('.swiper', {
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