function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonChangeColorStart = document.querySelector('[data-start]');

const buttonChangeColorStop = document.querySelector('[data-stop]');
let timerId = null;

buttonChangeColorStop.setAttribute('disabled', true);

buttonChangeColorStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    buttonChangeColorStart.setAttribute('disabled', true);
    buttonChangeColorStop.removeAttribute('disabled', true);

    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonChangeColorStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonChangeColorStart.removeAttribute('disabled');
  buttonChangeColorStop.setAttribute('disabled', true);

  //   console.log(`Interval with id ${timerId} has stopped!`);
});
