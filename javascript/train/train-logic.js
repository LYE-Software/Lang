var sheet;
var seed;
var groupIndex = 0;
var termIndex = 0;
var arrayOfGroups = [];
var totalTurnsInGroup;
var turnIndex = 0;
var usingSave = false;
var reviewStack = [];
var swap;
var totalQuestions;
var totalTurns;
var shuffle = false;
let rawJson = window.localStorage.getItem("fullstudysheet")
document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
let jsonData = rawJson;
var initialSheet = parseFromJSON(rawJson)
var sheet = arrayToSheet(initialSheet.convertToSingle(), window.localStorage.getItem("chosenSheet"));
console.log("initalsheet TCS: "+JSON.stringify(initialSheet.trainCloudsave))
if (initialSheet.is_owned == false){
    doCloudsave = false;
} else {
    if (initialSheet.trainCloudsave != null){
        usingSave = true;
        console.log("Loading train cloudsave data...");
        cloudsave = initialSheet.trainCloudsave;
        console.log(cloudsave)
        if (cloudsave.seed!=null){
            sheet.randomizeWithSeed(cloudsave.seed);  
        }
        groupLength = cloudsave.groupLength;
        startTrain();
        termIndex = cloudsave.termIndex;
        turnIndex = cloudsave.turnIndex;
        totalTurns = cloudsave.totalTurns;
        updateBars();
    } 
}

//SHEET = full studysheet
//TERM = individual term. average of 5 in a GROUP
//GROUP = review group of terms
//TURN = each TURN in a GROUP. There are groupLength * 5 + lastGroupLength amount of these
function startTrain(){
    if (swap == null){
        swap = false;
    }
    configureInterface();
    if (!usingSave){
        console.log("not using cloudsave")
        if (shuffle == true){
            console.log("shuffling")
            var seed = Date.now();
            sheet.randomizeWithSeed(seed);
            console.log(sheet)
        }
        groupLength = Math.floor(document.getElementById("termsperround").value);
        initialSheet.trainCloudsave = new TrainCloudsave(seed, groupLength, groupIndex, termIndex, totalTurnsInGroup, turnIndex)
    }
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
    for (var i = 0; i < arrayOfGroups.length; i++){
        var internalArray = arrayOfGroups[i]
        for (var j = 0; j<internalArray.length; j++){
            internalArray[j] = sheet.getNthTerm(j+(i*groupLength));
            console.log("[SETUP] current term: "+sheet.getNthTerm(j+(i*groupLength)))
            if (!usingSave){
                //sheet.getNthTerm(j+(i*groupLength)).trainId = 1;
                updateTrainId(j+(i*groupLength), true);
            } else {
                if (sheet.getNthTerm(j+(i*groupLength)).trainId == null){
                    updateTrainId(j+(i*groupLength), true);                
                }
            }
        }
    }
    console.log("TEST FOR UPDATEJSON")
    console.log(initialSheet)
    

    //SETUP for game
    document.addEventListener("keydown", function(e){
        if (e.code === "Enter"){
            //TEMP_ENTERPRESSES++;
            //console.log("%c Enter Pressed, enterpress number "+TEMP_ENTERPRESSES, 'background: #222; color: #bada55');
            handleKeyPress();
        }
    });
    if (swap == true){
        sheet.swapTD();
    }
    
    
    totalTurnsInGroup = (arrayOfGroups[groupIndex].length * 5); 
    if (groupIndex != 0){
        totalTurnsInGroup += arrayOfGroups[groupIndex-1].length;
    }
    totalQuestions = 0;
    for (let i = 0; i<arrayOfGroups.length; i++){
        let temp = (arrayOfGroups[i].length * 5); 
        if (i != 0){
            temp += arrayOfGroups[i-1].length;
        }
        totalQuestions += temp;
    }
    if (!usingSave){
        totalTurns = 0;
    }
    updateBars();
    //the length of this group is ((current group's length) * 5) + (last group's length)
    //review will occur randomly throughout the set
    //review "quota" of (last group's length)
    //1 in ((current group's length) * 5) / (last group's length) that each turn is a review one
    //if there still are review quotas left, then do it (probably make a stack of terms and pop until empty)
    //else just exit and go to current group terms
    //move to next group if all term trainid == 5 and reviewStack.isEmpty
    //moving to next group should have logic that first determines if last group or not and handles differently 
    //to ensure it stops fucking erroring at the end of the set
    if (usingSave){
        groupIndex = cloudsave.groupIndex;
    }
    
    logic();
}

