var sheet;
var haveDone = 0;
var total;
var correct = 0;
var incorrect = 0;
var timing = false;
var randomized = false;
descForError = "undefined";
var jsonData;
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log("Handling error.")
    var err =  new LangError(msg, url, lineNo, descForError, "Something unexpected happened. \n", true, jsonData)
    return true;
}

function starter() {
    buttonArr = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")];
    // let randomthing = window.localStorage.getItem("random");
    // if (randomthing == "true") {
    //     doRandom = true;
    // }

    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    jsonData = rawJson;
    sheet = parseFromJSON(rawJson)
    total = sheet.getFullLength();
    runMultipleChoice()
    update()
}

var num = 0;
var mnum = 0;
var checkAsMulti = false;
var theTerm;
var buttonArr;

function runMultipleChoice() {
    console.warn("MASTER OUTPUT: havedone: "+haveDone+" total:" +total+" correct: "+correct+" incorrect: "+incorrect+ " num: "+num+" mnum: "+mnum)
    if (num>=sheet.length){
        showElement(document.getElementById("completedMode"))
        num = 0;
        if (randomized){
            sheet.randomize();
            haveDone = 0;
            var toMove = (haveDone/total)*100;
            moveBar(toMove, document.getElementById("progBar"));
        }
    }
    var toMove = (haveDone/total)*100;
    moveBar(toMove, document.getElementById("progBar"));
    
    document.getElementById("term_image").style.display = "none";
    theTerm = sheet.getNthTerm(num);
    console.log("CHOOSING TERM "+theTerm.term+" WITH NUM "+num)
    if (theTerm.hasImage) {
        let urlForImage = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+theTerm.imageSrc;
        document.getElementById("term_image").children[0].src = urlForImage;
        document.getElementById("term_image").style.display = "";
    }

    if (num >= sheet.length) {
        showElement(document.getElementById("completedMode"))
        num = 0;
        if (window.localStorage.getItem("random") == "true") {
            console.log("randomizing")
            sheet.randomize();
        }
    } else {
        var fakeAnswers = getFake(num, sheet);
        var crAns;
        if (theTerm.isMulti) {
            document.getElementById("multiheader").innerHTML = theTerm.question;
            document.getElementById("multiheader").style.display = "";
            document.getElementById("singleheader").innerHTML = theTerm.terms[mnum];
            crAns = theTerm.answers[mnum];
        } else {
            document.getElementById("singleheader").innerHTML = theTerm.term;
            document.getElementById("multiheader").style.display = "none";
            crAns = theTerm.answer;
        }
    }
    for (let i = fakeAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = fakeAnswers[i];
        fakeAnswers[i] = fakeAnswers[j];
        fakeAnswers[j] = temp;
    }
    idx = Math.floor(Math.random() * 3);
    fakeAnswers.splice(idx, 0, crAns);
    if (idx == 0){
        document.getElementById("a").setAttribute("data-correct", "true");
    } else if (idx == 1){
        document.getElementById("b").setAttribute("data-correct", "true");
    } else if (idx == 2){
        document.getElementById("c").setAttribute("data-correct", "true");
    } else if (idx == 3){
        document.getElementById("d").setAttribute("data-correct", "true");
    }
    document.getElementById("a").innerText = fakeAnswers[0];
    document.getElementById("b").innerText = fakeAnswers[1];
    document.getElementById("c").innerText = fakeAnswers[2];
    document.getElementById("d").innerText = fakeAnswers[3];
    


}

async function checkMulti(element) {
    var callback = "failed";
    if (timing){
        clearInterval(interval);
        
    }
    
    if (theTerm.isMulti){
        if (element.getAttribute("data-correct") == "true"){
            element.style.backgroundColor = "#3e8e41";
            await sleep(1000);
            element.style.backgroundColor = "wheat";
            correct++;
            if (timing){
                counter = stableCount;
                document.getElementById("timerBar").style.width = "0%";
                width = 0;
                interval = setInterval(timer, 1000)
            }
            callback = "correct";

        } else {       
            var correctElem;
            for (var i = 0; i<buttonArr.length; i++){
                if (buttonArr[i].getAttribute("data-correct") == "true"){
                    correctElem = buttonArr[i];
                }
            }     
            correctElem.style.backgroundColor = "#3e8e41";
            element.style.backgroundColor = "red";
            await sleep(1000);
            correctElem.style.backgroundColor = "wheat";
            element.style.backgroundColor = "wheat";
            incorrect++;
            callback = "incorrect"
        }
        if (mnum<theTerm.length-1){
            console.log("the term len: "+theTerm.length+" mnum: "+mnum)
            mnum++
        } else {
            mnum = 0;
            console.log("UPDATING NUM TO: "+num)
            num++;
        }
    } else {
        if (element.getAttribute("data-correct") == "true"){
            element.style.backgroundColor = "#3e8e41";
            await sleep(1000);
            element.style.backgroundColor = "wheat";
            correct++;
            if (timing){
                counter = stableCount;
                document.getElementById("timerBar").style.width = "0%";
                width = 0;
                interval = setInterval(timer, 1000)
            }
            callback = "correct";
        } else {
            var correctElem;
            for (var i = 0; i<buttonArr.length; i++){
                if (buttonArr[i].getAttribute("data-correct") == "true"){
                    correctElem = buttonArr[i];
                }
            }     
            correctElem.style.backgroundColor = "#3e8e41";
            element.style.backgroundColor = "red";
            await sleep(1000);
            correctElem.style.backgroundColor = "wheat";
            element.style.backgroundColor = "wheat";   
            incorrect++;
            callback = "incorrect"
        }
        console.log("UPDATING NUM FROM: "+num)
        num++;
        console.log("NUM IS: "+num)
    }

    for (var i = 0; i<buttonArr.length; i++){
        buttonArr[i].setAttribute("data-correct", "false");
    }

    console.log("UPDATING HAVEDONE FROM: "+haveDone)
    haveDone++;
    console.log("HAVEDONE IS: "+haveDone)

    if (callback == "correct"){
        runMultipleChoice();
    } else if (callback == "incorrect"){
        doIncorrect(element.innerHTML);
    } else {
        console.error("FAILED TO CHECK");
    }
}

