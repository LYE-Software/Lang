var subLocation; // location within set of groups (ie loc=3 of 7 groups)
var t; // location within each group ((grouplength*5)+grouplength)
var sheet; // studysheet
var groupLength; // length of individual group
var reviewIDX; // positions of review questions
var groupPosition; // position within group
var review_t // which review question you are on
var arrayOfGroups = [];
var currentGroup;
var currentTerm;
var totalNeededToFinish;
var totalCorrect;
var ttlForGp;
var crForGp;
var swap = false;
var descForError = "--waiting to start (user configuring settings)--"
var jsonData;
var shuffle = false;
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log("Handling error.")
    var err =  new LangError(msg, url, lineNo, descForError, "Something unexpected happened. \nTrain encountered an error and is unable to continue functioning at the moment.", true, jsonData)
    return true;
}


function overrideServer(json){
    window.localStorage.setItem("fullstudysheet", json)
}

function swapper(elem, that){
    if (elem.id == "termSwap"){
        console.log("term");
        swap = false;
        elem.className = "selected";
        that.className = "deselected";
    }
    else{
        console.log("def");
        swap = true;
        elem.className = "selected";
        that.className = "deselected";
    }
}


function shuffler(elem, that){
    if (elem.id == "termSwap"){
        console.log("term");
        shuffle = false;
        elem.className = "selected";
        that.className = "deselected";
    }
    else{
        console.log("def");
        shuffle = true;
        elem.className = "selected";
        that.className = "deselected";
    }
}


function doTrain(){
    
    configureInterface()
    descForError = "Parsing sheet."
    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    jsonData = rawJson;
    sheet = parseFromJSON(rawJson)
    if (shuffle == true){
        sheet.randomize()
    }
    var singleSheet = arrayToSheet(sheet.convertToSingle(), window.localStorage.getItem("chosenSheet"));
    for (i=0; i<singleSheet.length; i++){
        console.log(singleSheet.terms[i].returnArray())
    }
    sheet = singleSheet;
    console.log("[SETUP] SHEET IS: "+sheet)
    loc = 0;
    groupLength = Math.floor(document.getElementById("termsperround").value);
    if (document.getElementById("termsperround").value == null || document.getElementById("termsperround").value <=3){
        groupLength = 5;
    } else if (document.getElementById("termsperround").value>=sheet.length) {
        groupLength = sheet.length-1;
    }
    descForError = "Calculating indexes of review."
    reviewIDX = calculateReview(groupLength);

    //dividing questions into groups
    descForError = "Placing terms into groups."
    var amtOfArr = parseInt(((sheet.length/groupLength)+0.9))
    var cutoff = sheet.length;
    for (var i = 0; i< amtOfArr; i++){
        var tempArr = [];
        for (var j = 0; j<groupLength; j++){
            tempArr.push("placeholder"+j)
            cutoff--;
            if (cutoff <= 0){
                break;
            }
        }
        
        arrayOfGroups.push(tempArr)
    }
    var placementCount = 0;
    console.log("[SETUP] Array of groups created: "+arrayOfGroups + " || len: "+arrayOfGroups.length)
    console.log("[SETUP] Starting placement...")
    console.log("[SETUP] SHEET IS: "+sheet)
    for (var i = 0; i < arrayOfGroups.length; i++){
        var internalArray = arrayOfGroups[i]
        for (var j = 0; j<internalArray.length; j++){
            internalArray[j] = sheet.getNthTerm(j+(i*groupLength));
            console.log("[SETUP] current term: "+sheet.getNthTerm(j+(i*groupLength)))
            placementCount++;
        }
    }
    console.log("[SETUP] completed placement.")
    console.log("[SETUP] Final array of groups: "+arrayOfGroups+" || len: "+arrayOfGroups.length)
    console.log("[SETUP] beginning term integrity verification & initialization of Train IDs: ")
    for (var i = 0; i < arrayOfGroups.length; i++){
        var internalArray = arrayOfGroups[i];
        for (var j = 0; j<internalArray.length; j++){
            console.log("[SETUP] Term: "+internalArray[j])
            internalArray[j].trainId = 1
        }
    }
    //console.log(sheet.getNthTerm(0).term)
    

    //setting up game...
    document.addEventListener("keydown", function(e){
        if (e.code === "Enter"){
            TEMP_ENTERPRESSES++;
            console.log("%c Enter Pressed, enterpress number "+TEMP_ENTERPRESSES, 'background: #222; color: #bada55');
            handleKeyPress();
        }
    });
    descForError = "Setting up game"
    if (swap == true){
        sheet.swapTD();
    }
    subLocation = 0;
    t = 0;
    groupPosition = 1;
    review_t = 0;
    totalNeededToFinish = (sheet.length*5)+(reviewIDX.length*(arrayOfGroups.length-1))
    totalCorrect = 0;
    ttlForGp = arrayOfGroups[0].length*5;
    crForGp = 0;
    logic()
}


