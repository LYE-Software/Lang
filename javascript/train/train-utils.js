//var socket = io("")
var connected = false;
var doCloudsave = false;
// socket.on('connect', function(){
//     connected = true;
// })
function clearScreen(){
    document.getElementById("write").style.display = "none";
    document.getElementById("multchoice").style.display = "none";
    document.getElementById("TermAndDef").style.display = "none";
    document.getElementById("term_image").style.display = "none";
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log("Handling error.")
    var err =  new LangError(msg, url, lineNo, "undef", "Something unexpected happened. \nTrain encountered an error and is unable to continue functioning at the moment.", true, jsonData)
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
    if (elem.id == "shuffledSwap"){
        console.log("shuffle off");
        shuffle = false;
        elem.className = "selected";
        that.className = "deselected";
    }
    else{
        console.log("shuffl on");
        shuffle = true;
        elem.className = "selected";
        that.className = "deselected";
    }
}

function handleKeyPress(){
    console.log("Handling key press... keybind set to "+keybindMode)
    if(keybindMode == "w"){
        checkWrite();
    } else if (keybindMode == "l") {
        advanceTrain(true)
    } else if (keybindMode == "pM") {
        continueMulti();
    } else if (keybindMode == "m") {
        console.log("On multi, eating press")
    } else if (keybindMode == "pW"){
        currentlyShownPopup.close();
        currentlyShownPopup = null; 
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


function updateBars(){
    var toMove = (totalTurns/totalQuestions)*100;
    if (toMove > 100){
        toMove = 100;
    }
    moveBar(toMove, document.getElementById("progBar"));

    var toMoveGp = (turnIndex/totalTurnsInGroup)*100;
    if (toMoveGp > 100){
        toMoveGp = 100;
    }
    moveBar(toMoveGp, document.getElementById("groupBar"))
}

function updateTrainId(trainSheetId, reset=false){
    let termIdxToUpdate = initialSheet.getTrueTermIndex(trainSheetId);
    console.log("TERM IDEX TO UPDATE: "+termIdxToUpdate)
    let termToUpdate = initialSheet.getNthTerm(termIdxToUpdate[0]);
    console.log("TERM TO UPDATE:")
    console.log(termToUpdate)
    if (termIdxToUpdate[1]==-1){//single term
        if (reset){
            update_json(initialSheet, "terms."+termIdxToUpdate[0]+".trainId", 1, "set_value");
        } else {
            update_json(initialSheet, "terms."+termIdxToUpdate[0]+".trainId", termToUpdate.trainId+1, "set_value");
        }
    } else { //multi term
        if (reset){
            update_json(initialSheet, "terms."+termIdxToUpdate[0]+".trainIdArray."+termIdxToUpdate[1], 1, "set_value");
            sheet.terms[trainSheetId].trainId=1;
        } else {
            update_json(initialSheet, "terms."+termIdxToUpdate[0]+".trainIdArray."+termIdxToUpdate[1], termToUpdate.trainIdArray[termIdxToUpdate[1]]+1, "set_value");
            sheet.terms[trainSheetId].trainId++;
        }
    }
}


function lockButtons(){
    var arrOf = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")]
    for (i=0; i<arrOf.length; i++){
        arrOf[i].onclick = function(){console.log("%c enter press eaten", 'background: #222; color: #bada55');}
            
    }
    console.log("%c buttons locked, waiting", 'background: #222; color: #bada55');

} function unlockButtons(){
    var arrOf = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")]
    var arrLetters = ["a", "b", "c", "d"]
    for (i=0; i<arrOf.length; i++){
        switch(i){
            case(0):arrOf[i].onclick = function(){
                correctMultiChoice("a");
            }; break;
            case(1):arrOf[i].onclick = function(){
                correctMultiChoice("b");
            }; break;
            case(2):arrOf[i].onclick = function(){
                correctMultiChoice("c");
            }; break;
            case(3):arrOf[i].onclick = function(){
                correctMultiChoice("d");
            }; break;
        }
    }
    console.log("%c buttons unlocked, ready to go", 'background: #222; color: #bada55');
    
}

function configureInterface(){
    document.getElementById("informationAbt").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }
    showElement(document.getElementById("shelf"));
    document.getElementById("topBar").style.display = "none";
}

function clearCloudsave(){
    // update_json(initialSheet, "trainCloudsave.seed", null, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.groupIndex", 0, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.groupLength", 0, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.termIndex", 0, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.totalTurnsInGroup", 0, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.turnIndex", 0, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.totalQuestions", 0, "set_value", true);
    // update_json(initialSheet, "trainCloudsave.totalTurns", 0, "set_value", true);
    update_json(initialSheet, "trainCloudsave", null, "set_value", true)
    for (var i = 0; i < arrayOfGroups.length; i++){
        var internalArray = arrayOfGroups[i]
        for (var j = 0; j<internalArray.length; j++){
            internalArray[j] = sheet.getNthTerm(j+(i*groupLength));
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
    window.localStorage.setItem("fullstudysheet", JSON.stringify(initialSheet))
    window.location.reload();
}



function update_json(json_data, path, value, type, propagate=true, ) { //For term index in PATH, use the TRAINSHEET index not INITIALSHEET. this funct handles conversion
    console.log("Setting " + path + " to " + value + " (" + type + ")")
    var path = path.split('.');
    for (let i = 0; i < path.length; i++) {
        if (!isNaN(path[i])) {
            path[i] = parseInt(path[i]);
        }
    }
    let obj = json_data;

    if (type == "set_value") { //changed from lyelists
        for (let i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]];
        }
        obj[path[path.length - 1]] = value;
    } else if (type == "remove_key") {
        for (let i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]];
        }
        delete obj[path[path.length - 1]];
    }

    if (type == "add_to_array") {
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        obj.push(value);
    } else if (type == "remove_from_array") {
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        obj.splice(value, 1);
    }

    window.localStorage.setItem("fullstudysheet", JSON.stringify(initialSheet));

    if (propagate && doCloudsave) {
        socket.emit('trainCloudsaveUpdate', {
            type: "batched_json_update",
            updates: [
                {
                    update_type: type,
                    json_data: json_data,
                    path: path,
                    value: value,
                    nonce: 1000000
                }
            ]
        });
    } else {
        console.log("Not propogating")
    }

}

