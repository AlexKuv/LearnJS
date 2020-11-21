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
             console.log(reg2.test(email.value));
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

// const sendForm = () => {
//     //Валидация номера телефона
//     document.addEventListener('input', event => {
//         if (event.target.matches('.form-phone')) {
//             event.target.value = event.target.value.replace(/^[\+]?[0-9]{1}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{17}$/im, '');
//             document.addEventListener('change', event => {
//                 if (event.target.matches('.form-phone')) {
//                     event.target.value = event.target.value.replace(/^\D/gi, '');
//                     event.target.value = event.target.value.replace(/\D$/gi, '');
//                     if (event.target.value.length < 5) {
//                         event.target.value = '';
//                     } 
//                 }
//             });
//         } else if (event.target.matches('.form-name') || 
//         event.target.matches('#form2-name')) {
//             event.target.value = event.target.value.replace(/[^А-Яа-яЁе ]/gi, '');
//         } else if (event.target.matches('#form2-message')) {
//             event.target.value = event.target.value.replace(/[^А-Яа-яЁе \,\.\!\?]/gi, '');
//         } 
//     });

//     const errorMessage = 'Что-то пошло не так...',
//         successMessage = 'Спасибо, мы скоро с Вами свяжемся!';

//     let loadMessage = `<div class="loadMessage"></div>`;

//     const form1 = document.getElementById('form1'),
//         form2 = document.getElementById('form2'),
//         form3 = document.getElementById('form3');

//     const statusMessage = document.createElement('div');
    
//     document.addEventListener('submit', (event) => {
//         event.preventDefault();
//         let shell,
//             emailShell;
        
//         if (event.target === form1) {
//             shell = form1;
//             emailShell = document.getElementById("form1-email");
//         } else if (event.target === form2) {
//             shell = form2;
//             emailShell = document.getElementById("form2-email");
//         } else if (event.target === form3) {
//             shell = form3;
//             emailShell = document.getElementById("form3-email");
//         }

//         const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
//             address = emailShell.value;
//         if(reg.test(address) === false) {
//             alert('Введите корректный e-mail');
//             return false;
//         }

//         shell.appendChild(statusMessage);

//         statusMessage.style.color = `white`;
//         statusMessage.innerHTML = loadMessage;
//         const removeStatusMessage = () => {
//             setTimeout(() => {
//                 const popup = document.querySelector('.popup');
//                 popup.style.display = "none";
//             }, 2000);
//             statusMessage.remove();
//         };
//         setTimeout(removeStatusMessage, 5000);

//         const formData = new FormData(shell);
//         let body = {};
//         for (let value of formData.entries()) {
//             body[value[0]] = value[1];
//         }

//         postData(body)
//             .then((response) => {
//                 if (response.status !== 200) {
//                     throw new Error('status network not 200');
//                 }
//                 statusMessage.textContent = successMessage;
//             })
//             .catch(error => {
//                 statusMessage.textContent = errorMessage;
//                 console.log(error);
//             })
//             .then(() => {
//                 document.querySelectorAll('.form-name').forEach((elem)=> {
//                     elem.value = '';
//                 });
//                 document.querySelectorAll('.form-phone').forEach((elem)=> {
//                     elem.value = '';
//                 });
//                 document.querySelectorAll('.form-email').forEach((elem)=> {
//                     elem.value = '';
//                 });
//                 document.querySelectorAll('.top-form').forEach((elem)=> {
//                     elem.value = '';
//                 });
//                 let messageInput = document.getElementById('form2-message');
//                 messageInput.value = '';
//             });
//     });

//     const postData = (body) => {
//         return fetch('./server.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         });     
//     };
// };

// export default sendForm;