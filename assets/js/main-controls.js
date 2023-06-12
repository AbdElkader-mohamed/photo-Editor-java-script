const overlay = document.querySelector(".overlay") ; 
export function tabsHandel(tabsBtn,tabsBody,tabBody) {
  tabsBtn.forEach(btn => {
    btn.addEventListener("click", _=> {
      removeActive(tabsBtn);
      btn.classList.add("active");
      overlay.classList.add("active");
      removeActive(tabsBody);
      document.getElementById(btn.dataset.target).classList.add("active");
      tabBody.classList.toggle("active");
      overlay.onclick = _ =>{
        overlay.classList.remove("active")
      tabBody.classList.remove("active")
        document.getElementById(btn.dataset.target).classList.remove("active")
      }
    })
  });
  
}
export function alertModel() {
  const myModal = document.querySelector(".myModal") ; 
  myModal.classList.add("active");
  overlay.classList.add("active");
  setTimeout( _ => {
    myModal.classList.remove("active");
    overlay.classList.remove("active");
  },3000)
}
function removeActive(target) {target.forEach(target => target.classList.remove("active"))}
