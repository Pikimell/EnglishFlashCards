!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},l={},n=e.parcelRequirea2e2;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in l){var n=l[e];delete l[e];var d={id:e,exports:{}};return t[e]=d,n.call(d.exports,d,d.exports),d.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){l[e]=t},e.parcelRequirea2e2=n);var d=n("iFVZs"),o=n("1tjgG"),s=n("9MiTP");const i=document.querySelector(".card"),r=document.querySelectorAll(".event-but");function c(){i.classList.add("minimize"),setTimeout((()=>{i.classList.remove("minimize")}),600)}function a(){v.selectedWord++,v.selectedWord>=h.length&&(v.selectedWord=0),f(v.selectedWord)}function u(){v.selectedWord--,v.selectedWord<-1&&(v.selectedWord=-1),f(v.selectedWord)}function f(e){if(e>=0&&e<h.length){let t=h[e].eng,l=h[e].rus;t=`${t}`.replace("/","<br>"),i.children[0].textContent=t,i.children[1].textContent=l}else-1==e&&(i.children[0].textContent="Start",i.children[1].textContent="Начать")}r[0].addEventListener("click",(()=>{c(),setTimeout(u,500)})),r[1].addEventListener("click",(()=>{i.classList.toggle("rotate")})),r[2].addEventListener("click",(()=>{c(),setTimeout(a,500)})),i.addEventListener("click",(e=>{}));const m={listModuleElement:document.querySelector(".list-module")};let g=[],h=[];const v={selectedCategory:"l7j8vhhs",selectedModule:null,selectedWord:null};!async function(){d.default.startLoading();const e=await o.DynamoAPI.getItems("flash-cards-modules",v.selectedCategory,"idModule");g=e,m.listModuleElement.innerHTML=(0,s.default)(g),d.default.stopLoading()}(),m.listModuleElement.addEventListener("click",(function(e){if(e.target!==e.currentTarget&&e.target.closest("li").dataset.id!==v.selectedModule){let t=document.querySelector(".list-module .list-module__item.select");t&&t.classList.remove("select"),e.target.classList.add("select"),v.selectedModule=e.target.closest("li").dataset.id,async function(e){h=await o.DynamoAPI.getItems("flash-cards-words",e,"idModule"),h.length>0?(v.selectedWord=-1,i.children[0].textContent="Start",i.children[1].textContent="Начать",d.default.info(`Завантаженно слів: ${h.length}`)):d.default.fail("Нажаль у данній категорії слів немає(")}(v.selectedModule)}}))}();
//# sourceMappingURL=LearnModule.f39bad18.js.map
