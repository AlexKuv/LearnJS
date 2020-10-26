'use strict';


const buttonStart = document.getElementById('start'), 
 btnCancel = document.querySelector('#cancel'),
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
    console.log(this);
    expensesItems.forEach(function(item){
     let itemExpenses = item.querySelector('.expenses-title').value;
     let cashExpenses = item.querySelector('.expenses-amount').value;
     cashExpenses = Number(cashExpenses);
     if(itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
     }
    },this);
  },
  getIncome:function () {
      incomeItems.forEach(function (item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        cashIncome = Number(cashIncome);
        if(itemIncome !== '' && cashIncome !== ''){
          this.income[itemIncome] = cashIncome;
        }
      },this);

      for (let key in this.income){
        this.incomeMonth += +this.income[key];
      }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.apply(appData);
        this.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item.value !== ''){
      appData.addIncome.apply(appData);
        this.addIncome.push(itemValue);
      }
    });
  },
  
  getExpensesMonth: function () {

  let rez = 0;

  for (let key in this.expenses ) {
    rez += this.expenses[key];
  }
  this.expensesMonth = rez;
  return rez;
  },
  getBudget: function () {
   this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.floor(this.budgetMonth/30);
    
  },
  getTargetMonth: function () {
  return targetAmount.value/this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
   return('У Вас высокий уровень дохода!');
  } else if (this.budgetDay <1200 ,this.budgetDay >=600) {
   return('У Вас средний уровень дохода');
  } else if (this.budgetDay <600, this.budgetDay>0) {
    return('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay <=0) {
    return('Что то пошло не так');
  }
  },
  getInfoDeposit: function() {
    if (this.deposit) {
      this.percentDeposit = prompt('Какой годовой процент?', '10');

      while (isNaN(parseFloat(this.percentDeposit))) {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      this.moneyDeposit = prompt('Какая сумма заложена?', '10000');

       while (isNaN(parseFloat(this.moneyDeposit))) {
        this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
    }
  },
  calcSavedMoney:function () {
    return this.budgetMonth * periodSelect.value;
  },
  reset: function () {
    const inputAll = document.querySelectorAll('[type = "text"]'); 
  inputAll.forEach(item => {
      item.value = '';
      item.disabled = false;
  });
      
    for (let a in appData.income){
      delete appData.income[a];
    }
     for (let a in appData.expenses){
      delete appData.expenses[a];
    }

     this.addIncome = [];
     this.addExpenses = [];
     appData.incomeMonth = 0;
     periodSelect.value = 1;
     periodAmount.textContent = 1;
     buttonStart.style.display = 'block';
     buttonStart.disabled = true;
     btnCancel.style.display='none';
     expensesItems = document.querySelectorAll('.expenses-items');
     incomeItems = document.querySelectorAll('.income-items');
     for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[i].remove();
            btnPlusExpenses.style.display = 'block';
        }  
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[i].remove();
            btnPlusIncome.style.display = 'block';
        }  

     }
     
};



buttonStart.disabled = true;
salaryAmount.addEventListener("input", () => {
  buttonStart.disabled = salaryAmount.value.trim() === '';
});

//Привязка кнопки расчитать к appData
let startBind = appData.start.bind(appData); 
buttonStart.addEventListener('click', startBind);


validator('.salary-amount', /[^0-9]/);
validator('[placeholder="Наименование"]', /[^а-яА-я]/);
validator('[placeholder="Сумма"]', /[^0-9]/);


btnPlusIncome.addEventListener('click', appData.addIncomeBlock);
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.periodRange);
    


//Блокирует input
   const block = () => { 
  const inputText = document.querySelectorAll('[type = "text"]'); 
  inputText.forEach(item => {
      item.disabled = true;
  });
};



buttonStart.addEventListener('click', ()=> {
  buttonStart.style.display = 'none';
  btnCancel.style.display='block';
  block();
});

btnCancel.addEventListener('click', appData.reset);
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

/*
     while (incomeItems.length > 0){
          incomeItems[1].remove();
          incomeItems = document.querySelectorAll('.income-items');
          btnPlusIncome.style.display = 'block';
     };

     while (expensesItems.length > 0){
          expensesItems[1].remove();
          expensesItems = document.querySelectorAll('.expenses-items');
          btnPlusExpenses.style.display = 'block';
     }



*/