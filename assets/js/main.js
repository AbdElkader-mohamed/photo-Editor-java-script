import {uploadImg,filter,saveImage} from './editor.js'
import {tabsHandel} from './main-controls.js'

const img = document.getElementById("target-img") ; 
const upload = document.getElementById("upload-img") ; 
const label = document.querySelector(".upload label") ; 
const anotherControl = document.querySelector(".another-control") ; 
const tabsBtn = document.querySelectorAll(".tab-btns .tab-btn") ; 
const tabsBody = document.querySelectorAll(".tab-body .tab-content") ; 
const range = document.querySelectorAll('input[type="range"]');
const filters = document.querySelectorAll("#filters ul li input");
const reset = document.getElementById("reset");
const download = document.getElementById("downloading");
const rotateBtn = document.querySelectorAll("#flip button");
const tabBody = document.querySelector(".tab-body") ;
uploadImg(upload,label,img,anotherControl,reset,filters,rotateBtn,download);

filter(filters,img);

download.addEventListener("click", _ => saveImage(img,download))

tabsHandel(tabsBtn,tabsBody,tabBody);

function handelRange() {
  range.forEach(range => {
    range.style.setProperty('--value', range.value);
    range.style.setProperty('--min', range.min == '' ? '0' : range.min);
    range.style.setProperty('--max', range.max == '' ? '200' : range.max);
    range.addEventListener('input', () => range.style.setProperty('--value', range.value));
    range.addEventListener("mousemove", renderValues)
    range.addEventListener("change", renderValues)
    function renderValues() {range.previousElementSibling.querySelector("span").textContent = range.value ;}
    renderValues()
  })
}
handelRange();

tabsBtn.forEach(btn => {
  btn.onclick = _ => {
    document.querySelector(".tab-body").classList.add("active")
  }
})
