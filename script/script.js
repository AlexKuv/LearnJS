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

class AppData {
  constructor(){
     this.budget = 0;
     this.budgetDay = 0;
     this.budgetMonth = 0;
     this.income = {};
     this.incomeMonth = 0;
     this.addIncome = [];
     this.expenses = {};
     this.addExpenses = [];
     this.expensesMonth = 0;
     this.deposit = false;
     this.percentDeposit = 0;
     this.moneyDeposit = 0;
  }
    start(){
      this.budget = +salaryAmount.value;
      
      this.getExpInc();  
      this.getExpensesMonth();
      this.getAddExpInc();
      //this.getAddExpenses();
      //this.getAddIncome();
        
      this.getBudget();
      this.getTargetMonth();
      this.showResult();
      }
    showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth; 
    additionalExpensesValue.value = this.addExpenses.join(',');
    additionalIncomeValue.value = this.addIncome.join(',');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    
    let periodChange =  () => {
      incomePeriodValue.value = this.calcSavedMoney();
    };
    periodSelect.addEventListener('input', periodChange);
    
  }
 periodRange() {
    periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
  }

addExpIncBlock(){
const startStr = this.className.split(' ')[1].split('_')[0];

  const btn = document.querySelectorAll(`.${startStr}_add`)[0];
   let itemsItem = document.querySelectorAll(`.${startStr}-items`)[0];
   const itemClone = itemsItem.cloneNode(true);
    itemsItem.parentNode.insertBefore(itemClone, btn);
    itemClone.querySelectorAll('input').forEach(i => i.value = '');
    itemsItem = document.querySelectorAll(`.${startStr}-items`);

    if (itemsItem.length === 3) {
      btn.style.display = 'none';
    }

   validator('[placeholder="Наименование"]', /[^а-яА-я]/);
  validator('[placeholder="Сумма"]', /[^0-9]/);
}

getExpInc(){

const count = item => {
  const startStr = item.className.split('-')[0];
  const itemTitle = item.querySelector(`.${startStr}-title`).value;
  const itemAMount = item.querySelector(`.${startStr}-amount`).value;
    if(itemTitle !== '' && itemAMount !== ''){
            this[startStr][itemTitle] = itemAMount;
    }
}; 

  incomeItems.forEach(count);
  expensesItems.forEach(count);
      for (let key in this.income){
         this.incomeMonth += +this.income[key];
      }
}
getAddExpenses() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }
getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item.value !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  }
getAddExpInc(){
    let count = item => {
      item = this;
      const str = item.className;
      console.log('str: ', str);
    };
    count();
}
getExpensesMonth() {

  let rez = 0;

  for (let key in this.expenses ) {
    rez += +this.expenses[key];
  }
  this.expensesMonth = rez;
  return rez;
  }
getBudget() {
   this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.floor(this.budgetMonth/30);
  }
getTargetMonth() {
  return targetAmount.value/this.budgetMonth;
  }
getStatusIncome() {
    if (this.budgetDay >= 1200) {
   return('У Вас высокий уровень дохода!');
  } else if (this.budgetDay <1200 ,this.budgetDay >=600) {
   return('У Вас средний уровень дохода');
  } else if (this.budgetDay <600, this.budgetDay>0) {
    return('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay <=0) {
    return('Что то пошло не так');
  }
  }
getInfoDeposit() {
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
  }
calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
reset() {
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
     this.budgetMonth = 0;
     this.incomeMonth = 0;
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
  addEventListeners() {
  buttonStart.disabled = true;
  salaryAmount.addEventListener("input", () => {
    buttonStart.disabled = salaryAmount.value.trim() === '';
  });

  //Привязка кнопки расчитать к appData
  const startBind = appData.start.bind(appData); 
  buttonStart.addEventListener('click', startBind);

  btnPlusIncome.addEventListener('click', this.addExpIncBlock);
  btnPlusExpenses.addEventListener('click', this.addExpIncBlock);

  const periodRangeBind = appData.periodRange.bind(appData);
  periodSelect.addEventListener('input', periodRangeBind);


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

  const resetBind = appData.reset.bind(appData);
  btnCancel.addEventListener('click', resetBind);
  }
}

const appData = new AppData ();

validator('.salary-amount', /[^0-9]/);
validator('[placeholder="Наименование"]', /[^а-яА-я]/);
validator('[placeholder="Сумма"]', /[^0-9]/);

appData.addEventListeners();   