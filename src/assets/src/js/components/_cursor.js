import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

const cursor = new MouseFollower({
    speed: .5,
    iconSvgSrc: target + '/img/icons.svg',
    stateDetection: {
        '-pointer': 'a, button, label, .btn, .j-select',
        '-hidden': 'iframe',
        '-exclusion': '.btn',
    },
});

cursor.setImg(target + '/img/logo-icon-white.svg');

let items = document.querySelectorAll('.item-services, .item-blog, .item-projects, .item-reviews, [data-toggle-class]');
items.forEach(function(el) {
    el.addEventListener('mouseenter', () => {
        cursor.setText(readMore);
        cursor.removeImg();
    });
});
items.forEach(function(el) {
    el.addEventListener('mouseleave', () => {
        cursor.removeText();
        cursor.setImg(target + '/img/logo-icon-white.svg');
    });
});