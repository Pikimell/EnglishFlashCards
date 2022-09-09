// ===================================================
import Nott from "./modules/notiflix";
import { DynamoAPI } from "./modules/store/dynamo";
import listModuleTemplate from "../templates/moduleListTemplate.hbs";
// ===================================================

const cardElem = document.querySelector(".card");
const cardButtons = document.querySelectorAll(".event-but");

cardButtons[0].addEventListener("click", () => {
  minimizeCard();
  setTimeout(loadPrevWord, 500);
});

cardButtons[1].addEventListener("click", () => {
  turnCard();
});

cardButtons[2].addEventListener("click", () => {
  minimizeCard();
  setTimeout(loadNextWord, 500);
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

function loadNextWord() {
  selectedId.selectedWord++;
  if (selectedId.selectedWord >= listWords.length) selectedId.selectedWord = 0;

  loadWordData(selectedId.selectedWord);
}

function loadPrevWord() {
  selectedId.selectedWord--;
  if (selectedId.selectedWord < -1) selectedId.selectedWord = -1;

  loadWordData(selectedId.selectedWord);
}

function loadWordData(index) {
  if (index >= 0 && index < listWords.length) {
    let eng = listWords[index].eng;
    let rus = listWords[index].rus;
    cardElem.children[0].textContent = eng;
    cardElem.children[1].textContent = rus;
  } else if (index == -1) {
    cardElem.children[0].textContent = "Start";
    cardElem.children[1].textContent = "Начать";
  }
}

// ===================================================== //

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
  selectedWord: null,
};

// ============================================ //

loadData();

async function loadData() {
  Nott.startLoading();
  const data = await DynamoAPI.getItems(
    "flash-cards-modules",
    selectedId.selectedCategory,
    "idModule"
  );
  listModules = data;
  renderModules();
  Nott.stopLoading();
}

async function loadWords(idModule) {
  listWords = await DynamoAPI.getItems(
    "flash-cards-words",
    idModule,
    "idModule"
  );
  if (listWords.length > 0) {
    selectedId.selectedWord = -1;
    cardElem.children[0].textContent = "Start";
    cardElem.children[1].textContent = "Начать";
    Nott.info(`Завантаженно слів: ${listWords.length}`);
  } else {
    Nott.fail(`Нажаль у данній категорії слів немає(`);
  }
}

function renderModules() {
  refs.listModuleElement.innerHTML = listModuleTemplate(listModules);
}
// ============================================================ //
refs.listModuleElement.addEventListener("click", onModuleClick);
// ============================================================ //

function onModuleClick(e) {
  if (e.target !== e.currentTarget) {
    if (e.target.closest("li").dataset.id !== selectedId.selectedModule) {
      let prevItem = document.querySelector(
        ".list-module .list-module__item.select"
      );
      if (prevItem) prevItem.classList.remove("select");

      e.target.classList.add("select");
      selectedId.selectedModule = e.target.closest("li").dataset.id;
      loadWords(selectedId.selectedModule);
    }
  }
}
// ============================================================ //
