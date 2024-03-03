import $ from 'jquery';

const $up = document.querySelector('.j-up'),
	$header = document.querySelector('.j-header');


function fixed_element() {
	let scroll = window.scrollY;

	if(scroll > 0) {
		$header.classList.add('fixed');
	} else {
		$header.classList.remove('fixed');
	}

	if(scroll > 2000) {
		$up.classList.add('active');
	} else {
		$up.classList.remove('active');
	}
}

// $up.addEventListener('click', function(e) {
// 	e.preventDefault();

// 	gsap.to(window, {duration: 2, scrollTo: 0, ease: Power3.easeInOut});
// });

window.addEventListener('scroll', function() {
	fixed_element();
});
fixed_element();


// data-toggle-class
$(function() {
	let btn = '[data-toggle-class]';

	$(btn).on('click', function(e) {
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
});


//progress
document.addEventListener('DOMContentLoaded', function() {
    let $indicator = document.querySelector('.j-page-progress');

    function updateProgressIndicator() {
        let scrollPosition = window.scrollY,
			totalHeight = document.body.scrollHeight - window.innerHeight,
			progress = (scrollPosition / totalHeight) * 100;

        $indicator.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgressIndicator);
});



// [data-target]
var btn = '[data-target]';

$(document).on('click', btn, function(e) {
	e.preventDefault();

	var $this = $(this),
		target = $this.attr('data-target'); 

		$(btn).each(function() {
			var $this_new = $(this),
				target_new = $this_new.attr('data-target'),
				$target_new = $(target_new); 

			if(target != target_new && !$(target).parents().is('.active-target')) {			
				$this_new.removeClass('active-target');
				$target_new.removeClass('active-target');
			}
		});

		$this.toggleClass('active-target');
		$(target).toggleClass('active-target');
});

$(document).on('click', function(e) {
	var $target = $(e.target);
	
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
		var $this = $(this),
			target = $this.attr('data-target'); 

		$this.removeClass('active-target');
		$(target).removeClass('active-target');
	});
}