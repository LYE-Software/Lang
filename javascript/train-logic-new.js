var sheet;
var shuffle = false;
var seed;
var groupIndex;
var termIndex;
var arrayOfGroups = [];
var currentTermInGroup;
function startTrain(){
    configureInterface()
    descForError = "Parsing sheet."
    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    jsonData = rawJson;
    initialSheet = parseFromJSON(rawJson)
    var sheet = arrayToSheet(initialSheet.convertToSingle(), window.localStorage.getItem("chosenSheet"));
    if (shuffle == true){
        seed = Date.now();
        sheet.randomizeWithSeed(seed);
    }
    groupLength = Math.floor(document.getElementById("termsperround").value);
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
            sheet.getNthTerm(j+(i*groupLength)).trainId = 1;
            placementCount++;
        }
    }

    //SETUP for game
    document.addEventListener("keydown", function(e){
        if (e.code === "Enter"){
            TEMP_ENTERPRESSES++;
            console.log("%c Enter Pressed, enterpress number "+TEMP_ENTERPRESSES, 'background: #222; color: #bada55');
            handleKeyPress();
        }
    });
    if (swap == true){
        sheet.swapTD();
    }
    groupIndex = 0;
    termIndex = 0;
    currentTermInGroup = 0;
    updateBars();
}

function logic(){
    var currentGroup = arrayOfGroups[groupIndex];
    clearScreen();
    var term = currentGroup[currentTermInGroup];

    setKeybinds("clear")

    
}

function updateBars(){
    
}

function clearScreen(){
    document.getElementById("write").style.display = "none";
    document.getElementById("multchoice").style.display = "none";
    document.getElementById("TermAndDef").style.display = "none";
    document.getElementById("term_image").style.display = "none";
}

function enableShuffle(){
    //handles button press and swaps shuffle var
}
function handleKeyPress(){
    console.log("Handling key press... keybind set to "+keybindMode)
    if(keybindMode == "w"){
        //checkWrite();
    } else if (keybindMode == "l") {
        //completeLearn();
    } else if (keybindMode == "pM") {
        //continueMulti();
    } else if (keybindMode == "m") {
        console.log("On multi, eating press")
    } else if (keybindMode == "pW"){
        //continueWrite();
    }
}