const countTimer =  (deadLine) => {
  let idInterval;
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');



    let getTimeRemaining = function (){
      let dateStop = new Date (deadLine).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          return {timeRemaining, hours, minutes, seconds};

    };
     
    let updateClock = function () {
    let timer = getTimeRemaining();
      
          timerHours.textContent = ('0' + timer.hours.toString()).slice(-2);
          timerMinutes.textContent = ('0' + timer.minutes.toString()).slice(-2);
          timerSeconds.textContent = ('0' + timer.seconds.toString()).slice(-2);

      if (timer.seconds < 0) {

        clearInterval(idInterval);
          timerHours.textContent = '00';
          timerMinutes.textContent = '00';
          timerSeconds.textContent = '00';
      }

    };
    updateClock();
   idInterval = setInterval(updateClock,1000);
};
export default countTimer;