function logic(){
    descForError = "In logic."
    clearScreen()
    console.warn("[LOGIC] Train Segement Seperation")
    currentGroup = arrayOfGroups[subLocation]
    currentTerm = currentGroup[t]
    //train id ranges from 1 - 5
    var whatMode = currentTerm.trainId;
    setKeybinds("clear")
    console.log("[LOGIC] Current group is: "+currentGroup)
    if (subLocation > 0){
        for (var i = 0; i< reviewIDX.length; i++){
            if (groupPosition==reviewIDX[i]){
                whatMode = -1;
            }
        }
    }
    setKeybinds("clear")
    if (whatMode == -1){
        setKeybinds("write")
        descForError = "While reviewing."
        console.log("entering review"); // YOU ARE THE PROBLEM
        var toReview = arrayOfGroups[(subLocation-1)][review_t]; // REVIEW t GOT TOO HIGH
        if (toReview >= arrayOfGroups[(subLocation-1)].length-1){
            console.log("huh that went too high");
        } else {
            review_t++;
        }
        write(toReview, true)
        
        
    }
    else if (whatMode == 1){
        setKeybinds("learn")
        descForError = "Learn"
        console.log("entering learn")
        learn(currentTerm)
        
    } else if (whatMode == 2){
        setKeybinds("multi")
        descForError = "multi"
        console.log("entering multi")
        var copy = currentGroup;
        if (currentGroup.length <=3){
            copy = sheet.returnRawData();
        }
        multipleChoice(currentTerm, copy)
        
    } else if (whatMode == 3){
        setKeybinds("multi")
        descForError = "multi"
        console.log("entering multi")
        var copy = currentGroup;
        if (currentGroup.length <=3){
            copy = sheet.returnRawData();
        }
        multipleChoice(currentTerm, copy)
        
    } else if (whatMode == 4){
        setKeybinds("write")
        descForError = "write"
        console.log("entering write")
        write(currentTerm)
        
    } else if (whatMode == 5){
        setKeybinds("write")
        descForError = "write"
        console.log("entering write")
        write(currentTerm)
        
    } else if (whatMode >5){
        postModeChecks()
    }
    
}

var keybindMode;
function setKeybinds(mode){

    // instead of doing it like this where i change the actual event listener
    // just set the event listener to a function that determines its action based on what is happening rn
    // would require a global var to say the current mode, actually no i could just use t
    // determineAction() where [t] is checked to determine what function is called on enter press, and still only have one eventlistner
    // start by still trying to have 2 (one on doc and one in inpt) inpt can just stay on write and when t==write, doc can just lead to nothing


    if (mode=="write"){
        keybindMode = "w";
    } else if (mode=="learn"){
        keybindMode = "l";
    } else if (mode=="clickthruM"){
        keybindMode = "pM";
    } else if (mode=="multi"){
        keybindMode = "m";
    } else if (mode=="clear"){
        keybindMode = null;
    } else if (mode=="clickthruW"){
        keybindMode ="pW";
    }
}


function handleKeyPress(){
    console.log("Handling key press... keybind set to "+keybindMode)
    if(keybindMode == "w"){
        checkWrite();
    } else if (keybindMode == "l") {
        completeLearn();
    } else if (keybindMode == "pM") {
        continueMulti();
    } else if (keybindMode == "m") {
        console.log("On multi, eating press")
    } else if (keybindMode == "pW"){
        continueWrite();
    }
}



function postModeChecks(){
    descForError = "Doing postmode checks"
    var toMove = (totalCorrect/totalNeededToFinish)*100;
    if (toMove > 100){
        toMove = 100;
    }
    moveBar(toMove, document.getElementById("progBar"));
    var toMoveGp = (crForGp/ttlForGp)*100;
    if (toMoveGp > 100){
        toMoveGp = 100;
    }
    moveBar(toMoveGp, document.getElementById("groupBar"))
    console.log("[POSTMODE] Post Mode Checking...")
    console.log("[POSTMODE] currentGroup: "+currentGroup)
    groupPosition++;
    t++;
    if (t>(currentGroup.length-1)){
        t=0;
        console.log("inside t>")
        var moveOn = true;
        for (var i=0; i<currentGroup.length; i++){
            if (currentGroup[i].trainId <=5 ){
                moveOn = false;
                for (let z = currentGroup.length - 1; z > 0; z--) {
                    const j = Math.floor(Math.random() * (z + 1));
                    const temp = currentGroup[z];
                    currentGroup[z] = currentGroup[j];
                    currentGroup[j] = temp;
                }
            }
        }
        if (moveOn == true){
            console.warn("[POSTMODE]: Moving on from Group "+subLocation+" and will now go to "+(subLocation+1))
            subLocation++;
            if (subLocation==arrayOfGroups.length){
                //Train finished
                showElement(document.getElementById("completedTrain"))
                return
            }
            groupPosition = 0;
            review_t = 0;
            ttlForGp = (arrayOfGroups[subLocation].length*5)+reviewIDX.length
            crForGp = 0;
            moveBar(100, document.getElementById("groupBar"))
            setTimeout(function(){
                moveBar(0, document.getElementById("groupBar"))
            }, 500)
            
            
        } else {
            logic()
        }
    }
    logic()
    
    
}