function logic(){
    console.log(initialSheet.trainCloudsave)
    updateBars();
    if (checkFinished()){
        if (moveToNextGroup()){
            return;
        } else {
            //not done with train, so keep going
        }
    }

    setKeybinds("clear");
    
    if (checkForReview()){ //its a review
        review();
    } else { //not a review, go back to current term
        var currGroup = arrayOfGroups[groupIndex];
        //console.log("cg "+currGroup + " |gi| "+groupIndex+" |aog| "+arrayOfGroups)
        var currentTerm = currGroup[termIndex]
        console.log("current term: next line")
        console.log(currentTerm);
        if (currentTerm.trainId <= 5){
            //console.log("RUNNING MODE WITH "+currentTerm)
            runMode(currentTerm,sheet.returnRawData());
        } else {
            if (checkFinished()){
                moveToNextGroup();
            } else {
                advanceTrain(false);
            }
            
        }
        
    }
    
}


function advanceTrain(passed){
    if (passed) {
        turnIndex++;
        totalTurns++;
        updateTrainId(sheet.getTermIndex(currentTerm))
        //console.log("UPDATING JSON")
        update_json(initialSheet, "trainCloudsave.turnIndex", turnIndex, "set_value");
        update_json(initialSheet, "trainCloudsave.totalTurns", totalTurns, "set_value");
    }    
    //console.log("term id after round completion: "+arrayOfGroups[groupIndex][termIndex].trainId)
    termIndex++;
    update_json(initialSheet, "trainCloudsave.termIndex", termIndex, "set_value");
    if (termIndex>=arrayOfGroups[groupIndex].length){
        termIndex = 0;
        for (let z = arrayOfGroups[groupIndex].length - 1; z > 0; z--) {
            const j = Math.floor(Math.random() * (z + 1));
            const temp = arrayOfGroups[groupIndex][z];
            arrayOfGroups[groupIndex][z] = arrayOfGroups[groupIndex][j];
            arrayOfGroups[groupIndex][j] = temp;
        }
    }
    clearScreen()
    logic();
}

var certianReview = false;

function checkForReview(){
    if (reviewStack.length==0){
        return false;
    }
    if (groupIndex == 0){
        return false;
    }
    if (!certianReview){
        randomChance = (arrayOfGroups[groupIndex].length*5) / arrayOfGroups[groupIndex-1]
        if (Math.floor(Math.random() * randomChance) == 1){ // should space them out pretty evenly
            return true;
        }
    } else {
        return true;
    }
    
}

function checkFinished(){
    let terms = arrayOfGroups[groupIndex];
    console.log(groupIndex)
    console.log(terms)
    for (var tnum = 0; tnum<terms.length; tnum++){
        let term = terms[tnum];
        console.log("checking finished: term "+term+" trainid is "+term.trainId)
        if (term.trainId <= 5){
            console.log("a term is not above 5")
            return false;
        }
    }
    if (reviewStack.length != 0){
        console.log("reviewstack is not empty, continuing.")
        certianReview = true;
        return false;
    }
    return true;
}

function moveToNextGroup(){
    console.log("moving to next group")
    groupIndex++;
    if (groupIndex >= arrayOfGroups.length){
        //finshed train
        showElement(document.getElementById("completedTrain"))
        return true;
    } else {
        console.log("MOVIGN SELECTED *****")
        certianReview = false;
        //gotta go go move next group yippee
        termIndex = 0;
        totalTurnsInGroup = (arrayOfGroups[groupIndex].length * 5) + arrayOfGroups[groupIndex-1].length;
        turnIndex = 0;
        updateBars();
        let prevGroup = arrayOfGroups[groupIndex-1]
        for (let i = 0; i<prevGroup.length; i++){
            reviewStack.push(prevGroup[i]);
        }
        update_json(initialSheet, "trainCloudsave.termIndex", 0, "set_value");
        update_json(initialSheet, "trainCloudsave.turnIndex", 0, "set_value");
        update_json(initialSheet, "trainCloudsave.groupIndex", groupIndex, "set_value");
        update_json(initialSheet, "trainCloudsave.totalTurnsInGroup", totalTurnsInGroup, "set_value");
        return false;
    }
}

