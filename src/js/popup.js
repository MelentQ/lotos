import * as bodyScrollLock from "body-scroll-lock";

// Закрыть попап
function closePopup(popupId) {
	var popup = $("#"+popupId);
	popup.removeClass("active");
	bodyScrollLock.enableBodyScroll(popup[0]);
}

$(document).ready(function () {
	// Открытие попапов
	$(document).on("click", "[data-popup]", function (e) {
		e.preventDefault();
		var popupId = $(this).attr("data-popup");
		var popup = $("#"+popupId);
		popup.addClass("active");
		bodyScrollLock.disableBodyScroll(popup[0]);
	});

	const successBlocks = Array.from(document.querySelectorAll('.js-success-block'));
	const formBlocks = Array.from(document.querySelectorAll('.js-form-block'));
	const forms = Array.from(document.querySelectorAll('.form'));

	// Закрытие попапа
	$(document).on("click", ".popup__close", function () {
		var popup = $(this).closest(".popup");
		var popupId = popup.attr("id");
		popup.removeClass("active");
		bodyScrollLock.enableBodyScroll(popup[0]);

		// Закрываем все success-блоки форм
		successBlocks.forEach(block => {
			block.classList.remove('visible');
		})
		formBlocks.forEach(block => {
			block.classList.remove('hidden');
		})
		forms.forEach(form => {
			form.reset();
		})
	});

	$(document).on("click", function (e) {
		if (
			!$(e.target).closest("[data-popup]").length &&
			!$(e.target).closest(".popup").length
		) {
			var popup = $(e.target).closest(".popup");
			var popupId = popup.attr("id");
			if (popup.length) {
				popup.removeClass("active");
				bodyScrollLock.enableBodyScroll(popup[0]);
			}
		}
	});
});

const formContainers = Array.from(document.querySelectorAll('.js-init-form'));
formContainers.forEach(formContainer => {
	handleForm(formContainer)
})

function handleForm(formContainer) {

	const successBlock = formContainer.querySelector('.js-success-block');
	const formBlock = formContainer.querySelector('.js-form-block');
	
	const form = formBlock.querySelector('form');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (successBlock) {
			successBlock.classList.add('visible');
			formBlock.classList.add('hidden')
		}
	})
}