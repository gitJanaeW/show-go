var copyBox = document.querySelector(".copy-container");
var copyBtn = document.querySelector(".copy-button");

function copyText(event){
    let targetEl = event.target;
    if(targetEl.matches(".copy-button")){
        var targetText = targetEl.previousElementSibling;
        navigator.clipboard.writeText(targetText.textContent);
        targetEl.textContent = "Copied";
    }
}

copyBox.addEventListener("click", copyText);