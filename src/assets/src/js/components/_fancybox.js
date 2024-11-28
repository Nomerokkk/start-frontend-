import $ from 'jquery';
import { Fancybox } from '@fancyapps/ui';
import { animation } from './_animation.js';

const opts_fancybox = {
	on: {
		reveal: function(fancybox, carousel) {
			let $slide = $(fancybox.container),
				theme = carousel.theme;

			if($slide.find('.j-wow').length > 0) {
				animation($slide.find('.j-wow')[0]);
			}

			if(theme) { 
				$slide.find('input[name="your_theme"]').val(theme);
			}
		},
		destroy: function(fancybox, carousel) {
			let $slide = $(fancybox.container);

			if($slide.find('.j-wow').length > 0) {
				$slide.find('.j-wow').removeClass('animated');
			}
		},
	}
}

Fancybox.bind('[data-fancybox]', opts_fancybox);

$(document).on('click', '.j-fancybox-close', function() {
    Fancybox.close();
});


export { opts_fancybox }