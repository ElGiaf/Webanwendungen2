window.addEventListener('DOMContentLoaded', init);
let url;

function init(){
    url = window.location.href;
    anmeldenoption();
};

function anmeldenoption(){
    var container = document.getElementById('container');
    container.innerHTML = '<section class="input"><button>Anmelden</button><button>Registrieren</button></section>';
}