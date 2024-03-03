import $ from 'jquery';
import { Fancybox } from '@fancyapps/ui';

const $loader = $('.j-loader');

// send message
$(document).on('submit', '.j-form', function (event) {
	let $this = $(this),
		data = new FormData($this[0]);
	
	$.ajax({
		url: ajaxurl,
		type: 'POST',
		processData: false,
		cache: false,
		contentType: false,
		data: data,
		beforeSend: function() {
			$loader.addClass('active').fadeIn();
		},
		success: function (response) {
			$this.find('[required]').val('');
			$this.find('input[type="file"]')
				.val('')
				.trigger('change');

			Fancybox.close();
			Fancybox.show(
				[{
					src: '#ok',
					type: "inline",
				}], opts_fancybox
			);

			hide_loader();
		}
	});

	return false;
});

//fancybox
const opts_fancybox = {
	autoFocus: false,
	trapFocus: false,
	dragToClose: false,
}
Fancybox.bind("[data-fancybox]", opts_fancybox);
$(document).on('click', '.j-close-modal', function() {
    Fancybox.close();
});


// loader
function hide_loader() {
	$loader.fadeOut(function() {
		$loader.removeClass('active')
	});
}
