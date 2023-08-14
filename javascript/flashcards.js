var newSheet;
var idx = 0;
function doFlashcards(){
    console.log("Flashcarding")
    document.getElementById("listview").style.display = "none"
    showElement(document.getElementById("flashcardBox"))
    document.getElementById("flashcardBox").style.display = ""
    document.getElementById("outerFlashcards").style.display = "flex"
    showElement(document.getElementById("outerFlashcards"))
    document.getElementById("flashcard").src = "assets/icons/list.png"
    document.getElementById("flashcard").onclick=function(){
        document.getElementById("listview").style.display = "block"
        document.getElementById("flashcardBox").style.display = "none"
        document.getElementById("outerFlashcards").style.display = "none"
        this.onclick = doFlashcards;
        this.src = "assets/icons/flashcards.png"
    }
    makeCards()
}



function makeCards(){
    console.log("sheet: "+sheet)
    newSheet = parseFromJSON(sheet)
    newSheet = arrayToSheet(newSheet.convertToSingle(), "sheet")
    var appendTo = document.getElementById("flashcardBox")
    for (let i = 0; i<newSheet.length; i++){
        image = "none";
        imgsrc = "noimage";
        if (newSheet.getNthTerm(i).hasImage){
            console.log("term: "+newSheet.getNthTerm(i)+" has an image")
            image = "flex";
            imgsrc = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(i).imageSrc
        }
        let basic = `
        <div class="flashcard">
            <div class="flashcardContents" data-term="${i}" style="display:flex; flex-direction:column;" data-state="front" onclick="nextCard(this)">
                <div style="width:100%; height:100px; display:${image}; justify-content:center; align-items:center;">
                    <img src=${imgsrc} style="height:100px;">
                </div>
                ${newSheet.getNthTerm(i).term}
            </div>
        </div>
        `
        appendTo.innerHTML += basic
        image = "none"
        imgsrc = "noimage"
    }
    appendTo.children[0].children[0].onclick=function(){flipCard(this)}
}

function flipCard(card){
    image = "none"
    imgsrc = "noimage"
    console.log(card)
    if (card.getAttribute("data-state") == "front"){
        card.className = "flashcardContents cardFlip"
        setTimeout(function(){
            card.innerHTML = newSheet.getNthTerm(card.getAttribute("data-term")).answer
        }, 125)
        card.setAttribute("data-state", "back")
        setTimeout(function(){
            card.className = "flashcardContents"
        }, 250)
    } else {
        card.className = "flashcardContents cardFlip"
        setTimeout(function(){
            let image = "none"
            let imgsrc = "noimage"
            if (newSheet.getNthTerm(card.getAttribute("data-term")).hasImage){
                console.log("term: "+newSheet.getNthTerm(card.getAttribute("data-term"))+" has an image")
                image = "flex";
                imgsrc = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(card.getAttribute("data-term")).imageSrc
            }
            card.innerHTML = `
            <div style="width:100%; height:100px; display:${image}; justify-content:center; align-items:center;">
                <img src=${imgsrc} style="height:100px;">
            </div>
            ${newSheet.getNthTerm(card.getAttribute("data-term")).term}
            `
        }, 125)
        setTimeout(function(){
            card.className = "flashcardContents"
        }, 250)
        card.setAttribute("data-state", "front")     
    }
}

function nextCard(card){
    image = "none"
    imgsrc = "noimage"
    currentNum = idx;
    document.getElementById("outerFlashcards").scrollTop =360*(idx+1);
    idx++;
    card.onclick = function(){flipCard(this)}
    document.getElementById("flashcardBox").children[idx-1].children[0].onclick = function(){previousCard(this)}
    if (card.getAttribute("data-state") == "back"){
        image = "none"
        imgsrc = "noimage"
        if (newSheet.getNthTerm(card.getAttribute("data-term")).hasImage){
            console.log("term: "+newSheet.getNthTerm(card.getAttribute("data-term"))+" has an image")
            image = "flex";
            imgsrc = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(card.getAttribute("data-term")).imageSrc
        }
        card.innerHTML = `
        <div style="width:100%; height:100px; display:${image}; justify-content:center; align-items:center;">
            <img src=${imgsrc} style="height:100px;">
        </div>
        ${newSheet.getNthTerm(card.getAttribute("data-term")).term}
        `
        card.setAttribute("data-state", "front")     

    }
}

function previousCard(card){
    image = "none"
    imgsrc = "noimage"
    console.log("trying to go previous")
    document.getElementById("outerFlashcards").scrollTop = document.getElementById("outerFlashcards").scrollTop - 360;
    idx--;
    card.onclick = function(){flipCard(this)}
    if ((idx-1)>0){
        document.getElementById("flashcardBox").children[idx].children[0].onclick = function(){previousCard(this)}
    }
    document.getElementById("flashcardBox").children[idx+1].children[0].onclick = function(){nextCard(this)}
    if (card.getAttribute("data-state") == "back"){
        image = "none"
        imgsrc = "noimage"
        if (newSheet.getNthTerm(card.getAttribute("data-term")).hasImage){
            console.log("term: "+newSheet.getNthTerm(card.getAttribute("data-term"))+" has an image")
            image = "flex";
            imgsrc = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(card.getAttribute("data-term")).imageSrc
        }
        card.innerHTML = `
        <div style="width:100%; height:100px; display:${image}; justify-content:center; align-items:center;">
            <img src=${imgsrc} style="height:100px;">
        </div>
        ${newSheet.getNthTerm(card.getAttribute("data-term")).term}
        `
        card.setAttribute("data-state", "front")     

    }
}