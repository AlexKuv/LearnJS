'use strict';

let money = +prompt('Ваши месяцный доход', 50000);
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 500000;
let period = 10;


let showTypeOf = function (data){
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('income: ',income.length);
console.log([addExpenses]);


let expenses1 = prompt ('Введите обязательную статью расходов?');
let amount1 = +prompt ('Во сколько это обойдется?', 2500);

let expenses2 = prompt ('Введите обязательную статью расходов?');
let amount2 = +prompt ('Во сколько это обойдется?', 15000);



console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

//4 Урок
//1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
let getExpensesMonth = function () {
   return amount1 + amount2 ;
};
console.log('Обязательные расходы: ', getExpensesMonth());

/*2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)*/
 let getAccumulatedMonth = function () {
    return money - (amount1 + amount2);
 };
 /*3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth */
let accumulatedMonth  = getAccumulatedMonth();

/*4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет
 достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат*/
let getTargetMonth = function () {
  return mission/accumulatedMonth;
};
console.log('Цель будет достигнута за:', Math.ceil(getTargetMonth()), 'мес');

let budgetDay = accumulatedMonth/30;
console.log('Бюджет на день: ',Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log('У Вас высокий уровень дохода!');
} else if (budgetDay <1200 ,budgetDay >=600) {
  console.log('У Вас средний уровень дохода');
} else if (budgetDay <600, budgetDay>0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <=0) {
  console.log('Что то пошло не так');
}