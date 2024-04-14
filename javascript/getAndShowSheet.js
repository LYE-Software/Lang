descForError = "undefined";

window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log("Handling error.")
    var err =  new LangError(msg, url, lineNo, descForError, "Something unexpected happened. \n", true)
    return true;
}

function doPreviewAndLocal(){
    window.localStorage.setItem("back_link", window.location.pathname);

    
    hideElement(document.getElementById("flashcardBox"))
    console.log("in dopreview")
    document.getElementById("homeusername").innerHTML = localStorage.getItem("customusername");
    if (studysheetData.error == "does_not_exist"){
        let popup = new PopupBuilder()
        popup.add(new PopupImage("/assets/icons/langerror.png").setStyle("width: 100px; margin: 10px"))
        popup.add(new PopupText("We couldn't find that studysheet").setStyle("color: black;"))
        popup.add(new PopupButton("Home", function() {
            window.location.href = "homepage.html";
        }).setStyle("width: 200px"))
        popup.show()
        return;
    }
    window.localStorage.setItem("lastsheet", studysheetData.name);
    chosensheet = studysheetData.name;
    
    toek = window.localStorage.getItem("usertoken")
    if (chosensheet.length>15){
        document.getElementById("studysheetname").innerHTML = chosensheet.slice(0,15)+"..."
    } else {
        document.getElementById("studysheetname").innerHTML = chosensheet
    }
    newSheet = parseFromJSON(studysheetData)
    window.localStorage.setItem("fullstudysheet", JSON.stringify(newSheet));
    if (newSheet.terms.length<4){
        console.log("removing...")
        document.getElementById("trainbutton").style.backgroundColor = "#a0a0a0";
        document.getElementById("multiplechoicebutton").style.backgroundColor = "#a0a0a0";
        document.getElementById("trainbutton").onclick = function(){
            showTooFewTermsPopup()
        }
        document.getElementById("multiplechoicebutton").onclick = function(){
            showTooFewTermsPopup()
        }
        document.getElementById("trainbutton").style.borderColor = "#a0a0a0"
        document.getElementById("multiplechoicebutton").style.borderColor = "#a0a0a0"
    }
    displaySheet(newSheet)
}

function showTooFewTermsPopup() {
    let popup = new PopupBuilder()
    popup.add(new PopupText("The mode you selected requires 4 or more terms.").setStyle("color: red;"))
    popup.add(new PopupText("Please select a different Study mode, or add more terms by editing your Studysheet."))
    popup.add(new PopupDismissButton("Ok.").setStyle("width: 200px"))
    popup.show()
}

var allhtml = "";
function displaySheet(newSheet){
    console.log("DIsplaying SHEET")
    console.log(newSheet)
    for (var i = 0; i<newSheet.terms.length; i++){
        if (newSheet.getNthTerm(i).isMulti){
            if (newSheet.getNthTerm(i).hasImage){
                src = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(i).imageSrc;
            } else {
                src = null;
            }
            makeMulti(newSheet.getNthTerm(i), i, src);
        } else{
            if (newSheet.getNthTerm(i).hasImage){
                src = connect()+"/"+window.localStorage.getItem("usertoken")+"/image/get/"+newSheet.getNthTerm(i).imageSrc;
            } else {
                src = null;
            }
            makeSingle(newSheet.getNthTerm(i).term, newSheet.getNthTerm(i).answer, src);
        }
    }
    console.warn("ADDING ALLHTML: "+allhtml)
    document.getElementById("termsContainer").innerHTML += allhtml;
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
    allhtml+=single;
}

function makeMulti(multi, i, imgsrc){
    if (imgsrc!= null){
        doImage = "flex"
    } else {
        doImage = "none"
    }
    var allmulti = "";
    for (var j = 0; j<multi.length; j++){
        var altTemplate = `
        <div class="multiEntry">
            <img src="assets/icons/Arrow 2.svg">
            <div>${multi.terms[j]}</div>
            <div>${multi.answers[j]}</div>
        </div>`
        allmulti+=altTemplate;
    }
    var multiTemplate = `
    <div style="width:100%; height:100px; display:${doImage}; justify-content:center; align-items:center;">
        <img src="${imgsrc}" style="max-height:100px;">
    </div>
    <div class="multiTermDef" id="${"multi"+i}">
        <div>${multi.question}</div>
        ${allmulti}
    </div>`
    allhtml+=multiTemplate;

}
    


async function shareLink(){
    document.getElementById("sharinglink").style.display = ""
    document.getElementById("sharinglink").style.opacity = 1;
    document.getElementById("sharinglink").style.pointerEvents = "all";
    document.getElementById("thething").style.opacity = 1;
    document.getElementById("thething").style.pointerEvents = "all";
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


function hideShare(){
    hideElement(document.getElementById('sharinglink'));
    hideElement(document.getElementById('thething'));
}

function saveToLib(){
    if (window.localStorage.getItem("savedShare")){
        showPopup("You already saved this Studysheet!")
        return;
    } 
    else if (window.localStorage.getItem("usertoken") == null || window.localStorage.getItem("usertoken") == "" || window.localStorage.getItem("usertoken") == "signedout"){
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
        var url = connect()+"/"+window.localStorage.getItem("usertoken")+"/Studysheets/upload/"+filename;
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

