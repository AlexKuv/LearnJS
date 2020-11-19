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

export default togglePopUp;