var sheet;
var haveDone = 0;
var total;
var correct = 0;
var incorrect = 0;
var timing = false;
var randomized = false;
function starter() {
    buttonArr = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")];
    // let randomthing = window.localStorage.getItem("random");
    // if (randomthing == "true") {
    //     doRandom = true;
    // }

    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"

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
    if (theTerm.hasImage) {
        let urlForImage = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+theTerm.imageSrc;
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
        if (theTerm.isMulti) {
            document.getElementById("multiheader").innerHTML = theTerm.question;
            document.getElementById("multiheader").style.display = "";
            document.getElementById("singleheader").innerHTML = theTerm.terms[mnum];
            fakeAnswers.push(theTerm.answers[mnum]);
        } else {
            document.getElementById("singleheader").innerHTML = theTerm.term;
            document.getElementById("multiheader").style.display = "none";
            fakeAnswers.push(theTerm.answer);
        }
    }

    for (let i = fakeAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = fakeAnswers[i];
        fakeAnswers[i] = fakeAnswers[j];
        fakeAnswers[j] = temp;
    }
    document.getElementById("a").innerHTML = fakeAnswers[0];
    document.getElementById("b").innerHTML = fakeAnswers[1];
    document.getElementById("c").innerHTML = fakeAnswers[2];
    document.getElementById("d").innerHTML = fakeAnswers[3];



}

async function checkMulti(element) {
    if (timing){
        clearInterval(interval);
        
    }
    haveDone++;
    if (theTerm.isMulti){
        if (element.innerHTML == theTerm.answers[mnum]){
            element.style.backgroundColor = "#3e8e41";
            await sleep(1000);
            element.style.backgroundColor = "wheat";
            correct++;
        } else {
            var correctElem;
            for (var i = 0; i<buttonArr.length; i++){
                if (buttonArr[i].innerHTML == theTerm.answers[mnum]){
                    correctElem = buttonArr[i];
                    break;
                }
            }
            correctElem.style.backgroundColor = "#3e8e41";
            element.style.backgroundColor = "red";
            await sleep(1000);
            correctElem.style.backgroundColor = "wheat";
            element.style.backgroundColor = "wheat";
            incorrect++;
        }
        if (mnum<theTerm.length-1){
            console.log("the term len: "+theTerm.length+" mnum: "+mnum)
            mnum++
        } else {
            mnum = 0;
            num++;
        }
    } else {
        if (element.innerHTML == theTerm.answer){
            element.style.backgroundColor = "#3e8e41";
            await sleep(1000);
            element.style.backgroundColor = "wheat";
            correct++;
        } else {
            var correctElem;
            for (var i = 0; i<buttonArr.length; i++){
                if (buttonArr[i].innerHTML == theTerm.answer){
                    correctElem = buttonArr[i];
                    break;
                }
            }
            correctElem.style.backgroundColor = "#3e8e41";
            element.style.backgroundColor = "red";
            await sleep(1000);
            correctElem.style.backgroundColor = "wheat";
            element.style.backgroundColor = "wheat";   
            incorrect++;
        }
        num++;
    }
    if (timing){
        counter = stableCount;
        document.getElementById("timerBar").style.width = "0%";
        width = 0;
        interval = setInterval(timer, 1000)
    }
    runMultipleChoice();
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
    buttonArr = null;
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
