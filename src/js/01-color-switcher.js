const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyBg = document.querySelector("body");
let timerId = null;
const isDisabled = startBtn.hasAttribute("disabled");


startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    if (!isDisabled) {
        startBtn.setAttribute("disabled", "disabled");
        stopBtn.removeAttribute("disabled");
    }

    bodyBg.style.backgroundColor = getRandomHexColor()

    timerId = setInterval(() => {
        bodyBg.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopBtnClick() {
    if (!isDisabled) {
        startBtn.removeAttribute("disabled");
        stopBtn.setAttribute("disabled", "disabled");
    }

    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}