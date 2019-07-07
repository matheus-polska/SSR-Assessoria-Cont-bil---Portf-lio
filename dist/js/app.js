let body = document.querySelector('body');
let menu = document.querySelector('.nav-links');
let menuOverlay = document.querySelector(".menu-overlay");
let btnBurguer = document.querySelector('.btn-burguer');
body.addEventListener('click', function (event) {
    if (event.target == menu || event.target == btnBurguer || event.target.parentNode == btnBurguer) {
        return;
    } else {
        menu.classList.remove('menu-active');

        menuOverlay.classList.remove('active-overlay');
    }
})

btnBurguer.addEventListener('click', function () {
    menu.classList.toggle('menu-active');
    menuOverlay.classList.toggle('active-overlay');

})

window.addEventListener('hashchange', function () {
    let links = document.querySelectorAll("a[active-class]");
    const hashId = window.location.hash.substr(1);
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let currentHash = link.getAttribute('href').substr(1);
        let className = link.getAttribute('active-class');
        if (currentHash === hashId) {
            link.classList.add(className);
        } else {
            link.classList.remove(className);
        }
    }
})