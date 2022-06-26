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

//colors

var defaultMainColor = "#001945";
var defaultAccentColor = "#3e8e41";


var mainColorItems = []

var usedMainColor = defaultMainColor;
var usedAccentColor = defaultAccentColor;




// var textBlock = ""

// store a reference to our file handle










function getRandomQuestion(textBlock) {
    console.log("random question ran")
    let arrayText = textBlock.split("\n")
    console.log(arrayText)
    let random_number = Math.floor(Math.random() *arrayText.length);
    console.log(random_number)
    let random_question = arrayText[random_number];
    console.log(random_question)
    var questionArray = JSON.parse(random_question)
    console.log(questionArray)
    return questionArray
    
    // document.getElementById('file').innerText = this.result; // places text into webpage
}


function getRandomMultiQ(textBlock){
    console.log("random multi q ran")
    let arrayCont = textBlock.split("\n");
    let random_num = Math.floor(Math.random()*arrayCont.length);
    let random_qS = Math.floor(Math.random()*6);
    while (random_qS == 0){
        let random_qS = Math.floor(Math.random()*6);
    }
    let randomQ = arrayCont[random_num];
    var questionArray = JSON.parse(randomQ);
    let pronoun = "";
    
    if (random_qS==1){
        pronoun = "I / Je"
    }else if(random_qS ==2){
        pronoun = "You (I. S.) / Tu"
    }else if(random_qS == 3){
        pronoun = "He-She / Il-Elle-On"
    }else if(random_qS == 4){
        pronoun = "We / Nous"
    }else if(random_qS == 5){
        pronoun = "You (F. P.) / Vous"
    }else if(random_qS == 6){
        pronoun = "They / Ils-Elles"
    }else{
        pronoun = "--// An internal error occured. Please refresh your page and try again. //--"
    }
    let toRet = [questionArray[0], questionArray[random_qS], pronoun]
    console.log(toRet)
    return toRet 
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

function onBtnPress(v) {
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
        doCustomSheets(v);
        uploadButton.style.display="none";
        // var textArea = document.createElement('textarea');
        // textArea.value = text;
        // document.body.appendChild(textArea);
    };
    reader.readAsText(file);
    };
    document.body.appendChild(uploadButton);

    


    


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





