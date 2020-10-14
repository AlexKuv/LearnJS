'use strict';

let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 500000;
let period = 10;


let start = function (){
  do {
    money = prompt('Ваш месяцный доход');
  }
  while (isNaN(money) || money.trim() === '' || money === null); 
  
  money = Number(money);
  console.log(typeof(money));
};

start();

let showTypeOf = function (data){
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('income: ',income.length);
console.log([addExpenses]);


let expenses1, expenses2;



console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');


//Функция возвращает сумму всех обязательных расходов за месяц
let getExpensesMonth = function () {
  let sum = 0;
  let sum1;

  for (let i = 0; i<2; i++) {

    if (i === 0) {
      expenses1 = prompt ('Введите обязательную статью расходов?');
    } else if (i === 1){
      expenses2 = prompt ('Введите обязательную статью расходов?');
    }


        do{
        sum1 = prompt ('Во сколько это обойдется?');
        }
        while (isNaN(parseFloat(sum1)));

        sum = sum + Number(sum1);

  }
  
  console.log(typeof(sum));
   return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Обязательные расходы: ', expensesAmount);

/*2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)*/
 let getAccumulatedMonth = function () {
    return money - expensesAmount;
 };
 /*3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth */
let accumulatedMonth  = getAccumulatedMonth();

/*4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет
 достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат*/
let getTargetMonth = function () {
  return mission/accumulatedMonth;
};

if (getTargetMonth() > 0) {
  console.log('Цель будет достигнута за:', Math.ceil(getTargetMonth()), 'мес');
} else {
console.log('Цель не будет достигнута');
}




let budgetDay = accumulatedMonth/30;
console.log('Бюджет на день: ',Math.floor(budgetDay));

let getStatusIncome = function () {
    if (budgetDay >= 1200) {
    console.log('У Вас высокий уровень дохода!');
  } else if (budgetDay <1200 ,budgetDay >=600) {
    console.log('У Вас средний уровень дохода');
  } else if (budgetDay <600, budgetDay>0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay <=0) {
    console.log('Что то пошло не так');
  }
};
getStatusIncome();