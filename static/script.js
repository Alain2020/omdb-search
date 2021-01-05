
const modal = document.getElementsByClassName("modal")[0];
const searchButton = document.getElementsByClassName("search__searchButton")[0];
const modalButtonClose = document.getElementsByClassName(
    "modal__buttonClose"
)[0];
const searchBar = document.querySelector(".search__searchBar > input");
const body = document.querySelector(".body");
const loadingDimmer = document.querySelector(".lds-ring");


modalButtonClose.addEventListener("click", () => {
    modal.style.display = "none";
});

const someListener = async (event) => {
    var element = event.target;
    if (element.classList.contains("card__button")) {
        loadingDimmer.style.display = "flex";
        const data = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${element.value}`
        )
            .then((res) => res.json())
            .then((data) => data);
        const modalTitle = document.querySelector(".modal__header > h5")
        const modalBody = document.querySelector(".modal__body > p")
        modalTitle.innerHTML = data.Title
        modalBody.innerHTML = data.Plot
        modal.style.display = "flex";
        loadingDimmer.style.display = "none";
    }
};

const handleSearch = async () => {
    const searchQuery = searchBar.value;
    if (!searchQuery) {
        alert("input search query");
        return;
    }
    body.innerHTML = "";
    loadingDimmer.style.display = "flex";
    const data = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`
    )
        .then((res) => res.json())
        .then((data) => data.Search);

    let elements = "";
    for (i of data) {
        elements += `
            <div class="card">
                <div class="card__header">
                    
                    <img src="${i.Poster}" alt="photo">
                </div>
                <div class="card__body">
                    <div class="card__title">
                        <h5>${i.Title}</h5>
                    </div>
                    <p>${i.Year}</p>
                    <p>${i.Type}</p>
                    <button class="card__button" value=${i.imdbID}>Detail</button>
                </div>
            </div>
        `;
    }
    body.innerHTML = elements;
    loadingDimmer.style.display = "none";
    searchBar = "";
};
const keyUpListener = (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
};
document.addEventListener("click", someListener);
document.addEventListener("keyup", keyUpListener);

searchButton.addEventListener("click", handleSearch);
