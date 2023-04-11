function init(){
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      //document.getElementsByTagName('HEADER').classList.add("minimized");
      document.getElementById('head').classList.add("minimized");
    } else {
      //document.getElementsByTagName('HEADER').classList.remove("minimized");
      document.getElementById('head').classList.remove("minimized");
    }
  });
}
window.addEventListener('DOMContentLoaded', init);