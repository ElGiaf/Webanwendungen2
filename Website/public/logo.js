function init(){
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        //document.getElementsByTagName('HEADER').classList.add("minimized");
        document.getElementById('head').classList.remove("maximized");
      } else {
        //document.getElementsByTagName('HEADER').classList.remove("minimized");
        document.getElementById('head').classList.add("maximized");
      }
    });
  }