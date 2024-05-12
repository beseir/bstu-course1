const event = new Event('coursesLoaded');
const eventBought = new Event('courseBought');

let courseIndex = 0;
let indexAccum = 0;
let allCourses = [];

//считываю файлик через фетч организую массив через парсинг считанной строки
document.addEventListener('DOMContentLoaded', (event) => {
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
            loadCourses();

        })
        .catch(error => console.error("Ошибка при загрузке файла: ", error));



});
function buyCourse(e) {
    e.preventDefault();

    const el = document.querySelector("#test");
    let itemImg = $(this).closest('.all-courses-container__item').find('img').eq(0);

    const courseData = e.target.data;
    courseData.time = new Date().toLocaleDateString();
    courseData.isPaid = false;

    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];

    // Проверяем, есть ли уже такой курс в списке купленных
    const courseExists = boughtCourses.find(course => course.id === courseData.id);

    // Если курса нет, добавляем его в список
    if (!courseExists) {
        flyToElement(itemImg, el);
        boughtCourses.push(courseData);
        localStorage.setItem('boughtCourses', JSON.stringify(boughtCourses));
        document.dispatchEvent(eventBought);
    } else {
        showWarningsModal();
    }
}

function showWarningsModal() {
    const warnModal = document.querySelector('.warnCourseModal'); // Используйте . для класса
    const warnContent = document.querySelector('.warn-content');

    setTimeout(() => {
        warnModal.style.opacity = '1';
        warnContent.style.transform = 'translateX(-50%) translateY(100%)';
        setTimeout(() => {
            warnModal.style.opacity = '0';
            warnContent.style.transform = 'translateX(-50%) translateY(0)'; // Используйте translateY для вертикального перемещения
        }, 2000);
    }, 100);
}


function loadCourses(){
    indexAccum = courseIndex + 3;
    if(indexAccum >= allCourses.length){
    document.querySelector("#showOther").style.display = "none";
    }
    for (let i = 0; courseIndex < indexAccum; courseIndex++) {
        createCourse(allCourses[courseIndex].name, allCourses[courseIndex].price, allCourses[courseIndex].description, allCourses[courseIndex].image, courseIndex);
    }
    document.dispatchEvent(event);

}

function createCourse(name, price, description, imageSource, id) {
    let courseContainer = document.createElement("div");
    courseContainer.classList.add("all-courses-container__item");

    let course1 = document.createElement('div');
    course1.className = 'course-1';

    let courseImage = document.createElement('img');
    courseImage.alt = 'courseImage';
    courseImage.className = 'course-image';
    courseImage.src = imageSource;
    course1.appendChild(courseImage);

    let courseName = document.createElement('h2');
    courseName.className = 'course-name';
    courseName.textContent = name;
    course1.appendChild(courseName);

    let courseDescription = document.createElement('p');
    courseDescription.className = 'course-description';
    courseDescription.textContent = description;
    course1.appendChild(courseDescription);

    courseContainer.appendChild(course1);

    let course2 = document.createElement('div');
    course2.className = 'course-2';

    let coursePriceContainer = document.createElement('div');
    coursePriceContainer.className = 'course-price-container';

    let courseOldPriceText = document.createElement('div');
    courseOldPriceText.className = 'course-old-price-text';
    courseOldPriceText.textContent = price;
    coursePriceContainer.appendChild(courseOldPriceText);

    let courseNewPriceText = document.createElement('div');
    courseNewPriceText.className = 'course-new-price-text';
    courseNewPriceText.textContent = Math.round(price * 0.7);
    coursePriceContainer.appendChild(courseNewPriceText);

    let priceByn1 = document.createElement('div');
    priceByn1.className = 'price-byn';
    priceByn1.textContent = 'BYN/мес';
    coursePriceContainer.appendChild(priceByn1);

    let priceByn2 = document.createElement('div');
    priceByn2.className = 'price-byn';
    priceByn2.textContent = 'BYN/мес';
    coursePriceContainer.appendChild(priceByn2);

    course2.appendChild(coursePriceContainer);
    courseContainer.appendChild(course2);

    let courseControllerContainer = document.createElement('div');
    courseControllerContainer.className = 'course-controller-container';

    let buyCourseButton = document.createElement('input');
    buyCourseButton.type = 'button';
    buyCourseButton.value = 'Записаться';
    buyCourseButton.data = {name, price, description, imageSource, id};
    buyCourseButton.className = 'buyCourseBtn';
    buyCourseButton.addEventListener("click", buyCourse);
    courseControllerContainer.appendChild(buyCourseButton);

    let detailsButton = document.createElement('input');
    detailsButton.type = 'button';
    detailsButton.value = 'Подробнее';
    detailsButton.className = 'moreBtn';
    detailsButton.data = id;
    courseControllerContainer.appendChild(detailsButton);

    courseContainer.appendChild(courseControllerContainer);



    document.getElementById("courses").appendChild(courseContainer);
}


function flyToElement(flyer, flyingTo) {
    var $func = $(this);
    var divider = 3;
    var flyerClone = $(flyer).clone();
    $(flyerClone).css({
        position: 'fixed',
        top: $(flyer).offset().top - $(window).scrollTop() + "px",
        left: $(flyer).offset().left - $(window).scrollLeft() + "px",
        opacity: 1,
        'z-index': 1000
    });
    $('body').append($(flyerClone));

    var gotoX = $(flyingTo).offset().left - $(window).scrollLeft() + $(flyingTo).width() / 2 - $(flyer).width() / (2 * divider);
    var gotoY = $(flyingTo).offset().top - $(window).scrollTop() + $(flyingTo).height() / 2 - $(flyer).height() / (2 * divider);

    $(flyerClone).animate({
        opacity: 0.4,
        left: gotoX,
        top: gotoY,
        width: $(flyer).width()/divider,
        height: $(flyer).height()/divider
    }, 700, function () {
        // Используем .css() для мгновенного изменения размера
        $(flyingTo).css({
            transform: 'scale(0.9)',

        });
        // Используем .fadeTo() для плавного изменения прозрачности
        $(flyingTo).fadeTo('fast', 1, function() {
            // Возвращаем scale к нормальному состоянию после завершения анимации
            $(this).css('transform', 'scale(1)');
        });
        $(flyerClone).fadeOut('fast', function() {
            $(flyerClone).remove();
        });
    });
}
