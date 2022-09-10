import Nott from "./modules/notiflix";
import listModuleTemplate from "../templates/moduleListTemplate.hbs";

const refs = {
    listModuleElement: document.querySelector(".list-module"),
    cardElem:document.querySelector(".card"),
    cardButtons: document.querySelectorAll(".event-but"),
};
let modules;
loadPage();

function loadPage(){
    modules = localStorage.getItem('learnModule1')
    try{
        modules = JSON.parse(modules)
    }catch{
        localStorage.setItem('learnModule1', [])
        modules = []
    }

    refs.listModuleElement.innerHTML = listModuleTemplate(modules)
}
