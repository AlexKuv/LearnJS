'use strict';
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScrolling from './modules/smoothScrolling';
import tabs from './modules/tabs';
import slider from './modules/slider';
import replaceRow from './modules/replaceRow';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
//Timer
countTimer('24 november 2020');
//Menu
toggleMenu();
//popup
togglePopUp();
//плавная прокрутка
smoothScrolling();
//табы
tabs();
//слайдер
slider();
// Замена картинок "Наша команда" на картинки из data при наведениии
replaceRow();
//калькулятор
calc(100);
//send-ajax-form
sendForm();