function calculateReview(groupLength){
    t = (groupLength*5)+groupLength;
    var rotations;
    var extra;
    var leftover = groupLength - 5;
    if (leftover <= 0){
        console.log("we need up to group "+(5-Math.abs(leftover)));
        rotations = 0;
        extra = 5-Math.abs(leftover);
    } else if (leftover >0){
        var count = 1;
        while(leftover>=5){
            leftover-=5;
            count++;
        }
        console.log(count+" full rotations plus "+leftover+" extra");
        rotations = count;
        extra = leftover;
    }
    
    var time = [];
    for (var i = 1; i<=t; i++){
        time.push(i);
    }
    console.log("time: "+time)
    var fifth = Math.round(t/5);
    console.log("fifth: "+fifth)
    var locations = [];
    if (rotations == 0){
        for (var i = 1; i<=extra; i++){
            var currentMin = fifth*(i-1);
            var currentMax = fifth*i;
            var tmpArr = [];
            for (var j = currentMin; j<currentMax; j++){
                tmpArr.push(time[j])
            }
            var loc = Math.round(tmpArr.length/2)
            console.log("currentmin: "+currentMin+" | currentmax: "+currentMax+" | tmpArr: "+tmpArr+" | loc: "+loc+" | extra: "+extra)
            locations.push(tmpArr[loc]);
            console.log("this SHOULD repeat")
        }
    } else {


        totalReview = groupLength;
        perMode = [0, 0, 0, 0, 0]

        for (var i = 0; i<groupLength; i++){
            var count = i;
            while (count>4){
                count-=5;
            }
            perMode[count]++;
        }
        console.log("reviews per mode: "+perMode)
        for (var i = 0; i<5; i++){
            var currentMin = fifth*(i);
            var currentMax = fifth*(i+1);
            console.log("current min: "+currentMin+" | currentmax: "+currentMax)
            var tmpArr = [];
            for (var j = currentMin; j<currentMax; j++){
                tmpArr.push(time[j])
            }
            console.log("must find "+perMode[i]+" spots for this t")
            console.log("tmparr: "+tmpArr)
            var fraction = Math.round(tmpArr.length/perMode[i]);
            console.log("fraction: "+fraction)
            for (var j = 0; j<perMode[i]; j++){
                var insideMin = fraction*j;
                var insideMax = fraction*(j+1);
                console.log("inside min: "+insideMin+" | insidemax: "+insideMax)
                var miniArr = [];
                for (var x = insideMin; x<insideMax; x++){
                    miniArr.push(tmpArr[x])
                }
                var loc = Math.round(miniArr.length/2);
                locations.push(miniArr[loc]);
            }

        }
        
        
    }
    console.log("locations: "+locations);
    return locations;
}


function clearScreen(){
    document.getElementById("write").style.display = "none";
    document.getElementById("multchoice").style.display = "none";
    document.getElementById("TermAndDef").style.display = "none";
    document.getElementById("term_image").style.display = "none";
}

function advance(term){
    term.trainId++;
    plusCorrect()
}

function plusCorrect(){
    totalCorrect++;
    crForGp++;
}

function groupLoc(){
    groupPosition++;
}

function configureInterface(){
    document.getElementById("informationAbt").style.display = "none";
    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }
    update()
    showElement(document.getElementById("shelf"));
    document.getElementById("topBar").style.display = "none";

}

function stats(){
    var percent =(totalCorrect/totalNeededToFinish)*100;
    var groupPercent = (crForGp/ttlForGp)*100;
    var completed = subLocation;
    var left = arrayOfGroups.length-subLocation;
    var toAppend = `
    <div>% Done of total Studysheet: ${percent.toFixed(2)}%</div>
    <div>% Done of current group: ${groupPercent.toFixed(2)}%</div>
    <div># of groups completed: ${completed}</div>
    <div># of groups left: ${left}</div>
    `
    document.getElementById("statsHolder").innerHTML=toAppend;
    showElement(document.getElementById("stats"))
}