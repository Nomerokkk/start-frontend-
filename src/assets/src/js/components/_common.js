import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger} from 'gsap/ScrollTrigger.js';
import mPageScroll2id from 'page-scroll-to-id';


const $up = document.querySelector('.j-up'),
	$header = document.querySelector('.j-header');


let lastScrollTop = 0;

function fixed_element() {
	let scroll = window.scrollY;

	if(scroll > 0) {
		$header.classList.add('fixed');
	} else {
		$header.classList.remove('fixed');
	}

	if(scroll > lastScrollTop) {
		$header.classList.add('down');
	} else {
		$header.classList.remove('down');
	}

	lastScrollTop = scroll <= 0 ? 0 : scroll;

	if(scroll > 2000) {
		$up.classList.add('fixed');
	} else {
		$up.classList.remove('fixed');
	}
	
}

window.addEventListener('scroll', function() {
	fixed_element();
});
fixed_element();


// [data-toggle-class]
$('[data-toggle-class]').on('click', function(e) {
	e.preventDefault();

	let $this = $(this),
		target = $this.attr('data-toggle-class'),
		$target = $(target);

	$this.toggleClass('active');
	$target.toggleClass('active');

	setTimeout(function() {
		ScrollTrigger.refresh();
	}, 1000);
});


// [data-toggle]
$('[data-toggle]').on('click', function(e) {
	e.preventDefault();

	let $this = $(this),
		target = $this.attr('data-toggle'),
		$target = $(target);

	$this.toggleClass('active');
	$target.slideToggle();

	setTimeout(function() {
		ScrollTrigger.refresh();
	}, 1000);
});


//progress
document.addEventListener('DOMContentLoaded', function() {
    let $indicator = document.querySelector('.j-progress');

    function updateProgressIndicator() {
        let scrollPosition = window.scrollY,
			totalHeight = document.body.scrollHeight - window.innerHeight,
			progress = (scrollPosition / totalHeight) * 100;

        $indicator.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgressIndicator);
});


// [data-target]
$(function() {
	let btn = '[data-target]';

	$(document).on('click', btn, function(e) {
		e.preventDefault();

		let $this = $(this),
			target = $this.attr('data-target'),
			array1 = target.split(',').map(item => item.trim());

		$(btn).each(function() {
			let $this_new = $(this),
				target_new = $this_new.attr('data-target'),
				$target_new = $(target_new),
				array2 = target_new.split(',').map(item => item.trim());

			if(target != target_new && 
				!$(target).parents().is('.active-target') &&
				!array1.some(item => array2.includes(item))
			) {			
				$this_new.removeClass('active-target');
				$target_new.removeClass('active-target');
			}
		});

		$this.toggleClass('active-target');
		$(target).toggleClass('active-target');


		if($this.is('[data-overflow]')) {
			$('body').toggleClass('overflow');
		}
	});

	$(document).on('click', function(e) {
		let $target = $(e.target);
		
		if( !$target.is(btn) && 
			!$target.parents().is(btn) && 
			!$target.is('.active-target') && 
			!$target.parents().is('.active-target') 
		) {
			hide_target();
		}
	});

	function hide_target() {
		$(btn).each(function() {
			let $this = $(this),
				target = $this.attr('data-target'); 

			$this.removeClass('active-target');
			$(target).removeClass('active-target');
		});

		$('body').removeClass('overflow');
	}

	$('.j-overlay, [data-target-close]').on('click', function() {
		hide_target();
	});
});


// scroll to element
$('a[href^="#"]:not([data-fancybox])').mPageScroll2id({
	highlightClass: 'active',
	offset: $(window).width() >= 768 ? 92 : 96,
});