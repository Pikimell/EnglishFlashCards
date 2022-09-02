// ===================================================== //
import moduleListTemplate from "../templates/selectComponent.hbs";
import wordListTemplate from "../templates/wordListTemplate.hbs";
import { DynamoAPI } from "./modules/store/dynamo";
// ===================================================== //

let listModules = [];
let listWords = [];

const selectedID = {
  selectedCategory: "l7j8vhhs",
  selectedModuleForUpdate: null,
  selectedModuleForWords: null,
  selectedWords: null,
};

const refs = {
  moduleButtons: {
    createBtn: document.querySelector("input[type=button][data-type=create]"),
    updateBtn: document.querySelector("input[type=button][data-type=update]"),
    deleteBtn: document.querySelector("input[type=button][data-type=delete]"),
  },
  wordButtons: {
    createBtn: document.querySelector(".js-quest-btn[data-type=create]"),
    updateBtn: document.querySelector(".js-quest-btn[data-type=update]"),
    deleteBtn: document.querySelector(".js-quest-btn[data-type=delete]"),
  },
  listWordsContainer: document.querySelector(".admin-list-module"),
};

// ===================================================== //
let myListModules = document.querySelector(".dropdown-el[data-type=modules]");
let myListWords = document.querySelector(".dropdown-el[data-type=words]");

myListModules.addEventListener("click", onListClick);
myListWords.addEventListener("click", onListClick);

function onListClick(e) {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.classList.toggle("expanded");
  try {
    let id = `#${e.target.dataset.for}`;
    document.querySelector(id).checked = true;
    document.addEventListener("click", closeSelect);

    if (e.currentTarget.dataset.type === "words") {
      selectedID.selectedModuleForWords = id.slice(1, id.length - 4);
    }
  } catch (err) {
    console.log(err);
  }
  if (!e.currentTarget.classList.contains("expanded")) {
    e.currentTarget.scrollTop = 0;
  }
}
function closeSelect() {
  try {
    myListModules.classList.remove("expanded");
    document.removeEventListener(closeSelect);
  } catch (err) {}
}
// ===================================================== //

async function loadListItems() {
  listModules = await DynamoAPI.getItems(
    "flash-cards-modules",
    selectedID.selectedCategory,
    "idModule"
  );
}

function renderListModule(renderList) {
  myListModules.innerHTML = moduleListTemplate(renderList);
  myListWords.innerHTML = moduleListTemplate(
    [...renderList].map((obj) => {
      let copyObj = { ...obj };
      copyObj.id += "word";
      return copyObj;
    })
  );
}

function renderListWords(renderList) {
  renderList = [...renderList].map((obj) => {
    let copyObj = { ...obj };
    copyObj.eng =
      copyObj.eng.length > 10 ? copyObj.eng.slice(0, 10) + "..." : copyObj.eng;
    return copyObj;
  });
  refs.listWordsContainer.innerHTML = wordListTemplate(renderList);
}

async function onBodyLoad() {
  await loadListItems();
  renderListModule(listModules);
  renderListWords(listWords);
}

document.addEventListener("DOMContentLoaded", onBodyLoad);
// ===================================================== //

refs.moduleButtons.createBtn.addEventListener("click", onCreateModuleClick);
refs.moduleButtons.updateBtn.addEventListener("click", onUpdateModuleClick);
refs.moduleButtons.deleteBtn.addEventListener("click", onDeleteModuleClick);

refs.wordButtons.createBtn.addEventListener("click", onCreateWordClick);
refs.wordButtons.updateBtn.addEventListener("click", onUpdateWordClick);
refs.wordButtons.deleteBtn.addEventListener("click", onDeleteWordClick);

// ===================================================== //

async function onCreateWordClick(e) {
  e.preventDefault();
  data = getFormData(e);

  let word = {
    eng: data.eng.value,
    rus: data.rus.value,
    idModule: selectedID.selectedModuleForWords,
  };

  if (word.idModule && (word.eng || word.rus)) {
    id = await DynamoAPI.createItem("flash-cards-words", word);
    word.id = id;
    listWords.push(word);
    renderListWords(listWords);
  }

  resetFormData(e);
}

function onUpdateWordClick(e) {
  e.preventDefault();

  resetFormData(e);
}

function onDeleteWordClick(e) {
  e.preventDefault();

  resetFormData(e);
}

async function onCreateModuleClick(e) {
  e.preventDefault();
  let nameModule = getFormData(e).moduleValue.value;
  nameModule = nameModule.trim();
  if (nameModule.length > 0) {
    let module = {
      title: nameModule,
      idModule: selectedID.selectedCategory,
    };
    module.id = await DynamoAPI.createItem("flash-cards-modules", module);
    listModules.push(module);
    renderListModule(listModules);
  }
  resetFormData(e);
}

function onUpdateModuleClick(e) {
  e.preventDefault();
  try {
    let idModule = [
      ...e.currentTarget.closest("form").querySelectorAll("[checked]"),
    ].find((obj) => obj.checked).value;

    let nameModule = getFormData(e).moduleValue.value;
    nameModule = nameModule.trim();
    if (nameModule.length > 0) {
      let module = {
        title: nameModule,
        idModule: selectedID.selectedCategory,
      };

      DynamoAPI.updateItem("flash-cards-modules", idModule, module);
      listModules.find((obj) => obj.id == idModule).title = module.title;
      renderListModule(listModules);
    }
  } catch {}

  resetFormData(e);
}

function onDeleteModuleClick(e) {
  e.preventDefault();
  let nameModule = getFormData(e).moduleValue.value;
  if (nameModule.length > 0) {
    let module = listModules.find((obj) => obj.title === nameModule);
    if (module) {
      DynamoAPI.deleteItem("flash-cards-modules", module.id);
      listModules = listModules.filter((obj) => obj.title !== nameModule);
    }
  }
  renderListModule(listModules);
  resetFormData(e);
}

// ===================================================== //

function resetFormData(e) {
  let form = e.currentTarget.closest("form");
  form.reset();
}

function getFormData(e) {
  let form = e.target.closest("form");
  return form.elements;
}

// ===================================================== //
