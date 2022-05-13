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


function returnMain(){
    window.open("index.html","_self")
}

function selectWord(language){
    document.getElementById("crctst").innerHTML="Correct: "+correctCounter
    document.getElementById("incorrect").innerHTML="Incorrect: "+incorrectCounter
   
    console.log("SELECT WORD")
    document.getElementById("startbtn").innerHTML=""
    if (language=="PR"){
        input = document.getElementById("input")
        input.style.display = "flex";
        buttonStyling=document.getElementById("goButton")
        buttonStyling.style.display = "flex";
        buttonStyling.innerHTML=">"+"\n"+"Go!"
        
        wchoice = Math.floor(Math.random() * words.length)
        pchoice = Math.floor(Math.random() * pronouns.length)

        word = words[wchoice]
        pro = pronouns[pchoice]
        document.getElementById("displayWord").innerHTML="Conjugate "+word+" in the "+pro+" form."
        let toReturn = [word, pro, wchoice]
        
        
        return toReturn
    }
}

//i think that the thing always turns red because of how it is called afterwards, not giving time for input. idk
function getInput(){
    
    usrInput = input.value;
    buttonStyling=document.getElementById("goButton")
    console.log("into getinput")
    if (pro =="Je"){
        console.log(wchoice)
        console.log(Je[wchoice])
        if (Je[wchoice] == usrInput){
            console.log("2")
            
            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            correctCounter+=1
            afterCorrect("PR")
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
    else if (pro =="Tu"){
        console.log(wchoice)
        console.log(Tu[wchoice])
        if (Tu[wchoice] == usrInput){
            console.log("2")
            
            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            correctCounter+=1
            afterCorrect("PR")
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
    else if (pro =="Il"){
        console.log(wchoice)
        console.log(Il[wchoice])
        if (Il[wchoice] == usrInput){
            console.log("2")
            
            buttonStyling.style.backgroundColor = "green"
            correctCounter+=1
            input.value =""
            afterCorrect("PR")
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
    else if (pro =="Nous"){
        console.log(wchoice)
        console.log(Nous[wchoice])
        if (Nous[wchoice] == usrInput){
            console.log("2")
            correctCounter+=1
            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            
            afterCorrect("PR")
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
    else if (pro =="Vous"){
        console.log(wchoice)
        console.log(Vous[wchoice])
        if (Vous[wchoice] == usrInput){
            console.log("2")
            correctCounter+=1
            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            afterCorrect("PR")
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
    else if (pro =="Ils"){
        console.log(wchoice)
        console.log(Ils[wchoice])
        if (Ils[wchoice] == usrInput){
            console.log("2")
            correctCounter+=1
            buttonStyling.style.backgroundColor = "green"
            
            input.value =""
            
            afterCorrect("PR")
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



function afterCorrect(passthru){
    if (passthru=="fastpass"){

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