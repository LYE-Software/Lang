// ui resizing garb
addEventListener("resize", (event) => {});

onresize = (event) => {
    if (window.innerHeight > window.innerWidth){
        console.log("we vertical")
        document.getElementById("shelf").style.display = "none"
    } else {
        console.log("we horizontal")
        document.getElementById("shelf").style.display = ""
    }
};



function checkSettings(){

    let randomthing = window.localStorage.getItem("random");
    if (randomthing == "true"){
        doRandom = true;
    }

    
}

var rawJson;
var qNum = 0;
var multiNum = 0;
var haveDone= 0;
var correctCounter = 0
var incorrectCounter = 0
var checkAsMulti;
var term;
var sheet;
var total;
var totalAmountSubmitted = 0;
var counter;
var randomized = false;
var timing = false;
var endless = false;
function startMastery(){
    console.log("[FUNCTION CALL: START MASTERY]")
    var wage = document.getElementById("input");
    wage.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            checkSheet()
        }
    });
    if (window.innerHeight > window.innerWidth){
        console.log("we vertical")
        document.getElementById("shelf").style.display = "none"
    } else {
        console.log("we horizontal")
        document.getElementById("shelf").style.display = ""
    }
    if (qNum == 0){
        rawJson = window.localStorage.getItem("fullstudysheet")
        document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    
        sheet = parseFromJSON(rawJson)
    }
    
    if (window.localStorage.getItem("random")=="true"){
        sheet.randomize()
    }

    document.getElementById("term_image").style.display = "none";
    // document.getElementById("crctst").innerHTML = "Correct: " + correctCounter
    // document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
    //document.getElementById("hint").classList.remove("showHint");

    input = document.getElementById("input")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("spellcheck", "off")
    input.style.display = "flex";
    total = sheet.getFullLength();

    runSheet()
}


function runSheet(){
    console.log("[FUNCTION CALL: RUN SHEET]")
    if (!endless){
        var toMove = (haveDone/total)*100;
        moveBar(toMove, document.getElementById("progBar"));
        reactivate(document.getElementById("hint"), "#f5deb3")
        document.getElementById("term_image").style.display = "none";
    }
    
    if (qNum >= sheet.length){
        if (!endless){
            showElement(document.getElementById("completedMode"))
            stats(true)
            endless = true;
        }
        
        qNum = 0;
        hideElement(document.getElementById("progBar"))
        document.getElementById("progBar").style.display = "none"
        showElement(document.getElementById("endless"))
        if (window.localStorage.getItem("random")=="true"){
            sheet.randomize();
            
            
        } 
        runSheet()
        if (timing){
            clearInterval(interval);
            document.getElementById("cont").onclick = function(){
                console.log("Continuing in Endless Mode")
                interval = setInterval(timer, 1000);
                hideElement(document.getElementById('completedMode'))
            }       
        }
    } else {
        term = sheet.getNthTerm(qNum);
        if (!term.isMulti){
            document.getElementById("displayWord").innerHTML = term.term;
            checkAsMulti = false;
            document.getElementById("multiQ").style.display = "none";

        } else {
            document.getElementById("multiQ").style.display = "flex";
            document.getElementById("displayWord").innerHTML = term.terms[multiNum];
            document.getElementById("multiQ").innerHTML = term.question;
            checkAsMulti = true;
        }

        if (term.hasImage){
            let urlForImage = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+term.imageSrc;
            document.getElementById("term_image").children[0].src = urlForImage;
            document.getElementById("term_image").style.display = "";
        }
    }
    
}


function checkSheet(){
    console.log("[FUNCTION CALL: CHECK SHEET]")
    console.log("term is: "+term);
    buttonStyling = document.getElementById("goButton")
    //document.getElementById("hintText").innerHTML = "";
    //document.getElementById("hint").classList.remove("showHint");
    usrInput = document.getElementById("input").value.toLowerCase().trim();
    var result;
    
    if (timing){
        clearInterval(interval);
        
    }
        
    if (usrInput == "" && !timing){

    } else{
        if(checkAsMulti){
            result = term.multiCheck(usrInput, multiNum);
        } else {
            result = term.check(usrInput);
        }
    }

    if (result){
        correctCounter += 1
        buttonStyling.style.backgroundColor = "#3e8e41";
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000);
        input.value = "";

        if (term.isMulti){
            multiNum++
            if (multiNum >= term.length){
                multiNum = 0;
                qNum++;
            }
        } else {
            qNum++;
        }
        haveDone++;
        totalAmountSubmitted++;
        if (timing){
            counter = stableCount;
            document.getElementById("timerBar").style.width = "0%";
            width = 0;
            interval = setInterval(timer, 1000)
        }
        
        runSheet()

    } else {
        totalAmountSubmitted++;
        buttonStyling.style.backgroundColor = "#ce1483"
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
        input.value = "";
        incorrectCounter += 1;
        console.log("timing: "+timing)
        if (timing){
            if (term.isMulti){
                multiNum++
                if (multiNum >= term.length){
                    multiNum = 0;
                    qNum++;
                }
            } else {
                qNum++;
            }
            haveDone++;
            
            counter = stableCount;
            document.getElementById("timerBar").style.width = "0%";
            width = 0;
            interval = setInterval(timer, 1000)
            
            runSheet()
        }
    }
    
}


function doHints(){
    console.log("[FUNCTION CALL: DO HINTS]")
    var userInput = document.getElementById("input").value.toLowerCase();
    var toReturn;
    var correctAns;
    if (term.isMulti){
        var correctAns = term.answers[multiNum].toLowerCase();  
    } else {
        var correctAns = term.answer.toLowerCase();     
    }
    if (userInput == correctAns){
        return true;
    }
    for (var i = 0; i<correctAns.length; i++){
        if (userInput.charAt(i) != correctAns.charAt(i)){
            
            toReturn = userInput.substring(0, i);
            break;
        }
    }
    toReturn+=correctAns.charAt(i);
    if (toReturn == "undefined"){
        deactivate(document.getElementById("hint"))
    } 
    if (toReturn == correctAns){
        deactivate(document.getElementById("hint"))
    } 
    document.getElementById("input").value = toReturn.toLowerCase();
    return false;
    
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
    runSheet()
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
        checkSheet();
        
        //interval = setInterval(timer, 1000)
    } else {
        counter--;
        width+= (100/stableCount);
        document.getElementById("timerBar").style.width = width+"%";
    }
        
    
}

function shuffleSheet(){
    sheet.randomize()
    qNum = 0;
    multiNum = 0;
    haveDone= 0;
    correctCounter = 0
    incorrectCounter = 0
    totalAmountSubmitted = 0;
    term = null;
    randomized = true; 
    runSheet()
    hideElement(document.getElementById("shuffling"))
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
    if (totalAmountSubmitted == 0){
        p = "--%"
    } else {
        p = ((correctCounter/totalAmountSubmitted)*100).toFixed(2) + "%"
    }
    var info = `
    <div style="color:green;">Questions Correct: ${correctCounter}</div>
    <div style="margin-top: 10px; color:red;">Questions Incorrect: ${incorrectCounter}</div>
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

