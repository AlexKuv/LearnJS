const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count');
   let totalValue = document.getElementById('total');

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

export default calc;