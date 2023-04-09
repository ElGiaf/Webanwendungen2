function init(){
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      document.getElementById('Logo').classList.add("minimized");
    } else {
      document.getElementById('Logo').classList.remove("minimized");
    }
  });
}
window.addEventListener('DOMContentLoaded', init);