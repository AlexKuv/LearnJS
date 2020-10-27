'use strict';

function DomElement (selector, height, width, bg, fontSize) {
  this.selector = selector; 
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}


/*
let q = () => {
  let a = prompt('qwe');
  return a;
};*/

let newDiv = new DomElement ('.block');



DomElement.prototype.createDiv = function() {

  if(this.selector[0] ==='.'){
    let newDiv = document.createElement("div");
    newDiv.classList.add(this.selector.substring(1));
    document.body.prepend(newDiv);
  } else if (this.selector[0] === '#') {
        let newDiv = document.createElement("p");
        newDiv.id=this.selector.substring(1);
        document.body.prepend(newDiv);
  }

}; 

newDiv.createDiv();
