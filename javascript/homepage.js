var library = [];
if (window.localStorage.getItem("serverStatus") == null){
    console.log("first time server init")
    window.localStorage.setItem("serverStatus", "no-issues")
}
descForError = "undefined";
setTimeout(function(){
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        console.log("Handling error.")
        var err =  new LangError(msg, url, lineNo, descForError, "Something unexpected happened.", true)
        return true;
    }    
}, 10)

var switchServerTimeout = setTimeout(function(){
    console.warn("its been 10 seconds, asking switch")
}, 10000)

async function getLibraryList(){
    
    // check for local studying
    if (window.localStorage.getItem("doLocal")=="true"){
        document.getElementById("localAdvanced").style.display = "";
    } else {
        console.log("Local Studying is disabled.")
    }

    var serverStatusHandling = window.localStorage.getItem("serverStatus");
    if (serverStatusHandling != "no-issues"){
   
        var json_svr = JSON.parse(serverStatusHandling);
        if (Math.floor(((json_svr.date - Date.now()) / 1000)) > 86400){
            console.log("Issue timed out, resetting")
            window.localStorage.setItem("serverStatus", "no-issues")
        }     
    }
    
    

    // check for library list

    if (window.localStorage.getItem("doFireflies") != null){
        if (window.localStorage.getItem("doFireflies") == "true"){
            enableSnow();
        } else{
            console.log("Fireflies are disabled.")
        }
    } else {
        enableSnow();
    }
    window.localStorage.removeItem("savedShare")
    window.localStorage.removeItem("sharedID");
    window.localStorage.removeItem("sharedSheet");
    window.localStorage.removeItem("ssID");
    
    
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
    } else if (window.localStorage.getItem("usertoken") == "signedout"){
        failedSignIn()
    } 
    else {
        console.log("inside the else")
        sessionid = window.localStorage.getItem("usertoken")
        console.log(sessionid);
        serverData = await httpGet(connect()+"/v2/home", false, sessionid)
        // await fetch('https://relay.langstudy.tech:853/"+sessionid+"/returnNameAndList').then(function(response) {
        //     return response.blob();
        // }).then(function(response) {
        //     serverData = response.text();
        // });        
        console.log("[TOTAL SERVER DATA] "+serverData)
        try {
             json = JSON.parse(serverData)
             clearTimeout(switchServerTimeout)
            console.log("cleared switch timeout")
        } catch(error){
            console.error("IMPROPER JSON")
            json = null;
            failedServerConnectionOnStart()
        }

        if (json.error == "session_invalid"){
            failedSignIn();
        }
        if (json.error == "luna"){
            sheetJsonInvalid();
        }
        
        
        // else if (serverData.contains("<!doctype html>")){
        //     failedServerConnectionOnStart();
        // }
        // console.log("bruh "+broken);
        
        library = json.studysheets
        
        if (window.localStorage.getItem("customusername")!= "" && window.localStorage.getItem("customusername")!= null && window.localStorage.getItem("customusername")!= "undefined" && window.localStorage.getItem("customusername")!= "signedout"){
            username=window.localStorage.getItem("customusername");
        } else {
            window.localStorage.setItem("customusername", json.username)
            username = json.username
        }
        console.warn("LIBRARY: "+library)
        if(library == "[]"&& json.error != "session_invalid"){
            console.log("1")
             noStudySheets()
        } else if (library == ""&& json.error != "session_invalid"){
            noStudySheets()
            console.log("2")
        } else if (library == null && json.error != "session_invalid"){
            noStudySheets()
            console.log("lib = null")
            console.log("3")
        }
        else{
            
            
            
            
            if (library==""){
                console.log("4")
                // document.getElementById("yourstudysheets").innerHTML = "Start by uploading a studysheet!";
                noStudySheets()
            } else if (library == "invalidsession"){
                console.log("5")
                failedSignIn();
            } 
            else{
                document.getElementById("homeusername").innerHTML = "Hello, "+username;
                
                hideLoadingView();
                window.localStorage.setItem("studysheetcount", library.length);
                let studysheetEntryContainer = document.getElementById("studysheetFlexContainer")
                const baseSheetHtml = `<div class="sheetEntry" id="{SHEET_ID}" length="{SHEET_LENGTH}" date_created="{SHEET_DATE_CREATED}" date_modified="{SHEET_DATE_MODIFIED}">
    <p>{SHEET_NAME}</p>
    <div>
        <svg class="studysheetEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.728 488.728" xmlns:v="https://vecta.io/nano"><path d="M487.147 462.52l-36.4-167.6c0-4.2-2.1-7.3-5.2-10.4l-261.3-261.3c-20-22.9-74.3-38.1-112.4 0l-47.9 47.9c-31 31-31 81.4 0 112.4l261.3 261.3c2.1 2.1 5.2 4.2 9.4 5.2l168.6 38.5c10.1 1.5 29.1-4.9 23.9-26zm-434.1-308.1c-15.6-15.6-15.6-39.6 0-55.2l47.9-47.9c15.2-15.2 40-15.2 55.2 0l238.4 238.4h-27.1c-11.4 0-20.8 9.4-20.8 20.8v34.3h-34.3c-11.4 0-20.8 9.4-20.8 20.8v26.1l-238.5-237.3zm280 261.3v-29.2h34.3c18 1.7 20.8-16.5 20.8-20.8v-34.4h29.2l24 109.3-108.3-24.9z"/></svg>
    </div>
</div>`
                for (i=0;i<library.length;i++){
                    let sheet_name = library[i].name
                    let sheet_id = library[i].studysheet_id

                    let length = library[i].length
                    let date_created = library[i].date_created
                    let date_modified = library[i].date_modified

                    let sheetHtml = baseSheetHtml.replace("{SHEET_NAME}", sheet_name)
                        .replace("{SHEET_ID}", sheet_id)
                        .replace("{SHEET_LENGTH}", length)
                        .replace("{SHEET_DATE_CREATED}", date_created)
                        .replace("{SHEET_DATE_MODIFIED}", date_modified)
                    
                    // convert to dom element
                    let sheetElement = document.createElement("div")
                    sheetElement.innerHTML = sheetHtml
                    sheetElement = sheetElement.firstChild

                    let editButton = sheetElement.getElementsByClassName("studysheetEdit")[0]
                    editButton.addEventListener("click", function(){
                        window.localStorage.setItem("chosenSheet", sheet_id)
                        window.location.href="studysheetpage.html";
                    })

                    console.log("Adding event listener to "+sheet_id)
                    sheetElement.addEventListener("click", function(){
                        console.log("clicked on "+sheet_id)
                        let selected = document.getElementsByClassName("selected")
                        for (let i=0;i<selected.length;i++){
                            selected[i].classList.remove("selected")
                        }
                        document.getElementById(this.id).classList.add("selected")

                        document.getElementById("termCount").innerHTML = this.getAttribute("length");
                        document.getElementById("lastModified").innerHTML = this.getAttribute("date_modified");
                        document.getElementById("created").innerHTML = this.getAttribute("date_created");
                        document.getElementById("createdBy").innerHTML = username;

                        window.localStorage.setItem("chosenSheet", sheet_id)
                    })
                    studysheetEntryContainer.appendChild(sheetElement)
                }
                studysheetEntryContainer.children[0].click()
            }
        }
    }
}

