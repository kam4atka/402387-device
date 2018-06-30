var noJs = document.querySelector('html');

var currentNav = document.querySelector('.catalog-list');
var subNav = document.querySelector('.catalog-item-navigation');

var writeUs = document.querySelector('.contacts-button');
var modalSend = document.querySelector('.modal-send');
var mapUs = document.querySelector('.map-preview');
var modalMap = document.querySelector('.modal-map');
var modalOverlay = document.querySelector('.modal-overlay');



if (modalSend) {
	var formSend = modalSend.querySelector('form');
	var userName = modalSend.querySelector('.writeus-name');
	var userEmail = modalSend.querySelector('.writeus-email');
	var userDesc = modalSend.querySelector('.writeus-desc');
}

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

noJs.classList.remove('no-js');

currentNav.addEventListener('click', function(evt) {
	subNav.classList.toggle('hide');
});

function setCloseEvent(root) {
	var modalClose = root.querySelector('.modal-close');
	modalClose.addEventListener('click', function(evt) {
		evt.preventDefault();
		root.classList.add('hide');
		modalOverlay.classList.add('hide');
	});
	modalOverlay.addEventListener('click', function() {
		root.classList.add('hide');
		modalOverlay.classList.add('hide');
	});
};

function setCloseEsc(root) {
	window.addEventListener('keydown', function(evt) {
		if (evt.keyCode === 27) {
			evt.preventDefault();
			if (!root.classList.contains('hide')) {
				root.classList.add('hide');
			}
			if (!modalOverlay.classList.contains('hide')) {
				modalOverlay.classList.add('hide');
			}
		}
	});
};

function writeUsHendler(evt) {
	evt.preventDefault();
	modalOverlay.classList.remove('hide');
	modalSend.classList.remove('hide');
	setCloseEvent(modalSend);
	setCloseEsc(modalSend);
	
	try {
		storageName = localStorage.getItem('name');
		storageEmail = localStorage.getItem('email');
	} catch(err) {
		isStorageSupport = false;
	}

	if (storageName) {
		userName.value = storageName;
		userEmail.focus();
	}
	if (storageName && storageEmail) {
		userName.value = storageName;
		userEmail.value = storageEmail;
		userDesc.focus();
	} else {
		userName.focus();
	}

	formSend.addEventListener('submit', function(evt) {
		if(!userName.value) {
			evt.preventDefault();
			userName.focus();
		} else if (userName.value && !userEmail.value ) {
			evt.preventDefault();
			userEmail.focus();
		} else {
			localStorage.setItem("name", userName.value);
			localStorage.setItem("email", userEmail.value);
		}
	});

}

if (writeUs) {
	writeUs.addEventListener('click', writeUsHendler);
}

function mapUsHendler(evt) {
	evt.preventDefault();
	modalOverlay.classList.remove('hide');
	modalMap.classList.remove('hide');
	setCloseEvent(modalMap);
	setCloseEsc(modalMap);
}

if (mapUs) {
	mapUs.addEventListener('click', mapUsHendler);
}