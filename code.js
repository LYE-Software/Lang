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
var offline = false;
var override = false;
var LyeServerIp = "https://lye.software";
var newarr = []
var customusername = ""
var train = false;

window.addEventListener("resize", (event) => {
    updateScaling();
})

function updateScaling() {
    if (window.innerHeight > window.innerWidth) {
        // hide elements with noverticalshow clas
        var noverticalshow = document.getElementsByClassName("noverticalshow");
        for (var i = 0; i < noverticalshow.length; i++) {
            noverticalshow[i].style.display = "none";
        }
    } else {
        var noverticalshow = document.getElementsByClassName("noverticalshow");
        for (var i = 0; i < noverticalshow.length; i++) {
            noverticalshow[i].style.display = "";
        }
    }
}

async function shareLink(){
    console.log("insharelink")
    document.getElementById("sharinglink").style.display = ""
    document.getElementById("sharinglink").style.opacity = 1;
    document.getElementById("sharinglink").style.pointerEvents = "all";
    lyeUrl = "https://lye.software/idfromsession/"+window.localStorage.getItem("usertoken")
    console.log(lyeUrl)
    tempTok = await httpGet(lyeUrl, true)
    sheetName = window.localStorage.getItem("chosenSheet").replaceAll(" ", "%20");
    url = "https://langstudy.tech/studysheetpage.html?userid="+tempTok+"&sheetName="+sheetName;
    document.getElementById("linkholder").innerHTML = url;
    console.log(url)
}

updateScaling();

async function doPreviewAndLocal(){
    console.log("in dopreview")
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    if(url.searchParams.get("userid")!= null){
        sessionid = url.searchParams.get("userid")
        chosensheet = url.searchParams.get("sheetName")
        sheet = await httpGet("https://backend.langstudy.tech/id/"+sessionid+"/Studysheets/"+chosensheet)
        document.getElementById("studysheetname").innerHTML = chosensheet
    } else{
        chosensheet = window.localStorage.getItem("chosenSheet")
        toek = window.localStorage.getItem("usertoken")
        document.getElementById("studysheetname").innerHTML = chosensheet
        sheet = await httpGet("https://backend.langstudy.tech/"+toek+"/Studysheets/"+chosensheet+"/RequestPreview")
    }
    // document.getElementById("noclickdiv").style.display = "none";
    document.getElementById("noclickdiv").style.opacity = "0";
    document.getElementById("noclickdiv").style.pointerEvents = "none";
    console.log("og sheet: "+sheet)
    sheet = sheet.replaceAll("sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823", "\n")
    console.log(sheet)
    window.localStorage.setItem("fullstudysheet", sheet)
    
    customWords = sheet
    let arrayText = customWords.split('\n')
    
    for (i = 0; i<arrayText.length; i++){
        let wordPair = getRandomQuestion(customWords);
        var br = document.createElement("div")
        br.className = "termDefContainer";
        document.getElementById("previewstudysheet").appendChild(br);
        id1 = "input"+generateIdV
        id2 = "input"+generateIdA

        var verbInput = document.createElement('div');
        verbInput.id=id1;
        verbInput.className="term"
        verbInput.style.color="#001945"
        verbInput.setAttribute("data-text", "Term");
        generateIdV++
        verbInput.innerHTML=wordPair[0];
        br.appendChild(verbInput);
    
        var answerInput = document.createElement("div");
        answerInput.id=id2;
        answerInput.setAttribute("id",id2)
        answerInput.className="definition"
        answerInput.style.color="#001945"
        answerInput.innerHTML=wordPair[1];
        answerInput.setAttribute("data-text", "Answer");
        generateIdA++
        // answerInput.innerHTML="Put Answer Here";
        br.appendChild(answerInput);
    }

}

function hideElement(element) {
    element.style.pointerEvents = "none";
    element.style.opacity = "0";
}

function showElement(element) {
    element.style.pointerEvents = "auto";
    element.style.opacity = "1";
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

// async function makeLyeReq(theUrl)
//         {
//             var xmlHttp = new XMLHttpRequest();
//             xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//             xmlHttp.setRequestHeader("lye-origin", "langstudy.tech/index.html")
//             xmlHttp.send( null );
//             return xmlHttp.responseText;
//         }

// var url_string = window.location.href; //window.location.href
// var url = new URL(url_string);
// var c = url.searchParams.get("token");
// console.log(c);
// if (c != null) {
//     window.localStorage.setItem("usertoken", c);
// }else{

// }
// sessionid = c;

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

// async function getUsername(){
//     if (window.localStorage.getItem("usertoken")!=""&&window.localStorage.getItem("usertoken")!=null){
//         sessionid = window.localStorage.getItem("usertoken");
//         username = await httpGet("https://backend.langstudy.tech/"+sessionid+"/name")
//         link = LyeServerIp+"/usernamefromsession/"+sessionid
//         customuser = await makeLyeReq(link);
//         console.log("Username = "+customuser)
//         if(username.startsWith("<!DOCTYPE HTML PUBLIC")){
//             window.localStorage.setItem("username", "Guest");
//             return "Guest";
//         } else{
//             window.localStorage.setItem("username", customuser);
//             return username;
//         }
        
//     } else{
//         return "Guest";
//     }
      
// }

function applyUsername(){
    getUsername();
    document.getElementById("homeusername").innerHTML = window.localStorage.getItem("username");
}

function callmultiple(){
    getLibrary()
    checkSettings()
    
}

function prepForUpload(show){
    if (show == "remove"){
        document.getElementById("uploadStudySheet").style.display = "none";
    } else {
        document.getElementById("uploadStudySheet").style.display = "";
        var fileInput = document.getElementById("file")
        console.log("Into prep for upload")
        fileInput.addEventListener("change", () => {
            
            console.log("into event change")
            var file = document.getElementById('file').files[0];
            var reader = new FileReader();
            console.log(reader);
            console.log(file);
            console.log(reader.result);
            reader.addEventListener("load", () => {            
                console.log("reading lol")
                var text = reader.result;
                text = text.replaceAll("\n", "sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823");

                var filename = file.name;
                uploadFiles(text, filename);
            
            })
            reader.readAsText(file);
        })
    }
    
}

function uploadFiles(text, filename){
    
    // var uploadFile = document.createElement('input');
    // uploadFile.type = 'file';
    // uploadFile.id = 'file';
    // uploadFile.name = 'file';
    // uploadFile.accept = '.lang';
    // document.getElementById("uploadholder").appendChild(uploadFile)
    // var uploadButton = document.createElement('button');
    // uploadButton.innerHTML = 'Upload';
    // uploadButton.onclick = function() {
        
    console.log("FILE NAME+ "+filename)
    var url = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/upload/"+filename;

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
        
        

    // }
    // document.getElementById("uploadholder").appendChild(uploadButton)
}
function httpGet(theUrl, lye){
    
    //this needs to be async as we cannot set timeout for sync request and sync reqs halt all js for browser
    var xmlHttp = new XMLHttpRequest();
    console.log("Opening Connection to "+theUrl)
    xmlHttp.timeout = 5000;
    
    xmlHttp.ontimeout = () => {
        console.error(`The request for ${url} timed out.`);
        alert('The request for '+theUrl+' timed out. We will be reloading this page after the dialogue box is removed.')
        window.location.reload();
        changeToOffline();
    };
    xmlHttp.onload = () => {
        if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            console.log("status200")
            console.log( xmlHttp.responseText);
        } else {
            console.error(xmlHttp.statusText);
        }
        }
    };
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request

    if (lye == true){
        console.log("setting headers")
        xmlHttp.setRequestHeader("lye-origin", "langstudy.tech/index.html");
    }

    console.log(xmlHttp.status)
    try {
        xmlHttp.send( null );
    } catch (error) {
        console.log(error)
        alert("error line 205 alt ")
        //put a splash screen error here
    }
    
    
    console.log(xmlHttp.status)
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("HTTPGET STATUS: "+xmlHttp.status)
            if(xmlHttp.status == 0){
                offline = true;
                changeToOffline()
            }
            console.log("XMLHTTP RESPONSE BEGIN")
            console.log(xmlHttp.responseText)
            console.log("XMLHTTP RESPONSE END")
          resolve(xmlHttp.responseText);
        }, 2000);
      });
}

