
function modal() {
	//--------------------------------------------------Modal


	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');


	function openModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
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

	const modalTimerId = setTimeout(openModal, 6000);

	window.addEventListener('scroll', showModalByScroll);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {//-1 px(избавило от бага)
			openModal();
			window.removeEventListener('scroll', showModalByScroll);//удаляет функцию которая вызывает мод окно при пролистывании страницы до конца
		}
	}
}

module.exports = modal;



