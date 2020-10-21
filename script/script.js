'use strict';


const book = document.querySelectorAll('.book');  //Книги
const books = document.querySelectorAll('.books');  //Блок с книгами
const advertising = document.querySelector('.adv'); //Реклама
const bgc = document.body.style.backgroundImage = 
'url(../image/you-dont-know-js.jpg)';     //Изменил фон

const link = document.getElementsByTagName('a');  //Заголовки книг
const book2 = book[0];  //Книга №2
const bookUl = book2.getElementsByTagName('ul'); //ul лист 2-й книги
const list = book2.getElementsByTagName('li'); //Список глав 2-й книги

const book5 = book[5]; // Книга №5
const bookUl5 = book5.getElementsByTagName('ul'); //ul лист 5-й книги
const list5 = book5.getElementsByTagName('li'); //Список глав 5-й книги


const book6 = book[2]; // Книга №6
const bookUl6 = book6.getElementsByTagName('ul'); //ul лист 6-й книги
const list6 = book6.getElementsByTagName('li'); //Список глав 6-й книги


advertising.remove();
//Сортировка глав 2-й книги
bookUl[0].append(list[0]);
bookUl[0].append(list[0]);
bookUl[0].append(list[1]);
bookUl[0].append(list[3]);
bookUl[0].append(list[4]);
bookUl[0].append(list[1]);
bookUl[0].append(list[1]);
bookUl[0].append(list[1]);
bookUl[0].append(list[1]);
bookUl[0].append(list[0]);
bookUl[0].append(list[0]);

//Сортировка книг
books[0].prepend(book[2]);
books[0].prepend(book[5]);
books[0].prepend(book[3]);
books[0].prepend(book[4]);
books[0].prepend(book[0]);
books[0].prepend(book[1]);


link[2].textContent = 'Книга 3. this и Прототипы Объектов'; 


//Сортировка глав 5-й книги
bookUl5[0].append(list5[0]);
bookUl5[0].append(list5[0]);
bookUl5[0].append(list5[7]);
bookUl5[0].append(list5[1]);
bookUl5[0].append(list5[1]);
bookUl5[0].append(list5[0]);
bookUl5[0].append(list5[1]);
bookUl5[0].append(list5[1]);
bookUl5[0].append(list5[0]);
bookUl5[0].append(list5[0]);
bookUl5[0].append(list5[0]);



//Добавление 8-й главы в 6-й книге
const book6Clone = list6[9].cloneNode(true);
bookUl6[0].append(book6Clone);
list6[9].textContent = 'Глава 8: За пределами ES6';