function continueMulti(){

    if (timing){
        counter = stableCount;
        document.getElementById("timerBar").style.width = "0%";
        width = 0;
        interval = setInterval(timer, 1000)
    }
    hideElement(document.getElementById("incorrect"));
    runMultipleChoice();

}

function doIncorrect(clicked){
    let answerToShow;
    if (theTerm.isMulti){
        answerToShow = theTerm.answers[mnum];
    } else {
        answerToShow = theTerm.answer;
    }
    var toShow = `You chose <strong>${clicked}</strong><br>The correct answer was <strong>${answerToShow}</strong>`
    document.getElementById("correctedHolder").innerHTML = toShow;
    showElement(document.getElementById("incorrect"))
}

function getFake(n) {
    const tempSheet = Object.assign(new Studysheet, structuredClone(sheet))
    var haveToDo = 3;
    var fakeArr = [];
    var current = sheet.getNthTerm(n);
    if (current.isMulti && current.length > 1) {
        for (var i = 0; i < current.length; i++) {
            if (fakeArr.length >= 3) {
                break;
            } else if (current.answers[i] != current.answers[mnum]) {
                fakeArr.push(current.answers[i]);
                haveToDo--;
            }
        }
    }
    console.log("randomizing")
    tempSheet.remove(n);
    tempSheet.randomize();
    for (var i = 0; i < haveToDo; i++) {
        var temp = tempSheet.getNthTerm(i);
        if (temp.isMulti) {
            fakeArr.push(temp.answers[0]);
        } else {
            fakeArr.push(temp.answer);
        }
    }
    return fakeArr;
}

function shuffleSheet(){
    sheet.randomize()
    num = 0;
    mnum = 0;
    checkAsMulti = false;
    theTerm = null;
    
    haveDone = 0;
    total;
    correct = 0;
    incorrect = 0;
    randomized = true;
    hideElement(document.getElementById("shuffling"))
    runMultipleChoice()
    
}


function stats(done){
    var t;
    var r;
    var p;
    if (timing){
        t = "Yes"
    } else {
        t = "No"
    }

    if (randomized){
        r = "Yes"
    } else {
        r = "No"
    }
    if (haveDone == 0){
        p = "--%"
    } else {
        p = ((correct/haveDone)*100).toFixed(2) + "%"
    }
    var info = `
    <div style="color:green;">Questions Correct: ${correct}</div>
    <div style="margin-top: 10px; color:red;">Questions Incorrect: ${incorrect}</div>
    <div style="margin-top: 10px;"><strong>Percentage: ${p}</strong></div>
    <div style="margin-top: 10px;" id="instructions">Using Timer: ${t}</div>
    <div style="margin-top: 10px;" id="instructions">Using Shuffle: ${r}</div>`
    if (done){
        document.getElementById("doneStatsHolder").innerHTML= info;

    } else {
        showElement(document.getElementById("stats"))
        document.getElementById("statsHolder").innerHTML= info;
    }
    
}



var countdownInterval;
var interval;
var stableCount;
function startTimer(secs){
    timing = true;
    console.log("s value is: "+secs)
    if (secs == "" || secs == null){
        secs = 7;
    }
    else if (secs <= 0){
        document.getElementById("instructions").innerHTML = "<strong>Requires a value equal to or greater than 1.<strong>"
        return false;
    }
    hideElement(document.getElementById("timerPopup"))
    counter = secs;
    stableCount = secs;
    qNum = 0;
    multiNum = 0;
    haveDone= 0;
    correctCounter = 0
    incorrectCounter = 0
    term = null; 
    runMultipleChoice()
    showElement(document.getElementById("timerCountdown"))
    countdownInterval = setInterval(countdown, 1000);
}

var time = 3;
function countdown(){

    if (time>1){
        time--
        document.getElementById("timerCountdownText").innerHTML = "<strong>Starting In: "+time+"<strong>";
    }
    else if (time == 1){
        hideElement(document.getElementById("timerCountdown"))
        clearInterval(countdownInterval);
        interval = setInterval(timer, 1000)
    } 
}

var width = 0;
function timer(){
    console.log("width: "+width);
    console.log("counter: "+counter);
    if (counter<=0){
        //clearInterval(interval)
        checkMulti(document.getElementById("timerelem"));
        
        //interval = setInterval(timer, 1000)
    } else {
        counter--;
        width+= (100/stableCount);
        document.getElementById("timerBar").style.width = width+"%";
    }
        
    
}

function swap(){
    sheet.swapTD();
    num = 0;
    mnum = 0;
    checkAsMulti = false;
    theTerm = null;
    
    haveDone = 0;
    total;
    correct = 0;
    incorrect = 0;
    randomized = true;
    hideElement(document.getElementById("swapping"))
    runMultipleChoice()
}