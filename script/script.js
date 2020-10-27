'use strict';

function DomElement (selector, height, width, bg, fontSize) {
  this.selector = selector; 
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createDiv = function() {

  if(this.selector[0] ==='.'){
    let newDiv = document.createElement("div");
    newDiv.classList.add(this.selector.substring(1));
    newDiv.style.cssText = ` 
      height:` + this.height + `px;`+ `width:`+ this.width + `px;`+ 
      `background :`+ this.bg + `;` +
      `font-size:`+ this.fontSize + `px;` + `position: absolute;`;
    newDiv.textContent='Hello world';
    document.body.prepend(newDiv);
  } else if (this.selector[0] === '#') {
        let newDiv = document.createElement("p");
        newDiv.id=this.selector.substring(1);
        newDiv.style.cssText = ` 
      height:` + this.height + `px;`+ `width:`+ this.width + `px;`+ 
      `background :`+ this.bg + `;` +
      `font-size:`+ this.fontSize + `px;` + `position: absolute;`;
        document.body.prepend(newDiv);
  }
}; 

let newObj = new DomElement('.block', '100', '100','#A8E4A0');


document.addEventListener('DOMContentLoaded', newObj.createDiv());


document.addEventListener('keydown', (e) =>{
  let square = document.querySelector('.block');
  let left =0;
  let top =30;
  if(e.key === 'ArrowRight'){
    left += 10;
    square.style.left = left + 'px';
  }
  if (e.code === 'ArrowLeft') {
     left -= 10;
     square.style.left = left + 'px';
  }
  if (e.code === 'ArrowDown') {
     top += 10;
     square.style.top = top + 'px';
  }
  if (e.code === 'ArrowUp') {
     top -= 10;
     square.style.top = top + 'px';
  }
});