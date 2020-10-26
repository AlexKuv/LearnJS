'use strict';


const buttonStart = document.getElementById('start'), 
 salaryAmount = document.querySelector('.salary-amount'),
 incomeTitle = document.querySelector('.income-items .income-title'),
 incomeAmount = document.querySelector('.income-items .income-amount'),
 expensesTitle = document.querySelector('.expenses-items .expenses-title'),
 expensesAmount = document.querySelector('.expenses-items .expenses-amount'),
 additionalExpensesItem = document.querySelector('.additional_expenses-item'),
 targetAmount = document.querySelector('.target-amount'),
 periodSelect = document.querySelector('.period-select'),
 btnPlusIncome = document.getElementsByTagName('button')[0],
 btnPlusExpenses = document.getElementsByTagName('button')[1],
 depositCheck = document.querySelector('#deposit-check'),
 additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
 budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
 budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
 expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
 additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
 additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
 incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
 targetMonthValue = document.getElementsByClassName('target_month-value')[0];
 
 let periodAmount = document.querySelector('.period-amount');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


//Валидатор
    const validator = (selector, reg) => { 
  const helper = document.querySelectorAll(selector); 
  helper.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(reg, "");
    });
  });
};


let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income : {},
  incomeMonth: 0,
  addIncome : [],
  expenses:{},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function (){
    
  appData.budget = +salaryAmount.value;
  

  appData.getExpenses();
  appData.getIncome();
  appData.getExpensesMonth();
  appData.getAddExpenses();
  appData.getAddIncome();
  
  appData.getBudget();
  appData.getTargetMonth();
  appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth; 
    additionalExpensesValue.value = appData.addExpenses.join(',');
    additionalIncomeValue.value = appData.addIncome.join(',');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    
    let periodChange = function () {
      incomePeriodValue.value = appData.calcSavedMoney();
    };
    periodSelect.addEventListener('input', periodChange);
    
  },
  periodRange: function () {
    periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
  },
  addExpensesBlock: function() {
   
    let expensesItemClone = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(expensesItemClone, btnPlusExpenses);
    expensesItemClone.querySelectorAll('input').forEach(i => i.value = '');
 
    expensesItems = document.querySelectorAll('.expenses-items');
  
    if (expensesItems.length === 3) {
      btnPlusExpenses.style.display = 'none';
    }
      validator('[placeholder="Наименование"]', /[^а-яА-я]/);
      validator('[placeholder="Сумма"]', /[^0-9]/);
  },
  addIncomeBlock: function () {
    let incomeItemsClone = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(incomeItemsClone, btnPlusIncome);
    incomeItemsClone.querySelectorAll('input').forEach(i => i.value = '');
    incomeItems = document.querySelectorAll('.income-items');
    
    if (incomeItems.length === 3) {
      btnPlusIncome.style.display = 'none';
    }
    validator('[placeholder="Наименование"]', /[^а-яА-я]/);
    validator('[placeholder="Сумма"]', /[^0-9]/);
  },
  getExpenses: function () {
    expensesItems.forEach(function(item){
     let itemExpenses = item.querySelector('.expenses-title').value;
     let cashExpenses = item.querySelector('.expenses-amount').value;
     cashExpenses = Number(cashExpenses);
     if(itemExpenses !== '' && cashExpenses !== '') {
      appData.expenses[itemExpenses] = cashExpenses;
     }
    });
  },
  getIncome:function () {

      incomeItems.forEach(function (item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        cashIncome = Number(cashIncome);
        if(itemIncome !== '' && cashIncome !== ''){
          appData.income[itemIncome] = cashIncome;
        }
      });

      for (let key in appData.income){
        appData.incomeMonth += +appData.income[key];
      }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item.value !== ''){
        appData.addIncome.push(itemValue);
      }
    });
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
   appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
   appData.budgetDay = Math.floor(appData.budgetMonth/30);
    
  },
  getTargetMonth: function () {
  return targetAmount.value/appData.budgetMonth;
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
    return appData.budgetMonth * periodSelect.value;
  }
};

buttonStart.disabled = true;
salaryAmount.addEventListener("input", () => {
  buttonStart.disabled = salaryAmount.value.trim() === '';
});

buttonStart.addEventListener('click', appData.start);




validator('.salary-amount', /[^0-9]/);
validator('[placeholder="Наименование"]', /[^а-яА-я]/);
validator('[placeholder="Сумма"]', /[^0-9]/);


btnPlusIncome.addEventListener('click', appData.addIncomeBlock);
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.periodRange);


/*
if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за:', Math.ceil(appData.getTargetMonth()), 'мес');
} else {
console.log('Цель не будет достигнута');
}
*/





/*
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







