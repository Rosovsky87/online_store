window.addEventListener('DOMContentLoaded', () => {

	const tabs = require('./modules/tabs'),
		calc = require('./modules/calc'),
		cards = require('./modules/cards'),
		form = require('./modules/form'),
		modal = require('./modules/modal'),
		slider = require('./modules/slider'),
		timer = require('./modules/timer');

	tabs();
	calc();
	cards();
	form();
	modal();
	slider();
	timer();

});





