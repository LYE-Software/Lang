

var sheet;
function doPracticeTest(){
    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    document.getElementById("testName").innerHTML = window.localStorage.getItem("chosenSheet")
    sheet = parseFromJSON(rawJson)

    console.log("this is what the sheet is "+sheet)
    var singleSheet = arrayToSheet(sheet.convertToSingle(), window.localStorage.getItem("chosenSheet"));
    for (i=0; i<singleSheet.length; i++){
        console.log(singleSheet.terms[i].returnArray())
    }
    for(i=0; i<singleSheet.length; i++){
        
        makeTestInputs(i+1, singleSheet.terms[i].term, i, "response"+i, singleSheet.terms[i].answer);
    }
    
}


function makeTestInputs(num, question, answerId, responseId, correctAnswer){
    var newQuestion = `
    <div class="pageContainer horizontalFlex" style="height: auto">
    <div style="height: 100%; width: 20px;"></div>
    <div style="height: 100%; width: 20px;"> <!-- numbers go here -->
        ${num}
    </div>
    <div class="flexSpacer horizontalFlex centerFlex" style="margin-left: 8px; margin-right: 8px; height: 100%; border-left: 2px solid var(--primary-dark); padding-left: 5px; min-height: 50px;"> <!-- page contents are here -->
        ${question}
    </div>
    <div style="border-left: 2px solid var(--primary-dark); width: 10px;">&nbsp;</div>
    <input class="flexSpacer practestInput" id="${answerId}" style="background-color: wheat;" data-correct="${correctAnswer}">
    <div style="position: relative;">
        <div style="position: absolute; left: 30; top: -10; color: red; width:600px;" id = "${responseId}">
            
        </div>
    </div>
    </div>
    
    `
    document.getElementById("questionHolder").innerHTML+=newQuestion;
}

function checkTest(){
    let listToCheck = document.getElementsByClassName("practestInput")
    let counter = 0;
    for (i=0; i<listToCheck.length; i++){
        input = listToCheck[i]
        console.log("input is: "+input)
        idnum = input.id;
        responseIdTmp = "response"+idnum;
        responseText = document.getElementById(responseIdTmp)
        correctAnswer = input.getAttribute("data-correct");
        correctAnswer = correctAnswer.trim();
        correctAnswer = correctAnswer.toLowerCase(); 
        userValue = input.value.trim()
        if (userValue.toLowerCase()== correctAnswer){
            counter++;
            responseText.innerHTML = "Correct!";
            responseText.style.color = "#3e8e41";
        } else {
            responseText.innerHTML = "Incorrect. The correct answer was: "+input.getAttribute("data-correct");
            responseText.style.color = "red";

        }
    }
    document.getElementById("percentCorrect").innerHTML = counter+"/"+listToCheck.length;
    counter = counter+0;
    listLength = listToCheck.length + 0;
    console.log("percentage: "+(counter/listLength))
    if (counter/listLength >= 0.75){
        document.getElementById("percentCorrect").style.color = "green";

    } else {
        document.getElementById("percentCorrect").style.color = "red";
    }
}