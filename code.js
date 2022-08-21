//This is the main JavaScript file for Lang (www.langstudy.tech)
//Written by nwvbug- https://github.com/nwvbug 
//GitHub Repo: https://github.com/nwvbug/Lang

//Global Variables (used by many functions)
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
var defaultMainColor = "#001945";
var defaultAccentColor = "#3e8e41";
var mainColorItems = []
var usedMainColor = defaultMainColor;
var usedAccentColor = defaultAccentColor;
var whichCustom = "";
var doRandom = false;
var generateIdV = 0
var generateIdA = 0
var generateIdI = 0
var generateIdYou = 0
var generateIdHe = 0
var generateIdWe = 0
var generateIdVous = 0
var generateIdThem = 0
var whatQuestion = 0
var whatPro = 1;
var testLength = 0;
var sessionid = ""
var helpsused = 0;
var whichId= "";


function doPreviewAndLocal(){
    console.log("in dopreview")
    chosensheet = window.localStorage.getItem("chosenSheet")
    toek = window.localStorage.getItem("usertoken")
    document.getElementById("studysheetname").innerHTML = chosensheet
    sheet = httpGet("https://nwvbug.pythonanywhere.com/"+toek+"/Studysheets/"+chosensheet+"/RequestPreview")
    console.log("og sheet: "+sheet)
    sheet = sheet.replaceAll("sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823", "\n")
    console.log(sheet)
    document.getElementById("previewstudysheet").innerHTML = sheet;
    window.localStorage.setItem("fullstudysheet", sheet)
    checkSettings()


}



function fakeload(){
    console.log("loading")
    window.location.href="homepage.html"
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        fakeload()
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("token");
console.log(c);
if (c != null) {
    window.localStorage.setItem("usertoken", c);
}else{

}
sessionid = c;

function changelibrary(){
    if (window.localStorage.getItem("usertoken") != null) {
        try {
            document.getElementById("sil").innerHTML = "Library";
            document.getElementById("sil").onclick = function(){
                window.location.href = "library.html"; 
            }
        } catch (error) {
            console.log(error)
        }
    }
}


function callmultiple(){
    getLibrary()
    checkSettings()
    
}

function uploadFiles(){
    if(document.getElementById("file")!=null){
        return "brh";
    }
    var uploadFile = document.createElement('input');
    uploadFile.type = 'file';
    uploadFile.id = 'file';
    uploadFile.name = 'file';
    uploadFile.accept = '.lang';
    document.getElementById("libraryholder").appendChild(uploadFile)
    var uploadButton = document.createElement('button');
    uploadButton.innerHTML = 'Upload';
    uploadButton.onclick = function() {
        console.log("clicked lol")
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            console.log("reading lol")
            var text = reader.result;
            text = text.replaceAll("\n", "sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823");

            var filename = file.name;
            var url = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/upload/"+filename;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);

            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                    window.location.reload();
                }
            };
            var data = text;
            console.log("sending " + data + " to " + url);
            xhr.send(data);

            
            // var textArea = document.createElement('textarea');
            // textArea.value = text;
            // document.body.appendChild(textArea);
        };
        reader.readAsText(file);

    }
    document.getElementById("libraryholder").appendChild(uploadButton)
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function submitNewUN(){
    sessionid = window.localStorage.getItem("usertoken")
    tmpurl = "https://anklebowl.pythonanywhere.com/setusername/"+sessionid+"/"+document.getElementById("newusername").value
    httpGet(tmpurl);
    window.location.href="library.html";
}




