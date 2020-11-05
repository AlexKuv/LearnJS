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


	    let Square = function (node) {
        this.x = 0;
        this.y = 40;
        this.step = 10;
        this.node = node;
        this.setHandlers();
    };
 
    Square.prototype.setHandlers = function () {
        let keys = {
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
        let that = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode in keys) {
                that[keys[e.keyCode]]();
                that.draw();
            }
        }, false);
    };
 
    Square.prototype.left = function () {
        this.x -= this.step;
    };
 
    Square.prototype.right = function () {
        this.x += this.step;
    };
 
    Square.prototype.up = function () {
        this.y -= this.step;
    };
 
    Square.prototype.down = function () {
        this.y += this.step;
    };
 
    Square.prototype.draw = function () {
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
    };
 
    new Square(document.querySelector("div"));


// document.addEventListener('keydown', (e) =>{
//   let square = document.querySelector('.block');
//   let left =0;
//   let top =30;
//   if(e.key === 'ArrowRight'){
//     left += 10;
//     square.style.left = left + 'px';
//   }
//   if (e.code === 'ArrowLeft') {
//      left -= 10;
//      square.style.left = left + 'px';
//   }
//   if (e.code === 'ArrowDown') {
//      top += 10;
//      square.style.top = top + 'px';
//   }
//   if (e.code === 'ArrowUp') {
//      top -= 10;
//      square.style.top = top + 'px';
//   }
// });
