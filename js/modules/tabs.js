
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

