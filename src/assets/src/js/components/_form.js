import $ from 'jquery';
import NiceSelect from 'nice-select2/dist/js/nice-select2.js';
import jbvalidator from '@emretulek/jbvalidator';
import intlTelInput from 'intl-tel-input';
import inputmask from 'inputmask/dist/jquery.inputmask.min.js';

// niceselect
let $select = document.querySelector('.j-select');
if($select) {
	initSelect($select);
}
function initSelect(el) {
	NiceSelect.bind(el);
	$(el).next('.j-select').append('<svg><use xlink:href="' + target + '/img/icons.svg#arrow"/></svg>');
}

//form
const $form = $('.j-form'),
	validator = $form.jbvalidator({
		errorMessage: false,
		successClass: true,
		html5BrowserDefault: false,
		validClass: 'valid',
		invalidClass: 'invalid',
	});


// file
$('input[type="file"]').on('change', function() {
	let $this = $(this),
		files = $(this)[0].files,
		fileList = $('.j-file-name');
        
	fileList.empty();

	if (files.length > 0) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var listItem = $('<div></div>').text(file.name + ' (' + file.size + ' bytes)');
			fileList.append(listItem);
		}
	} else {
		fileList.append($('<div></div>').text('No files selected'));
	}
});


// phones
function init_phones(el) {
	let $el = $(el),
		iti = intlTelInput(el, {
			initialCountry: 'auto',
			separateDialCode: false,
			nationalMode: false,
			placeholderNumberType: 'MOBILE',
			utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/19.5.4/js/utils.min.js',
			geoIpLookup: function(success, failure) {
				$.get('https://ipinfo.io', function() {}, 'jsonp').always(function(resp) {
					var countryCode = (resp && resp.country) ? resp.country : "ua";

					success(countryCode);
				});
			},
			autoPlaceholder: 'off',
			i18n: {
				searchPlaceholder: text_search,
			}
		});
    
    $el.closest('.iti').find('.iti__arrow').append('<svg><use xlink:href="' + target + '/img/icons.svg#arrow"/></svg>');

	iti.promise.then(() => {
		el.addEventListener('countrychange', function() {
			$el.removeClass('mask-added');

			change_mask($el);
		});

		change_mask($el);
		
		function change_mask($el) {	
			let selectedCountryData = iti.getSelectedCountryData();
			let code = '+' + selectedCountryData.dialCode;
			let code_format = '+(' + selectedCountryData.dialCode + ')';
			let code_format_mask = code_format.replace('9', '\\9');
			let phone = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, false, intlTelInputUtils.numberType.MOBILE);
			let text = phone.replace(code + ' ', '');
			let mask = code_format_mask + ' ' + text.replace(/[0-9]/g, '9');
			let placeholder = code_format + ' ' + text.replace(/[0-9]/g, '_');

			if(!$el.is('.mask-added')) {
				$el.inputmask('remove');
				$el.removeData('v-min-length');
				$el.attr('data-v-min-length', placeholder.length);
				$el.attr('placeholder', placeholder);
				$el.val('');
				$el.inputmask(mask);

				validator.reload();

				$el.addClass('mask-added');
			}
		}
	});
}

$('.j-phone').each(function(e, el) {
	init_phones(el);
});



// result messages
function messagesResult(status, title) {
	let classes = '',
		icon = '';

	if(status == true) {
		icon = 'ok';
	} else {
		icon = 'close';
		classes = 'messages__item--error';
	}
	
	let $temp = $(`<div class="messages__item ${classes}"><div class="messages__icon"><svg><use xlink:href="${target}/img/icons.svg#${icon}"/></svg></div><div class="messages__title">${title}</div></div>`);

	$('.j-messages').prepend($temp);

	setTimeout(() => {
		$temp.addClass('active');
        setTimeout(function() {
            $temp.remove();
        }, 500);
	}, 3000);
}

$(document).on('click', '.messages__item', function() {
    $(this).addClass('active');
    setTimeout(function() {
        $(this).remove();
    }, 500);
});

$form.find('.btn[type="submit"]').on('click', function() {
	setTimeout(() => {
		if($(this).closest('.j-form').find('.invalid').length > 0) {
			messagesResult(false, text_errors);
		}
	}, 100);
});