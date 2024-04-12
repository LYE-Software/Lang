var isCurrentlyReviewing = false;
var currentTerm;
var currentlyShownPopup = null;

function runMode(term, multiArray){
    console.log("Running mode with term "+term.term+" ///////////////")
    isCurrentlyReviewing = false;
    currentTerm = term;
    if (currentTerm.trainId == null){
        currentTerm.trainId = 1;
    }
    switch (currentTerm.trainId){
        case 1:
            console.log("entering learn");
            setKeybinds("learn");
            //do Learn
            runLearn();
            break;
        case 2:
            console.log("entering multi 1");
            setKeybinds("multi");
            //do multi choice
            runMultiChoice(multiArray);
            break;
        case 3:
            console.log("entering multi 2");
            setKeybinds("multi");
            //do multi choice
            runMultiChoice(multiArray);
            break;
        case 4:
            console.log("entering write 1");
            setKeybinds("write");
            //do write
            runWrite();
            break;
        case 5:
            console.log("entering write 2");
            setKeybinds("write");
            //do write
            runWrite();
            break;
    }
    
}


//LEARN

function runLearn(){
    document.getElementById("term_image_learn").style.display = "none";
    if (currentTerm.hasImage){
        let urlForImage = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+currentTerm.imageSrc;
        document.getElementById("term_image_learn").children[0].src = urlForImage;
        document.getElementById("term_image_learn").style.display = "";
    }
    document.getElementById("TermAndDef").style.display = "";
    document.getElementById("term").innerHTML = currentTerm.term;
    document.getElementById("def").innerHTML = currentTerm.answer;
}


//WRITE

function runWrite(){
    document.getElementById("term_image").style.display = "none";
    document.getElementById("write").style.display = "";
    
    if (currentTerm.hasImage){
        let urlForImage = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+currentTerm.imageSrc;
        document.getElementById("term_image").children[0].src = urlForImage;
        document.getElementById("term_image").style.display = "";
    }
    document.getElementById("displayWord").innerHTML = currentTerm.term;
}

function checkWrite(){
    usrInput = input.value.toLowerCase();
    usrInput = usrInput.trim();
    if (usrInput == "" || usrInput == null){
        console.log("[WRITE] nothing detected")
    }
    else if (isCurrentlyReviewing){
        if (currentTerm.check(usrInput)){
            document.getElementById("goButton").style.backgroundColor = "#3e8e41"
            setTimeout(function () { document.getElementById("goButton").style.backgroundColor = "wheat" }, 1000)
            turnIndex++;
            totalTurns++;
        } else {
            displayWriteCorrected();
            reviewStack.push(currentTerm);
        }
        logic();
    } else {
        if (currentTerm.check(usrInput)){
            document.getElementById("goButton").style.backgroundColor = "#3e8e41"
            setTimeout(function () { document.getElementById("goButton").style.backgroundColor = "wheat" }, 1000)
            advanceTrain(true);
        } else {
            displayWriteCorrected();
            advanceTrain(false);
        }  
    }
    input.value = "";
} 

function displayWriteCorrected(){
    document.getElementById("goButton").style.backgroundColor = "#ce1483"
    //var toappend = `You wrote <strong>${usrInput}</strong><br>The correct answer was <strong>${currentTerm.answer}</strong>`
    currentlyShownPopup = new PopupBuilder();
    currentlyShownPopup.add(new PopupText(currentTerm.term))
    currentlyShownPopup.add(new PopupText(`You wrote <strong>${usrInput}</strong><br>The correct answer was <strong>${currentTerm.answer}</strong`));
    currentlyShownPopup.add(new PopupDismissButton("Ok."));
    currentlyShownPopup.show();
    setKeybinds("clickthruW");
    //document.getElementById("correctedHolder").innerHTML = toappend;
    //showElement(document.getElementById("wrongWrite"))
    setTimeout(function () { document.getElementById("goButton").style.backgroundColor = "wheat" }, 1000)
}

// MULTI

