window.addEventListener('DOMContentLoaded', function(){
'use strict';


//Timer
let idInterval;
const countTimer =  (deadLine) => {
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');



    let getTimeRemaining = function (){
      let dateStop = new Date (deadLine).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          return {timeRemaining, hours, minutes, seconds};

    };
     
    let updateClock = function () {
    let timer = getTimeRemaining();
      
          timerHours.textContent = ('0' + timer.hours.toString()).slice(-2);
          timerMinutes.textContent = ('0' + timer.minutes.toString()).slice(-2);
          timerSeconds.textContent = ('0' + timer.seconds.toString()).slice(-2);

      if (timer.seconds < 0) {

        clearInterval(idInterval);
          timerHours.textContent = '00';
          timerMinutes.textContent = '00';
          timerSeconds.textContent = '00';
      }

    };
    updateClock();
   idInterval = setInterval(updateClock,1000);
};
countTimer('15 november 2020');

//Menu
const toggleMenu =  () => {
  const menu = document.querySelector('menu'),
  btnMenu = document.querySelector('.menu');  

  const heandlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  document.addEventListener('click',(event) => {
    let target = event.target;
    
    if(target.closest('.menu')){
      heandlerMenu();
    } else if(target.classList.contains('close-btn')){
      heandlerMenu();
    }else if(!target.closest('menu')){
      menu.classList.remove('active-menu');
    }else if(target.closest('menu>ul>li>a')){
      heandlerMenu();
    }
  });

};
toggleMenu();

//popup
const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
  popupBtn = document.querySelectorAll('.popup-btn'),
  popUpContent = document.querySelector('.popup-content');
 
  popupBtn.forEach((elem) => {
    let popupStop;
    elem.addEventListener('click', () =>{
    let count =0 ;
    if(screen.width > 768){
      let popupAnimate = () =>{
        popup.style.display = 'block';
        count++;
        if(count < 20){
        popUpContent.style.top = count * 8 + 'px';
        } else {
        clearInterval(popupStop);
        } 
    };
    popupStop = setInterval(popupAnimate,1);
    } else {
      popup.style.display = 'block';
    }
    });
  });

  popup.addEventListener('click', (event)=> {
    let target = event.target;

    if(target.classList.contains('popup-close')){
      popup.style.display = 'none';
    }else {
      target = target.closest('.popup-content');
      if(!target){
      popup.style.display = 'none';
      }
    }

   
  });

};
togglePopUp();

//плавная прокрутка
const smoothScrolling = () => {
  const serviceBlock = document.querySelector('#service-block'),
  aService = document.querySelector('a'),
  menu = document.querySelector('menu'),
  menuItem = menu.querySelectorAll('ul>li>a');
 

menuItem.forEach((elem) => {
 let atributes = elem.getAttribute('href');
 elem.addEventListener('click', (e) => {
  e.preventDefault();
  let elemLink = document.querySelector(`${atributes}`);
  elemLink.scrollIntoView({behavior: "smooth", block: 'start'});
 
 });
});

aService.addEventListener('click', (e) => {
  e.preventDefault();
  serviceBlock.scrollIntoView({behavior: "smooth", block: 'start'});
});
};
smoothScrolling();

//табы
const tabs = () => {
  const tabHeader = document.querySelector('.service-header'),
  tab = document.querySelectorAll('.service-header-tab'),
  tabContent = document.querySelectorAll('.service-tab');

const toggleTabContent = (index) => {
  for(let i = 0; i < tabContent.length; i++){
    if(index === i){
      tab[i].classList.add('active');
      tabContent[i].classList.remove('d-none');
    }else {
      tab[i].classList.remove('active');
      tabContent[i].classList.add('d-none');
    }
  }
};

  tabHeader.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.service-header-tab');

    if(target){
      tab.forEach((item, i) => {
        if(item === target){
          toggleTabContent(i);
        }
      });
    }
  });

};
tabs();

//слайдер
const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
  btn = document.querySelectorAll('.portfolio-btn'),
  slider = document.querySelector('.portfolio-content');

  let currentSlide = 0, //номер слайда
  interval;

  //добавление точек с классом dot
  const dotAdd = () => {
    let dotUl = document.createElement('ul'),
    dotLi = document.createElement('li');
    dotUl.className = 'portfolio-dots';
    slider.appendChild(dotUl);
    dotLi.className = 'dot';

    for (let i = 0; i<slide.length; i++){
      dotUl.appendChild(dotLi.cloneNode());
    }
     let firstLi = dotUl.querySelectorAll('.dot');
    firstLi[currentSlide].classList.add('dot-active');
  };
