const smoothScrolling = () => {
  const serviceBlock = document.querySelector('#service-block'),
  aService = document.querySelector('a'),
  menu = document.querySelector('menu'),
  menuItem = menu.querySelectorAll('ul>li>a');
 

menuItem.forEach((elem) => {
 let atributes = elem.getAttribute('href');
 elem.addEventListener('click', (e) => {
  e.preventDefault();
  let elemLink = document.querySelector(`${atributes}`);
  elemLink.scrollIntoView({behavior: "smooth", block: 'start'});
 
 });
});

aService.addEventListener('click', (e) => {
  e.preventDefault();
  serviceBlock.scrollIntoView({behavior: "smooth", block: 'start'});
});
};

export default smoothScrolling;