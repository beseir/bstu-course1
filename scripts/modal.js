
let authModal = null;
let isAuth = false;
let detailsModal = null;
let authContent = null;
let libModal = null;
let detailsContent = null;
let authSpan = null;
let detailsSpan = null;
let libSpan = null;

document.addEventListener("DOMContentLoaded", (e) => {
    detailsModal = document.getElementById("myModal");
    authContent = document.getElementById("auth-content");
    detailsContent = document.getElementById("courseDetails");
    authSpan = document.getElementsByClassName("close")[2];
    detailsSpan = document.getElementsByClassName("close")[1];
    libModal = document.getElementById("libModal");
    authModal = document.getElementById("myModal_Authorization");
    libSpan = authSpan = document.getElementsByClassName("close")[0];
});
function openAuth(){
    authModal.style.display = "block";
}
function openLibrary(){
    libModal.style.display = "block";
}

document.addEventListener('coursesLoaded', (event) => {
    let allCourses = [];
    let detailsBtns = document.getElementsByClassName("moreBtn");


    fetch('courses.xml')
        .then(response => response.text())
        .then(data => {
            let xmlData = data;
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlData, "text/xml");

            let courses = xmlDoc.getElementsByTagName("course");
            for (let i = 0; i < courses.length; i++) {
                let course = {
                    name: courses[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                    description: courses[i].getElementsByTagName("description")[0].childNodes[0].nodeValue,
                    price: parseInt(courses[i].getElementsByTagName("price")[0].childNodes[0].nodeValue),
                    image: courses[i].getElementsByTagName("image")[0].childNodes[0].nodeValue
                };
                allCourses.push(course);

            }

        })
        .catch(error => console.error("Ошибка при загрузке файла: ", error));


    Array.from(detailsBtns).forEach((btn) => {
        if(btn.onclick !== null) return;

        btn.onclick = function() {
            detailsModal.style.display = "block";
            fillDetails(allCourses[btn.data].name, allCourses[btn.data].description, allCourses[btn.data].image, allCourses[btn.data].price);
        }
    });


    detailsSpan.onclick = function() {
        detailsModal.style.display = "none";
    }
    authSpan.onclick = function() {
        authModal.style.display = "none";
    }
    libSpan.onclick = function() {
        libModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target === detailsModal || event.target === libModal || event.target === authModal) {
            detailsModal.style.display = "none";
            authModal.style.display = "none";
            libModal.style.display = "none";
        }
    }

    function fillDetails(name, description, image, price) {
        detailsContent.innerHTML = "";

        let courseImage = document.createElement('img');
        courseImage.alt = 'courseImage';
        courseImage.src = image;
        detailsContent.appendChild(courseImage);

        let courseName = document.createElement('h2');
        courseName.textContent = name;
        detailsContent.appendChild(courseName);

        let courseDescription = document.createElement('p');
        courseDescription.textContent = description;
        detailsContent.appendChild(courseDescription);

        let coursePrice = document.createElement('p');
        coursePrice.textContent = 'Цена: ' + Math.round(price * 0.7) + " руб (скидка 30%)"
        detailsContent.appendChild(coursePrice);

        let courseTime = document.createElement('p');
        courseTime.textContent = 'Продолжительность: 12 мес';
        detailsContent.appendChild(courseTime);
    }});
