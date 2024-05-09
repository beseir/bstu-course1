document.addEventListener('courseBought', (event) => {

    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];
    const libRoot = document.querySelector("#lib-courses-root");
    libRoot.innerHTML = "";

    if (boughtCourses.length >= 0) {
        boughtCourses.forEach(course => {
            const courseElement = document.createElement('div');
            const courseName = document.createElement('div');
            const courseImage = document.createElement('img');
            const courseDate = document.createElement('div');

            courseElement.className = "courseElement";
            courseName.textContent = course.name;
            courseImage.src = course.imageSource;
            courseDate.textContent = course.time;

            courseElement.appendChild(courseImage);
            courseElement.appendChild(courseName);
            courseElement.appendChild(courseDate);


            libRoot.appendChild(courseElement);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Купленных курсов пока нет.';
        libRoot.appendChild(emptyMessage); // Добавляем сообщение в libRoot, а не в document.body.
    }
});

document.addEventListener('DOMContentLoaded', (event) => {

    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];
    const libRoot = document.querySelector("#lib-courses-root");
    libRoot.innerHTML = "";

    if (boughtCourses.length > 0) {
        boughtCourses.forEach(course => {
            const courseElement = document.createElement('div');
            const courseName = document.createElement('div');
            const courseImage = document.createElement('img');
            const courseDate = document.createElement('div');

            courseElement.className = "courseElement";
            courseName.textContent = course.name;
            courseImage.src = course.imageSource;
            courseDate.textContent = course.time;

            courseElement.appendChild(courseImage);
            courseElement.appendChild(courseName);
            courseElement.appendChild(courseDate);


            libRoot.appendChild(courseElement);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Купленных курсов пока нет.';
        libRoot.appendChild(emptyMessage); // Добавляем сообщение в libRoot, а не в document.body.
    }
});