function hideLoadingView() {
    document.getElementById("loadingscreen").style.opacity = "0";
    setTimeout(function(){
        document.getElementById("loadingscreen").style.display = "none";
    }, 250);
}

function failedSignIn() {
    // document.getElementById("failedSignIn").style.display = "flex";
    showElement(document.getElementById("failedSignIn"))
    console.log("failedsignin")
}

function setLocalUsage() {
    document.getElementById("failedSignIn").style.display = "none";
    document.getElementById("homeusername").innerHTML = "Guest";
    document.getElementById("studyloader").style.display="none";
    document.getElementById("uploadmanage").innerHTML = "Create a Lye Account"
    document.getElementById("uploadmanagebutton").addEventListener("click", function(){ 
        document.getElementById("failedSignIn").style.display = ""
    }); 
    document.getElementById('uploadmanage').removeAttribute("onclick");
    document.getElementById('uploadmanage').onclick = '';
    document.getElementById("uploadmanage").onclick = function(){ 
        document.getElementById("failedSignIn").style.display = ""
    }
}



// function submitNewUN(){
//     sessionid = window.localStorage.getItem("usertoken")
//     tmpurl = "https://anklebowl.pythonanywhere.com/setusername/"+sessionid+"/"+document.getElementById("newusername").value
//     httpGet(tmpurl);
//     window.location.href="library.html";
// }



function changeToOffline(){
    try{
        document.getElementById("yourstudysheets").innerHTML = "Your Lang client could not establish a connection to the server. Please check your connection and try again in a few minutes.";
        document.getElementById("homeusername").innerHTML = "Offline";
        document.getElementById("offlinetext").style.display = "";
        offline = true;
    } catch(error){

    }
    

}


async function getUsernameFromLye(){
    sessionid = window.localStorage.getItem("usertoken")
    tmpurl = "https://lye.software/usernamefromsession/"+sessionid;
    console.log("getting username from lye")
    customusername = await httpGet(tmpurl, true);
    console.log("customusername: "+customusername)
    if (customusername == "invalidsession"){
        document.getElementById("homeusername").innerHTML = "Guest";
    } else{
        document.getElementById("homeusername").innerHTML = customusername;

    }
    
}


