var copyBox = document.querySelector(".copy-container");
var copyBtn = document.querySelector(".copy-button");

function copyText(event){
    let targetEl = event.target;
    if(targetEl.matches(".copy-button")){
        const targetText = targetEl.previousElementSibling;
        navigator.clipboard.writeText(targetText.textContent);
        // debugger;
        copiedTimeHandler(targetEl);
        
    }
}

function copiedTimeHandler(targetEl){
    let countNum = 0;
    targetEl.textContent = "Copied";
    const timerInterval = setInterval(function(){
        if(countNum === 1){
            targetEl.textContent = "Copy";
            clearInterval(timerInterval);
        }
        console.log(countNum);
        countNum++;
    }, 1000);
    
}

copyBox.addEventListener("click", copyText);