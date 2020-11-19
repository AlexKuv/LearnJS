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

export default toggleMenu;