function doCustomSheets(v){
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
    if (v=="s"){
        wordPair = getRandomQuestion(customWords);
        document.getElementById("displayWord").innerHTML = "conjugate: "+wordPair[0];
        customAnswer = wordPair[1];
    }
    else{
        wordPair = getRandomMultiQ(customWords);
        
        document.getElementById("displayWord").innerHTML = "conjugate: "+wordPair[0] + " in the "+wordPair[2] + " form.";
        customAnswer = wordPair[1];    
    }
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
    if (choice=="mc"){
        window.location.href = "multiRead.html";
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
    if (document.getElementById("ankcheck").checked == true){
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


function darkMode(){
    
    
    feet = document.getElementById("feet");
    copyright = document.getElementById("copyright");
    dropbutton = document.getElementsByClassName("dropbtn");
    if (document.getElementById("ankcheck").checked == true){
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

    let backgroundthing = window.localStorage.getItem("dobackground");
    let backgroundcolor = window.localStorage.getItem("background");
    if(backgroundthing == "true"){
        try{
            document.getElementById("customcolors").checked = true;
            var childarray = [];
            var children = document.getElementsByClassName("homepage");
            for(var i=0; i<children.length; i++){
                var childx = children[i];          
                childarray.push(childx);
            }
            for (var i=0; i<childarray.length; i++){
                var obj = childarray[i];
                obj.style.backgroundColor = backgroundcolor
            }
            customcolor = false;
        }catch(error){
            var childarray = [];
            var children = document.getElementsByClassName("homepage");
            for(var i=0; i<children.length; i++){
                var childx = children[i];          
                childarray.push(childx);
            }
            for (var i=0; i<childarray.length; i++){
                var obj = childarray[i];
                obj.style.backgroundColor = backgroundcolor
            }
            customcolor = false;
        }
        
        
    
    }

    let domainswitch = window.localStorage.getItem("domainswitch");
    let maincolor = window.localStorage.getItem("maincolor");
    let auxcolor = window.localStorage.getItem("auxcolor");
    colorItems = grabAllClasses()
    if(domainswitch == "true"){
        console.log("inside check settings: maincoloritems = " +mainColorItems)
        mainColorSwitch(colorItems, maincolor, auxcolor);
    }
        



}

var amongUsChecker = false;

function amongusmode(){
    console.log("among us mode");
    if (document.getElementById("amongcheck").checked == true){
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
        document.getElementById("warning").style.display="none";

        
    }
    else{
        // var childarray = []
        // var children = document.getElementsByClassName("header");
        // console.log(children)
        // for(var i=0; i<children.length; i++){
        //     var childx = children[i];
            
        //     childarray.push(childx);
            

        // }

        // for (var i=0; i<childarray.length; i++){
        //     console.log("childarray")
        //     childarray[i].style.display="none";
        // }


        console.log("start creator")
        //document.getElementById("jeinpt").style.display = "";
        //document.getElementById("promptInput").placeholder = "Put Infinitive Here";
        //document.getElementById("promptInput").style.display="";
        //document.getElementById("jeinpt").placeholder = "I/Je";
        document.getElementById("addnewmulti").style.display = "";
        document.getElementById("startSingle").style.display = "none";
        document.getElementById("startMulti").style.display = "none";
        document.getElementById("multidownload").style.display="";
        
        // document.getElementById("youinput").style.display = "";
        // document.getElementById("youinput").placeholder = "You/Tu";
        // document.getElementById("weinput").style.display = "";
        // document.getElementById("weinput").placeholder = "We/Nous";
        // document.getElementById("vousinput").style.display = "";
        // document.getElementById("vousinput").placeholder = "You(formal)/Vous";
        // document.getElementById("theyinput").style.display = "";
        // document.getElementById("theyinput").placeholder = "They/Ils(elles)";
        // document.getElementById("heinput").style.display = "";
        // document.getElementById("heinput").placeholder = "He/Il(Elle)";
        makeInputs("multi");
    }   
}

var generateIdV = 0
var generateIdA = 0

var generateIdI = 0
var generateIdYou = 0
var generateIdHe = 0
var generateIdWe = 0
var generateIdVous = 0
var generateIdThem = 0


function makeInputs(version){
    var inputMap = new Map();
    inputMap.set("")

    if (version=="single"){
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
    else{
        
        id1 = "verbInput"+generateIdV
        id2 = "jeinput"+generateIdI
        id3 = "youinput"+generateIdYou
        id4 = "heinput"+generateIdHe
        id5 = "weinput"+generateIdWe
        id6 = "vousinput"+generateIdVous
        id7 = "theminput"+generateIdThem

        var br = document.createElement("br")
        document.getElementById("multicreator").appendChild(br);

        var verbInput = document.createElement('INPUT');
        verbInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id1)
        generateIdV++
        verbInput.placeholder="Put Infinitive Here";
        document.getElementById("multicreator").appendChild(verbInput);
    
       

        var answerInput = document.createElement("INPUT");
        answerInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id2)
        generateIdI++
        answerInput.placeholder="I/Je";
        document.getElementById("multicreator").appendChild(answerInput);

        var answerInput = document.createElement("INPUT");
        answerInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id3)
        generateIdYou++
        answerInput.placeholder="You/Tu";
        document.getElementById("multicreator").appendChild(answerInput);
    

        var answerInput = document.createElement("INPUT");
        answerInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id4)
        generateIdHe++
        answerInput.placeholder="He(She)/Il(Elle)";
        document.getElementById("multicreator").appendChild(answerInput);
    

        var answerInput = document.createElement("INPUT");
        answerInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id5)
        generateIdWe++
        answerInput.placeholder="We/Nous";
        document.getElementById("multicreator").appendChild(answerInput);
    

        var answerInput = document.createElement("INPUT");
        answerInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id6)
        generateIdVous++
        answerInput.placeholder="Vous";
        document.getElementById("multicreator").appendChild(answerInput);
    


        var answerInput = document.createElement("INPUT");
        answerInput.setAttribute("type", "text");
        verbInput.setAttribute("id",id7)
        generateIdThem++
        answerInput.placeholder="Them/Ils(Elles)";
        document.getElementById("multicreator").appendChild(answerInput);
    
        var br = document.createElement("br")
        document.getElementById("multicreator").appendChild(br);
    }
    
}