// socket.on("trainCloudsaveUpdate", function(){
//     console.log("update success")
// });



var lastRandomNumber = null;
function getUniqueRandomNumber(max){
    
        let num = Math.floor(Math.random() * max);
        if (lastRandomNumber == null){
            lastRandomNumber = num;
            return num;
        }else {
            if (num == lastRandomNumber){
                let iterationCount = 0;
                while (num == lastRandomNumber && iterationCount < 5){
                    num = Math.floor(Math.random() * max);
                }
                
            } 
            lastRandomNumber = num;
            return num;
        }

}


function stats(){
    var percent = (totalTurns/totalQuestions)*100;
    var groupPercent = (turnIndex/totalTurnsInGroup)*100;
    var completed = groupIndex;
    var left = arrayOfGroups.length-groupIndex;
    var toAppend = `
    <img src='../../assets/icons/stats.png' style='height:45px; margin-bottom:10px;'>
    <div style="color:#001945; font-size:25px; font-weight:bold;">Statistics</div>
    <div>% Done of total Studysheet: ${percent.toFixed(2)}%</div>
    <div>% Done of current group: ${groupPercent.toFixed(2)}%</div>
    <div># of groups completed: ${completed}</div>
    <div># of groups left: ${left}</div>
    `
    let popup = new PopupBuilder()
    popup.add(new PopupText(toAppend))
    popup.add(new PopupDismissButton("Close", "color: #001945;"))
    popup.show()
}

function swappingPopup(){
    var percent = (totalTurns/totalQuestions)*100;
    var groupPercent = (turnIndex/totalTurnsInGroup)*100;
    var completed = groupIndex;
    var left = arrayOfGroups.length-groupIndex;
    var toAppend = `
    <img src='../../assets/icons/langerror.png' style='height:65px; margin-bottom:10px;'>
    <div style="margin-top: 10px; color:#001945; font-size:20px;"><strong>To swap whether you answer with Term or Definition in this Studysheet, you will have to restart Train.</strong></div>
    `
    let popup = new PopupBuilder()
    popup.add(new PopupText(toAppend))
    popup.add(new PopupButton("Restart", function(){
        window.location.reload();
    }), "background-color:#ff0000;")
    popup.add(new PopupDismissButton("Cancel", "").setStyle("color:red;"))
    popup.show()
}

function resetPopup(){
    var percent = (totalTurns/totalQuestions)*100;
    var groupPercent = (turnIndex/totalTurnsInGroup)*100;
    var completed = groupIndex;
    var left = arrayOfGroups.length-groupIndex;
    var toAppend = `
    <img src='../../assets/icons/langerror.png' style='height:65px; margin-bottom:10px;'>
    <div style="margin-top: 10px; color:#001945; font-size:20px;"><strong>Are you sure you want to reset your progress in Train?</strong></div>
    <div style="margin-top: 10px; color: red;">This will reset any progress you currently have in Train on this sheet.</div>
    `
    let popup = new PopupBuilder()
    popup.add(new PopupText(toAppend))
    popup.add(new PopupButton("Reset", function(){
        clearCloudsave();
    }), "background-color:#ff0000;")
    popup.add(new PopupDismissButton("Cancel", "").setStyle("color:red;"))
    popup.show()
}
