document.querySelector("#sticky");

function checkWidth() {
    if (window.matchMedia('(max-width: 800px)').matches) {
        sticky.classList = "";
    } else {
        sticky.classList = "sticky-fix sticky-main navbar is-fixed-top is-flex is-flex-direction-column mt-6 ml-6";
    }
}


window.addEventListener("load", checkWidth);
window.onresize = checkWidth;