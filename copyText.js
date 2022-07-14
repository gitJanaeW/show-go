var copyBox = document.querySelector(".copy-container");
var copyBtn = document.querySelector(".copy-button");

const copyText = function(event){
    let targetEl = event.target;
    if(targetEl.matches(".copy-button")){
        var targetText = targetEl.previousElementSibling;
        navigator.clipboard.writeText(targetText.textContent);
        copyBox.innerHTML = "Copied";
    }
}

copyBox.addEventListener("click", copyText);