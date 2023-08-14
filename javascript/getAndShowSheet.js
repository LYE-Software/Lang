// window.onerror = (a, b, c, d, e) => {
//     console.error(e);
//     showElement(document.getElementById("specificError"));
//     hideElement(document.getElementById("noclickdiv"));
//     document.getElementById("ErrorTextLocation").innerHTML = `
//     We have encountered an error. Please report this using the feedback button on the homepage, as well as the error message below:
//     ${a}
//     `
//     return true;
// }

// addEventListener("error", onerror);

// function onerror(event){
//     console.log("erroring!!");
//     showElement(document.getElementById("specificError"));
//     hideElement(document.getElementById("noclickdiv"));
//     document.getElementById("ErrorTextLocation").innerHTML = `
//     We have encountered an error. Please report this using the feedback button on the homepage, as well as the error message below:
//     ${a}
//     `
//     return true;
// }
async function doPreviewAndLocal(){
    hideElement(document.getElementById("flashcardBox"))
    console.log("in dopreview")
    document.getElementById("homeusername").innerHTML = localStorage.getItem("customusername");

    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);

    //SHARED LINK
    if(url.searchParams.get("userid")!= null){
        if (window.localStorage.getItem("savedShare")){
            document.getElementById("saveBtnImg").src = "assets/icons/check.png";
            document.getElementById("saveBtn").onclick = function(){
            showPopup("You already saved this Studysheet!")
        };
        }
        //document.getElementById("saveBtnHolder").style.display = "";
        console.log("inside shareEvent")
        sessionid = url.searchParams.get("userid")
        chosensheet = url.searchParams.get("sheetName")
        window.localStorage.setItem("sharedID", sessionid);
        window.localStorage.setItem("sharedSheet", chosensheet);
        window.localStorage.setItem("ssID", chosensheet)
        window.localStorage.setItem("lastsheet", chosensheet)
        console.log(chosensheet)
        sheet = await httpGet("https://backend.langstudy.tech/id/"+sessionid+"/Studysheets/"+chosensheet)
        document.getElementById("studysheetname").innerHTML = chosensheet.slice(0,15)+"..."
        document.getElementById("editbutton").style.borderColor = "#a0a0a0"
        document.getElementById("editbutton").style.backgroundColor = "#a0a0a0"

        document.getElementById("editbutton").onclick = function(){
            document.getElementById('notOwned').style.pointerEvents = "all";
            document.getElementById('notOwned').style.opacity = 1;
        }
        document.getElementById("shareDisclaimer").style.display = "flex"
        document.getElementById("saveBtn").style.display = ""
    
    } 
    //SHARED BACK
    else if(window.localStorage.getItem("sharedID") != "" &&  window.localStorage.getItem("sharedID") != null){
        if (window.localStorage.getItem("savedShare")){
            
            document.getElementById("saveBtnImg").src = "assets/icons/check.png";
            document.getElementById("saveBtn").onclick = function(){
            showPopup("You already saved this Studysheet!")
        };	
        }
        console.log("Shared back")
        document.getElementById("saveBtnHolder").style.display = "";
        console.log("inside localstorage")
        chosensheet = window.localStorage.getItem("sharedSheet").replaceAll(" ", "%20");
        chosensheet = chosensheet.replaceAll("&", "%26")
        window.localStorage.setItem("lastsheet", chosensheet)
        sheet = await httpGet("https://backend.langstudy.tech/id/"+window.localStorage.getItem("sharedID")+"/Studysheets/"+chosensheet)
        chosensheet = chosensheet.replaceAll("%26", "&")
        chosensheet = chosensheet.replaceAll("%20", " ");

        document.getElementById("studysheetname").innerHTML = chosensheet.slice(0,15)+"..."
        document.getElementById("editbutton").style.borderColor = "#a0a0a0"
        document.getElementById("editbutton").style.backgroundColor = "#a0a0a0"

        document.getElementById("editbutton").onclick = function(){
            document.getElementById('notOwned').style.pointerEvents = "all";
            document.getElementById('notOwned').style.opacity = 1;
        }
        document.getElementById("shareDisclaimer").style.display = "flex"
        document.getElementById("shareBtn").style.display = ""
    }
    //NORMAL
    else{
        chosensheet = window.localStorage.getItem("chosenSheet")
        window.localStorage.setItem("lastsheet", chosensheet)

        if(chosensheet == null || chosensheet == ""){
            document.getElementById("unableToFind").style.opacity = "1";
            document.getElementById("unableToFind").style.pointerEvents = "all"; 
        }

        toek = window.localStorage.getItem("usertoken")
        if (chosensheet.length>15){
            document.getElementById("studysheetname").innerHTML = chosensheet.slice(0,15)+"..."

        } else {
            document.getElementById("studysheetname").innerHTML = chosensheet
        }
        sheet = await httpGet("https://backend.langstudy.tech/"+toek+"/Studysheets/"+chosensheet+"/RequestPreview")
        // console.warn("inside the second go")
    }

    if (sheet == "" || sheet == null || sheet == "invalidsession"){
        console.log("could not find")
        document.getElementById("unableToFind").style.opacity = "1";
        document.getElementById("unableToFind").style.pointerEvents = "all"; 
    }

    // document.getElementById("noclickdiv").style.display = "none";
    // console.warn("testing bruh why is it doing this")
    
    console.log("og sheet: "+sheet)
    var newSheet = parseFromJSON(sheet);
    if (newSheet.type == "pointer"){
        console.log("redirecting pointers")
        sheet = await httpGet("https://backend.langstudy.tech/id/"+newSheet.user_id+"/Studysheets/"+chosensheet)
        if (sheet == "" || sheet == null || sheet == "invalidsession"){
            console.log("could not find")
            document.getElementById("unableToFind").style.opacity = "1";
            document.getElementById("unableToFind").style.pointerEvents = "all"; 
        }
        newSheet = parseFromJSON(sheet)
    }
    console.log(newSheet)
    if (newSheet.length<4){
        console.log("removing...")
        document.getElementById("trainbutton").style.backgroundColor = "#a0a0a0";
        document.getElementById("multiplechoicebutton").style.backgroundColor = "#a0a0a0";
        document.getElementById("trainbutton").onclick = function(){
            document.getElementById('tooFewTerms').style.pointerEvents = "all";
            document.getElementById('tooFewTerms').style.opacity = 1;
        }
        document.getElementById("multiplechoicebutton").onclick = function(){
            document.getElementById('tooFewTerms').style.pointerEvents = "all";
            document.getElementById('tooFewTerms').style.opacity = 1;
        }
        document.getElementById("trainbutton").style.borderColor = "#a0a0a0"
        document.getElementById("multiplechoicebutton").style.borderColor = "#a0a0a0"
    }

    window.localStorage.setItem("fullstudysheet", sheet)
    displaySheet(newSheet)
    document.getElementById("noclickdiv").style.opacity = "0";
    document.getElementById("noclickdiv").style.pointerEvents = "none";
    body = document.getElementsByTagName("body")[0];
    //body.style.background = "linear-gradient(180deg, #001945 35.94%, #000011 100%)"
    
}



