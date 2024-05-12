
document.addEventListener("DOMContentLoaded", (e) => {

    const warningModal = document.querySelector("#warningModal");

    document.querySelector(".content__container__form").addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.querySelector("#nameInp").value;
        const email = document.querySelector("#emailInp").value;
        const phone = document.querySelector("#telInp").value;

        if(validateName(name) && validateEmail(email) && validatePhoneNumber(phone)){
            showSuccessModal();
            warningModal.innerHTML = " ";
            document.querySelector("#nameInp").value = '';
            document.querySelector("#emailInp").value = '';
            document.querySelector("#telInp").value = '';
        }
        else if(!validateName(name)){

            warningModal.innerHTML = "Вы неккоректно ввели имя!";
        }
        else if(!validateEmail(email)){

            warningModal.innerHTML = "Вы неккоректно ввели email!";
        }
        else if(!validatePhoneNumber(phone)){

            warningModal.innerHTML = "Вы неккоректно ввели телефон!";
        }


    });
});




function validateName(name) {
    return /^[A-Za-zА-Яа-яЁё]+$/.test(name);
}


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function validatePhoneNumber(phone) {
    return /^\+\d{1,3}\s?\d{1,3}?\s?\d{2,3}[-\s]?\d{2}[-\s]?\d{2}$/.test(phone);
}

function showSuccessModal() {
    const successModal = document.querySelector('#successModal');
    setTimeout(() => {
        successModal.style.opacity = '1';
        setTimeout(() => {
            successModal.style.opacity = '0';
        }, 2000);
    }, 200);
}