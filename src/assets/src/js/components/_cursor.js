import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

MouseFollower.registerGSAP(gsap);

if(window.innerWidth >= 1200) {
    const cursor = new MouseFollower({
        speed: .5,
        iconSvgSrc: target + '/img/icons.svg',
        stateDetection: {
            '-pointer': 'a, button, label, .btn, .j-select, .header__icons-item',
            '-hidden': 'iframe',
            '-exclusion': '.btn',
        },
    });

    cursor.setImg(target + '/img/logo.svg');

    let items = document.querySelectorAll('.item-services, .item-blog, .item-projects, .item-gallery, .section-seo__wrapper.active');

    items.forEach(function(el) {
        el.addEventListener('mouseenter', () => {
            cursor.setText(text_readmore);
            cursor.removeImg();
        });
    });
    items.forEach(function(el) {
        el.addEventListener('mouseleave', () => {
            cursor.removeText();
            cursor.setImg(target + '/img/logo.svg');
        });
    });
}