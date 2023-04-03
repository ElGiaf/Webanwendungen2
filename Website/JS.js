/*window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementsByTagName("nav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}*/
function init(){
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
  });
}
window.addEventListener('DOMContentLoaded', init);
