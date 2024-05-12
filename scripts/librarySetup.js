let libRoot = null;
let payButton = null;
let isCardLinked = false;
let cardModal = null;
let close = null;
document.addEventListener('DOMContentLoaded', (event) => {
    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];

    payButton = document.querySelector(".payForCoursesButton");
    libRoot = document.querySelector("#lib-courses-root");
    cardModal = document.querySelector("#cardModal");
    close = document.querySelector("#closeCard");
    const cardForm = document.querySelector("#cardForm");
    const btn = document.querySelector("#cardLinkBtn");

    if(isCardLinked){
        btn.innerHTML = "Карта привязана";
        btn.onclick = null
    }
    cardForm.addEventListener("submit", (e) => {
        e.preventDefault();
        isCardLinked = true;
        cardModal.style.display = "none";

       btn.innerHTML = "Карта привязана";
       btn.onclick = null;

    })
    close.addEventListener("click", (e) => {
        cardModal.style.display = "none";
    });

    if (boughtCourses.length > 0) {
        fillModalItems(boughtCourses);
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Купленных курсов пока нет.';
        libRoot.appendChild(emptyMessage);
    }
});

function openCard(){
    cardModal.style.display = "block";
}

function pay(){
    if(!isCardLinked){
        alert("Карта не привязана");
        return;
    }
    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];
    boughtCourses.map((course) =>{
        course.isPaid = true;
    })
    localStorage.setItem('boughtCourses', JSON.stringify(boughtCourses));
   fillModalItems(boughtCourses);

}
function clearAll(){
    localStorage.clear();
    fillModalItems([]);
}

function fillModalItems(boughtCourses){
    const unPaidCourses = boughtCourses.filter((item) => !item.isPaid)
    const sumToPay = Math.floor(unPaidCourses.reduce((total, item) => total + item.price, 0) * 0.7)
    payButton.innerHTML = "Оплатить " + sumToPay + " руб";
    if(sumToPay <= 0)  payButton.innerHTML = "Все оплачено!"
    libRoot.innerHTML = "";
    boughtCourses.forEach(course => {
        fillElement(course);
    });
}
document.addEventListener('courseBought', (event) => {

    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];

    if (boughtCourses.length >= 0) {
        fillModalItems(boughtCourses);
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Купленных курсов пока нет.';
        libRoot.parentNode.appendChild(emptyMessage); //
    }
});


function displayFiltredCourses(e){
    const option = e.value;
    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];

    switch (option) {
        case "Все":{
            fillModalItems(boughtCourses);
            break;
        }
        case "Оплаченные":{
            const sortedCourses = boughtCourses.filter((item) => item.isPaid)
            fillModalItems(sortedCourses);
            break;
        }
        case"Не оплаченные":{
            const sortedCourses = boughtCourses.filter((item) => !item.isPaid)
            fillModalItems(sortedCourses);
            break;
        }
    }
}
function fillElement(course){

    const courseElement = document.createElement('div');
    const courseName = document.createElement('div');
    const courseImage = document.createElement('img');
    const courseDate = document.createElement('div');
    const overlay = document.createElement('div');
    const downloadIcon = document.createElement('div');

    courseElement.className = "courseElement";
    courseName.textContent = course.name;
    courseImage.src = course.imageSource;
    courseDate.textContent = course.time;

    overlay.className = "overlay";
    downloadIcon.className = "download-icon";

    if(course.isPaid === false){
        downloadIcon.textContent = 'Не оплачен';
    }
    else{
        downloadIcon.innerHTML = "<a href='http://'>Скачать</a>";
    }

    overlay.appendChild(downloadIcon);
    courseElement.appendChild(courseImage);
    courseElement.appendChild(courseName);
    courseElement.appendChild(courseDate);
    courseElement.appendChild(overlay);


    libRoot.appendChild(courseElement);
}