function sheetJsonInvalid(){
    showElement(document.getElementById("jsonMessedUp"))
    sendFeedback("[SYSTEM] [HOMEPAGE ERROR] UNREADABLE STUDYSHEET USERID "+window.localStorage.getItem("usertoken"))
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

async function deleteSS(){
    document.getElementById("loadingscreen").style.opacity = "1";
    document.getElementById("loadingscreen").classList = "verticalFlex";
    document.getElementById("loadingscreen").style.display = "flex"
    hideElement(document.getElementById("deleteConfirmation"))
    let sheetId = window.localStorage.getItem("chosenSheet")
    console.log("Sending DEL request for "+sheetId)
    link = connect()+"/"+sessionid+"/Studysheets/"+ sheetId+"/delete"
    console.log("link is: "+link)
    await httpGet(link)
    window.location.reload()


}

var reloads = 0;
function failedServerConnectionOnStart(){
    
    if (reloads < 2){
        getLibraryList()
        reloads++;
    } else {
        showElement(document.getElementById("failedServerConnection"))
    }

    console.log("failed server connection")
}

function goToSSPage(){
    // index = document.getElementsByClassName("selected")[0].id;
    // console.log("index is: "+index)
    // console.log("newarr[index] is: "+library[index])
    // window.localStorage.setItem("chosenSheet", library[index].studysheet_id)
    window.location.href="studysheetpage.html";
}


function sendFeedback(auto){
    let sessionid = window.localStorage.getItem("usertoken")
    let feedback = "[SYSTEM] error: feedback did not work"
    if (auto == null){
        feedback = document.getElementById("feedbackInput").value;
    } else {
        feedback = auto;
    }
    
    if (feedback == "" || feedback == null){
        alert("The feedback message cannot be nothing.")
    } else {
        document.getElementById("feedbackUIInputContainer").innerHTML = "Thank you for your feedback!"
        url = connect()+"/feedback/"+sessionid;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
    
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                // window.location.href="homepage.html";
            }
        };
        var data = feedback;
        console.log("sending " + data + " to " + url);
        xhr.send(data);
    }
}