import $ from 'jquery';
import Swiper from 'swiper';
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';


function slider() {
    $('.j-slider').each(function() {
        let $slider = $(this),
            $container = $slider.find('.slider'),
            w = $slider.attr('data-init'),
            freeMode = $slider.attr('data-freemode');
    
        if($(window).width() <= w || !w) {
            if(!$container.is('.swiper-initialized')) {

                new Swiper($container[0], {
                    modules: [Navigation, Scrollbar, FreeMode, Mousewheel],
                    speed: 400,
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    freeMode: freeMode == 'false' ? false : true,
                    mousewheel: {
                        forceToAxis: true,
                    },
                    wrapperClass: 'slider__wrapper',
                    slideClass: 'slider__slide',
                    scrollbar: {
                        el: $slider.find('.j-scrollbar')[0],
                        draggable: true,
                    },
                    navigation: {
                        nextEl: $slider.find('.j-next')[0],
                        prevEl: $slider.find('.j-prev')[0],
                    },
                });
            }
        } else {
            if($container.is('.swiper-initialized')) {
                $container[0].swiper.destroy(true, true);
            }
        }
    });
}

slider();

$(window).on('resize', slider);
