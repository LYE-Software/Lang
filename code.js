var words = ["devoir", "venir", "prendre", "partir", "suivre", "voir", "dire", "conduire", "boire", "savoir", "recevoir", "ouvrir", "vivre", "s'asseoir", "mettre", "connaître", "écrire"]
var pronouns = ["Je", "Tu", "Il", "Nous", "Vous", "Ils"]
var Je = ["dois", "viens", "prends", "pars", "suis", "vois", "dis", "conduis", "bois", "sais", "reçois", "ouvre", "vis", "m'assois", "mets", "connais", "écris"]
var Tu = ["dois", "viens", "prends", "pars", "suis", "vois", "dis", "conduis", "bois", "sais", "reçois", "ouvres", "vis", "t'assois", "mets", "connais", "écris"]
var Il = ["doit", "vient", "prend", "part", "suit", "voit", "dit", "conduit", "boit", "sait", "reçoit", "ouvre", "vit", "s'assoit", "met", "connaît", "écrit"]
var Nous = ["devons", "venons", "prenons", "partons", "suivons", "voyons", "disons", "conduisons", "buvons", "savons", "recevons", "ouvrons", "vivons", "nous assoyons", "mettons", "connaissons", "écrivons"]
var Vous = ["devez", "venez", "prenez", "partez", "suivez", "voyez", "dites", "conduisez", "buvez", "savez", "recevez", "ouvrez", "vivez", "vous assoyez", "mettez", "connaissez", "écrivez"]
var Ils = ["doivent", "viennent", "prennent", "partent", "suivent", "voient", "disent", "conduisent", "boivent", "savent", "reçoivent", "ouvrent", "vivent", "s'assoient", "mettent", "connaissent", "écrivent"]
var pc = ["avoir dû", "être venu", "avoir pris", "être parti", "avoir suivi", "avoir vu", "avoir dit", "avoir conduit", "avoir bu", "avoir su", "avoir reçu", "avoir ouvert", "avoir vécu", "s'être assis", "avoir mis", "avoir connu", "avoir écrit"]
var condtWords = ["Aller", "s'asseoir", "avoir", "devoir", "envoyer", "être", "faire", "falloir", "pouvoir", "recevoir", "savoir", "venir", "voir", "vouloir"]
var contdStem = ["ir", "assiér", "aur", "devr", "enverr", "ser", "fer", "faudr", "pourr", "recevr", "saur", "viendr", "verr", "voudr"]
var passe = false
var correct = 0
var incorrect = 0
var lclCrct = 0
var storeWrd = ""
var word = ""
var pro = ""
var wchoice = 0
var firstRun = false
var correctCounter = 0
var incorrectCounter = 0
var type = ""
var customWords = []
var customAnswer = ""
// var textBlock = ""

// store a reference to our file handle







// function uploadFile() {
//     var file = document.getElementById("file").files[0];
//     var reader = new FileReader();
//     reader.onload = function (e) {
//         var textArea = document.getElementById("text-area");
//         textArea.value = e.target.result;
//     };
//     reader.readAsText(file);
// }

// function go() {
//     var textArea = document.getElementById("text-area");
//     var text = textArea.value;
//     var textArray = text.split("\n");
//     var textArrayLength = textArray.length;


function getRandomQuestion(textBlock) {
    console.log("random question ran")
    let arrayText = textBlock.split("\n")
    let random_number = Math.floor(Math.random() *arrayText.length);
    let random_question = arrayText[random_number];
    var questionArray = JSON.parse(random_question)
    console.log(questionArray)
    return questionArray
    
    // document.getElementById('file').innerText = this.result; // places text into webpage
}

let fileHandle;

const pickerOpts = {
    types: [
        {
            description: 'Text Files',
            accept: {
                '*': ['*']
            }
        },
    ],
   // excludeAcceptAllOption: true,
    multiple: false
};

async function getTheFile() {
    console.log("inside get the file");
    // open file picker
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    // get file contents
    const fileData = await fileHandle.getFile();

    text = fileData.text;
    console.log(text)
    

}

function onBtnPress() {
    var uploadFile = document.createElement('input');
    uploadFile.type = 'file';
    uploadFile.id = 'file';
    uploadFile.name = 'file';
    uploadFile.accept = '.txt';
    document.body.appendChild(uploadFile);
    var uploadButton = document.createElement('button');
    uploadButton.innerHTML = 'Upload';
    uploadButton.onclick = function() {
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
        
        customWords = text;
        question = getRandomQuestion(customWords);
        console.log( customWords )
        console.log(question)
        doCustomSheets()
        uploadButton.style.display="none";
        // var textArea = document.createElement('textarea');
        // textArea.value = text;
        // document.body.appendChild(textArea);
    };
    reader.readAsText(file);
    };
    document.body.appendChild(uploadButton);

    // document.getElementById("myBtn").addEventListener("click", function() {
    //     var reader = new FileReader();



    //     reader.onload=function(){
    //         document.getElementById('output')
    //                 .textContent=reader.result;
    //     }

    //     reader.readAsText(this.files);


    


    // textBlock = reader.result;
    // console.log("textblock" + textBlock)

    // loadQuestions(reader)

    // tryIt = document.getElementById("myBtn")
    // tryIt.style.display = "none";
    // fileInput = document.getElementById("fileinput")
    // fileInput.style.display = "none";

    // console.log(reader)
    // console.log(getRandomQuestion())


}