function downloadVerbs(select){
    if(select == "s"){
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
        downloadArray = downloadArray.slice(0,-1);
        save(downloadArray);
    }

    else{
        var downloadArray = ""
        var childarray = []
        var children = multicreator.children;
        for(var i=0; i<children.length; i++){
            var childx = children[i];
            if (childx.tagName.toLowerCase() === 'input'){
                childarray.push(childx);
            }
    
        }
        console.log(childarray);
        console.log("into multi down, planes are pogg")
        for (var i=0; i<childarray.length; i+=7){
            //same thing as above but it does 7 except of 2
            var child = childarray[i];
            value1 = '["'+child.value+'"';
            var child2 = childarray[i+1];
            value2 = '"'+child2.value+'"';
            var child3 = childarray[i+2];
            value3 = '"'+child3.value+'"';
            var child4 = childarray[i+3];
            value4 = '"'+child4.value+'"';
            var child5 = childarray[i+4];
            value5 = '"'+child5.value+'"';
            var child6 = childarray[i+5];
            value6 = '"'+child6.value+'"';
            var child7 = childarray[i+6];
            value7 = '"'+child7.value+'"]'+"\n";

            toAdd = [value1, value2, value3, value4, value5, value6, value7];
            console.log(toAdd);
            downloadArray = downloadArray + toAdd;
            console.log(downloadArray);
        }
        downloadArray = downloadArray.slice(0,-1);
        save(downloadArray);

    }

    
}




