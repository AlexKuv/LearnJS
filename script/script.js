'use strict';

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
  income : {},
  addIncome : [],
  expenses:{},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 10,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0;

        for (let i = 0; i<2; i++) {
              
          let a = prompt ('Введите обязательную статью расходов?');

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
   appData.budgetMonth = appData.getBudget;
    return money - appData.expensesMonth; 
  },
  getTargetMonth: function () {
  return appData.mission/appData.getBudget();
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
};

console.log(appData);
appData.asking();

appData.getExpensesMonth();

console.log('Обязательные расходы: ', appData.getExpensesMonth());


 appData.getBudget();

 console.log('Бюджет на месяц: ', appData.getBudget());

appData.getTargetMonth();

if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за:', Math.ceil(appData.getTargetMonth()), 'мес');
} else {
console.log('Цель не будет достигнута');
}

appData.budgetDay = appData.getBudget()/30;

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включаетв себя данные: ', key , appData[key]);
}