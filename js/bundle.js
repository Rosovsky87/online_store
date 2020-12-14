/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


function calc() {
	//----------------Calc

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.classList.remove(activeClass);

			if (el.getAttribute("id") === localStorage.getItem('sex')) {
				el.classList.add(activeClass);
			}

			if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				el.classList.add(activeClass);
			}
		});
	}

	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "*****";
			return;
		}

		if (sex === "female") {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calcTotal();
			});
		});

		// calcTotal();
	}

	getStaticInformation("#gender div", "calculating__choose-item_active");
	getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");


	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "";
			}

			switch (input.getAttribute('id')) {
				case 'height': height = +input.value;
					break;
				case 'weight': weight = +input.value;
					break;
				case 'age': age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}

module.exports = calc;



/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {


function cards() {
	//----------------------------------------КЛАССЫ ДЛЯ КАРТОЧЕК

	class Menu {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.classes = classes;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}

			element.innerHTML = `
			<img src=${this.src} alt=${this.alt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
		`;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Coild not fetch${url}, status:${res.status}`);
		}

		return await res.json();
	};

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new Menu(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
}

module.exports = cards;



/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


function form() {
	//--------Form


	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		sucсess: 'Спасибо! Скоро мы с вами свяжемся.',
		failure: 'Ошибка!Что-то пошло не так.'
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: { 'Content-type': 'application/json' },
			body: data
		});

		return await res.json();
	};


	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
		display: block;
		margin: 0 auto;
	`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			//----------Блок для отправки в XML
			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');
			// // request.setRequestHeader('Content=type', 'application/json');
			// const formData = new FormData(form);//собирает и подготавливает для отправки все данные с обеих форм.
			// //!! ВАЖНО!! В input в вёрстке всегда должен буть атрибут "name" иначе FormData не сможет найти эти инпуты

			//----------Блок для отправки в JSON

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// const json = JSON.stringify(object);
			//------------------------------


			postData(' http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.sucсess);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
<div class="modal__content">
	<div data-close class="modal__close">×</div>
	<div class="modal__title">${message}</div>
</div>
`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			prevModalDialog.classList.add('show');
			closeModal();
		}, 4000);
	}

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));

}

module.exports = form;



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {


function modal() {
	//--------------------------------------------------Modal


	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');


	function openModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);//добавил эту строку, что б не открывалось окно по таймеру, если клиент сам его откроет до таймера
	}

	function closeModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});

	modalCloseBtn.addEventListener('click', closeModal);


	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});

	window.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	//---------------------------------------------Модификация Модального Окна

	//Задачи:
	//1) появление модального окна единожды через определенный интервал времени + отмена этой функции, если клиент сам открывал мод окно
	//2) появление модального окна единожды при прокрутке страницы до самого низа.
	//3) создать ф-ю которая будет удалять показ мод окна при прокрутке вниз, после первого показа мод окна.

	//Реализация:
	//1)
	const modalTimerId = setTimeout(openModal, 6000);

	//2)
	window.addEventListener('scroll', showModalByScroll);

	//3)
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {//-1 px(избавило от бага)
			openModal();
			window.removeEventListener('scroll', showModalByScroll);//удаляет функцию которая вызывает мод окно при пролистывании страницы до конца
		}
	}
}

module.exports = modal;





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {


function slider() {
	//------------Слайдер

	const slides = document.querySelectorAll('.offer__slide');
	const slider = document.querySelector('.offer__slider');
	const btnPrev = document.querySelector('.offer__slider-prev');
	const btnNext = document.querySelector('.offer__slider-next');
	const total = document.querySelector('#total');
	const current = document.querySelector('#current');
	const slidesWrapper = document.querySelector('.offer__slider-wrapper');
	const slidesField = document.querySelector('.offer__slider-inner');
	const width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	btnNext.addEventListener('click', () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '0.5');
		dots[slideIndex - 1].style.opacity = 1;
	});


	btnPrev.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '0.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '0.5');
			dots[slideIndex - 1].style.opacity = 1;
		});
	});
}

module.exports = slider;



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


function tabs() {
	//------------------------------------------------Табы

	const tabsParent = document.querySelector('.tabheader__items'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent');


	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}


	tabsParent.addEventListener('click', (event) => {
		event.preventDefault();

		if (event.target && event.target.matches('div.tabheader__item')) {
			tabs.forEach((item, i) => {
				if (event.target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	hideTabContent();
	showTabContent();
}

module.exports = tabs;



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {


function timer() {
	//--------------------------------------------Таймер

	const deadline = '2021-01-01';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),//получаем разницу между дэдлайном и текущем временем в милисекундах
			//Math.floor() - округдение до ближайшего целого.
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			// "%" - этот оператор делит на что то(в примере ниже на 24, так как в сутках 24 часа) и возвращает остаток от деления
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),//!ПРОВЕРИТЬ УДАЛЕНИЕ ЛИШНЕЙ ПАРЫ СКОБОК
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();//вызывем в самом начале 1 раз, что бы вёрстка таймера не моргала

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);

			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);
}


module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {

	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
		calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
		cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
		form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
		modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
		slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
		timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

	tabs();
	calc();
	cards();
	form();
	modal();
	slider();
	timer();

});







/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map