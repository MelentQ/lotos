document.addEventListener('DOMContentLoaded', () => {
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
});