async function getLibraryList(){
    customuser=window.localStorage.getItem("username");
    window.localStorage.setItem("fullstudysheet", "");
    window.localStorage.setItem("chosenSheet", "")
    window.localStorage.setItem('editSheet', "false");
    document.getElementById("homeusername").innerHTML = "Hello";
    console.log("generating library list")
    var url_string = window.location.href; //window.location.href
    console.log("url_string: "+url_string);
    var url = new URL(url_string);
    var c = url.searchParams.get("session");
    console.log("C vlaue "+c);
    if (c != null) {
        window.localStorage.setItem("usertoken", c);
    }
    sessionid = c;
    //get user's username and test if expired
    if (window.localStorage.getItem("usertoken") == null || window.localStorage.getItem("usertoken") == "") {
        console.log("new user")
        firstSignIn()
        // failedSignIn()
    } else {
        console.log("inside the else")
        sessionid = window.localStorage.getItem("usertoken")
        console.log(sessionid);
        serverData = await httpGet("https://backend.langstudy.tech/"+sessionid+"/returnNameAndList", false);
        console.log("[TOTAL SERVER DATA] "+serverData)
        var arrayOfData = serverData.split("sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823");
        username = arrayOfData[0];
        library = arrayOfData[1];
        console.log(username);
        if (serverData == "Failed"){
            failedSignIn();
        }
        else if (serverData == null){
            failedServerConnectionOnStart();
        }
        else if (serverData == ""){
            failedServerConnectionOnStart();
        }
        
        else if(username == "invalidsession"){
            failedSignIn();
        }
        else if(library == "[]"){
            console.log("1")
             // document.getElementById("yourstudysheets").innerHTML = "Start by uploading a studysheet!";
        } else if (library == ""){
            noStudySheets()
            console.log("2")
        } else if (library == null){
            failedSignIn() //commit please
            console.log("lib = null")
            console.log("3")
        }
        else{
            arrayOfData = library.split("-rowseperator-");
           
            console.log("arrayofdata: "+arrayOfData)
            for (i=0;i<arrayOfData.length;i++){
                row = arrayOfData[i]
                row = row.split("-seperator-")
                console.log("row: "+row)
                newarr.push(row[0])
                
            }
            console.log("newarr: "+newarr)
            if (newarr==""){
                console.log("4")
                // document.getElementById("yourstudysheets").innerHTML = "Start by uploading a studysheet!";
                noStudySheets()
            } else if (newarr == "invalidsession"){
                console.log("5")
                failedSignIn();
            } 
            else{
                document.getElementById("homeusername").innerHTML = "Hello, "+username;
                hideLoadingView();
                
                for (i=0;i<newarr.length;i++){
                    console.log("inside for")          
                    // var sheet = `
                    // <div style="display: flex; align-items: center; background-color: var(--primary-dark);">
                    //     <div class="studysheetName">${name}</div>
                    // </div>
                    // <div style="display: flex; align-items: center; justify-content: center; background-color: var(--primary-dark);" data-studysheet="${name}" onclick="viewStudysheet()">
                    //      <svg class="studysheetEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.728 488.728" xmlns:v="https://vecta.io/nano"><path d="M487.147 462.52l-36.4-167.6c0-4.2-2.1-7.3-5.2-10.4l-261.3-261.3c-20-22.9-74.3-38.1-112.4 0l-47.9 47.9c-31 31-31 81.4 0 112.4l261.3 261.3c2.1 2.1 5.2 4.2 9.4 5.2l168.6 38.5c10.1 1.5 29.1-4.9 23.9-26zm-434.1-308.1c-15.6-15.6-15.6-39.6 0-55.2l47.9-47.9c15.2-15.2 40-15.2 55.2 0l238.4 238.4h-27.1c-11.4 0-20.8 9.4-20.8 20.8v34.3h-34.3c-11.4 0-20.8 9.4-20.8 20.8v26.1l-238.5-237.3zm280 261.3v-29.2h34.3c18 1.7 20.8-16.5 20.8-20.8v-34.4h29.2l24 109.3-108.3-24.9z"/></svg>
                    // </div>
                    // <div style="display: flex; align-items: center; justify-content: center; background-color: var(--primary-dark); data-studysheet="${name}" onclick="deleteStudysheet()">
                    //     <svg class="studysheetDelete" width="24px" height="24px" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><path d="M17 9L11 15M11.0002 9L17.0002 15M9 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H9L3 12L9 6Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    // </div>
                    // `
                    div1 = document.createElement("div");
                    div1.style.display = "flex";
                    div1.style.alignItems = "center";
                    div1.style.backgroundColor = "var(--primary-dark)";
                    div1.id = i;
                    div1.onclick = function(){
                        for (i=0;i<newarr.length;i++){
                            document.getElementById(i).classList.remove("selected");
                            document.getElementById("studysheet"+i).classList.remove("selected");
                            document.getElementById("studysheetDel"+i).classList.remove("selected");
                        }
                        document.getElementById(this.id).classList.add("selected");
                        
                        document.getElementById("studysheet"+this.id).classList.add("selected");
                        document.getElementById("studysheetDel"+this.id).classList.add("selected");
                        tmp = arrayOfData[this.id]
                        tmp = tmp.split("-seperator-")
                        document.getElementById("termCount").innerHTML = tmp[3];
                        document.getElementById("lastModified").innerHTML = tmp[2];
                        document.getElementById("created").innerHTML = tmp[1];
                        document.getElementById("createdBy").innerHTML = username;

                    }
                    div2 = document.createElement("div");
                    div2.className = "studysheetName";
                    div2.style.color = "var(--primary-light)"
                    div2.innerHTML = newarr[i];
                    div1.append(div2);

                    document.getElementById("studysheetGridContainer").append(div1);

                    div3 = document.createElement("div");
                    div3.style.justifyContent = "center";
                    div3.style.display = "flex";
                    div3.style.alignItems = "center";
                    div3.style.backgroundColor = "var(--primary-dark)";
                    div3.innerHTML=`<svg style="fill: var(--primary-light)" class="studysheetEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.728 488.728" xmlns:v="https://vecta.io/nano"><path d="M487.147 462.52l-36.4-167.6c0-4.2-2.1-7.3-5.2-10.4l-261.3-261.3c-20-22.9-74.3-38.1-112.4 0l-47.9 47.9c-31 31-31 81.4 0 112.4l261.3 261.3c2.1 2.1 5.2 4.2 9.4 5.2l168.6 38.5c10.1 1.5 29.1-4.9 23.9-26zm-434.1-308.1c-15.6-15.6-15.6-39.6 0-55.2l47.9-47.9c15.2-15.2 40-15.2 55.2 0l238.4 238.4h-27.1c-11.4 0-20.8 9.4-20.8 20.8v34.3h-34.3c-11.4 0-20.8 9.4-20.8 20.8v26.1l-238.5-237.3zm280 261.3v-29.2h34.3c18 1.7 20.8-16.5 20.8-20.8v-34.4h29.2l24 109.3-108.3-24.9z"/></svg>`
                    div3.style.stroke = "var(--primary-light)";
                    div3.setAttribute("studysheet", newarr[i]);
                    div3.id = "studysheet"+i;
                    div3.onclick = function(){
                        var studysheetname = document.getElementById(this.id).getAttribute("studysheet")       
                        window.localStorage.setItem("chosenSheet", studysheetname)
                        window.location.href="studysheetpage.html";
                    }
                    document.getElementById("studysheetGridContainer").append(div3);


                    div5 = document.createElement("div");
                    div5.style.display = "flex";
                    div5.style.alignItems = "center";
                    div5.style.justifyContent = "center";
                    div5.style.backgroundColor = "var(--primary-dark)";
                    div5.setAttribute("studysheet", newarr[i]);
                    div5.id = "studysheetDel"+i;
                    div5.onclick = async function(){
                        document.getElementById("loadingscreen").style.opacity = "1";
                        document.getElementById("loadingscreen").classList = "verticalFlex";
                        document.getElementById("loadingscreen").style.display = "flex"
                        var studysheetname = document.getElementById(this.id).getAttribute("studysheet")
                        link = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/"+ studysheetname+"/delete"
                        console.log("link is: "+link)
                        await httpGet(link)
                        window.location.reload()
                    }
                    div5.innerHTML=`<svg class="studysheetDelete" width="24px" height="24px" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><path d="M17 9L11 15M11.0002 9L17.0002 15M9 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H9L3 12L9 6Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                    document.getElementById("studysheetGridContainer").append(div5);
                }
                tmp = arrayOfData[0]
                tmp = tmp.split("-seperator-")
                document.getElementById("termCount").innerHTML = tmp[3];
                document.getElementById("lastModified").innerHTML = tmp[2];
                document.getElementById("created").innerHTML = tmp[1];
                document.getElementById("createdBy").innerHTML = username;
                document.getElementById("0").classList.add("selected");
                document.getElementById("studysheet0").classList.add("selected");
                document.getElementById("studysheetDel0").classList.add("selected");
            }
        }
    }
}

function failedServerConnectionOnStart(){
    showElement(document.getElementById("failedServerConnection"))
    console.log("failed server connection")
}

function goToSSPage(){
    index = document.getElementsByClassName("selected")[0].id;
    console.log("index is: "+index)
    console.log("newarr[index] is: "+newarr[index])
    window.localStorage.setItem("chosenSheet", newarr[index])
    window.location.href="studysheetpage.html";
}

async function deleteSS(){
    index = document.getElementsByClassName("selected")[0].id;
    console.log("index is: "+index)
    console.log("newarr[index] is: "+newarr[index])
    document.getElementById("loadingscreen").style.opacity = "1";
    document.getElementById("loadingscreen").classList = "verticalFlex";
    document.getElementById("loadingscreen").style.display = "flex"
    link = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/"+ newarr[index]+"/delete"
    console.log("link is: "+link)
    await httpGet(link)
    window.location.reload()

}





// async function generateLibraryList(){
//     customuser=window.localStorage.getItem("username");
//     window.localStorage.setItem('editSheet', "false");
//     document.getElementById("homeusername").innerHTML = "Hello";
//     console.log("generating library list")
//     if(offline == true){
//         console.log("Lang is offline");
//         alert("We had trouble reaching our servers.")
//     }
//     else{
        
//         window.localStorage.setItem("chosenSheet", "")
//         window.localStorage.setItem("fullstudysheet", "")
    
//         sessionid = window.localStorage.getItem("usertoken");
//         try {
//             username = await httpGet("https://backend.langstudy.tech/"+sessionid+"/name")
//             console.log("Username = "+username)
//         } catch (error) {
//             document.getElementById("yourstudysheets").innerHTML = "Your Lang client could not establish a connection to the server. Please check your connection and try again in a few minutes.";
//             document.getElementById("homeusername").innerHTML = "Offline";
//             document.getElementById("offlinetext").style.display = "";
    
//         }
        
//         if (username == "Invalid token"){
//             loginbutton = document.createElement("button");
//             loginbutton.className = "newbutton"
//             loginbutton.onclick = function(){
//                 window.location.href="login.html";
//             }
//             document.getElementById("studysetholder").append(loginbutton);
//         }
//         try {
//             library = await httpGet("https://backend.langstudy.tech/"+sessionid+"/Studysheets/list")
//             link = "https://anklebowl.pythonanywhere.com/usernamefromtoken/"+sessionid
//             customuser = await httpGet(link)
//         } catch (error) {
//             console.log("error recognized")
//         }
//         if(offline == true){
//             console.log("Lang is offline");
//             // document.getElementById("studyloader").style.display = "none";
//         }
//         else{
//             console.log(link)
//             if (customuser == "Invalid token"){
//                 console.log("Failed sign in process")
//                 failedSignIn()
//                 // document.getElementById("homeusername").innerHTML = "Guest";
//                 // document.getElementById("yourstudysheets").innerHTML = "Sign In to use Lang Cloudsave";
        
//             }else{
//                 document.getElementById("homeusername").innerHTML = "Hello, "+customuser;
//                 // document.getElementById("yourstudysheets").innerHTML = "Your Studysheets";
//                 hideLoadingView();
        
        
//             }
//             console.log("custom user name: "+customuser)
//             if(library == "[]"){
//                 document.getElementById("yourstudysheets").innerHTML = "Start by uploading a studysheet!";
        
//             }
//             else{
//                 library = library.split("-seperator-")
//                 if (library==""){
//                     document.getElementById("yourstudysheets").innerHTML = "Start by uploading a studysheet!";
//                 }
//                 var listelement = `<div class='horizontalFlex studysetentry'>
//                                     <div>(name)</div>
//                                     <div class="flexSpacer"></div>
//                                     <div>(date)</div>
//                                     <div style="width: 10vw;"></div>
//                                     <div><a href="(link)">View</a></div>
//                                 </div>`
//                 for (i=0;i<library.length;i++){
//                     if (library[i]==""){
//                         continue
//                     }
//                     if (library[i]=="Invalid token"){
//                         loginbutton = document.createElement("button");
//                         loginbutton.className = "flexSpacer"
//                         loginbutton.style.backgroundColor = "wheat"
//                         loginbutton.style.width = "50vw"
//                         loginbutton.style.height = "10vh"
//                         loginbutton.style.fontFamily = "Poppins"
//                         loginbutton.style.fontSize = "2vw"
//                         document.getElementById("studysetholder").style.alignItems = "center";
//                         document.getElementById("studysetholder").style.justifyContent = "center";
//                         document.getElementById("studysetholder").style.textAlign = "center";
        
//                         loginbutton.onclick = function(){
//                             window.location.href="login.html";
//                         }
//                         loginbutton.innerHTML = "Login or Create Account"
//                         document.getElementById("studysetholder").append(loginbutton);
//                         document.getElementById("Invalid token").style.display = "none";
//                     }
//                     // var newlistelement = listelement.replace("(name)", library[i])
//                     // newlistelement = listelement.replace("(link)", )
//                     // chosensheet = window.localStorage.getItem("chosenSheet")
        
//             // toek = window.localStorage.getItem("usertoken")
//             // document.getElementById("studysheetname").innerHTML = chosensheet
//             // sheet = httpGet("https://backend.langstudy.tech/"+toek+"/Studysheets/"+chosensheet+"/RequestPreview")
                    
//                     let horizontalflexstudysetentry = document.createElement("div")
//                     horizontalflexstudysetentry.className = "horizontalFlex studysetentry"
//                     document.getElementById("studysetholder").append(horizontalflexstudysetentry);
//                     let namediv = document.createElement("div")
//                     namediv.innerHTML = library[i]
//                     horizontalflexstudysetentry.append(namediv);



//                     let spacer = document.createElement("div")
//                     spacer.className = "flexSpacer"
//                     horizontalflexstudysetentry.append(spacer);
//                     let datediv = document.createElement("div")
//                     horizontalflexstudysetentry.append(datediv);
                    

//                     let del = document.createElement("div");
//                     del.setAttribute("studysheet", library[i])
//                     del.innerHTML = "Delete"
//                     del.id=library[i]
//                     horizontalflexstudysetentry.append(del);

//                     let newspacer = document.createElement("div");
//                     newspacer.style.width="10vw";
//                     horizontalflexstudysetentry.append(newspacer);
        
//                     del.onclick=async function(){
//                         document.getElementById("loadingscreen").style.display = "";
//                         document.getElementById("loadingscreen").classList = "absolute";
//                         document.getElementById("studysetholder").style.display = "none";
//                         var studysheetname = document.getElementById(this.id).getAttribute("studysheet")
//                         link = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/"+ studysheetname+"/delete"
//                         console.log("link is: "+link)
//                         await httpGet(link)
//                         window.location.reload()
                        
//                     }

//                     let view = document.createElement("div");
//                     view.setAttribute("studysheet", library[i])
//                     view.innerHTML = "View"
//                     view.id=library[i]
//                     horizontalflexstudysetentry.append(view);
        
        
//                     view.onclick=function(){
//                         var studysheetname = document.getElementById(this.id).getAttribute("studysheet")
        
//                         window.localStorage.setItem("chosenSheet", studysheetname)
//                         window.location.href="studysheetpage.html";
                        
//                     }

                    
        
        
        
        
        
        
                    
//                 }
//         }
//         }
//         }
        
    
// }

    





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
    while (random_number2==random_number){
        random_number2 = Math.floor(Math.random() *arrayText.length);
    }
    let random_question2 = arrayText[random_number2];
    console.log(random_question2)
    var questionArray2 = JSON.parse(random_question2)
    console.log(questionArray2)

    let random_number3 = Math.floor(Math.random() *arrayText.length);
    console.log(random_number3)
    while (random_number3==random_number || random_number3==random_number2){
        random_number3 = Math.floor(Math.random() *arrayText.length);
    }
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
    if (doRandom == true && override != true){
        
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
        console.log(arrayText)
        console.log("what quest " + whatQuestion)
        console.log("array text length "+arrayText.length)
        console.log(random_question);
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
    document.getElementById("multchoice").style.display="";
    document.getElementById("myBtnBegin").style.display = "none";
    question = getRandomQuestion(customWords);
    document.getElementById("questionheader").innerHTML = question[0];
    let random_number = Math.floor(Math.random() *4);
    fakeout = getOtherAnswers(customWords)
    keepchecking = true;
    recursioncheck = 0;
    while (keepchecking == true && recursioncheck <=1000){
        for (i=0; i<question.length; i++){
            if (fakeout[i] == question[1]){
                fakeout = getOtherAnswers(customWords)
                i=0;
            }
        }
        keepchecking = false;
        recursioncheck++;
    }
    recursioncheck = 0;
    checker = 0;
    while (checker < 16 && recursioncheck < 3000){
        checker = 0;
        for (i=0; i<fakeout.length; i++){
            for (j=0; j<fakeout.length; j++){
                if (fakeout[i] == fakeout[j] && i!=j){
                    fakeout = getOtherAnswers(customWords)
                    i=0;
                }
                else if (fakeout[i] != fakeout[j]) {
                    checker++;
                }
                if (fakeout[j] == question[1]){
                    fakeout = getOtherAnswers(customWords)
                    i=0;
                }
            }
        }
        recursioncheck++;
    }    
    if (random_number == 0){
        let element = document.getElementById("a")
        element.id = "correct"
        console.log("correct: "+element)
        element.onclick = function(){
            theid = this.id
            checkMulti(theid)
        }
        element.innerHTML = question[1];

        
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
        document.getElementById("correct").style.backgroundColor = "#3e8e41";
        await sleep(1000);
        document.getElementById("correct").style.backgroundColor = "wheat";
        document.getElementById("correct").id = whichId;
        whichId = ""
        try{
            console.log("Advancing T "+t+"which would be "+group[t])
            dict[t] = dict[t] + 1;
            
        } catch(error){

        }
        
    }
    else{
        document.getElementById("correct").style.backgroundColor = "#3e8e41";
        document.getElementById(checkAgainst).style.backgroundColor = "red";
        await sleep(1000);
        document.getElementById("correct").style.backgroundColor = "wheat";
        document.getElementById(checkAgainst).style.backgroundColor = "wheat";
        
        document.getElementById("correct").id = whichId;
        whichId = ""
    }
    if (train == false){
        doMultipleChoice()
    } else {
        t++;
        gameLoop()
    }
    
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
        document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
        // window.localStorage.setItem("fullstudysheet", "");
        // window.localStorage.setItem("chosenSheet", "");
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
        } else if( v=="t"){
            doTrain();
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
        uploadFile.style.width = "15vw";
        uploadFile.style.marginRight = "2vw";

        uploadFile.accept = '.lang, .txt';
        document.body.appendChild(uploadFile);
        var uploadButton = document.createElement('button');
        uploadButton.innerHTML = 'Confirm upload';
        uploadButton.className = "dropbtn";
        uploadButton.onclick = function() {
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            document.title = "Lang | Studying Local File"
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
            }else if( v=="t"){
                doTrain();
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

    // window.localStorage.setItem("fullstudysheet", "");
    // window.localStorage.setItem("chosenSheet", "");

}

function signout(){
    console.log("signout")
    if (confirm("Are you sure you want to sign out?")) {
        window.localStorage.setItem("fullstudysheet", "");
        window.localStorage.setItem("chosenSheet", "");
        window.localStorage.setItem("usertoken", null);
        window.localStorage.setItem("username", null);
        window.location.href="index.html"
      } else {
        
      }
    
}
//main loop and code for flashcard functionality

function doFlashcards(){
    
    flashcardContentsArray = []
    console.log("inside doFlashcards")   
    let arrayText = customWords.split('\n')
    console.log("arrayText "+arrayText)
    for (i = 0; i<arrayText.length; i++){
        let question = arrayText[i];
        console.log("question "+question)
        flashcardContentsArray.push(question)
        
    }
    console.log("flascardContentsArray "+flashcardContentsArray)
    createFlashcards(arrayText.length)
    
    
   
    

    
}


function sendFeedback(){
    let sessionid = window.localStorage.getItem("usertoken")
    let feedback = document.getElementById("feedbackInput").value;
    if (feedback == "" || feedback == null){
        alert("The feedback message cannot be nothing.")
    } else {
        document.getElementById("feedbackUIInputContainer").innerHTML = "Thank you for your feedback!"
        url = "https://backend.langstudy.tech/feedback/"+sessionid;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
    
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                // window.location.href="index.html";
            }
        };
        var data = feedback;
        console.log("sending " + data + " to " + url);
        xhr.send(data);
    }
}


var group = [];
var groups = [];
var dict = {
    0:5,
    1:5,
    2:5,
    3:5,
    4:5

};
var dictVal = 0;
var whichGroup = 0;
function doTrain(){
    train = true;
    //train is supposed to do the following:
    //Group studysheet into groups of 5 words
    //go through the following with each group
    //Display the term and answer of each word
    //Do multiple choice for each word (2x each)
    //do write for each word (2x each)
    //move to next group
    //allow 1 in 6 chance of a word being repeated to check for review
    document.getElementById("informationAbt").style.display = "none";
    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }
    console.log(customWords)
    let arrayText = customWords.split('\n')
    let groups = []
    for (i = 0; i<arrayText.length; i+=5){
        const group = arrayText.slice(i, i+5);
        groups.push(group);
    }
    console.log(groups)
    
    group = groups[whichGroup]

    for (j = 0; j<group.length; j++){
        dict[j] = 0;
    }
        // index in group should co relate to index in dict
        
    t = 0;
    gameLoop()
    
     


    

}

var t = 0
function gameLoop(){
    if (t == group.length){
        t = 0;
    }

    if (dict[0] >= 5 && dict[1] >= 5 && dict[2] >=5 && dict[3] >= 5 && dict[4] >= 5){
        console.log("ready to go to next group")
        whichGroup++;
        t = 0;
        let arrayText = customWords.split('\n')
        let groups = []
        for (i = 0; i<arrayText.length; i+=5){
            const group = arrayText.slice(i, i+5);
            groups.push(group);
        }
        console.log(groups)
        
        group = groups[whichGroup]

        for (j = 0; j<group.length; j++){
            dict[j] = 0;
        }
            // index in group should co relate to index in dict
            
        t = 0;
    }
    // potential issue with the going down
    // still needs to go on to next group
    console.log("Running game loop. T = "+t)
    document.getElementById("TermAndDef").style.display = "none";
    document.getElementById("multchoice").style.display="none";
    var inputs = document.getElementsByClassName("inputdiv");

    for (i = 0; i<inputs.length; i++){
        element = inputs[i]
        if (element != null){
            element.style.display = "none";
        }
    }

    console.log("game loop")
    reviewValue = -1;
    if (whichGroup > 0){
        reviewValue = Math.floor(Math.random() * 7)
    }
    //REMOVE NEXT LINE BEFORE TESTING!! THIS IS WHEN REVIEW WAS NOT READY
    reviewValue = 0
    if (reviewValue == 4){
        // group = groups[whichGroup - 1]
        // reviewValue = Math.floor(Math.random() * group.length)
        // questionArray = JSON.parse(group[reviewValue])
        // term = questionArray[0]
        // definition = questionArray[1]
        // doWriteTrain(term, definition)
        // group = groups[whichGroup]
    }
    else {
        console.log(JSON.stringify(dict))
        question = group[t];
        console.log("The question is "+question+" and T is "+t)
        questionArray = JSON.parse(question)
        console.log(questionArray)
        term = questionArray[0];
        definition = questionArray[1];
        mode = dict[t]
        if (mode == 0){
            readTermDef(term, definition)
            dict[t] = dict[t] + 1;
            t++;
        } else if (mode == 1){
            doTrainMulti(term, definition)
        } else if (mode == 2){
            doTrainMulti(term, definition)
        } else if (mode == 3){
            doWriteTrain(term, definition)
        } else if (mode == 4){
            doWriteTrain(term, definition)
        } else if (mode == 5){
            console.log("review")
            t++
    
        }
        
        
        if (t == group.length){
            t = 0;
        }
   
    }
    
}

function readTermDef(term, def){
    console.log("learning for the first time")
    document.getElementById("TermAndDef").style.display = "";
    document.getElementById("term").innerHTML = term;
    document.getElementById("def").innerHTML = def;
}



function doWriteTrain(term, def){
    var wage = document.getElementById("input");
    // wage.addEventListener("keydown", function (e) {
    //     if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    //         console.log("ENTER PRESS: t = "+t+" customAnswer = "+customAnswer+"")
    //         checkTrain()
    //     }
    // });
    wage.innerHTML = ""
    wage.value = ""
    var inputs = document.getElementsByClassName("inputdiv");

    for (i = 0; i<inputs.length; i++){
        element = inputs[i]
        if (element != null){
            element.style.display = "flex";
        }
    }
    input = document.getElementById("input")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("spellcheck", "off")
    input.style.display = "flex";
    buttonStyling = document.getElementById("goButton")
    buttonStyling.style.display = "flex";
    buttonStyling.innerHTML = ">" + "\n" + "Go!"
    
    
    console.log("Inside of new setup for write, term = "+term+" and def = "+def)
    document.getElementById("displayWord").innerHTML = term;
    customAnswer = def;
    customAnswer = customAnswer.toLowerCase();

     
}
    
function checkTrain(){
    usrInput = input.value.toLowerCase();
    usrInput = usrInput.trim();
    console.log("Checking answer by comparing "+usrInput+" to "+customAnswer)
    if (usrInput == customAnswer){
        console.log("Answer determined to be correct")
        // console.log("Advancing T "+t+"which would be "+group[t])
        dict[t] = dict[t] + 1;
        t++;
        buttonStyling.style.backgroundColor = "#3e8e41"
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
        gameLoop()
        
        
    }
    else{
        console.log("Answer determined to be incorrect")
        t++
        buttonStyling.style.backgroundColor = "#ce1483"
        document.getElementById("wherearewe").innerHTML = "Correct answer was: "+customAnswer
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
        setTimeout(function () { document.getElementById("wherearewe").innerHTML = "" }, 1000)
        gameLoop()
    }
}

function doTrainMulti(term, def ){
    document.getElementById("multchoice").style.display="";
    
    question = [term, def];
    document.getElementById("questionheader").innerHTML = question[0];
    let random_number = Math.floor(Math.random() *4);
    fakeout = getOtherAnswers(customWords)
    keepchecking = true;
    recursioncheck = 0;
    while (keepchecking == true && recursioncheck <=1000){
        for (i=0; i<question.length; i++){
            if (fakeout[i] == question[1]){
                fakeout = getOtherAnswers(customWords)
                i=0;
            }
        }
        keepchecking = false;
        recursioncheck++;
    }
    recursioncheck = 0;
    checker = 0;
    while (checker < 16 && recursioncheck < 3000){
        checker = 0;
        for (i=0; i<fakeout.length; i++){
            for (j=0; j<fakeout.length; j++){
                if (fakeout[i] == fakeout[j] && i!=j){
                    fakeout = getOtherAnswers(customWords)
                    i=0;
                }
                else if (fakeout[i] != fakeout[j]) {
                    checker++;
                }
                if (fakeout[j] == question[1]){
                    fakeout = getOtherAnswers(customWords)
                    i=0;
                }
            }
        }
        recursioncheck++;
    }    
    if (random_number == 0){
        let element = document.getElementById("a")
        element.id = "correct"
        console.log("correct: "+element)
        element.onclick = function(){
            theid = this.id
            checkMulti(theid)
        }
        element.innerHTML = question[1];

        
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
    whichCustom = "speed";
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
    input.setAttribute("autocorrect", "off")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("spellcheck", "off")
    buttonStyling = document.getElementById("goButton")
    buttonStyling.style.display = "flex";
    buttonStyling.innerHTML = ">" + "\n" + "Go!"
    document.getElementById("stats").style.width = "15vw"
    document.getElementById("stats").style.height = "110"
    document.getElementById("crctst").style.fontSize = "15"
    document.getElementById("incorrect").style.fontSize = "15"
    document.getElementById("timerchange").style.display = "none";

    
    
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
    input.setAttribute("autocorrect", "off")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("spellcheck", "off")
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

    } else if (v=="speed"){
        doSpeedTest();
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
            questionText.style.color = "wheat"
            let random_question = arrayText[i];
            var questionArray = JSON.parse(random_question)
            questionText.innerHTML=questionArray[0];

            id = "answerInput"+generateIdA
            var verbInput = document.createElement('INPUT');
            verbInput.className="inputSeen"
            verbInput.style.backgroundColor = "rgb(47, 61, 115)"
            verbInput.style.color = "wheat"
            verbInput.setAttribute("type", "text");
            verbInput.setAttribute("id",id)
            verbInput.setAttribute("autocorrect", "off")
            verbInput.setAttribute("autocomplete", "off")
            verbInput.setAttribute("spellcheck", "off")
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
            let userInputAnswer = document.getElementById(id).value.toLowerCase();
            if (userInputAnswer == theanswer){
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

//this is a monument to blindey

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
    location.href = "index.html";
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
    setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
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
            setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
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
            setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
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
    usrInput = usrInput.trim();
    document.getElementById("hintText").style.display = "none";
    if (usrInput == ""){
        document.getElementById("hintText").style.display = "none";
    }
    else if (usrInput == customAnswer){
        correctCounter += 1
        buttonStyling.style.backgroundColor = "#3e8e41"
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
        try {
            document.getElementById("helpbutton").style.display = "none";
        } catch (error) {
            
        }
        
        input.value = ""
        timer("clear")

        afterCorrect("amogus", "custom")
    }
    else{
        buttonStyling.style.backgroundColor = "#ce1483"
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
        input.value = ""
        incorrectCounter += 1
        try {
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
    document.getElementById("hintText").innerHTML = customAnswer;
    document.getElementById("hintText").style.display = "flex";
    document.getElementById("helpbutton").style.display = "none";
    
    
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


var trash_svg = `
<svg width="100%" height="100%" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    <g>
        <g transform="matrix(2.01195,0,0,2.01195,-311.048,-275.944)">
            <circle cx="254.006" cy="236.558" r="99.406" style="fill:rgb(235,235,235);fill-opacity:0;"/>
            <path d="M254.006,137.152C308.869,137.152 353.412,181.694 353.412,236.558C353.412,291.421 308.869,335.964 254.006,335.964C199.142,335.964 154.6,291.421 154.6,236.558C154.6,181.694 199.142,137.152 254.006,137.152ZM254.006,153.554C299.817,153.554 337.01,190.747 337.01,236.558C337.01,282.369 299.817,319.562 254.006,319.562C208.195,319.562 171.002,282.369 171.002,236.558C171.002,190.747 208.195,153.554 254.006,153.554Z"/>
        </g>
        <g transform="matrix(0.624979,0,0,0.624979,75.0042,75.0042)">
            <path d="M100,100L300,300" style="fill:none;stroke-width:52.8px;"/>
        </g>
        <g transform="matrix(-0.624979,0,0,0.624979,324.996,75.0042)">
            <path d="M100,100L300,300" style="fill:none;stroke-width:52.8px;"/>
        </g>
    </g>
</svg>

`

//creates new input fields for multi & single creators + assigns them ids
var currentId = "";
function makeInputs(version){
    var inputMap = new Map();
    inputMap.set("")

    if (version=="single"){
        // var br = document.createElement("div")
        // br.className = "termDefContainer";
        // document.getElementById("insideCreator").appendChild(br);
        // id1 = "input"+generateIdV
        // id2 = "ans"+generateIdA
        // id3 = "button"+generateIdYou
        // var verbInput = document.createElement('div');
        // verbInput.id=id1;
        // verbInput.className="term"
        // verbInput.setAttribute("data-text", "Term");
        // verbInput.contentEditable="true";
        // generateIdV++
        //     // verbInput.innerHTML="Put Term / Question Here";
        // br.appendChild(verbInput);
    
        // var answerInput = document.createElement("div");
        // answerInput.id=id2;
        // answerInput.setAttribute("id",id2)
        // answerInput.className="definition"
        // answerInput.contentEditable="true";
        // answerInput.setAttribute("data-text", "Answer");
        // generateIdA++
        // // answerInput.innerHTML="Put Answer Here";
        // br.appendChild(answerInput);

        // var svg = document.createElement("div");
        // svg.innerHTML = trash_svg;
        // svg.className = "trash";
        // svg.onclick = function(){
        //     console.log(this)
        //     this.parentNode.remove();
        // }
        // br.appendChild(svg);

        // // var brk = document.createElement("br");
        // // br.appendChild(brk);
        // // var brk = document.createElement("br");
        // // br.appendChild(brk);
        // var image = document.createElement("img");
        // image.src="assets/icons/proto.nobg.arrow.svg";
        // image.className="arrowAlt";
        // image.id = id3;
        // generateIdYou++;
        // image.onclick = function(){
        //     console.log(this)
        //     currentId = this.id;
        //     makeInputs("Multi");
            
        // }
        // // br.appendChild(image);
    
        // var overallContainer = document.getElementById("langCreatorContainer");
        // overallContainer.scrollTop = overallContainer.scrollHeight;

        createCreatorInput("", "")
    }
    else{
        console.log(currentId);
        var outDiv = document.createElement("div");
        outDiv.style.display = "flex";
        document.getElementById("insideCreator").appendChild(outDiv);
        var image = document.createElement("img");
        image.src="assets/icons/Arrow 2.svg";
        image.className="subArrow";
        outDiv.appendChild(image);
        var br = document.createElement("div")
        br.className = "termDefContainer";
        br.style.flex = "1";
        outDiv.appendChild(br);
        id1 = "input"+generateIdV
        id2 = "input"+generateIdA

        var verbInput = document.createElement('div');
        verbInput.id=id1;
        verbInput.className="term"
        verbInput.setAttribute("data-text", "Alternate Term");
        verbInput.contentEditable="true";
        generateIdV++
            // verbInput.innerHTML="Put Term / Question Here";
        br.appendChild(verbInput);
        usableId = "ans"+currentId.slice(-1);
        console.log(usableId)
        var answerInput = document.createElement("div");
        answerInput.innerHTML = document.getElementById(usableId).innerHTML;
        document.getElementById(usableId).style.display = "none";
        document.getElementById(usableId).innerHTML = "";
        document.getElementById("input"+currentId.slice(-1)).style.textAlign = "center";
        document.getElementById("input"+currentId.slice(-1)).style.fontWeight = "bolder"
        document.getElementById("input"+currentId.slice(-1)).style.fontSize = "10vw;"
        answerInput.id=id2;
        answerInput.setAttribute("id",id2)
        answerInput.className="definition"
        answerInput.contentEditable="true";
        answerInput.setAttribute("data-text", "Alternate Answer");
        generateIdA++
        // answerInput.innerHTML="Put Answer Here";
        br.appendChild(answerInput);
        // var brk = document.createElement("br");
        // br.appendChild(brk);
        // var brk = document.createElement("br");
        // br.appendChild(brk);
        
    
        var overallContainer = document.getElementById("langCreatorContainer");
        overallContainer.scrollTop = overallContainer.scrollHeight;
        
    }
    
}

function saveToCloud(){
    // document.getElementById("sendingLoader").style.display="";
    showElement(document.getElementById("sendingLoader"));
    if(document.getElementById("sstitle").innerHTML == ""){
        document.getElementById("sstitle").innerHTML = "Lang Custom Studysheet";
    } else if (document.getElementById("sstitle").innerHTML.includes("/")){
        document.getElementById("sstitle").innerHTML = document.getElementById("sstitle").innerHTML.replace("/", "-");
    }
    
    if (customusername == "invalidsession"){
        // document.getElementById("sendingLoader").style.display="none";
        hideElement(document.getElementById("sendingLoader"));
        document.getElementById("failedSignIn").style.display="";
    }
    else{
        var downloadArray = ""
        var childarray = []
        var childrens = document.getElementById("insideCreator").children;
        console.log(childrens);
        for(var i=0; i<childrens.length; i++){
            var childx = childrens[i];
            // console.log(childx.id)
            // if (childx.id.startsWith() == 'input'){
            //     childarray.push(childx);
            // }
            console.log(childx);
            console.log("hilarious right");
            var underChildren = childx.children;
            console.log(underChildren);
            for (var n=0; n<2; n++){
                childarray.push(underChildren[n])
                
            }
    
        }
    
        console.log(childarray);
        for (var i=0; i<childarray.length; i+=2){
            var child = childarray[i];
            var child2 = childarray[i+1];
            var childContents = child.innerText.trim()
            var child2Contents = child2.innerText.trim()
            
            childContents = childContents.replaceAll("&nbsp;", "")
            child2Contents = child2Contents.replaceAll("&nbsp;", "")
            childContents = childContents.replaceAll("<div><br></div>", "")
            child2Contents = child2Contents.replaceAll("<div><br></div>", "")
            child2Contents = child2Contents.replaceAll("\n", "_")
            childContents = childContents.replaceAll("\n", "_")
            child2Contents = child2Contents.replaceAll("\t", "   ")
            childContents = childContents.replaceAll("\t", "   ")
            if (child2Contents.includes("sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823") || child2Contents.includes("&nbsp;")){
                alert("One of the specified words is not avaliable for use due to the structure of the Lang Studysheet.")
                window.location.reload();
                
            }
            value1 = '["'+childContents+'"';
            value2 = '"'+child2Contents+'"]'+"\n";
            toAdd = [value1, value2];
            console.log(toAdd);
            downloadArray = downloadArray + toAdd;
            console.log(downloadArray);
        }
        downloadArray = downloadArray.slice(0,-1);
        downloadArrayString = downloadArray+"";
        downloadArrayString = downloadArrayString.replaceAll("\n", "sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823");
    
        var filename = document.getElementById("sstitle").innerText;
        console.log("FILE NAME+ "+filename)
        if(window.localStorage.getItem('editSheet')=="true") {
            var url = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/edit/"+filename;
            window.localStorage.setItem('editSheet', "false");
        } else {
            var url = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/upload/"+filename;
        }
    
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
    
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                window.location.href="index.html";
            }
        };
        var data = downloadArrayString;
        console.log("sending " + data + " to " + url);
        xhr.send(data);
    }
    
}


//preps the user input custom sheet for downloading by putting all into one string

function downloadVerbs(select){
    if(document.getElementById("sstitle").innerText == ""){
        document.getElementById("sstitle").innerText = "Lang Custom Studysheet";
     }
    if(select == "s"){
        var downloadArray = ""
        var childarray = []
        var childrens = document.getElementById("insideCreator").children;
        console.log(childrens);
        for(var i=0; i<childrens.length; i++){
            var childx = childrens[i];
            // console.log(childx.id)
            // if (childx.id.startsWith() == 'input'){
            //     childarray.push(childx);
            // }
            console.log(childx);
            console.log("hilarious right");
            var underChildren = childx.children;
            console.log(underChildren);
            for (var n=0; n<2; n++){
                childarray.push(underChildren[n])
              
            }
    
        }

        console.log(childarray);
        for (var i=0; i<childarray.length; i+=2){
            var child = childarray[i];
            var child2 = childarray[i+1];
            var childContents = child.innerText.trim()
            var child2Contents = child2.innerText.trim()
            childContents = childContents.replaceAll("&nbsp;", "")
            child2Contents = child2Contents.replaceAll("&nbsp;", "")
            childContents = childContents.replaceAll("<div><br></div>", "")
            child2Contents = child2Contents.replaceAll("<div><br></div>", "")
            child2Contents = child2Contents.replaceAll("\n", "   ")
            childContents = childContents.replaceAll("\n", "   ")
            child2Contents = child2Contents.replaceAll("\t", "   ")
            childContents = childContents.replaceAll("\t", "   ")
            if (child2Contents.includes("sussyamogusnobodywoulddarewritethisintheirstudysheet758429574823") || child2Contents.includes("&nbsp;")){
                alert("One of the specified words is not avaliable for use due to the structure of the Lang Studysheet.")
                window.location.reload();
            }
            value1 = '["'+childContents+'"';
            value2 = '"'+child2Contents+'"]'+"\n";
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
    namefile = document.getElementById("sstitle").innerHTML;
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
    setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
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

function grabQuizlet(link) {

    console.log("link+ "+link)
    var url = "https://lye.software/temp/quizlet/get";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            var newStudysheet = xhr.responseText;
            window.localStorage.setItem("fullstudysheet", newStudysheet);
            window.location.href="creator.html";
        }
    };
    var data = link;
    console.log("sending " + data + " to " + url);
    xhr.send(data);
}

function grabMemrise(link) {

    console.log("link+ "+link)
    var url = "https://lye.software/temp/memrise/get";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            var newStudysheet = xhr.responseText;
            window.localStorage.setItem("fullstudysheet", newStudysheet);
            window.location.href="creator.html";
        }
    };
    var data = link;
    console.log("sending " + data + " to " + url);
    xhr.send(data);
}

function initializeEdit(){
    window.localStorage.setItem("editSheet", "true");
    window.location.href='creator.html';
}

function creatorModeSelect(){
    override = true;
    if(window.localStorage.getItem("fullstudysheet")=="" || window.localStorage.getItem("fullstudysheet")==null){
        console.log("Entering Standard Creator Mode")
    } else if(window.localStorage.getItem('editSheet')=="true") {
        console.log("Entering edit mode")
        customWords = window.localStorage.getItem("fullstudysheet")
        let arrayText = customWords.split('\n')
        window.localStorage.setItem("fullstudysheet", "");
        document.getElementById("topheader").innerHTML = "Editing "+window.localStorage.getItem("chosenSheet");
        document.getElementById("sstitle").innerHTML = window.localStorage.getItem("chosenSheet");
        for (i = 0; i<arrayText.length; i++){
            let wordPair = getRandomQuestion(customWords);
            // var br = document.createElement("div")
            // br.className = "termDefContainer";
            // document.getElementById("insideCreator").appendChild(br);
            // id1 = "input"+generateIdV
            // id2 = "input"+generateIdA

            // var verbInput = document.createElement('div');
            // verbInput.id=id1;
            // verbInput.className="term"
            // verbInput.setAttribute("data-text", "Term");
            // verbInput.contentEditable="true";
            // generateIdV++
            // verbInput.innerHTML=wordPair[0];
            // br.appendChild(verbInput);
        
            // var answerInput = document.createElement("div");
            // answerInput.id=id2;
            // answerInput.setAttribute("id",id2)
            // answerInput.className="definition"
            // answerInput.contentEditable="true";
            // answerInput.innerHTML=wordPair[1];
            // answerInput.setAttribute("data-text", "Answer");
            // generateIdA++
            // // answerInput.innerHTML="Put Answer Here";
            // br.appendChild(answerInput);
            createCreatorInput(wordPair[0], wordPair[1])
        }
    } else {
        console.log("Entering Quizlet Creator Mode")
        customWords = window.localStorage.getItem("fullstudysheet")
        let arrayText = customWords.split('\n')
        window.localStorage.setItem("fullstudysheet", "");
        document.getElementById("topheader").innerHTML = "Imported From Outside Source"
        for (i = 0; i<arrayText.length; i++){
            let wordPair = getRandomQuestion(customWords);
            // var br = document.createElement("div")
            // br.className = "termDefContainer";
            // document.getElementById("insideCreator").appendChild(br);
            // id1 = "input"+generateIdV
            // id2 = "input"+generateIdA

            // var verbInput = document.createElement('div');
            // verbInput.id=id1;
            // verbInput.className="term"
            // verbInput.setAttribute("data-text", "Term");
            // verbInput.contentEditable="true";
            // generateIdV++
            // verbInput.innerHTML=wordPair[0];
            // br.appendChild(verbInput);
        
            // var answerInput = document.createElement("div");
            // answerInput.id=id2;
            // answerInput.setAttribute("id",id2)
            // answerInput.className="definition"
            // answerInput.contentEditable="true";
            // answerInput.innerHTML=wordPair[1];
            // answerInput.setAttribute("data-text", "Answer");
            // generateIdA++
            // // answerInput.innerHTML="Put Answer Here";
            // br.appendChild(answerInput);
            createCreatorInput(wordPair[0], wordPair[1])
        }
    }
}

function createCreatorInput(term, definition) {
    var br = document.createElement("div")
        br.className = "termDefContainer";
        document.getElementById("insideCreator").appendChild(br);
        id1 = "input"+generateIdV
        id2 = "ans"+generateIdA
        id3 = "button"+generateIdYou

        

        var verbInput = document.createElement('div');
        verbInput.id=id1;
        verbInput.className="term"
        verbInput.innerHTML=term;
        verbInput.setAttribute("data-text", "Question");
        verbInput.contentEditable="true";
        generateIdV++
            // verbInput.innerHTML="Put Term / Question Here";
        br.appendChild(verbInput);
    
        var answerInput = document.createElement("div");
        answerInput.id=id2;
        answerInput.setAttribute("id",id2)
        answerInput.className="definition"
        answerInput.contentEditable="true";
        answerInput.innerHTML=definition;
        answerInput.setAttribute("data-text", "Answer");
        generateIdA++
        // answerInput.innerHTML="Put Answer Here";
        br.appendChild(answerInput);

        // var brk = document.createElement("br");
        // br.appendChild(brk);
        // var brk = document.createElement("br");
        // br.appendChild(brk);
        var image = document.createElement("img");
        image.src="assets/icons/proto.nobg.arrow.svg";
        image.className="arrowAlt";
        image.id = id3;
        generateIdYou++;
        image.onclick = function(){
            console.log(this)
            currentId = this.id;
            makeInputs("Multi");
            
        }
        //br.appendChild(image);
        var svg = document.createElement("div");
        svg.innerHTML = trash_svg;
        svg.className = "trash";
        svg.onclick = function(){
            console.log(this)
            this.parentNode.remove();
        }
        br.appendChild(svg);
    
        var overallContainer = document.getElementById("langCreatorContainer");
        overallContainer.scrollTop = overallContainer.scrollHeight;
}

// function addStudysheet(name) {
//     var sheet = `
//     <div style="display: flex; align-items: center; background-color: var(--primary-dark);">
//         <div class="studysheetName">${name}</div>
//     </div>
//     <div style="display: flex; align-items: center; justify-content: center; background-color: var(--primary-dark);" data-studysheet="${name}" onclick="viewStudysheet()">
//         <svg class="studysheetEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.728 488.728" xmlns:v="https://vecta.io/nano"><path d="M487.147 462.52l-36.4-167.6c0-4.2-2.1-7.3-5.2-10.4l-261.3-261.3c-20-22.9-74.3-38.1-112.4 0l-47.9 47.9c-31 31-31 81.4 0 112.4l261.3 261.3c2.1 2.1 5.2 4.2 9.4 5.2l168.6 38.5c10.1 1.5 29.1-4.9 23.9-26zm-434.1-308.1c-15.6-15.6-15.6-39.6 0-55.2l47.9-47.9c15.2-15.2 40-15.2 55.2 0l238.4 238.4h-27.1c-11.4 0-20.8 9.4-20.8 20.8v34.3h-34.3c-11.4 0-20.8 9.4-20.8 20.8v26.1l-238.5-237.3zm280 261.3v-29.2h34.3c18 1.7 20.8-16.5 20.8-20.8v-34.4h29.2l24 109.3-108.3-24.9z"/></svg>
//     </div>
//     <div style="display: flex; align-items: center; justify-content: center; background-color: var(--primary-dark); data-studysheet="${name}" onclick="deleteStudysheet()">
//         <svg class="studysheetDelete" width="24px" height="24px" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><path d="M17 9L11 15M11.0002 9L17.0002 15M9 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H9L3 12L9 6Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//     </div>
//     `
//     document.getElementById("studysheetGridContainer").innerHTML += sheet;
// }