function doCustomSheets(){
    document.getElementById("crctst").innerHTML = "Correct: " + correctCounter
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter

    document.getElementById("myBtnBegin").style.display = "none";
    document.getElementById("file").style.display = "none";

    console.log("SELECT WORD")
    
    
        
    input = document.getElementById("input")
    input.style.display = "flex";
    buttonStyling = document.getElementById("goButton")
    buttonStyling.style.display = "flex";
    buttonStyling.innerHTML = ">" + "\n" + "Go!"
    document.getElementById("stats").style.width = "70"
    document.getElementById("stats").style.height = "110"
    document.getElementById("crctst").style.fontSize = "15"
    document.getElementById("incorrect").style.fontSize = "15"
    wordPair = getRandomQuestion(customWords);
    document.getElementById("displayWord").innerHTML = "conjugate: "+wordPair[0];
    customAnswer = wordPair[1];
}







//look into order of execution for filereader and similar things


function loadQuestions(reader) {

}


function redirectToInformation(choice) {
    if (choice == "htc") {
        window.location.href = "howtochoose.html";
    }
    if (choice == "sc") {
        window.location.href = "singleRead.html";
    }

}

function showVerbs(language) {
    checkSettings()
    if (language == "fr") {
        document.getElementById("presentverbs").innerHTML = "Present Tense Verbs: " + words
        document.getElementById("pastverbs").innerHTML = "Past Tense Verbs: " + words
        document.getElementById("futureverbs").innerHTML = "Future Tense Verbs: " + condtWords
    }
    else if (language == "FrSV") {
        console.log("showing present conjugations")
        document.getElementById("conj1").innerHTML = "Present Tense Verbs conjugated as Je: " + Je
        document.getElementById("conj2").innerHTML = "Present Tense Verbs conjugated as Tu: " + Tu
        document.getElementById("conj3").innerHTML = "Present Tense Verbs conjugated as Il/Elle/On: " + Il
        document.getElementById("conj4").innerHTML = "Present Tense Verbs conjugated as Nous: " + Nous
        document.getElementById("conj5").innerHTML = "Present Tense Verbs conjugated as Vous: " + Vous
        document.getElementById("conj6").innerHTML = "Present Tense Verbs conjugated as Ils: " + Ils
    }

}


function returnMain() {
    location.href = "index.html";
}

function checkEnter() {
    e = e || window.event;
    if (e.keyCode == 13) {
        getInput()
    }
    return True
}

function selectWord(language) {
    document.getElementById("crctst").innerHTML = "Correct: " + correctCounter
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter

    console.log("SELECT WORD")
    document.getElementById("startbtn").style.display = "none"
    if (language == "PR") {
        type = "pr"
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling = document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML = ">" + "\n" + "Go!"
        document.getElementById("stats").style.width = "70"
        document.getElementById("stats").style.height = "110"
        document.getElementById("crctst").style.fontSize = "15"
        document.getElementById("incorrect").style.fontSize = "15"


        wchoice = Math.floor(Math.random() * words.length)
        pchoice = Math.floor(Math.random() * pronouns.length)

        word = words[wchoice]
        pro = pronouns[pchoice]
        document.getElementById("displayWord").innerHTML = "Conjugate " + word + " in the " + pro + " form."
        let toReturn = [word, pro, wchoice]


        return toReturn
    }
    else if (language == "condt") {
        document.getElementById("stats").style.width = "70"
        document.getElementById("stats").style.height = "110"
        document.getElementById("crctst").style.fontSize = "15"
        document.getElementById("incorrect").style.fontSize = "15"
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling = document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML = ">" + "\n" + "Go!"
        type = "condt"
        wchoice = Math.floor(Math.random() * condtWords.length)
        word = condtWords[wchoice]
        document.getElementById("displayWord").innerHTML = "What is the conditional stem of " + word
    }
    else if (language == "pc") {
        document.getElementById("stats").style.width = "70"
        document.getElementById("stats").style.height = "110"
        document.getElementById("crctst").style.fontSize = "15"
        document.getElementById("incorrect").style.fontSize = "15"
        type = "pc"
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling = document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML = ">" + "\n" + "Go!"
        wchoice = Math.floor(Math.random() * words.length)
        word = words[wchoice]
        document.getElementById("displayWord").innerHTML = "Enter [avoir] or [être] and the past participle of " + word + ". Assume no endings for the [être] verbs."
    }
}


