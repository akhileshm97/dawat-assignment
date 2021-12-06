window.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.getElementById('menu-toggle');
	const primaryNav = document.getElementById('primary-navigation');
	const tabLists = document.querySelectorAll('[role="tablist"]');
	const navLinks = primaryNav.querySelectorAll('a');

	navLinks.forEach((link) => link.addEventListener('click', closeMenu));

	function openMenu() {
		menuToggle.setAttribute('data-open', 'true');
		primaryNav.setAttribute('aria-expanded', 'true');
	}

	function closeMenu() {
		menuToggle.setAttribute('data-open', 'false');
		primaryNav.setAttribute('aria-expanded', 'false');
	}

	const toggleMenu = () => {
		const isOpen = menuToggle.getAttribute('data-open');
		if (isOpen === 'false') openMenu();
		else closeMenu();
	};

	let tabFocus = 0;

	function changeFocus(e) {
		if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
			tabs[tabFocus].setAttribute('tabindex', -1);

			if (e.code === 'ArrowRight') {
				tabFocus++;
				if (tabFocus >= tabs.length) {
					tabFocus = 0;
				}
			} else {
				tabFocus--;
				if (tabFocus < 0) {
					tabFocus = tabs.length - 1;
				}
			}

			tabs[tabFocus].setAttribute('tabindex', 0);
			tabs[tabFocus].focus();
		}
	}

	tabLists.forEach((tabList) => {
		tabList.addEventListener('keydown', changeFocus);

		const tabs = tabList.querySelectorAll('*[role="tab"]');
		const container = tabList.parentNode;

		tabs.forEach((tab) => {
			const ariaControls = tab.getAttribute('aria-controls');
			tab.addEventListener('click', function () {
				const currentTab = container.querySelector('[aria-selected="true"]');
				const currentPanel = container.querySelector(
					'[role="tabpanel"][data-selected="true"]'
				);
				const targetPanel = container.querySelector(
					`[role="tabpanel"]#${ariaControls}`
				);
				currentTab.setAttribute('aria-selected', 'false');
				tab.setAttribute('aria-selected', 'true');
				currentPanel.setAttribute('data-selected', 'false');
				targetPanel.setAttribute('data-selected', 'true');
			});
		});
	});

	menuToggle.addEventListener('click', toggleMenu);
});
