
function hideElement(element) {
    element.style.pointerEvents = "none";
    element.style.opacity = "0";
}

function showElement(element) {
    element.style.pointerEvents = "auto";
    element.style.opacity = "1";
}

function showPopup(textToShow){
    showElement(document.getElementById("popup"));
    try{
        hideElement(document.getElementById("savePopup"))
    } catch (error){
        console.log("not on creator")
    }
    document.getElementById("popupText").innerHTML = textToShow;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deactivate(element){
    console.log("deactivating "+element)
    element.style.backgroundColor = "#85888c"
    element.pointerEvents = "none"
}

function reactivate(element, prev){
    console.log("activating "+element)
    element.style.backgroundColor = prev
    element.pointerEvents = "all"
}


function moveBar(newAmt, elem){
    elem.style.width = newAmt + '%';
}