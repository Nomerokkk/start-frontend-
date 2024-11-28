import $ from 'jquery';
import { Fancybox } from '@fancyapps/ui';
import { opts_fancybox } from './_fancybox.js';

const $loader = $('.j-loader');

// send message
$(document).on('submit', '.j-form', function (event) {
	let $this = $(this),
		data = new FormData($this[0]),
		action = $this.attr('action');

	$.ajax({
		url: ajaxurl,
		type: 'POST',
		processData: false,
		cache: false,
		contentType: false,
		data: data,
		beforeSend: function() {
			$loader.fadeIn();   
		},
		success: function (response) {
			$this.find('[required]').val('');
			$this.find('input[type="file"]')
				.val('')
				.trigger('change');

			if(!action) {
				Fancybox.close();
				Fancybox.show(
					[{
						src: '#ok',
						type: "inline",
					}], opts_fancybox
				);

				$loader.fadeOut(function() {
					$loader.remove();	
				});
			} else {
				document.location.href = action;
			}
		}
	});

	return false;
});