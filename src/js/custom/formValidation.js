export default function validateForms() {
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
}