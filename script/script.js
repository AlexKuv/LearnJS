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
    let popupStop = setInterval(popupAnimate,1);
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









});
