'use strict';
/*
let money;

let start = function (){
  do {
    money = prompt('Ваш месяцный доход');
  }
  while (isNaN(money) || money.trim() === '' || money === null); 
  
  money = Number(money);
};

start();


let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income : {},
  addIncome : [],
  expenses:{},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 3,
  asking: function () {

    if(confirm('Есть ли у Вас дополнительный источник дохода')) {
      let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Фриланс');

        while(!isNaN(itemIncome)){
          itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Фриланс');
        }

      let cashIncome = prompt('Сколько зарабатываете на этом?', 15000);

      while (isNaN(parseFloat(cashIncome))) {
        cashIncome = prompt('Сколько зарабатываете на этом?', 15000);
      }

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0;

        for (let i = 0; i<2; i++) {
              
          let a = prompt ('Введите обязательную статью расходов?');

          while (!isNaN(a)) {
            a = prompt ('Введите обязательную статью расходов?');
          }

                  do{
                  sum = prompt ('Во сколько это обойдется?');
                  }
                  while (isNaN(parseFloat(sum)));
                  sum = Number(sum);

                  appData.expenses[a] = sum;
            }
            return sum;
  },
  getExpensesMonth: function () {

  let rez = 0;

  for (let key in appData.expenses ) {
    rez += appData.expenses[key];
  }
  appData.expensesMonth = rez;
  return rez;
  },
  getBudget: function () {
   appData.budgetMonth = appData.budget - appData.expensesMonth;
   appData.budgetDay = Math.floor(appData.budgetMonth/30);
    
  },
  getTargetMonth: function () {
  return appData.mission/appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
   return('У Вас высокий уровень дохода!');
  } else if (appData.budgetDay <1200 ,appData.budgetDay >=600) {
   return('У Вас средний уровень дохода');
  } else if (appData.budgetDay <600, appData.budgetDay>0) {
    return('К сожалению у вас уровень дохода ниже среднего');
  } else if (appData.budgetDay <=0) {
    return('Что то пошло не так');
  }
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', '10');

      while (isNaN(parseFloat(appData.percentDeposit))) {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');

       while (isNaN(parseFloat(appData.moneyDeposit))) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
    }
  },
  calcSavedMoney:function () {
    return appData.budgetMonth * appData.period;
  }
};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Обязательные расходы: ', appData.getExpensesMonth());


console.log('Бюджет на месяц: ', appData.budgetMonth);

appData.getTargetMonth();

if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за:', Math.ceil(appData.getTargetMonth()), 'мес');
} else {
console.log('Цель не будет достигнута');
}


console.log(appData.getStatusIncome());




for (let key in appData) {
  console.log('Наша программа включаетв себя данные: ', key , appData[key]);
}


let addExpensesLog = function  () {
  let c = appData.addExpenses.join(', ');

  function capitalize(a) {

 return a.replace(/(^|\s)\S/g, function(a) {
   return a.toUpperCase();
  });
}

console.log(capitalize(c));
};

addExpensesLog();
*/
//Урок №9

let moneyMonth = document.querySelector('.salary-amount');
console.log('moneyMonth: ', moneyMonth);
let incomeTitle = document.querySelector('.income-items .income-title');
console.log('incomeTitle: ', incomeTitle);
let incomeAmount = document.querySelector('.income-amount');
console.log('incomeAmount: ', incomeAmount);

let expensesTitle = document.querySelector('.expenses-items .expenses-title');
console.log('expensesTitle: ', expensesTitle);
let expensesAmount = document.querySelector('.expenses-amount');
console.log('expensesAmount: ', expensesAmount);

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem: ', additionalExpensesItem);

let targetAmount = document.querySelector('.target-amount');
console.log('targetAmount: ', targetAmount);

let periodSelect = document.querySelector('.period-select');
console.log('periodSelect: ', periodSelect);

let buttonStart = document.getElementById('start');
console.log('buttonStart: ', buttonStart);

let btnPlusIncome = document.getElementsByTagName('button')[0];
console.log('btnPlusIncome: ', btnPlusIncome);
let btnPlusExpenses = document.getElementsByTagName('button')[1];
console.log('btnPlusExpenses: ', btnPlusExpenses);

let depositCheck = document.querySelector('#deposit-check');
console.log('depositCheck: ', depositCheck);

let incomeItem = document.querySelectorAll('.additional_income-item');
console.log('incomeItem: ', incomeItem);



let budgetMonth = document.getElementsByClassName('budget_month-value');
let budgetDay = document.getElementsByClassName('budget_day-value');
let budgetExpenses = document.getElementsByClassName('expenses_month-value');
let additionalIncome = document.getElementsByClassName('additional_income-value');
let additionalExpenses = document.getElementsByClassName('additional_expenses-value');
let incomePeriod = document.getElementsByClassName('income_period-value');
let targetMonth = document.getElementsByClassName('target_month-value');




