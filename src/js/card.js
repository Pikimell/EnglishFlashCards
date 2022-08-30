const cardWrapper = document.querySelector(".card-wrapper");
const cardElem = document.querySelector(".card");
const cardButtons = document.querySelectorAll(".event-but");

cardButtons[0].addEventListener("click", () => {
  minimizeCard();
});

cardButtons[1].addEventListener("click", () => {
  turnCard();
});

cardButtons[2].addEventListener("click", () => {
  minimizeCard();
});

function minimizeCard() {
  cardElem.classList.add("minimize");
  setTimeout(() => {
    cardElem.classList.remove("minimize");
  }, 600);
}

function turnCard() {
  cardElem.classList.toggle("rotate");
}
cardElem.addEventListener("click", (e) => {});
