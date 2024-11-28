import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { animation } from './_animation.js';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('scroll', () => {
    ScrollTrigger.update();
});

// Parallax banner background
document.querySelectorAll('.j-parallax-banner-el').forEach((elem) => {
    const dataY = elem.getAttribute('data-y');
    
    gsap.to(elem, {
        y: dataY,
        autoAlpha: 0.5,
        scrollTrigger: {
            trigger: document.querySelector('.j-parallax-banner'),
            start: '0',
            end: '100%',
            scrub: true,
        },
    });
});

// Count animation
document.querySelectorAll('.j-count-title').forEach((elem) => {
    const text = parseInt(elem.textContent, 10);

    ScrollTrigger.create({
        trigger: elem,
        start: 'top 90%',
        once: true,
        invalidateOnResize: true,
        onEnter: () => {
            let counter = { value: 0 };
            gsap.to(counter, {
                value: text,
                duration: 5,
                ease: 'power1.out',
                onUpdate: () => {
                    elem.textContent = Math.ceil(counter.value);
                },
            });
        },
    });
});

// Parallax background
document.querySelectorAll('.j-parallax-bg-el').forEach((elem) => {
    const wrapper = elem.closest('.j-parallax-bg');

    Object.assign(elem.style, {
        top: '-15%',
        height: '130%',
        position: 'relative',
        willChange: 'transform',
    });

    Object.assign(wrapper.style, {
        overflow: 'hidden',
    });

    gsap.fromTo(
        elem,
        { y: '-15%' },
        {
            y: '15%',
            scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        }
    );
});

// Mouse gallery zoom
const galleryTop = document.querySelector('.single-products__gallery-top');
if (galleryTop) {
    galleryTop.addEventListener('mousemove', (event) => {
        const image = galleryTop.querySelector('img');

        const containerWidth = galleryTop.offsetWidth;
        const containerHeight = galleryTop.offsetHeight;
        const offsetX = (event.offsetX / containerWidth) * 100;
        const offsetY = (event.offsetY / containerHeight) * 100;

        image.style.transform = 'scale(3)';
        image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    });

    galleryTop.addEventListener('mouseleave', () => {
        const image = galleryTop.querySelector('img');
        image.style.transform = 'scale(1)';
        image.style.transformOrigin = 'center';
    });
}

// Preloader
const preloader = document.querySelector('.j-preloader');
const mainContent = document.querySelector('.j-main');
const wowElements = document.querySelectorAll('.j-wow');

if (preloader) {
    preloader.classList.add('load');
}

if (mainContent) {
    mainContent.classList.add('loaded');
}

setTimeout(() => {
    if (preloader) {
        preloader.classList.add('loaded');
    }

    gsap.utils.toArray(wowElements).forEach((elem) => {
        ScrollTrigger.create({
            trigger: elem,
            start: 'top 100%',
            once: true,
            invalidateOnResize: true,
            onEnter: () => {
                animation(elem);
            },
        });
    });
}, document.querySelectorAll('.j-preloader').length > 0 ? 1000 : 0);