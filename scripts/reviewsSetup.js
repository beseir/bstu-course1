function scrollCarousel(direction) {
    const container = document.getElementById('reviews');
    const items = container.getElementsByClassName('review-item');
    const scrollAmount = items[0].clientWidth; //  ширина каждого элемента одинакова


    container.scrollLeft += scrollAmount * direction;
}


let reviews = [];

function createReview(name, review, imageSource) {

    let reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-item");

    let image = document.createElement("img");
    image.classList.add("review-avatar");
    image.alt = "photo";
    image.src = imageSource;

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("review-content");

    let wrap = document.createElement("div");
    wrap.classList.add("review-wrap");

    let title = document.createElement("h2");
    title.classList.add("review-name");
    title.innerHTML = name;

    let text = document.createElement("p");
    text.classList.add("review-text");
    text.textContent = review;


    contentContainer.appendChild(text);

    wrap.appendChild(image);
    wrap.appendChild(title);

    reviewContainer.appendChild(wrap);
    reviewContainer.appendChild(contentContainer);

    document.getElementById("reviews").appendChild(reviewContainer);
}



document.addEventListener('DOMContentLoaded', (event) => {
    fetch('reviews.xml')
        .then(response => response.text())
        .then(data => {
            let xmlData = data;
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlData, "text/xml");

            let allReviews = xmlDoc.getElementsByTagName("review");
            for (let i = 0; i < allReviews.length; i++) {
                let reviewItem = {
                    name: allReviews[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                    review: allReviews[i].getElementsByTagName("text")[0].childNodes[0].nodeValue,
                    image: allReviews[i].getElementsByTagName("img")[0].childNodes[0].nodeValue
                };
                reviews.push(reviewItem);

            }
            for (let i = 0; i < reviews.length; i++) {
                createReview(reviews[i].name, reviews[i].review, reviews[i].image);
            }
        })
        .catch(error => console.error("Ошибка при загрузке файла: ", error));



});


