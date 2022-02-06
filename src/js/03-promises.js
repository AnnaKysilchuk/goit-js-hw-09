import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const formData = {};

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit)

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  return formData;
}

function onFormSubmit(event) {
  event.preventDefault();

  let k = Number(formData.delay);
  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, k)
      .then((result) => {
        Notiflix.Notify.success(result);
      })
      .catch((result) => {
        Notiflix.Notify.failure(result);
      });
    k += Number(formData.step);
  }
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
         reject(`Rejected promise ${position} in ${delay}ms`);
      }     
     }, delay)
    }
  );

}

  