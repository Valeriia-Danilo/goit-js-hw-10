import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.js-form');

form.addEventListener('submit', selectedPromise);

function selectedPromise(event) {
    event.preventDefault(); 

    const delay = Number(event.target.elements.delay.value);
    const checkBtn = event.target.elements.state.value;

    const createPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (checkBtn === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    })
        .then((response) => {
            iziToast.success({
                message: response,
                icon: false,
                position: 'topRight',
                theme: 'dark',
                backgroundColor: '#59a10d',
                messageColor: '#fff',
                messageSize: '16px',
            });
        })
        .catch((err) => {
            iziToast.error({
                message: err,
                icon: false,
                position: 'topRight',
                theme: 'dark',
                messageColor: '#fff',
                backgroundColor: '#ef6262',
                messageSize: '16px',
               
            });
        });
    
    form.reset();
}