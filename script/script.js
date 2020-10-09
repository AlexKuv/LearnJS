//1) Следующим переменным присвоить значения

let money = 28500; //Доход за месяц
let income = 'Фриланс';
let addExpenses = 'ИНТЕРНЕТ, КОМУНАЛКА, ЕДА';
let deposit = true;
let mission = 500000;
let period = 10;

//2) Используя методы и свойства:
   //- Вывести в консоль тип данных значений переменных money, income, deposit;
console.log('money: ',typeof money);
console.log('income: ',typeof income);
console.log('deposit :',typeof deposit);

// - Вывести в консоль длину строки addExpenses
console.log(addExpenses.length); 

/*  - Вывести в консоль “Период равен (period) месяцев” и “Цель заработать (mission) рублей/долларов/гривен/юани” */
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

/*  - Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль */
console.log(addExpenses.toLowerCase().split(','));

//- Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
let budgetDay = money/30;
console.log('Дневной бюджет:', budgetDay ,'рублей');