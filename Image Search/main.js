const form = document.querySelector("form");
const searchinput = document.getElementById("searchinput");
const searchresults = document.querySelector(".searchresults");
const showmorebtn = document.querySelector(".showmorebtn");

const API_KEY = "API_KEY";

let inputData = "";
let page = 1;

const showImages = async () => {
    let res = await fetch(`https://api.unsplash.com/photos/?page=${page}&per_page=${30}&client_id=${API_KEY}`);
    let jsonres = await res.json();

    // if (page === 1) {
    //     searchresults.innerHTML = "";
    // }

    jsonres.map((image) => {
        let imageWrapper = document.createElement("div");
        imageWrapper.classList.add("searchresult");
        let img = document.createElement("img");
        img.src = image.urls.small;

        let imageLink = document.createElement("a");
        imageLink.href = image.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = image.alt_description.slice(1, 75);

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imageLink);
        searchresults.appendChild(imageWrapper);
    })

    page++;
    if (page > 1) {
        showmorebtn.style.display = "block";
    }
}

const searchImages = async () => {
    inputData = searchinput.value;

    let res = await fetch(`https://api.unsplash.com/search/photos/?page=${page}&query=${inputData}&per_page=${12}&client_id=${API_KEY}`);
    let jsonres = await res.json();
    let images = jsonres.results;

    if (page === 1) {
        searchresults.innerHTML = "";
    }

    images.map((image) => {
        let imageWrapper = document.createElement("div");
        imageWrapper.classList.add("searchresult");
        let img = document.createElement("img");
        img.src = image.urls.small;

        let imageLink = document.createElement("a");
        imageLink.href = image.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = image.alt_description.slice(1, 75);

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imageLink);
        searchresults.appendChild(imageWrapper);
    })

    page++;
    if (page > 1) {
        showmorebtn.style.display = "block";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showmorebtn.addEventListener("click", () => {
    searchImages();
})

showImages();