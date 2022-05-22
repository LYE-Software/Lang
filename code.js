//colors: #001945, wheat

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
var textBlock = ""



function getRandomQuestion() {
    console.log("random question ran")
    let arrayText = textBlock.split("\n")
    let random_number = Math.floor(Math.random() * 321);
    let random_question = arrayText[random_number]; 
    var questionArray= JSON.parse(random_question)
    console.log(questionArray)
    return random_question
        // document.getElementById('file').innerText = this.result; // places text into webpage
}

function onBtnPress(){
    document.getElementById("myBtn").addEventListener("click", function() {
        var reader = new FileReader();
        
              
            
        reader.onload=function(){
            document.getElementById('output')
                    .textContent=reader.result;
        }
            
        reader.readAsText(this.files);
        


        textBlock = reader.result;
        console.log("textblock" +textBlock)
    
        // loadQuestions(reader)
    
        tryIt = document.getElementById("myBtn")
        tryIt.style.display = "none";
        fileInput = document.getElementById("fileinput")
        fileInput.style.display = "none";
        
        console.log(reader)
        console.log(getRandomQuestion())
    
      
    });
}


//look into order of execution for filereader and similar things


function loadQuestions(reader) {
    
}


function redirectToInformation(choice){
    if (choice=="htc"){
        window.location.href= "howtochoose.html";
    }
    if (choice=="sc"){
        window.location.href="singleRead.html";
    }

}

function showVerbs(language){
    if(language == "fr"){
        document.getElementById("presentverbs").innerHTML="Present Tense Verbs: "+words
        document.getElementById("pastverbs").innerHTML="Past Tense Verbs: "+words
        document.getElementById("futureverbs").innerHTML="Future Tense Verbs: "+condtWords
    }
    else if(language == "FrSV"){
        console.log("showing present conjugations")
        document.getElementById("conj1").innerHTML="Present Tense Verbs conjugated as Je: "+Je
        document.getElementById("conj2").innerHTML="Present Tense Verbs conjugated as Tu: "+Tu
        document.getElementById("conj3").innerHTML="Present Tense Verbs conjugated as Il/Elle/On: "+Il
        document.getElementById("conj4").innerHTML="Present Tense Verbs conjugated as Nous: "+Nous
        document.getElementById("conj5").innerHTML="Present Tense Verbs conjugated as Vous: "+Vous
        document.getElementById("conj6").innerHTML="Present Tense Verbs conjugated as Ils: "+Ils
    }

}


function returnMain(){
    window.open("index.html","_self")
}

function checkEnter(){
    e = e || window.event;
    if (e.keyCode == 13){
        getInput()
    }
    return True
}

function selectWord(language){
    document.getElementById("crctst").innerHTML="Correct: "+correctCounter
    document.getElementById("incorrect").innerHTML="Incorrect: "+incorrectCounter
   
    console.log("SELECT WORD")
    document.getElementById("startbtn").style.display = "none"
    if (language=="PR"){
        type = "pr"
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling=document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML=">"+"\n"+"Go!"
        document.getElementById("stats").style.width="70"
        document.getElementById("stats").style.height="110"
        document.getElementById("crctst").style.fontSize = "15"
        document.getElementById("incorrect").style.fontSize = "15"

        
        wchoice = Math.floor(Math.random() * words.length)
        pchoice = Math.floor(Math.random() * pronouns.length)

        word = words[wchoice]
        pro = pronouns[pchoice]
        document.getElementById("displayWord").innerHTML="Conjugate "+word+" in the "+pro+" form."
        let toReturn = [word, pro, wchoice]
        
        
        return toReturn
    }
    else if (language =="condt"){
        document.getElementById("stats").style.width="70"
        document.getElementById("stats").style.height="110"
        document.getElementById("crctst").style.fontSize = "15"
        document.getElementById("incorrect").style.fontSize = "15"
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling=document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML=">"+"\n"+"Go!"
        type = "condt"
        wchoice = Math.floor(Math.random() * condtWords.length)
        word = condtWords[wchoice]
        document.getElementById("displayWord").innerHTML="What is the conditional stem of "+word
    }
    else if (language =="pc"){
        document.getElementById("stats").style.width="70"
        document.getElementById("stats").style.height="110"
        document.getElementById("crctst").style.fontSize = "15"
        document.getElementById("incorrect").style.fontSize = "15"
        type = "pc"
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling=document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML=">"+"\n"+"Go!"
        wchoice = Math.floor(Math.random() * words.length)
        word = words[wchoice]
        document.getElementById("displayWord").innerHTML="Enter [avoir] or [être] and the past participle of "+word+". Assume no endings for the [être] verbs."
    }
}


