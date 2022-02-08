import * as bodyScrollLock from "body-scroll-lock";

function masks() {
  const phoneInputs = Array.from(document.querySelectorAll('.js-phone-input'));
	const phoneInputsLabels = Array.from(document.querySelectorAll('.js-phone-input-label'));

  phoneInputs.forEach((input, i) => {
      const instance = new Inputmask({
				mask: '+7 (999) 999-99-99',
				showMaskOnHover: false,
				showMaskOnFocus: false
			});
      const inputElement = instance.mask(input);
			$(input).inputmask("getmetadata");
			$(input).on('input', () => {
				if (input.value) {
					phoneInputsLabels[i].classList.add('active');
				} else {
					phoneInputsLabels[i].classList.remove('active');
				}
			})

  });

  const onlyNumericInputs = Array.from(document.querySelectorAll('.js-numeric-input-decimals'));

  onlyNumericInputs.forEach(input => {
      input.addEventListener('input', () => {
          const value = input.value;
          const newCleanedValue = parseInt(value.replace(/[^\d]+/g, ''), 10);
          if (isNaN(newCleanedValue)) {
              input.value = '';
          } else {
              input.value = newCleanedValue.toLocaleString();
          }
      });
  });

  const onlyNumericInputsNoFormatting = Array.from(document.querySelectorAll('.js-numeric-input'));
  
  onlyNumericInputsNoFormatting.forEach(input => {
      input.addEventListener('input', () => {
          const value = input.value;
          const newCleanedValue = parseInt(value.replace(/[^\d]+/g, ''), 10);
          if (isNaN(newCleanedValue)) {
              input.value = '';
          } else {
              input.value = newCleanedValue;
          }
      });
  });
}


// Подгрузка html-контента в конец body
function loadPopup(popupId, onOpen, data) {
	var popup = $("#" + popupId);
	var data = Object.assign($(this).data(), data);

	if ($("#" + popupId).length) {
		popup.addClass("active");
		bodyScrollLock.disableBodyScroll(popup[0]);
		if (typeof onOpen === "function") onOpen();
	} else {
		return $.post(
			"/include/ajax/popup/" + popupId + ".php",
			data,
			function (data) {
				var data = $("<div>" + data + "</div>");
				var popup = $(data).find("#" + popupId);
				$("body").append(data);
				setTimeout(function () {
					popup.addClass("active");
				}, 30);
				bodyScrollLock.disableBodyScroll(popup[0]);

				masks()

				const inputs = $('.js-input');
				const placeholders = $('.js-input-placeholder');
				if (inputs && placeholders) {
					inputs.each((i) => {
						$(this).on('change', () => {
							if (input.value) {
								placeholders[i].addClass('active');
							} else {
								placeholders[i].removeClass('active');
							}
						})
					})
				}

				if (typeof initBanerSlider === "function") initBanerSlider();
				if (typeof initRangeslider === "function") initRangeslider();
				if (typeof initMasks === "function") initMasks();
				if (typeof lazyload === "function") lazyload();
				if (typeof initScroll === "function") initScroll();
				if (typeof vacInnerDropzone === "function") vacInnerDropzone();
				if (typeof documentDropzone === "function") documentDropzone();
				if (typeof onOpen === "function") onOpen();
				if (typeof initBankSlider === "function") initBankSlider();

				$(".scrollbar.ps").each(function() {
					$(this).data("ps").update()
				})
			}
		);
	}
}

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

		// loadPopup.call(this, popupId, onOpen);

		setTimeout(() => {
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
		}, 1000)
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