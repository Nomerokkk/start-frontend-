import Swiper from 'swiper';
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';

let $sliders = document.querySelectorAll('.j-slider');

$sliders.forEach((el) => {
    let $scrollbar = el.querySelector('.j-scrollbar');
    new Swiper(el.querySelector('.slider'), {
        modules: [Navigation, Scrollbar, FreeMode, Mousewheel],
        speed: 400,
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        mousewheel: {
            forceToAxis: true,
        },
        wrapperClass: 'slider__wrapper',
        slideClass: 'slider__slide',
        scrollbar: {
            el: $scrollbar,
            draggable: true,
        },
        navigation: {
            nextEl: el.querySelector('.j-next'),
            prevEl: el.querySelector('.j-prev'),
        },
    });
});
