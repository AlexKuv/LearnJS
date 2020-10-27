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
      `font-size:`+ this.fontSize + `px;`;
    newDiv.textContent='Hello world';
    document.body.prepend(newDiv);
  } else if (this.selector[0] === '#') {
        let newDiv = document.createElement("p");
        newDiv.id=this.selector.substring(1);
        newDiv.style.cssText = ` 
      height:` + this.height + `px;`+ `width:`+ this.width + `px;`+ 
      `background :`+ this.bg + `;` +
      `font-size:`+ this.fontSize + `px;`;
        document.body.prepend(newDiv);
  }
}; 

let newObj = new DomElement('.block', '150', '150','#A8E4A0', '25');

newObj.createDiv();