function prIncorrect(){
    console.log("3")
    buttonStyling.style.backgroundColor = "red"
    setTimeout(function(){buttonStyling.style.backgroundColor="grey"}, 1000)
    input.value =""
    incorrectCounter+=1
    document.getElementById("incorrect").innerHTML="Incorrect: "+incorrectCounter
    afterCorrect("incorrect")
    showCorrect = document.getElementById("showCorrect").style.display = "flex";

}

function prCorrect(){
    console.log("2")
                
    buttonStyling.style.backgroundColor = "green"
    
    input.value =""
    correctCounter+=1
    afterCorrect("PR")
}



function getInput(){
    //showCorrect = document.getElementById("showCorrect").style.display = "none";

    usrInput = input.value;
    buttonStyling=document.getElementById("goButton")
    console.log("into getinput")

    if (usrInput == ""){
        
    }

    else if (type == "pr"){
        if (pro =="Je"){
            console.log(wchoice)
            console.log(Je[wchoice])
            if (Je[wchoice] == usrInput){
                prCorrect()
            }
            else{
                prIncorrect()
            }
    
        }
        else if (pro =="Tu"){
            console.log(wchoice)
            console.log(Tu[wchoice])
            if (Tu[wchoice] == usrInput){
                prCorrect()
            }
            else{
                prIncorrect()
            }
    
        }
        else if (pro =="Il"){
            console.log(wchoice)
            console.log(Il[wchoice])
            if (Il[wchoice] == usrInput){
                prCorrect()
            }
            else{
                prIncorrect()
            }
    
        }
        else if (pro =="Nous"){
            console.log(wchoice)
            console.log(Nous[wchoice])
            if (Nous[wchoice] == usrInput){
                prCorrect()
            }
            else{
                prIncorrect()
            }
    
        }
        else if (pro =="Vous"){
            console.log(wchoice)
            console.log(Vous[wchoice])
            if (Vous[wchoice] == usrInput){
                prCorrect()
            }
            else{
                prIncorrect()
            }
    
        }
        else if (pro =="Ils"){
            console.log(wchoice)
            console.log(Ils[wchoice])
            if (Ils[wchoice] == usrInput){
                prCorrect()
            }
            else{
                prIncorrect()
            }
    
        }
    }
    else if (type == "condt"){
        if (contdStem[wchoice] == usrInput){
            console.log("2")
            correctCounter+=1
            buttonStyling = document.getElementById("goButton")

            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            
            afterCorrect("fastpass", "condt")
        }
        else{
            console.log("3")
            buttonStyling = document.getElementById("goButton")

            buttonStyling.style.backgroundColor = "red"
            setTimeout(function(){buttonStyling.style.backgroundColor="grey"}, 1000)
            input.value =""
            incorrectCounter+=1
            document.getElementById("incorrect").innerHTML="Incorrect: "+incorrectCounter
            afterCorrect("incorrect")
        }
    }
    else if (type == "pc"){
        if (pc[wchoice] == usrInput){
            console.log("2")
            correctCounter+=1
            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            
            afterCorrect("fastpass", "pc")
        }
        else{
            console.log("3")
            buttonStyling.style.backgroundColor = "red"
            setTimeout(function(){buttonStyling.style.backgroundColor="grey"}, 1000)
            input.value =""
            incorrectCounter+=1
            document.getElementById("incorrect").innerHTML="Incorrect: "+incorrectCounter
            afterCorrect("incorrect")
        }
    }
    
}



function afterCorrect(passthru, snd){
    if (passthru=="fastpass"){
        selectWord(snd)
    }
    else if(passthru =="incorrect"){
        document.getElementById("e1").innerHTML = ""
        document.getElementById("e2").innerHTML = ""
        document.getElementById("e3").innerHTML = ""
        document.getElementById("e4").innerHTML = ""
        document.getElementById("e5").innerHTML = ""
    }
    else{
        
        document.getElementById("e1").innerHTML = "Correct!"
        document.getElementById("e2").innerHTML = "The verb was "+word +". Here is its full list of conjugations"
        document.getElementById("e3").innerHTML = "Je "+Je[wchoice]+" | Nous "+Nous[wchoice]
        document.getElementById("e4").innerHTML = "Tu "+Tu[wchoice]+" | Vous "+Vous[wchoice]
        document.getElementById("e5").innerHTML = "Il/Elle/On "+Il[wchoice]+" | Ils/Elles "+Ils[wchoice]
        selectWord(passthru)
    }
    
}