function runMultiChoice(arr){
    document.getElementById("term_image_mcq").style.display = "none";
    document.getElementById("multchoice").style.display="flex"
    document.getElementById("questionheader").innerHTML = currentTerm.term
    console.log("[MULT] arr: "+arr)
    var fakes = getMultiFakes(currentTerm, arr)
    if (currentTerm.hasImage){
        let urlForImage = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+currentTErm.imageSrc;
        document.getElementById("term_image_mcq").children[0].src = urlForImage;
        document.getElementById("term_image_mcq").style.display = "";
    }
    for (let i = fakes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = fakes[i];
        fakes[i] = fakes[j];
        fakes[j] = temp;
    }
    crAns = currentTerm;
    idx = getUniqueRandomNumber(3)
    fakes.splice(idx, 0, crAns);
    if (idx == 0){
        document.getElementById("a").setAttribute("data-correct", "true");
    } else if (idx == 1){
        document.getElementById("b").setAttribute("data-correct", "true");
    } else if (idx == 2){
        document.getElementById("c").setAttribute("data-correct", "true");
    } else if (idx == 3){
        document.getElementById("d").setAttribute("data-correct", "true");
    }
    document.getElementById("a").innerText = fakes[0].answer;
    document.getElementById("b").innerText = fakes[1].answer;
    document.getElementById("c").innerText = fakes[2].answer;
    document.getElementById("d").innerText = fakes[3].answer;
    unlockButtons();

}

function getMultiFakes(real, arr){
    var seperate = []
    for (var i=0; i<arr.length; i++){
        if (real.answer == arr[i].answer){
            console.log("[MULT]found answer "+arr[i].answer+ " at index + "+i)
        } else {
            console.log("[MULT] pushing "+arr[i].answer+" at index "+i)
            seperate.push(arr[i])
        }
    }
    console.log("[MULT]arr is now: "+seperate)
    for (let z = seperate.length - 1; z > 0; z--) {
        const j = Math.floor(Math.random() * (z + 1));
        const temp = seperate[z];
        seperate[z] = seperate[j];
        seperate[j] = temp;
    }

    return [seperate[0], seperate[1], seperate[2]]
}

async function correctMultiChoice(letter){
    lockButtons();
    if (document.getElementById(letter).getAttribute("data-correct") == "true"){
        document.getElementById("a").setAttribute("data-correct", "false");
        document.getElementById("b").setAttribute("data-correct", "false");
        document.getElementById("c").setAttribute("data-correct", "false");
        document.getElementById("d").setAttribute("data-correct", "false");
        document.getElementById(letter).style.backgroundColor = "#3e8e41";
        await sleep(1000);
        document.getElementById(letter).style.backgroundColor = "wheat";

        advanceTrain(true);
    } else {
        var arrOf = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")]
        var correctId;
        console.log("array of buttons: "+arrOf)
        for (var i = 0; i<arrOf.length; i++){
            console.log("comparing "+arrOf[i].innerText+" to "+currentTerm.answer)
            if (arrOf[i].innerText == currentTerm.answer){
                console.log("Found correct one")
                correctId = arrOf[i].id;
            }
        }
        document.getElementById("a").setAttribute("data-correct", "false");
        document.getElementById("b").setAttribute("data-correct", "false");
        document.getElementById("c").setAttribute("data-correct", "false");
        document.getElementById("d").setAttribute("data-correct", "false"); 
        console.log("Correct element is: "+correctId+" which is "+document.getElementById(correctId));
        document.getElementById(correctId).style.backgroundColor = "#3e8e41";
        document.getElementById(letter).style.backgroundColor = "red";
        await sleep(1000);
        document.getElementById(correctId).style.backgroundColor = "wheat";
        document.getElementById(letter).style.backgroundColor = "wheat";
        document.getElementById(letter).blur()
        doIncorrectM(document.getElementById(letter).innerHTML)
    }
}

function doIncorrectM(clicked){
    console.log("%c Answered incorrectly in multiple choice.", 'background: #222; color: #bada55');
    setKeybinds("clickthruM")
    
    // var toShow = `You chose <strong>${clicked}</strong><br>The correct answer was <strong>${currentTerm.answer}</strong>`
    // console.log("APPENDING "+toShow+" TO "+document.getElementById("correctedHolder"))
    // console.log(document.getElementById("correctedHolderMulti"))
    // document.getElementById("correctedHolderMulti").innerHTML = toShow;
    // showElement(document.getElementById("incorrect"))
    currentlyShownPopup = new PopupBuilder()
    currentlyShownPopup.add(new PopupText(`You chose <strong>${clicked}</strong><br>The correct answer was <strong>${currentTerm.answer}</strong>`))
    currentlyShownPopup.add(new PopupButton("Ok.", function(){
        continueMulti();
    }))
    currentlyShownPopup.show();
}

function continueMulti(){
    
    //hideElement(document.getElementById("incorrect"))
    currentlyShownPopup.close();
    //currentlyShownPopup = null;
    advanceTrain(false)
}


//REVIEW

function review(){
    setKeybinds("write");
    console.log("entering review");
    currentTerm = reviewStack.pop();
    isCurrentlyReviewing = true;
    runWrite()
}


