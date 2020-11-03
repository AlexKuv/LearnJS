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
   idInterval = setInterval(updateClock,1000);
};
countTimer('06 november 2020');

//Menu
const toggleMenu =  () => {
  const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItem = menu.querySelectorAll('ul>li');
        
  
  const heandlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  btnMenu.addEventListener('click',heandlerMenu);
  closeBtn.addEventListener('click',heandlerMenu);
  menuItem.forEach((elem) => elem.addEventListener('click', heandlerMenu));
        
};
toggleMenu();

//popup

const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
  popupBtn = document.querySelectorAll('.popup-btn'),
  popUpClose = document.querySelector('.popup-close'),
  popUpContent = document.querySelector('.popup-content');

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () =>{
    let count =0 ;
    if(screen.width > 768){
      let popupAnimate = () =>{
        popup.style.display = 'block';
        count++;
        if(count < 30){
        popUpContent.style.top = count * 4 + 'px';
        } else {
        clearInterval(popupStop);
        } 
    };
    let popupStop =   setInterval(popupAnimate,1);
    } else {
      popup.style.display = 'block';
    }
    });
  });

  popUpClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });
};
togglePopUp();














});
