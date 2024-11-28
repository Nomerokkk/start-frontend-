function animation(elem) {
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

export { animation };