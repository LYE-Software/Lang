var newSheet;
var currentlyFocusedCard = 0;
var cardArray = [];

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
    // console.log("sheet: "+sheet)
    // newSheet = parseFromJSON(sheet)
    newSheet = arrayToSheet(newSheet.convertToSingle(), "sheet")
    var appendTo = "";
    for (let i = 0; i<newSheet.terms.length; i++){
        image = "none";
        imgsrc = "noimage";
        if (newSheet.getNthTerm(i).hasImage){
            console.log("term: "+newSheet.getNthTerm(i)+" has an image")
            image = "flex";
            imgsrc = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(i).imageSrc
        }
        let basic = `
        <div class="flashcard">
            <div class="flashcardContents" data-term="${i}" style="display:flex; flex-direction:column;" data-state="front" onclick="cardClick(this)">
                <div style="width:100%; height:100px; display:${image}; justify-content:center; align-items:center;">
                    <img src=${imgsrc} style="height:100px;">
                </div>
                ${newSheet.getNthTerm(i).term}
            </div>
        </div>
        `
        appendTo += basic
        image = "none"
        imgsrc = "noimage"
    }
    console.warn("FLASHCARDS STRING: "+appendTo)
    document.getElementById("flashcardBox").innerHTML += appendTo;
    cardArray = document.getElementById("flashcardBox").children;
    console.log(cardArray);
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
                imgsrc = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(card.getAttribute("data-term")).imageSrc
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

function changeCard(card){
    card.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

function cardClick(card){
    console.log("recieved: ");
    console.log(card);
    if (card.getAttribute("data-term") == currentlyFocusedCard){
        flipCard(card);
    } else {
        changeCard(card);
        currentlyFocusedCard = card.getAttribute("data-term");
        if ((parseInt(card.getAttribute("data-term"))-1)>=0 && cardArray[parseInt(card.getAttribute("data-term"))-1].children[0].getAttribute("data-state")=="back"){
            flipCard(cardArray[parseInt(card.getAttribute("data-term"))-1].children[0]);
        }
        if ((parseInt(card.getAttribute("data-term"))+1)<cardArray.length && cardArray[parseInt(card.getAttribute("data-term"))+1].children[0].getAttribute("data-state")=="back"){
            flipCard(cardArray[parseInt(card.getAttribute("data-term"))+1].children[0]);
        }
    }
}