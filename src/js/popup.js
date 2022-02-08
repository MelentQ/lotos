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

		handleForm(popupId)

		const inputs = Array.from(document.querySelectorAll('.js-input'));
		const placeholders = Array.from(document.querySelectorAll('.js-input-placeholder'));
		if (inputs && placeholders) {
			inputs.forEach((input, i) => {
				input.addEventListener('input', () => {
					if (input.value) {
						placeholders[i].classList.add('active');
					} else {
						placeholders[i].classList.remove('active');
					}
				})
			})
		}
		// const inputs2 = $('.js-input');
		// const placeholders2 = $('.js-input-placeholder');
		// if (inputs2 && placeholders2) {
		// 	inputs2.each((i) => {
		// 		$(this).on('change', () => {
		// 			if (inputs2[i].value) {
		// 				placeholders2[i].addClass('active');
		// 			} else {
		// 				placeholders2[i].removeClass('active');
		// 			}
		// 		})
		// 	})
		// }
	});

	// Закрытие попапа
	$(document).on("click", ".popup__close", function () {
		var popup = $(this).closest(".popup");
		var popupId = popup.attr("id");
		popup.removeClass("active");
		bodyScrollLock.enableBodyScroll(popup[0]);
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

function handleForm(popupId) {
	const popup = document.querySelector(`#${popupId}`);
	const form = popup.querySelector('form');
	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const wrapper = form.closest('.js-form-wrapper');
		const successBlock = wrapper.querySelector('.js-success-block');
		const formBlock = wrapper.querySelector('.js-form-block');
		if (successBlock) {
			successBlock.classList.add('visible');
			formBlock.classList.add('hidden')
		}
	})
}