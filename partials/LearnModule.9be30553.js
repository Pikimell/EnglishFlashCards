function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},n={},o=t.parcelRequirea2e2;null==o&&((o=function(e){if(e in l)return l[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return l[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequirea2e2=o);var r=o("1pYqf");var i=e(o("amrNH")).template({1:function(e,t,l,n,o){var r,i=null!=t?t:e.nullContext||{},d=e.hooks.helperMissing,s="function",c=e.escapeExpression,a=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'    <li class="list-module__item" data-id="'+c(typeof(r=null!=(r=a(l,"id")||(null!=t?a(t,"id"):t))?r:d)===s?r.call(i,{name:"id",hash:{},data:o,loc:{start:{line:2,column:43},end:{line:2,column:49}}}):r)+'">'+c(typeof(r=null!=(r=a(l,"title")||(null!=t?a(t,"title"):t))?r:d)===s?r.call(i,{name:"title",hash:{},data:o,loc:{start:{line:2,column:51},end:{line:2,column:60}}}):r)+"</li>\n"},compiler:[8,">= 4.3.0"],main:function(e,t,l,n,o){var r;return null!=(r=(e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]})(l,"each").call(null!=t?t:e.nullContext||{},t,{name:"each",hash:{},fn:e.program(1,o,0),inverse:e.noop,data:o,loc:{start:{line:1,column:0},end:{line:3,column:9}}}))?r:""},useData:!0});const d=document.querySelector(".card"),s=document.querySelectorAll(".event-but");function c(){d.classList.add("minimize"),setTimeout((()=>{d.classList.remove("minimize")}),600)}function a(){g.selectedWord++,g.selectedWord>h.length&&(g.selectedWord=0),m(g.selectedWord)}function u(){g.selectedWord--,g.selectedWord<-1&&(g.selectedWord=-1),m(g.selectedWord)}function m(e){if(e>=0&&e<h.length){let t=h[e].eng,l=h[e].rus;d.children[0].textContent=t,d.children[1].textContent=l}else-1==e&&(d.children[0].textContent="Start",d.children[1].textContent="Начать")}s[0].addEventListener("click",(()=>{c(),setTimeout(u,500)})),s[1].addEventListener("click",(()=>{d.classList.toggle("rotate")})),s[2].addEventListener("click",(()=>{c(),setTimeout(a,500)})),d.addEventListener("click",(e=>{}));const f={listModuleElement:document.querySelector(".list-module")};let p=[],h=[];const g={selectedCategory:"l7j8vhhs",selectedModule:null,selectedWord:null};!async function(){const e=await r.DynamoAPI.getItems("flash-cards-modules",g.selectedCategory,"idModule");p=e,f.listModuleElement.innerHTML=i(p)}(),f.listModuleElement.addEventListener("click",(function(e){if(e.target!==e.currentTarget&&e.target.closest("li").dataset.id!==g.selectedModule){let t=document.querySelector(".list-module .list-module__item.select");t&&t.classList.remove("select"),e.target.classList.add("select"),g.selectedModule=e.target.closest("li").dataset.id,async function(e){h=await r.DynamoAPI.getItems("flash-cards-words",e,"idModule"),h.length>0&&(g.selectedWord=-1,d.children[0].textContent="Start",d.children[1].textContent="Начать")}(g.selectedModule)}}));
//# sourceMappingURL=LearnModule.9be30553.js.map
