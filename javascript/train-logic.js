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
function overrideServer(json){
    window.localStorage.setItem("fullstudysheet", json)
}


function doTrain(){
    var wage = document.getElementById("input");
    wage.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            // console.log("ENTER PRESS: t = "+t+" customAnswer = "+customAnswer+"")
            checkWrite()
        }
    });
    configureInterface()
    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    sheet = parseFromJSON(rawJson)
    var singleSheet = arrayToSheet(sheet.convertToSingle(), window.localStorage.getItem("chosenSheet"));
    for (i=0; i<singleSheet.length; i++){
        console.log(singleSheet.terms[i].returnArray())
    }
    sheet = singleSheet;
    console.log("[SETUP] SHEET IS: "+sheet)
    loc = 0;
    groupLength = document.getElementById("termsperround").value;
    if (document.getElementById("termsperround").value == null || document.getElementById("termsperround").value <=3){
        groupLength = 5;
    } else if (document.getElementById("termsperround").value>=sheet.length) {
        groupLength = sheet.length-1;
    }
    reviewIDX = calculateReview(groupLength);

    //dividing questions into groups
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
    clearScreen()
    console.warn("[LOGIC] Train Segement Seperation")
    currentGroup = arrayOfGroups[subLocation]
    currentTerm = currentGroup[t]
    //train id ranges from 1 - 5
    var whatMode = currentTerm.trainId;
    
    console.log("[LOGIC] Current group is: "+currentGroup)
    if (subLocation > 0){
        for (var i = 0; i< reviewIDX.length; i++){
            if (groupPosition==reviewIDX[i]){
                whatMode = -1;
            }
        }
    }
    if (whatMode == -1){
        console.log("entering review");
        var toReview = arrayOfGroups[(subLocation-1)][review_t];
        write(toReview, true)
        review_t++;
    }
    else if (whatMode == 1){
        console.log("entering learn")
        learn(currentTerm)
        
    } else if (whatMode == 2){
        console.log("entering multi")
        var copy = currentGroup;
        multipleChoice(currentTerm, copy)
        
    } else if (whatMode == 3){
        console.log("entering multi")
        var copy = currentGroup;
        multipleChoice(currentTerm, copy)
        
    } else if (whatMode == 4){
        console.log("entering write")
        write(currentTerm)
        
    } else if (whatMode == 5){
        console.log("entering write")
        write(currentTerm)
        
    } else if (whatMode >5){
        postModeChecks()
    }
    
}


function postModeChecks(){
    var toMove = (totalCorrect/totalNeededToFinish)*100;
    moveBar(toMove, document.getElementById("progBar"));
    var toMoveGp = (crForGp/ttlForGp)*100;
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
            groupPosition = 0;
            review_t = 0;
            ttlForGp = (arrayOfGroups[subLocation].length*5)+reviewIDX.length
            crForGp = 0;
            moveBar(0, document.getElementById("groupBar"))
            if (subLocation==arrayOfGroups.length){
                //Train finished
                showElement(document.getElementById("completedTrain"))
            }
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