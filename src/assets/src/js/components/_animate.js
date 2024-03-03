import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// animation
function animateFrom(elem) {
	let delay = elem.getAttribute('data-delay'),
		delay_remove = 1000;

	if(elem.classList.contains('j-wow-opacity')) {
		delay_remove = 2000;
	}

	if(!elem.classList.contains('animate')) {
		if(delay) {
			setTimeout(function() {
				elem.classList.add('animate');
				setTimeout(function() {
					elem.classList.remove('animate');
					elem.classList.add('animated');
				}, delay_remove);
			}, delay * 1000);
		} else {
			elem.classList.add('animate');
			setTimeout(function() {
				elem.classList.remove('animate');
				elem.classList.add('animated');
			}, delay_remove);
		}
	}
}

setTimeout(function() {
	
	gsap.utils.toArray('.j-wow').forEach(function(elem) {
		ScrollTrigger.create({
			trigger: elem,
			once: true,
			invalidateOnResize: true,
			onEnter: function() {
				animateFrom(elem);
			},
		});
	});

	gsap.utils.toArray('.j-wow-sec').forEach(function(elem) {
		ScrollTrigger.create({
			trigger: elem,
			once: true,
			invalidateOnResize: true,
			onEnter: function() {
				elem.querySelectorAll('.j-wow-sec-el').forEach(function(elem_wow) {
					animateFrom(elem_wow);
				});
			},
		});
	});

}, (document.querySelectorAll('.j-preloader').length > 0) ? 1000 : 0);

window.addEventListener('scroll', function() {
    ScrollTrigger.update();
});


// parallax banner bg
if(window.innerWidth >= 768) {
	$('.j-parallax-banner-el').each(function(i, elem) {
		let $elem = $(elem);

		gsap.to($elem, {
			y: $elem.attr('data-y'),
			autoAlpha: .5,
			scrollTrigger: {
				trigger: document.querySelector('.j-parallax-banner'),
				start: '0',
				end: '100%',
				scrub: true,
				onLeave: () => {
					document.querySelector('.j-parallax-banner').classList.add('hidden');
				},
				onEnterBack: () => {
					document.querySelector('.j-parallax-banner').classList.remove('hidden');
				},
			},
		});
	});
}

// mouse parallax
function parallaxIt(e, target, container, movement) {
	let $this = $(container),
		relX = e.pageX - $this.offset().left,
		relY = e.pageY - $this.offset().top;
  
	gsap.to(target, 1, {
		x: (relX - $this.width() / 2) / $this.width() * movement,
		y: (relY - $this.height() / 2) / $this.height() * movement,
	});
}
$(document).on('mousemove', '.j-mouse-animate', function(e) {
	parallaxIt(e, this, this, 100);
});
$(document).on('mouseout', '.j-mouse-animate', function(e) {
	gsap.to(this, 1, {
		x: 0,
		y: 0,
		rotationY: 0, 
		rotationX: 0,
	});
});




//exports
export { animateFrom };