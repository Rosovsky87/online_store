
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

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			const json = JSON.stringify(object);


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