function displaySheet(newSheet){
    for (var i = 0; i<newSheet.length; i++){
        if (newSheet.getNthTerm(i).isMulti){
            if (newSheet.getNthTerm(i).hasImage){
                src = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(i).imageSrc;
            } else {
                src = null;
            }
            makeMulti(newSheet.getNthTerm(i), i, src);
        } else{
            if (newSheet.getNthTerm(i).hasImage){
                src = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(i).imageSrc;
            } else {
                src = null;
            }
            makeSingle(newSheet.getNthTerm(i).term, newSheet.getNthTerm(i).answer, src);
        }
    }
}


function makeSingle(term, def, imgsrc){
    if (imgsrc!= null){
        doImage = "flex"
    } else {
        doImage = "none"
    }
    var single = `
    <div style="width:100%; height:100px; display:${doImage}; justify-content:center; align-items:center;">
        <img src="${imgsrc}" style="max-height:100px;">
    </div>
    <div class="termdef">
        <div>
            <div>${term}</div>
            <div>${def}</div>
        </div>
    </div>
    `
    document.getElementById("termsContainer").innerHTML+=single;
}

function makeMulti(multi, i, imgsrc){
    if (imgsrc!= null){
        doImage = "flex"
    } else {
        doImage = "none"
    }
    var multiTemplate = `
    <div style="width:100%; height:100px; display:${doImage}; justify-content:center; align-items:center;">
        <img src="${imgsrc}" style="max-height:100px;">
    </div>
    <div class="multiTermDef" id="${"multi"+i}">
        <div>${multi.question}</div>
        
    </div>`
    document.getElementById("termsContainer").innerHTML+=multiTemplate;
    for (var j = 0; j<multi.length; j++){
        var altTemplate = `
        <div class="multiEntry">
            <img src="assets/icons/Arrow 2.svg">
            <div>${multi.terms[j]}</div>
            <div>${multi.answers[j]}</div>
        </div>`
        document.getElementById("multi"+i).innerHTML+=altTemplate;
    }
}
    


async function shareLink(){
    document.getElementById("sharinglink").style.display = ""
    document.getElementById("sharinglink").style.opacity = 1;
    document.getElementById("sharinglink").style.pointerEvents = "all";
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    if(url.searchParams.get("userid") != null){
        sessionid = url.searchParams.get("userid")
        chosensheet = url.searchParams.get("sheetName")
        document.getElementById("linkholder").innerHTML = url;
    }
    else{
        console.log("insharelink")
        
        lyeUrl = "https://lye.software/idfromsession/"+window.localStorage.getItem("usertoken")
        console.log(lyeUrl)
        tempTok = await httpGet(lyeUrl, true)
        
        sheetName = window.localStorage.getItem("chosenSheet").replaceAll(" ", "%20");
        sheetName = sheetName.replaceAll("&", "%26")
        console.log("Replaced forbidden characters")
        url = "https://langstudy.tech/studysheetpage.html?userid="+tempTok+"&sheetName="+sheetName;
        document.getElementById("linkholder").innerHTML = url;
        console.log(url)
    }
    
}




function saveToLib(){
    if (window.localStorage.getItem("savedShare")){
        showPopup("You already saved this Studysheet!")
        return;
    } 
    else if (window.localStorage.getItem("usertoken") == null || window.localStorage.getItem("usertoken") == null){
        showPopup("You need to be logged in to save Studysheets!")
        return;
    }
    else{
        window.localStorage.setItem("savedShare", "true")
        document.getElementById("saveBtnImg").src = "assets/icons/check.png";
        document.getElementById("saveBtn").onclick = function(){
            showPopup("You already saved this Studysheet!")
        };	
    
        filename = window.localStorage.getItem("sharedSheet");
        var url = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/Studysheets/upload/"+filename;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
    
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("lye-session", window.localStorage.getItem("usertoken"))
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                document.getElementById("saveBtnImg").src = "assets/icons/check.png";
                document.getElementById("saveBtn").onclick = function(){
                showPopup("You already saved this Studysheet!")
                };            
            }
        };
        var data = {
            "type": "pointer",
            "studysheet_id": window.localStorage.getItem("ssID"),
            "user_id": window.localStorage.getItem("sharedID")
          };
        console.log("sending " + data + " to " + url);
        xhr.send(JSON.stringify(data));
    }
}