function prIncorrect() {
    console.log("3")
    buttonStyling.style.backgroundColor = "#ce1483"
    setTimeout(function () { buttonStyling.style.backgroundColor = "grey" }, 1000)
    input.value = ""
    incorrectCounter += 1
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
    afterCorrect("incorrect")
    showCorrect = document.getElementById("showCorrect").style.display = "flex";

}

function prCorrect() {
    console.log("2")

    buttonStyling.style.backgroundColor = "green"

    input.value = ""
    correctCounter += 1
    afterCorrect("PR")
}



function getInput() {
    //showCorrect = document.getElementById("showCorrect").style.display = "none";

    usrInput = input.value;
    buttonStyling = document.getElementById("goButton")
    console.log("into getinput")

    if (usrInput == "") {

    }

    else if (type == "pr") {
        if (pro == "Je") {
            console.log(wchoice)
            console.log(Je[wchoice])
            if (Je[wchoice] == usrInput) {
                prCorrect()
            }
            else {
                prIncorrect()
            }

        }
        else if (pro == "Tu") {
            console.log(wchoice)
            console.log(Tu[wchoice])
            if (Tu[wchoice] == usrInput) {
                prCorrect()
            }
            else {
                prIncorrect()
            }

        }
        else if (pro == "Il") {
            console.log(wchoice)
            console.log(Il[wchoice])
            if (Il[wchoice] == usrInput) {
                prCorrect()
            }
            else {
                prIncorrect()
            }

        }
        else if (pro == "Nous") {
            console.log(wchoice)
            console.log(Nous[wchoice])
            if (Nous[wchoice] == usrInput) {
                prCorrect()
            }
            else {
                prIncorrect()
            }

        }
        else if (pro == "Vous") {
            console.log(wchoice)
            console.log(Vous[wchoice])
            if (Vous[wchoice] == usrInput) {
                prCorrect()
            }
            else {
                prIncorrect()
            }

        }
        else if (pro == "Ils") {
            console.log(wchoice)
            console.log(Ils[wchoice])
            if (Ils[wchoice] == usrInput) {
                prCorrect()
            }
            else {
                prIncorrect()
            }

        }
    }
    else if (type == "condt") {
        if (contdStem[wchoice] == usrInput) {
            console.log("2")
            correctCounter += 1
            buttonStyling = document.getElementById("goButton")

            buttonStyling.style.backgroundColor = "green"

            input.value = ""

            afterCorrect("fastpass", "condt")
        }
        else {
            console.log("3")
            buttonStyling = document.getElementById("goButton")

            buttonStyling.style.backgroundColor = "#ce1483"
            setTimeout(function () { buttonStyling.style.backgroundColor = "grey" }, 1000)
            input.value = ""
            incorrectCounter += 1
            document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
            afterCorrect("incorrect")
        }
    }
    else if (type == "pc") {
        if (pc[wchoice] == usrInput) {
            console.log("2")
            correctCounter += 1
            buttonStyling.style.backgroundColor = "green"

            input.value = ""

            afterCorrect("fastpass", "pc")
        }
        else {
            console.log("3")
            buttonStyling.style.backgroundColor = "#ce1483"
            setTimeout(function () { buttonStyling.style.backgroundColor = "grey" }, 1000)
            input.value = ""
            incorrectCounter += 1
            document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
            afterCorrect("incorrect")
        }
    }

   

}

function checkCustom(){
    usrInput = input.value;
    if (usrInput == customAnswer){
        correctCounter += 1
        buttonStyling.style.backgroundColor = "green"

        input.value = ""
        afterCorrect("amogus", "custom")
    }
    else{
        buttonStyling.style.backgroundColor = "#ce1483"
        setTimeout(function () { buttonStyling.style.backgroundColor = "grey" }, 1000)
        input.value = ""
        incorrectCounter += 1
        document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
    }
    
}



function afterCorrect(passthru, snd) {
    if (snd=="custom"){
        doCustomSheets()
    }
    else if (passthru == "fastpass") {
        selectWord(snd)
    }
    else if (passthru == "incorrect") {
        document.getElementById("e1").innerHTML = ""
        document.getElementById("e2").innerHTML = ""
        document.getElementById("e3").innerHTML = ""
        document.getElementById("e4").innerHTML = ""
        document.getElementById("e5").innerHTML = ""
    }
    else {

        document.getElementById("e1").innerHTML = "Correct!"
        document.getElementById("e2").innerHTML = "The verb was " + word + ". Here is its full list of conjugations"
        document.getElementById("e3").innerHTML = "Je " + Je[wchoice] + " | Nous " + Nous[wchoice]
        document.getElementById("e4").innerHTML = "Tu " + Tu[wchoice] + " | Vous " + Vous[wchoice]
        document.getElementById("e5").innerHTML = "Il/Elle/On " + Il[wchoice] + " | Ils/Elles " + Ils[wchoice]
        selectWord(passthru)
    }

}