function save(data) {
    namefile = window.prompt("Enter the name for the study sheet","LangCustomVerbSheet");
    filename = namefile;
    if (filename == null){

    }
    else{
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
    
}

function reload(){
    if (confirm("Any data you entered may not be saved. Press 'OK' to continue or 'Cancel' to go back.") == true){
        window.location.reload();
    }
    else{
        
    }
    
}

var customcolor = false;

function doCustomColors(){
    if (document.getElementById("customcolors").checked == true){
        document.getElementById("colorpicker").style.display = "";
        document.getElementById("colorpicker2").style.display = "";
        document.getElementById("colorpickertext").style.display = "";
        document.getElementById("colorpickertext2").style.display = "";
        document.getElementById("colorinst").style.display="";
        document.getElementById("colorpicker3").style.display = "";
        document.getElementById("colorpickertext3").style.display = "";
        customcolor=true;
        document.getElementById("confirmbutton").style.display="";
        document.getElementById("confirmbutton").innerHTML="Confirm Custom Colors";
        document.getElementById("resettonormal").style.display="";
        document.getElementById("resettonormal").innerHTML="Reset to default colors";
    }else{
        document.getElementById("colorpicker").style.display = "none";
        document.getElementById("colorpicker2").style.display = "none";
        document.getElementById("colorpickertext").style.display = "none";
        document.getElementById("colorpickertext2").style.display = "none";
        document.getElementById("colorinst").style.display="none";
        document.getElementById("colorpicker3").style.display = "none";
        document.getElementById("colorpickertext3").style.display = "none";
        customcolor=false;
        document.getElementById("confirmbutton").style.display="none";
        document.getElementById("confirmbutton").innerHTML="";
        document.getElementById("resettonormal").style.display="none";
        document.getElementById("resettonormal").innerHTML="";
        resetColors();
    }
}


function confirmColor(){
    mainColor = document.getElementById("colorpicker");
    auxColor = document.getElementById("colorpicker2");
    backColor = document.getElementById("colorpicker3");
    console.log(mainColor.value, auxColor.value, backColor.value);


    //background colors
    var childarray = [];
    var children = document.getElementsByClassName("homepage");
    for(var i=0; i<children.length; i++){
        var childx = children[i];
        
        childarray.push(childx);
        

    }
    
    for (var i=0; i<childarray.length; i++){
        var obj = childarray[i];
        obj.style.backgroundColor = backColor.value;
    }
    window.localStorage.setItem("dobackground", "true");
    window.localStorage.setItem("background", backColor.value);


    window.localStorage.setItem("domainswitch", "true");
    window.localStorage.setItem("maincolor", mainColor.value);

    window.localStorage.setItem("auxcolor", auxColor.value);

  

    
    
    mainColorItems = grabAllClasses()
    mainColorSwitch(mainColorItems, mainColor.value, auxColor.value);

    
}



function resetColors(){
    var childarray = [];
    var children = document.getElementsByClassName("homepage");
    for(var i=0; i<children.length; i++){
        var childx = children[i];
        
        childarray.push(childx);
        

    }
    
    for (var i=0; i<childarray.length; i++){
        var obj = childarray[i];
        obj.style.backgroundColor = "wheat";
    }
    window.localStorage.setItem("dobackground", "false");
    window.localStorage.setItem("domainswitch", "false");
    location.reload();

    // var items = mainColorItems 
    // console.log("items = "+items)
    // for(var z=0; z<items.length; z++){
    //     var childarray = [];
    //     var children = items[z]
    //     console.log(items[z])
    //     for(var i=0; i<children.length; i++){
    //         var childx = children[i];
            
    //         childarray.push(childx);
            
    
    //     }
        
    //     for (var i=0; i<childarray.length; i++){
    //         var obj = childarray[i];
            
    //         obj.style.color = "#001945";

    //         if (childx.tagName.toLowerCase() === 'button'){
    //             obj.style.backgroundColor = "#001945";
    //             obj.style.color = "wheat";
    //         }else if (childx.tagName.toLowerCase()==='footer'){
    //             obj.style.backgroundColor = "#3e8e41";
    //         }
            
    //     }
    // }

}


function mainColorSwitch(items, maincolor, auxcolor){
    console.log("items = "+items)
    for(var z=0; z<items.length; z++){
        var childarray = [];
        var children = items[z]
        console.log(items[z])
        for(var i=0; i<children.length; i++){
            var childx = children[i];
            
            childarray.push(childx);
            
    
        }
        
        for (var i=0; i<childarray.length; i++){
            var obj = childarray[i];
            
            obj.style.color = maincolor;

            if (childx.tagName.toLowerCase() === 'button'){
                obj.style.backgroundColor = auxcolor;
            }else if (childx.tagName.toLowerCase()==='footer'){
                obj.style.backgroundColor = maincolor;
            }
            
        }
    }
        
    
}


function grabAllClasses(){
    var dropbtnclass = document.getElementsByClassName("dropbtn"); //change hover & text color in aux color
    var smallbuttonclass = document.getElementsByClassName("smallbutton"); //change text color in aux color
    var headerclass = document.getElementsByClassName("header");
    var inputtextclass = document.getElementsByClassName("input");
    var displaywordclass = document.getElementsByClassName("displayword");
    var bigselectionclass = document.getElementsByClassName("bigselection");
    var smallselectionclass = document.getElementsByClassName("smallselection");
    var showcorrectclass = document.getElementsByClassName("showCorrect");
    var explanationclass = document.getElementsByClassName("explanation");
    var statsclass = document.getElementsByClassName("stats");
    var returnbuttonclass = document.getElementsByClassName("returnbutton");
    var footerclass=document.getElementsByClassName("foot");
    var statstextclass = document.getElementsByClassName("statsText");
    var statstextpcclass = document.getElementsByClassName("statsTextPc");
    var statstextcondtclass = document.getElementsByClassName("statsTextCondt");
    var copyrighttextclass = document.getElementsByClassName("copyrighttext");

    var toSwitch = [copyrighttextclass, statstextcondtclass, statstextpcclass, statstextclass, dropbtnclass, smallbuttonclass, headerclass, inputtextclass, displaywordclass, bigselectionclass, smallselectionclass, showcorrectclass, explanationclass, statsclass, returnbuttonclass, footerclass]
    return toSwitch;
}



        