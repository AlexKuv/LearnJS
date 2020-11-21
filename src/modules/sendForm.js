const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  
  const formAll = document.querySelectorAll('form');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
  font-size: 2rem;
  color: #fff;
  `;

    //Валидатор
    const validator = (selector,reg) => { 
  const helper = document.querySelectorAll(selector); 
  helper.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(reg, "");
    });
  });
};

  formAll.forEach((item) => {
    let buttons = item.querySelectorAll('.form-btn');

    let inputValid = item.querySelectorAll('input');
      inputValid.forEach((elem) => {
        elem.addEventListener('input', (e) => {
        if(elem.matches('.form-phone')){
          let reg = /^\+?[78]([-()]*\d){10}$/;
             elem.value = elem.value.replace(/[^+0-9()-]/,  ''); 
          if(!reg.test(elem.value)){
            buttons[0].disabled = true;
          }else { 
            buttons[0].disabled = false;
          }
        }else if (elem.matches('[placeholder="Ваше имя"]')){

          elem.value = elem.value.replace(/[^а-яА-Я]/,  '');
        }else if (elem.matches('#form2-message')){
          elem.value = elem.value.replace(/[^а-яА-Я\s\,\.\?\!\-\;\:]/,  '');
        }else if (elem.matches('.form-email')){
          let reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
          if(!reg.test(elem.value)){
            buttons[0].disabled = true;
          }else{
            buttons[0].disabled = false;
          }
        }
        
      });
    });

  item.addEventListener('submit', (event) => {
    event.preventDefault();

    item.appendChild(statusMessage);
    statusMessage.classList.add('sk-plane');
    const formData = new FormData(item);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

    fetch('./server.php', {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if(response.status === 200) {
          statusMessage.classList.remove('sk-plane');
          statusMessage.textContent = successMessage;
          item.querySelectorAll('input').forEach(i => i.value = '');
        } else {
          statusMessage.classList.remove('sk-plane');
          statusMessage.textContent = errorMessage;
          item.querySelectorAll('input').forEach(i => i.value = '');
          console.error(response.status);
        }
      })
      .catch((error) => {
          console.error(error);
      });

    statusMessage.textContent = '';
      setTimeout(() => {
        item.removeChild(statusMessage);
      },5000);
    const popup = document.querySelector('.popup');
      setTimeout(() => {
        popup.style.display = 'none';
      },5000);
  });
     
});

// validator('.form-phone', /[^0-9]/);
// validator('.form-phone', /\d{12}/);
// //validator('.form-phone', /^\+?[78]([-()]*\d){10}$/);
// //validator('.form-phone', /[^+7\(\d{3}\)\d{3}-\d{2}-\d{2}]/);
// validator('[placeholder="Ваше имя"]', /[^а-яА-Я]/);
// validator('#form2-message', /[^а-яА-Я\s\,\.\?\!\-\;\:]/);

};

export default sendForm;