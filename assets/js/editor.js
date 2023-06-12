import {alertModel} from './main-controls.js'
const saturate = document.getElementById("saturate") ; 
const contrast = document.getElementById("contrast") ; 
const brightness = document.getElementById("brightness") ; 
const sepia = document.getElementById("sepia") ; 
const invert = document.getElementById("invert") ; 
const grayscale = document.getElementById("grayscale") ; 
const blur = document.getElementById("blur") ; 
const hueRotate = document.getElementById("hue-rotate") ; 
const widthValue = document.getElementById("width") ; 
const heightValue = document.getElementById("height") ; 
const ratioValue = document.getElementById("ratio") ; 
const qualityValue = document.getElementById("quality") ; 
let rotate = 0 ,flipHorizontal = 1 ,flipVertical = 1 ;
let ratio;
export function uploadImg(upload,label,img,anotherControl,reset,filters,rotateBtn,download) {
  upload.addEventListener("change",_=> {
  anotherControl.style.display = 'block';
  label.style.display = 'none';
  img.parentElement.style.display = 'flex';
  img.parentElement.closest(".upload-img").style.justifyContent = 'end';
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = _ =>{
  if (file.result.includes("image")) img.src = file.result ;
  else alertModel()
  }
  img.onload = _=> {
    download.href = ""
    ImageIsDone(img);
    resize(rotateBtn,img);
  } 
})
resetAllEdit(reset,filters,upload,img);
}

export function filter(filters,img) {
  filters.forEach(effect => {
    effect.addEventListener("input", _ => ImageIsDone(img))
  });
}

export function saveImage(img,download) {
  const canvas = document.createElement("canvas") ; 
  const ctx = canvas.getContext("2d");
  canvas.width = widthValue.value;
  canvas.height = heightValue.value;
  ctx.filter = `saturate(${saturate.value}%) contrast(${contrast.value}%) brightness(${brightness.value}%) sepia(${sepia.value}%) invert(${invert.value}) grayscale(${grayscale.value}) blur(${blur.value}px) hue-rotate(${hueRotate.value}deg)`;
  ctx.translate(canvas.width / 2,canvas.height / 2);
  ctx.scale(flipHorizontal,flipVertical);
  if(rotate !== 0 ) ctx.rotate(rotate * Math.PI / 180);
  // ctx.drawImage(img, 100, 100, 400, 400, 50,50, 400, 400);
  ctx.drawImage(img,-canvas.width / 2,-canvas.height / 2,canvas.width,canvas.height);
  document.querySelectorAll("input[name='typeImage']").forEach(type => {
    let date = new Date()
    download.download = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} / ${type.value}`
  if (type.checked) img.src ? download.href = canvas.toDataURL(type.value, qualityValue.checked ? 0.7 : 1.0) : "";
})
}
function resize(rotateBtn,img) {
  heightValue.value = img.naturalHeight;
  widthValue.value = img.naturalWidth;
  ratio = img.naturalWidth / img.naturalHeight;
  heightValue.addEventListener("keyup", _=>{
    const width = ratioValue.checked ? heightValue.value * ratio : widthValue.value ;
    widthValue.value =  Math.floor(width);
  })
  widthValue.addEventListener("keyup", _=>{
    const height = ratioValue.checked ? widthValue.value / ratio : heightValue.value ;
    heightValue.value =  Math.floor(height)
  })

  rotateBtn.forEach(btn => {
    btn.onclick = _=> {
    if (btn.id === "left") rotate -= 90 ;
    else if (btn.id === "right") rotate += 90 ;
    else if (btn.id === "horizontal") flipHorizontal = flipHorizontal === 1 ? -1 : 1 ;
    else if (btn.id === "vertical")  flipVertical = flipVertical === 1 ? -1 : 1 ;
    ImageIsDone(img);
    }
  })
}

function resetAllEdit(reset,filters,upload,img) {
  upload.addEventListener("change", resetAll);
  reset.addEventListener("click", resetAll);
  function resetAll() {
    img.style.filter = "none" ;
    rotate = 0 ;
    flipHorizontal = 1;
    flipVertical = 1
    filters.forEach(effect => {
      effect.value = effect.dataset.initial;
      effect.style.setProperty('--value', effect.dataset.initial );
      ImageIsDone(img)
    })
  }
}
function ImageIsDone(img) {
  img.style.transform = `rotate(${rotate <= -360 ? rotate = 0 : rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
  img.style.filter = `saturate(${saturate.value}%) contrast(${contrast.value}%) brightness(${brightness.value}%) sepia(${sepia.value}%) invert(${invert.value}) grayscale(${grayscale.value}) blur(${blur.value}px) hue-rotate(${hueRotate.value}deg)`;
}
