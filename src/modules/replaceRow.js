const replaceRow = () => {
  const sectionCommand = document.getElementById('command'),
        commandImg = sectionCommand.querySelectorAll('.command__photo');
        

   commandImg.forEach((item) => {
     let replaceSrc = item.src;

     item.addEventListener('mouseenter', (event) => {
        event.target.src = event.target.dataset.img;
   });
      item.addEventListener('mouseleave' , (event) => {
        event.target.src = replaceSrc;
      });
});

};

export default replaceRow;