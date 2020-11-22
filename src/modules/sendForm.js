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
        let reg1 = /^\+?[78]([-()]*\d){10}$/;
        let reg2 = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

        elem.addEventListener('input', (e) => {
          if(elem.matches('.form-phone')){ 
            let email = item.querySelector('.form-email');
             elem.value = elem.value.replace(/[^+0-9()-]/,  ''); 
          if(!reg2.test(email.value)){
           buttons[0].disabled = true;
          }else if(reg2.test(email.value)){
             buttons[0].disabled = !reg1.test(elem.value);
          }
        }
        if (elem.matches('[placeholder="Ваше имя"]')){
          elem.value = elem.value.replace(/[^а-яА-Я]/,  '');
        }
        if (elem.matches('#form2-message')){
          elem.value = elem.value.replace(/[^а-яА-Я\s\,\.\?\!\-\;\:]/,  '');
        }
        if (elem.matches('.form-email')){
          let phone = item.querySelector('.form-phone');
         if(!reg1.test(phone.value)){
           buttons[0].disabled = true;
          }else if(reg1.test(phone.value)){
             buttons[0].disabled = !reg2.test(elem.value);
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

};


export default sendForm;