function settings(){
    console.log("asmoguis")
    window.location.href = "settings.html";
}

var ankcheck = false;



function anklebowlMode(){
    
    
    feet = document.getElementById("feet");
    copyright = document.getElementById("copyright");
    dropbutton = document.getElementsByClassName("dropbtn");
    if (ankcheck == false){
        console.log("anklebowl mode toggled on");
        feet.style.backgroundColor = "#001945";
        ankcheck = true;
        window.localStorage.setItem("anklebowl", "true");
        let test = window.localStorage.getItem("anklebowl")
        console.log(test);
        copyright.style.color="wheat";
        document.getElementById("ankcheck").checked = true;

        

    }
    else{
        console.log("anklebowl mode toggled off");
        feet.style.backgroundColor = "#3e8e41";
        ankcheck = false;
        window.localStorage.setItem("anklebowl", "false");
        copyright.style.color="#001945";
        document.getElementById("ankcheck").checked = false;
       // foot.style.backgroundColor = "#3e8e41";
        
    }
    
    
}

function checkSettings(){
    let dropbutton = document.getElementsByClassName("dropbtn");
    let ank = window.localStorage.getItem("anklebowl");
    let among = window.localStorage.getItem("among");
    console.log(ank);
    if (ank=="true"){
        document.getElementById("ankcheck").checked = true;
        feet.style.backgroundColor = "#001945";
        copyright.style.color="wheat";
        console.log("ank true")
        
    }
    else{
        console.log("ank untue")
    }

    if(among =="true"){
        document.body.style.backgroundImage = 'url("amongus.jpg")'
        document.getElementById("amongcheck").checked = true;

    }
    else{

    }



}

var amongUsChecker = false;

function amongusmode(){
    console.log("among us mode");
    if (amongUsChecker == false){
        document.body.style.backgroundImage = 'url("amongus.jpg")'
        amongUsChecker = true;
        window.localStorage.setItem("among", "true");
        document.getElementById("amongcheck").checked = true;

    }
    else{
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "wheat";
        amongUsChecker = false;
        window.localStorage.setItem("among", "false");
        document.getElementById("amongcheck").checked = false;


    }
   
}



function startCreator(version){
    
    if (version=="single"){
        console.log("start creator")
        document.getElementById("answerInput").style.display = "";
        document.getElementById("promptInput").placeholder = "Put Infinitive Here";
        document.getElementById("promptInput").style.display="";
        document.getElementById("answerInput").placeholder = "Put Answer Here";
        document.getElementById("addnew").style.display = "";
        document.getElementById("startSingle").style.display = "none";
        document.getElementById("startMulti").style.display = "none";
        document.getElementById("download").style.display="";

        
    }   
}

var generateIdV = 0
var generateIdA = 0

function makeInputs(){
    var br = document.createElement("br")
    document.getElementById("minicreator").appendChild(br);
    id1 = "verbInput"+generateIdV
    id2 = "answerInput"+generateIdA
    var verbInput = document.createElement('INPUT');
    verbInput.setAttribute("type", "text");
    verbInput.setAttribute("id",id1)
    generateIdV++
    verbInput.placeholder="Put Infinitive Here";
    document.getElementById("minicreator").appendChild(verbInput);

    var answerInput = document.createElement("INPUT");
    answerInput.setAttribute("type", "text");
    verbInput.setAttribute("id",id2)
    generateIdA++
    answerInput.placeholder="Put Answer Here";
    document.getElementById("minicreator").appendChild(answerInput);

    var br = document.createElement("br")
    document.getElementById("minicreator").appendChild(br);
}



function downloadVerbs(){
    var downloadArray = ""
    var childarray = []
    var children = minicreator.children;
    for(var i=0; i<children.length; i++){
        var childx = children[i];
        if (childx.tagName.toLowerCase() === 'input'){
            childarray.push(childx);
        }

    }
    console.log(childarray);
    for (var i=0; i<childarray.length; i+=2){
        var child = childarray[i];
        value1 = '["'+child.value+'"';
        var child2 = childarray[i+1];
        value2 = '"'+child2.value+'"]'+"\n";
        toAdd = [value1, value2];
        console.log(toAdd);
        downloadArray = downloadArray + toAdd;
        console.log(downloadArray);
    }
    save("LangCustomVerbSheet", downloadArray);
}

function save(filename, data) {
    const blob = new Blob([data], {type: 'text'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

        