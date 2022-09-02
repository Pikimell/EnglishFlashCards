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

// ===================================================== //

import { DynamoAPI } from "./modules/store/dynamo";
import listModuleTemplate from "../templates/moduleListTemplate.hbs";

const refs = {
  listModuleElement: document.querySelector(".list-module"),
};
const categoryId = [
  "l7j8vhhs",
  "l7j8vpm3",
  "l7j8vqnv",
  "l7j8vrz7",
  "l7j8vufn",
  "l7j8vx4r",
  "l7j8w2cb",
];

let listModules = [];
let listWords = [];
const selectedId = {
  selectedCategory: categoryId[0],
  selectedModule: null,
  selectedWord: 0,
};

// ============================================ //

loadData();

async function loadData() {
  const data = await DynamoAPI.getItems(
    "flash-cards-modules",
    selectedId.selectedCategory,
    "idModule"
  );

  listModules = data;
  renderModules();
}

function renderModules() {
  refs.listModuleElement.innerHTML = listModuleTemplate(listModules);
}
// ============================================================ //
refs.listModuleElement.addEventListener("click", onModuleClick);
// ============================================================ //

function onModuleClick(e) {
  if (e.target !== e.currentTarget) console.log(e.target.closest("li"));
}
// ============================================================ //