function getLibrary(){
    // if (c==null){
    //     document.getElementById("library").innerHTML = "Something went wrong. Check your network connection and try again.";
    //     document.getElementById("top").innerHTML = "Lang Cloudsave requires an internet connection. You can still use locally saved Studysheets while offline. ";
    //     document.getElementById("biguploadbutton").style.display = "none";



    // }
    sessionid = window.localStorage.getItem("usertoken");
    library = httpGet("https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/list")
    username = httpGet("https://nwvbug.pythonanywhere.com/"+sessionid+"/name")
    customuser = httpGet("https://anklebowl.pythonanywhere.com/usernamefromtoken/"+sessionid)
    console.log("custom user name: "+customuser)
    if(library == "[]"){
        document.getElementById("library").innerHTML = "You have no cloudsaved Lang Studysheets.";

    }
    else{
        library = library.split(",")
        if (library==""){
            document.getElementById("library").innerHTML = "You have no cloudsaved Lang Studysheets.";
        }
        for (i=0;i<library.length;i++){
            if (library[i]==""){
                continue
            }
            var librarytext = document.createElement('h1')
            librarytext.className="header";
            text =library[i]
            librarytext.innerHTML = text
            link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+librarytext.innerHTML
            
            console.log(link)
            id = "library"+generateIdA
            generateIdA++
            librarytext.id = id;
            document.getElementById("libraryholder").appendChild(librarytext)
            console.log(id)
            // document.getElementById(id).onclick = function(){
            //     kids = document.getElementById("libraryholder")
            //     var element = document.getElementById(this.id);
            //     console.log(element)
            //     link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+element.innerHTML
            //     console.log("link is: "+link)
            //     window.location.href=link
            // }

            var downbutton = document.createElement('button')
            downbutton.className="deletebutton";
            text =library[i]
            downbutton.innerHTML = "Download "+text
            link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+librarytext.innerHTML
            
            console.log(link)
            id = "library"+generateIdA
            generateIdA++
            downbutton.id = id;
            // set the studysheet attribute to the name of the studysheet
            downbutton.setAttribute("studysheet", text)
            //document.getElementById("libraryholder").appendChild(downbutton)
            console.log(id)
            // document.getElementById(id).onclick = function(){
            //     var element = document.getElementById(this.id);
            //     console.log(element)
            //     link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+ element.getAttribute("studysheet")
            //     console.log("link is: "+link)
            //     window.location.href=link;
            // }


            var usebutton = document.createElement('button')
            usebutton.className="deletebutton";
            text =library[i]
            usebutton.innerHTML = "Study "+text
            link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+librarytext.innerHTML
            
            console.log(link)
            id = "study"+generateIdA
            generateIdA++
            usebutton.id = id;
            // set the studysheet attribute to the name of the studysheet
            usebutton.setAttribute("studysheet", text)
            document.getElementById("libraryholder").appendChild(usebutton)
            console.log(id)
            document.getElementById(id).onclick = function(){
                var studysheetname = document.getElementById(this.id).getAttribute("studysheet")

                window.localStorage.setItem("chosenSheet", studysheetname)
                window.location.href="studysheetpage.html";

            }



            var libutton = document.createElement('button')
            libutton.className="deletebutton";
            text =library[i]
            libutton.innerHTML = "Delete "+text
            link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+text+"/delete"
            
            console.log(link)
            id = "library"+generateIdA
            generateIdA++
            libutton.id = id;
            // set the studysheet attribute to the name of the studysheet
            libutton.setAttribute("studysheet", text)
            document.getElementById("libraryholder").appendChild(libutton)
            console.log(id)
            document.getElementById(id).onclick = function(){
                var element = document.getElementById(this.id);
                console.log(element)
                link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+ element.getAttribute("studysheet")+"/delete"
                console.log("link is: "+link)
                httpGet(link)
                window.location.reload()
            }
            
        }

        // kids = libraryholder.children
        // for (i=0;i<kids.length;i++){
        //     text = library[i]
        //     link = "https://nwvbug.pythonanywhere.com/"+sessionid+"/Studysheets/"+text
        //     kids[i].onclick=function(){window.location.href=link}
        //     console.log(link)

        // }
    }
    var usernametest = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                <title>500 Internal Server Error</title>
                <h1>Internal Server Error</h1>
                <p>The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.</p>`
    console.log(username+"Username - username test "+usernametest)
    if (document.getElementById("library0").innerHTML == "Invalid token"){
        document.getElementById("top").innerHTML = "Uh oh. It seems like your login has expired. Please log in again.";
        document.getElementById("top2").innerHTML = "Click here to sign in to your account.";
        document.getElementById("top2").style.border = "1px solid black";
        document.getElementById("top2").style.borderRadius = "15px";

        document.getElementById("top2").onclick = function(){window.location.href="login.html"};
        document.getElementById("library0").innerHTML = "Please log in again. Error code: HAX0R"
        document.getElementById("library1").style.display="none"
        document.getElementById("library3").style.display="none"
        document.getElementById("library3").style.display="none"
        document.getElementById("biguploadbutton").style.display="none"
        document.getElementById("study2").style.display="none"
        document.getElementById("library2").style.display="none"


        
    }else{
        document.getElementById("top").innerHTML = "Here are your cloudsaved Lang Studysheets, "+customuser+". Click on the Studysheet you want to use.";
        document.getElementById("top2").innerHTML = "Not "+customuser+"? Click here to sign in to your account.";
        document.getElementById("top2").style.border = "1px solid black";
        document.getElementById("top2").style.borderRadius = "15px";
        document.getElementById("top2").onclick = function(){window.location.href="login.html"};
    }
    
    
    console.log(library);
    
}
//onload multiple functions
function execute(){
    //checks if user is on mobile
    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        if (check==true){
            alert("This Website Is NOT Optimized for Mobile. It is recommended to continue on a computer.");
        }
        
        return check;
    };
    checkSettings()
    changelibrary()
}

function getOtherAnswers(textBlock){
    let arrayText = textBlock.split('\n')
    console.log("arr text fdaf "+arrayText) 
    let random_number = Math.floor(Math.random() *arrayText.length);
    console.log(random_number)
    let random_question = arrayText[random_number];
    console.log(random_question)
    var questionArray = JSON.parse(random_question)
    console.log(questionArray)
    let random_number2 = Math.floor(Math.random() *arrayText.length);
    console.log(random_number2)
    let random_question2 = arrayText[random_number2];
    console.log(random_question2)
    var questionArray2 = JSON.parse(random_question2)
    console.log(questionArray2)
    let random_number3 = Math.floor(Math.random() *arrayText.length);
    console.log(random_number3)
    let random_question3 = arrayText[random_number3];
    console.log(random_question3)
    var questionArray3 = JSON.parse(random_question3)
    console.log(questionArray3)

    fakeout = [questionArray[1], questionArray2[1], questionArray3[1]]

    
    return fakeout
}



//used to acquire random question & answer pair (single verbs)

function getRandomQuestion(textBlock) {
    console.log("random question ran")
    let arrayText = textBlock.split('\n')
    
    console.log("arr text fdaf "+arrayText)
    if (doRandom == true){
        
        let random_number = Math.floor(Math.random() *arrayText.length);
        console.log(random_number)
        let random_question = arrayText[random_number];
        console.log(random_question)
        var questionArray = JSON.parse(random_question)
        console.log(questionArray)
        return questionArray
    }
    else{
        let random_question = arrayText[whatQuestion];
        console.log("what quest " + whatQuestion)
        console.log("array text length "+arrayText.length)
        var questionArray = JSON.parse(random_question);
        whatQuestion++;
        if (whatQuestion >= arrayText.length){
            whatQuestion=0;
            console.log("whatquestion reset")
        }
        return questionArray
    }
    
    
    // document.getElementById('file').innerText = this.result; // places text into webpage
}

function makeRandom(){
    if (document.getElementById("randomchoice").checked == true){
        console.log("random mode toggled on");
        window.localStorage.setItem("random", "true");
        
        copyright.style.color="#FFEFD1";
        document.getElementById("randomchoice").checked = true;

        

    }
    else{
        console.log("random mode toggled off");
        window.localStorage.setItem("random", "false");
        document.getElementById("randomchoice").checked = false;
       // foot.style.backgroundColor = "#3e8e41";
        
    }
}

function doMultipleChoice(){
    try {
        document.getElementById("file").style.display="none";

    } catch (error) {
        
    }
    question = getRandomQuestion(customWords);
    document.getElementById("questionheader").innerHTML = question[0];
    let random_number = Math.floor(Math.random() *4);
    if (random_number == 0){
        let element = document.getElementById("a")
        element.id = "correct"
        console.log("correct: "+element)
        element.onclick = function(){
            theid = this.id
            checkMulti(theid)
        }
        element.innerHTML = question[1];

        fakeout = getOtherAnswers(customWords)
        document.getElementById("b").innerHTML = fakeout[0]
        document.getElementById("b").onclick=function(){
            checkMulti("b")
        }
        document.getElementById("c").onclick=function(){
            checkMulti("c")
        }
        document.getElementById("d").onclick=function(){
            checkMulti("d")
        }
        document.getElementById("c").innerHTML = fakeout[1]
        document.getElementById("d").innerHTML = fakeout[2]
        whichId = "a";
    } 
    else if (random_number == 1){
        let element = document.getElementById("b")
        element.id = "correct"
        console.log("correct: "+element)
        element.onclick = function(){
            theid = this.id
            checkMulti(theid)
        }
        element.innerHTML = question[1];
        fakeout = getOtherAnswers(customWords)

        document.getElementById("a").innerHTML = fakeout[0]
        document.getElementById("c").innerHTML = fakeout[1]
        document.getElementById("d").innerHTML = fakeout[2]
        document.getElementById("a").onclick=function(){
            checkMulti("a")
        }
        document.getElementById("d").onclick=function(){
            checkMulti("d")
        }
        document.getElementById("c").onclick=function(){
            checkMulti("c")
        }
        whichId = "b";


    } 
    else if (random_number == 2){
        let element = document.getElementById("c")
        element.id = "correct"
        console.log("correct: "+element)
        element.onclick = function(){
            theid = this.id
            checkMulti(theid)
        }
        fakeout = getOtherAnswers(customWords)

        element.innerHTML = question[1];
        document.getElementById("b").innerHTML = fakeout[0]
        document.getElementById("a").innerHTML = fakeout[1]
        document.getElementById("d").innerHTML = fakeout[2]
        document.getElementById("b").onclick=function(){
            checkMulti("b")
        }
        document.getElementById("a").onclick=function(){
            checkMulti("a")
        }
        document.getElementById("d").onclick=function(){
            checkMulti("d")
        }
        whichId = "c";


    } 
    else if (random_number == 3){
        let element = document.getElementById("d")
        element.id = "correct"
        console.log("correct: "+element)
        element.onclick = function(){
            theid = this.id
            checkMulti(theid)
        }
        fakeout = getOtherAnswers(customWords)

        element.innerHTML = question[1];
        document.getElementById("b").innerHTML = fakeout[0]
        document.getElementById("b").onclick=function(){
            checkMulti("b")
        }
        document.getElementById("c").innerHTML = fakeout[1]
        document.getElementById("c").onclick=function(){
            checkMulti("c")
        }
        document.getElementById("a").innerHTML = fakeout[2]
        document.getElementById("a").onclick=function(){
            checkMulti("a")
        }
        whichId = "d";


    } 


}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function checkMulti(checkAgainst){
    console.log(checkAgainst)
    if (checkAgainst =="correct"){
        document.getElementById("correct").style.backgroundColor = "green";
        await sleep(1000);
        document.getElementById("correct").style.backgroundColor = "#001945";
        document.getElementById("correct").id = whichId;
        whichId = ""
        
    }
    else{
        document.getElementById("correct").style.backgroundColor = "green";
        document.getElementById(checkAgainst).style.backgroundColor = "red";
        await sleep(1000);
        document.getElementById("correct").style.backgroundColor = "#001945";
        document.getElementById(checkAgainst).style.backgroundColor = "#001945";

        document.getElementById("correct").id = whichId;
        whichId = ""
    }
    doMultipleChoice()
}


//used to acquire random question & answer pair (mutli verbs)

function getRandomMultiQ(textBlock){
    console.log("random multi q ran")
    let arrayCont = textBlock.split("\n");

    if(doRandom == true){
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
    else{
        if (whatPro>6){
            whatQuestion++
            whatPro = 1
        }
        let randomQ = arrayCont[whatQuestion];
        var questionArray = JSON.parse(randomQ);
        let pronoun = "";
        
        if (whatPro==1){
            pronoun = "I / Je"
        }else if(whatPro ==2){
            pronoun = "You (I. S.) / Tu"
        }else if(whatPro == 3){
            pronoun = "He-She / Il-Elle-On"
        }else if(whatPro == 4){
            pronoun = "We / Nous"
        }else if(whatPro == 5){
            pronoun = "You (F. P.) / Vous"
        }else if(whatPro == 6){
            pronoun = "They / Ils-Elles"
        }else{
            pronoun = "--// An internal error occured. Please refresh your page and try again. //--"
        }
        let toRet = [questionArray[0], questionArray[whatPro], pronoun]
        whatPro++;
        console.log(toRet)
        return toRet 

    }
    
}


function doMultiTest(){
    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }

    console.log("this is what customwords is "+customWords)
    console.log("random question ran")
    let arrayText = customWords.split("\n")
    var button = document.createElement("BUTTON")
    testLength = arrayText.length;
    for(i=0; i<=arrayText.length; i++){
        try {
            var questionText = document.createElement('h1')
            questionText.className="header";
            let random_question = arrayText[i];
            var questionArray = JSON.parse(random_question)
            questionText.innerHTML=questionArray[0];

            id = "answerInput"+generateIdA
            var verbInput = document.createElement('INPUT');
            verbInput.className="inputSeen"
            verbInput.setAttribute("type", "text");
            verbInput.setAttribute("id",id)
            generateIdA++
            verbInput.placeholder="Answer";
            document.getElementById("minicreator").appendChild(questionText);
            document.getElementById("minicreator").appendChild(verbInput);
        } catch (error) {
            break;
        }
    }
    var br = document.createElement("br")
    document.getElementById("minicreator").appendChild(br);
    var br = document.createElement("br")
    document.getElementById("minicreator").appendChild(br);
    button.className = "dropbtn"
    button.innerHTML= "Submit"
    button.onclick = function(){
        let arrayText = customWords.split("\n")
        for(i=0; i<testLength;i++){
            let random_question = arrayText[i];
            var questionArray = JSON.parse(random_question)
            let id = "answerInput"+i
            if (document.getElementById(id).value == questionArray[1]){
                document.getElementById(id).style.backgroundColor="green";
            }else{
                document.getElementById(id).style.backgroundColor="red";
            }
    
        }
        sussy = document.createElement("button")
        sussy.onclick = function(){
            if (confirm("Any data you entered may not be saved. Press 'OK' to continue or 'Cancel' to go back.") == true){
                window.location.reload();
            }
            else{
                
            }
        }
        var br = document.createElement("br")
        document.getElementById("minicreator").appendChild(br);
        var br = document.createElement("br")
        document.getElementById("minicreator").appendChild(br);
        sussy.innerHTML = "Reset"
        sussy.className="dropbtn2"
        document.getElementById("minicreator").appendChild(sussy);
    }
    
    document.getElementById("minicreator").appendChild(button);
    
    



    // console.log("arrtext= "+arrayText)
    
        
    // let random_number = Math.floor(Math.random() *arrayText.length);
    // console.log(random_number)
    // let random_question = arrayText[random_number];
    // console.log(random_question)
    // var questionArray = JSON.parse(random_question)
    // console.log(questionArray)
    // return questionArray
    
}




//code to make file picker appear in read custom and retreive data from it

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

//function called when button to begin custom verb read is called- creates inputs & calls other functions to get questions

function onBtnPress(v) {
    
    if (window.localStorage.getItem("fullstudysheet")!="" && window.localStorage.getItem("fullstudysheet")!=null){
        customWords = window.localStorage.getItem("fullstudysheet")
        window.localStorage.setItem("fullstudysheet", "");
        window.localStorage.setItem("chosenSheet", "");
        console.log( customWords )
        if(v=="f"){
            doFlashcards();
        }else if(v=='prac'){

            doPracticeTest()
        }else if(v=='speed'){
            var wage = document.getElementById("input");
            wage.addEventListener("keydown", function (e) {
                if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                    checkCustom("Speed")
                }
            });
            
            timer("Start")
            doSpeedTest()
        }
        else if (v=="multipleChoice"){
            
            
            doMultipleChoice()
        }
        else{
            var wage = document.getElementById("input");
            wage.addEventListener("keydown", function (e) {
                if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                    checkCustom()
                }
            });
            doCustomSheets(v);
        }
    }


    else{
        var uploadFile = document.createElement('input');
        uploadFile.type = 'file';
        uploadFile.id = 'file';
        uploadFile.name = 'file';
        uploadFile.accept = '.lang, .txt';
        document.body.appendChild(uploadFile);
        var uploadButton = document.createElement('button');
        uploadButton.innerHTML = 'Upload';
        uploadButton.onclick = function() {
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var text = reader.result;
            
            customWords = text;
            console.log( customWords )
            if(v=="f"){
                uploadButton.style.display="none";
                doFlashcards();
            }else if(v=='prac'){
                uploadButton.style.display="none";
    
                doPracticeTest()
            }else if(v=='speed'){
                var wage = document.getElementById("input");
                wage.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                        checkCustom("Speed")
                    }
                });
                uploadButton.style.display="none";
                timer("Start")
                doSpeedTest()
            }
            else if (v=="multipleChoice"){
                
                
                doMultipleChoice()
            }
            else{
                var wage = document.getElementById("input");
                wage.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                        checkCustom()
                    }
                });
                uploadButton.style.display="none";
                doCustomSheets(v);
            }
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

    window.localStorage.setItem("fullstudysheet", "");
    window.localStorage.setItem("chosenSheet", "");

}

//main loop and code for flashcard functionality

function doFlashcards(){
    console.log("inside doFlashcards")
    document.getElementById("stats").style.display = "none";
    document.getElementById("myBtnBegin").style.display = "none";
    document.getElementById("mainflipcard").style.display = "";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }
    buttonStyling = document.getElementById("goButton")
    buttonStyling.style.display = "flex";
    buttonStyling.innerHTML = ">" + "\n" + "Next";
    wordPair = getRandomQuestion(customWords);
    front = document.getElementById("frontcard title");
    front.innerHTML = wordPair[0];
    bTitle = document.getElementById("backcard title");
    bdeets = document.getElementById("backcard details");
    bTitle.innerHTML = wordPair[0];
    console.log("wordpair length:  "+wordPair.length)
    let newString = ""
    if (wordPair.length >2){
        for(i=0; i<7; i++){
            if (i==0){}
            else{
                newString = newString+ " "+wordPair[i]
            }
        }
        bdeets.innerHTML = newString;
        console.log(newString)
    }
    else{
        bdeets.innerHTML = wordPair[1];
    }

    
}


function toggleAudio(){
    var music = new Audio('speedmusic.mp3');
    if (document.getElementById("soundcheck").checked == true){
        
        music.play();
        music.loop =true;
        music.playbackRate = 1;
        document.getElementById("soundcheck").checked == true


    }
    else{
        music.pause();
        music.loop =false;
        music.currentTime = 0;

    }
    
}



///function to make custom sheet UI & general loop
function doSpeedTest(v){
    
    document.getElementById("crctst").innerHTML = "Correct: " + correctCounter
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter

    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }

    console.log("SELECT WORD")
    
    
        
    input = document.getElementById("input")
    input.style.display = "flex";
    buttonStyling = document.getElementById("goButton")
    buttonStyling.style.display = "flex";
    buttonStyling.innerHTML = ">" + "\n" + "Go!"
    document.getElementById("stats").style.width = "15vw"
    document.getElementById("stats").style.height = "110"
    document.getElementById("crctst").style.fontSize = "15"
    document.getElementById("incorrect").style.fontSize = "15"
    document.getElementById("timerchange").style.display = "none";

    whichCustom = v;
    
    wordPair = getRandomQuestion(customWords);
    console.log("Got random question: " + wordPair)
    document.getElementById("displayWord").innerHTML = wordPair[0];
    customAnswer = wordPair[1];
    customAnswer = customAnswer.toLowerCase();
    
    
    }

function doCustomSheets(v){
    var wage = document.getElementById("input");
    wage.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            getInput()
        }
    });
    document.getElementById("crctst").innerHTML = "Correct: " + correctCounter
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter

    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }

    console.log("SELECT WORD")
    
    
        
    input = document.getElementById("input")
    input.style.display = "flex";
    buttonStyling = document.getElementById("goButton")
    buttonStyling.style.display = "flex";
    buttonStyling.innerHTML = ">" + "\n" + "Go!"
    document.getElementById("stats").style.width = "15vw"
    document.getElementById("stats").style.height = "110"
    document.getElementById("crctst").style.fontSize = "15"
    document.getElementById("incorrect").style.fontSize = "15"
    whichCustom = v;
    if (v=="s"){
        wordPair = getRandomQuestion(customWords);
        document.getElementById("displayWord").innerHTML = wordPair[0];
        customAnswer = wordPair[1];
        customAnswer = customAnswer.toLowerCase();

    }
    else{
        wordPair = getRandomMultiQ(customWords);
        
        document.getElementById("displayWord").innerHTML = "conjugate: "+wordPair[0] + " in the "+wordPair[2] + " form.";
        customAnswer = wordPair[1];    
        customAnswer = customAnswer.toLowerCase();

    }
    }
    

function doPracticeTest(){
    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }

    console.log("this is what customwords is "+customWords)
    console.log("random question ran")
    let arrayText = customWords.split("\n")
    var button = document.createElement("BUTTON")
    testLength = arrayText.length;
    for(i=0; i<=arrayText.length; i++){
        try {
            var questionText = document.createElement('h1')
            questionText.className="header";
            let random_question = arrayText[i];
            var questionArray = JSON.parse(random_question)
            questionText.innerHTML=questionArray[0];

            id = "answerInput"+generateIdA
            var verbInput = document.createElement('INPUT');
            verbInput.className="inputSeen"
            verbInput.setAttribute("type", "text");
            verbInput.setAttribute("id",id)
            generateIdA++
            verbInput.placeholder="Answer";
            document.getElementById("minicreator").appendChild(questionText);
            document.getElementById("minicreator").appendChild(verbInput);
        } catch (error) {
            console.log(error)
            break;
        }
    }
    var br = document.createElement("br")
    document.getElementById("minicreator").appendChild(br);
    var br = document.createElement("br")
    document.getElementById("minicreator").appendChild(br);
    button.className = "dropbtn"
    button.innerHTML= "Submit"
    button.onclick = function(){
        let arrayText = customWords.split("\n")
        for(i=0; i<testLength;i++){
            let random_question = arrayText[i];
            var questionArray = JSON.parse(random_question)
            theanswer = questionArray[1].toLowerCase();
            let id = "answerInput"+i
            if (document.getElementById(id).value == theanswer){
                document.getElementById(id).style.backgroundColor="green";
            }else{
                tempinpt = document.getElementById(id).value
                document.getElementById(id).style.backgroundColor="red";
                document.getElementById(id).value = "Your Answer: "+tempinpt+" Correct Answer: "+theanswer;
            }
    
        }
        sussy = document.createElement("button")
        sussy.onclick = function(){
            if (confirm("Any data you entered may not be saved. Press 'OK' to continue or 'Cancel' to go back.") == true){
                window.location.reload();
            }
            else{
                
            }
        }
        var br = document.createElement("br")
        document.getElementById("minicreator").appendChild(br);
        var br = document.createElement("br")
        document.getElementById("minicreator").appendChild(br);
        sussy.innerHTML = "Reset"
        sussy.className="dropbtn2"
        document.getElementById("minicreator").appendChild(sussy);
    }
    
    document.getElementById("minicreator").appendChild(button);
    
    



    // console.log("arrtext= "+arrayText)
    
        
    // let random_number = Math.floor(Math.random() *arrayText.length);
    // console.log(random_number)
    // let random_question = arrayText[random_number];
    // console.log(random_question)
    // var questionArray = JSON.parse(random_question)
    // console.log(questionArray)
    // return questionArray
    
}


function checkTest(){
    

    
}





function loadQuestions(reader) {

}

//basically just window.location.href but other JS can be injected

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

//function for showing correct answers in present tense french after answering

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
    location.href = "homepage.html";
}


//function to allow press of enter to submit answer (non-functional)

function checkEnter() {
    e = e || window.event;
    if (e.keyCode == 13) {
        getInput()
    }
    return True
}



//Main loop for preloaded verbs- gets Q&A, creates Ui, etc

function selectWord(language) {

    var wage = document.getElementById("input");
    wage.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            getInput()
        }
    });
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
        document.getElementById("stats").style.width = "15vw"
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
        document.getElementById("stats").style.width = "15vw"
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
        document.getElementById("stats").style.width = "15vw"
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

//if present tense answer is incorrect


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

// if present tense answer is correct

function prCorrect() {
    console.log("2")

    buttonStyling.style.backgroundColor = "green"

    input.value = ""
    correctCounter += 1
    afterCorrect("PR")
}


//getting & checking user inputs for preloaded fields

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


//get & check user inputs for custom verbs

function checkCustom(v){
    usrInput = input.value.toLowerCase();
    if (usrInput == customAnswer){
        correctCounter += 1
        buttonStyling.style.backgroundColor = "green"
        try {
            document.getElementById("helpbutton").style.display = "none";
            document.getElementById("howmanyhelps").innerHTML = ""
        } catch (error) {
            
        }
        
        input.value = ""
        afterCorrect("amogus", "custom")
    }
    else{
        buttonStyling.style.backgroundColor = "#ce1483"
        setTimeout(function () { buttonStyling.style.backgroundColor = "grey" }, 1000)
        input.value = ""
        incorrectCounter += 1
        try {
            document.getElementById("howmanyhelps").innerHTML = "You have used "+helpsused+" helps."
            document.getElementById("helpbutton").style.display = "flex";
        } catch (error) {
            
        }
        
        document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
        timer("clear")
        if (v == "Speed"){
            doSpeedTest("Speed")
        }
    }
    
}


function helpCustom(){
    input.value = customAnswer;
    helpsused++
    document.getElementById("howmanyhelps").innerHTML = "You have used "+helpsused+" help(s)."
    
}


//what to display after user gets answer correct or incorrect (Custom and preloaded)
//also restarts loop 
function afterCorrect(passthru, snd) {
    if (snd=="custom"){
        console.log("which custom "+whichCustom)
        doCustomSheets(whichCustom)
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

//changes location to settings?? tbh im not sure what this does but the codes working and i dont wanna break it

function settings(){
    console.log("asmoguis")
    window.location.href = "settings.html";
}

var ankcheck = false;


//activates / deactivates anklebowl mode
//LocalStorage edited here

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
        copyright.style.color="#FFEFD1";
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


//curretly non functional dark mode 
//Local Storage edited here

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
        copyright.style.color="#FFEFD1";
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



//runs onload of all pages to check and apply cosmetic settings
//Local Storage read here

function checkSettings(){
    let dropbutton = document.getElementsByClassName("dropbtn");
    let ank = window.localStorage.getItem("anklebowl");
    let among = window.localStorage.getItem("among");
    console.log(ank);
    if (ank=="true"){
        document.getElementById("ankcheck").checked = true;
        feet.style.backgroundColor = "#001945";
        copyright.style.color="#FFEFD1";
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
    let randomthing = window.localStorage.getItem("random");
    if (randomthing == "true"){
        doRandom = true;
        document.getElementById("randomchoice").checked = true;

    }
    else{
        try {
            document.getElementById("randomchoice").checked = false;

        } catch (error) {
            
        }

    }
        



}

var amongUsChecker = false;



//function to activate among us mode
//local storage activated here
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
        document.body.style.backgroundColor = "#FFEFD1";
        amongUsChecker = false;
        window.localStorage.setItem("among", "false");
        document.getElementById("amongcheck").checked = false;


    }
   
}

//function to start the online custom sheet creator UI

function startCreator(version){
    
    if (version=="single"){
        console.log("start creator")
        document.getElementById("answerInput").style.display = "";
        document.getElementById("promptInput").placeholder = "Put Term / Question Here";
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






//creates new input fields for multi & single creators + assigns them ids

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
        verbInput.placeholder="Put Term / Question Here";
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

//preps the user input custom sheet for downloading by putting all into one string

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


//actually downloads the string created above (this function ONLY runs after the previous one)

function save(data) {
    namefile = window.prompt("Enter the name for the study sheet","LangCustomVerbSheet");
    filename = namefile+".lang";
    if (filename == null){

    }
    else{
        const blob = new Blob([data], {type: ''});
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



//converting quizlet study set into lang studysheet
function downloadQuizlet(check){
    if(check == true){
        let input = document.getElementById('quizletinput').value;
        newData = input.split("\n")
        console.log(newData)
        toDownload = ""
        for(var i=0;i<newData.length; i+=1){
            newSplit = newData[i].split(",");
            console.log(newSplit)
            value1 = '["'+newSplit[0]+'"';
            value2 = '"'+newSplit[1]+'"]'+"\n";
            toAdd = [value1, value2];
            console.log(toAdd);
            
            toDownload = toDownload + toAdd
        }
        console.log(toDownload);
        save(toDownload);
    }
    else{
        let input = document.getElementById('quizletinput').value;
        newData = input.split("\n")
        console.log(newData)
        toDownload = ""
        for(var i=0;i<newData.length; i+=1){
            newSplit = newData[i].split(",");
            console.log(newSplit)
            value1 = '["'+newSplit[1]+'"';
            value2 = '"'+newSplit[0]+'"]'+"\n";
            toAdd = [value1, value2];
            console.log(toAdd);
            
            toDownload = toDownload + toAdd
        }
        console.log(toDownload);
        save(toDownload);
    }
    
}

//function to reset the custom sheet creator & other places you can enter text

function reload(){
    if (confirm("Any data you entered may not be saved. Press 'OK' to continue or 'Cancel' to go back.") == true){
        window.location.reload();
    }
    else{
        
    }
    
}

var customcolor = false;

//function to display color picker UI

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

//functon to read colors in picker 
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
        obj.style.backgroundColor = "#FFEFD1";
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
    //             obj.style.color = "#FFEFD1";
    //         }else if (childx.tagName.toLowerCase()==='footer'){
    //             obj.style.backgroundColor = "#3e8e41";
    //         }
            
    //     }
    // }

}

// function to apply colors in picker

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

//function to grab every element that can be visually edited in settings

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


var time = 5;
var timer1 = null;
function timer(ck){
    try {
        var sec = time; 
        if(ck =="Start"){
            console.log("Timer created")
            timer1 = setInterval(function(){
                console.log("Timer " + timer + " ticked");
                document.getElementById('timertext').innerHTML=sec;
                sec--;
                if (sec<0){
                    clearInterval(timer);
                    document.getElementById("timertext").innerHTML = time
                    incorrectSpeed()
                    sec = time
                }
            }, 1000)
        }
        else{
            clearInterval(timer1);
            console.log("Clearing timer: " + timer)
            document.getElementById("timertext").innerHTML = time
            sec = time
            this.timer("Start");
            
            
            
        }
    } catch (error) {
        console.log("Errored out on Timer")
    }
    
    
}

function incorrectSpeed(){
    timer("clear")
    buttonStyling.style.backgroundColor = "#ce1483"
    setTimeout(function () { buttonStyling.style.backgroundColor = "grey" }, 1000)
    input.value = ""
    incorrectCounter += 1
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
    doSpeedTest("speed")    

}


function changeSpeed(){
    newSpeed = document.createElement("input");
    newSpeed.type = "number";
    newSpeed.id = "newSpeed";
    newSpeed.placeholder = "Enter new time limit in seconds";
    document.getElementById("timediv").appendChild(newSpeed);
    document.getElementById("timerchange").innerHTML = "Submit New Speed"
    document.getElementById("timerchange").onclick = function(){
        time = document.getElementById("newSpeed").value;
        document.getElementById("timediv").removeChild(newSpeed);
        document.getElementById("timerchange").innerHTML = "Change Time Limit"
        document.getElementById('timertext').innerHTML=time;
        
    }

}

        