dotAdd();


  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    let dot = document.querySelectorAll('.dot');

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if(currentSlide >= slide.length){
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
   interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

slider.addEventListener('click', (event) => {
  event.preventDefault();
  let target = event.target;
  let dot = document.querySelectorAll('.dot');

  if (!target.matches('.portfolio-btn, .dot')){
    return;
  }

  prevSlide(slide, currentSlide, 'portfolio-item-active');
  prevSlide(dot, currentSlide, 'dot-active');

  if(target.matches('#arrow-right')){
    currentSlide++;
  }else if(target.matches('#arrow-left')){
    currentSlide--;
  }else if (target.matches('.dot')){
    dot.forEach((elem, index) => {
      if (elem === target){
        currentSlide = index;
      }
    });
  }

  if(currentSlide >= slide.length){
    currentSlide = 0;
  }
  if (currentSlide < 0){
    currentSlide = slide.length -1;
  }

  nextSlide(slide, currentSlide, 'portfolio-item-active');
  nextSlide(dot, currentSlide, 'dot-active');
});

slider.addEventListener('mouseover', (event) => {
  if (event.target.matches('.portfolio-btn') ||
  event.target.matches('.dot')){
    stopSlide();
  }
});
slider.addEventListener('mouseout', (event) => {
  if (event.target.matches('.portfolio-btn') ||
  event.target.matches('.dot')){
    startSlide();
  }
});
startSlide();
};
slider();

// Замена картинок "Наша команда" на картинки из data при наведениии
const replaceRow = () => {
  const sectionCommand = document.getElementById('command'),
        commandImg = sectionCommand.querySelectorAll('.command__photo');
        

   commandImg.forEach((item) => {
     let replaceSrc = item.src;

     item.addEventListener('mouseenter', (event) => {
        event.target.src = event.target.dataset.img;
   });
      item.addEventListener('mouseleave' , (event) => {
        event.target.src = replaceSrc;
      });
});

};
replaceRow();

//Валидатор для калькулятора
const calcValidator = () => {
  const calcItem = document.querySelectorAll('.calc-block>input');

    calcItem.forEach((item) => {

      item.addEventListener('input' , () => {
        item.value = item.value.replace(/[^0-9]/g, '');
      });
      
    });

};
calcValidator();

//калькулятор
const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count');
   let totalValue = document.getElementById('total');

const countSum = () => {
  let total = 0,
  countValue = 1,
  dayValue = 1;
  const typeValue = calcType.options[calcType.selectedIndex].value,
   squareValue = +calcSquare.value;

   if(calcCount.value > 1) {
    countValue += (calcCount.value -1) / 10;
   }

   if(calcDay.value && calcDay.value < 5){
     dayValue *= 2;
   }else if(calcDay.value && calcDay.value < 10){
     dayValue *= 1.5;
   }

   if(typeValue && squareValue) {
     total = price * typeValue * squareValue * countValue * dayValue;
   } 


//анимация вывода
 let count = 0;
 let stopAnimate;
const calcAnimate = () => {

  if (count < total && total < 1500){
    count += 50;
       totalValue.textContent = count ;
  }else if (count < total && total < 15000){
     count += 250;
       totalValue.textContent = count ;
  }else if (count < total && total > 15000){
     count += 750 ;
       totalValue.textContent = count ;
  }else if (count > total){
    clearInterval(stopAnimate);
    totalValue.textContent = Math.floor(total);
  }
};
stopAnimate = setInterval(calcAnimate, 5);

};

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if (target.matches('select') || target.matches('input')){
        countSum();
      }
    });
};
calc(100);

  //Валидатор
    const validator = (selector,reg) => { 
  const helper = document.querySelectorAll(selector); 
  helper.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(reg, "");
    });
  });
};

//send-ajax-form

const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  
  const formAll = document.querySelectorAll('form');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
  font-size: 2rem;
  color: #fff;
  `;

  formAll.forEach((item) => {

  item.addEventListener('submit', (event) => {
    event.preventDefault();

    item.appendChild(statusMessage);
    statusMessage.classList.add('sk-plane');
    const formData = new FormData(item);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

    fetch('./server.php')
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
  });
     
});

validator('.form-phone', /[^0-9+]/);
validator('[placeholder="Ваше имя"]', /[^а-яА-Я]/);
validator('#form2-message', /[^а-яА-Я\s\,\.\?\!\-\;\:]/);

};
sendForm();



});
