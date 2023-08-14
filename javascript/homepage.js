var library = [];
async function getLibraryList(){
    
    // check for local studying
    if (window.localStorage.getItem("doLocal")=="true"){
        document.getElementById("localAdvanced").style.display = "";
    } else {
        console.log("Local Studying is disabled.")
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
        serverData = await httpGet("https://backend.langstudy.tech/v2/home", false, sessionid)
        // await fetch('https://backend.langstudy.tech/"+sessionid+"/returnNameAndList').then(function(response) {
        //     return response.blob();
        // }).then(function(response) {
        //     serverData = response.text();
        // });        
        console.log("[TOTAL SERVER DATA] "+serverData)
        try {
             json = JSON.parse(serverData)
        } catch(error){
            console.error("IMPROPER JSON")
            json = null;
        }

        if (json.error == "session_invalid"){
            failedSignIn();
        }
        else if (json == null || json == ""){
            console.warn("Server Connection Failed! Trying Again...")
            serverData = await httpGet("https://backend.langstudy.tech/"+sessionid+"/returnNameAndList", false)
            json = JSON.parse(serverData)
            // await fetch('https://backend.langstudy.tech/"+sessionid+"/returnNameAndList').then(function(response) {
            //     return response.blob();
            // }).then(function(response) {
            //     serverData = response.text();
            // });

            console.log("[TOTAL SERVER DATA: SECOND TRY] "+serverData)
            
            if (json.error == "session_invalid"){
                failedSignIn();
            }
            else if (json == null || json == ""){
                console.error("Server Connection Failed upon second try. Aborting.")
                failedServerConnectionOnStart();
            }
            

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
                for (i=0;i<library.length;i++){
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
                    // div1.style.backgroundColor = "var(--primary-dark)";
                    div1.id = i;
                    div1.onclick = function(){
                        for (i=0;i<library.length;i++){
                            document.getElementById(i).classList.remove("selected");
                            document.getElementById("studysheet"+i).classList.remove("selected");
                            document.getElementById("studysheetDel"+i).classList.remove("selected");
                        }
                        document.getElementById(this.id).classList.add("selected");
                        
                        document.getElementById("studysheet"+this.id).classList.add("selected");
                        document.getElementById("studysheetDel"+this.id).classList.add("selected");
                        tmp = library[this.id]
                        document.getElementById("termCount").innerHTML = tmp.length;
                        document.getElementById("lastModified").innerHTML = tmp.date_modified;
                        document.getElementById("created").innerHTML = tmp.date_created;
                        document.getElementById("createdBy").innerHTML = username;

                    }
                    div2 = document.createElement("div");
                    div2.className = "studysheetName";
                    div2.style.color = "white"
                    div2.innerHTML = library[i].name;
                    div1.append(div2);

                    document.getElementById("studysheetGridContainer").append(div1);

                    div3 = document.createElement("div");
                    div3.style.justifyContent = "center";
                    div3.style.display = "flex";
                    div3.style.alignItems = "center";
                    // div3.style.backgroundColor = "var(--primary-dark)";
                    div3.innerHTML=`<svg style="fill: white" class="studysheetEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.728 488.728" xmlns:v="https://vecta.io/nano"><path d="M487.147 462.52l-36.4-167.6c0-4.2-2.1-7.3-5.2-10.4l-261.3-261.3c-20-22.9-74.3-38.1-112.4 0l-47.9 47.9c-31 31-31 81.4 0 112.4l261.3 261.3c2.1 2.1 5.2 4.2 9.4 5.2l168.6 38.5c10.1 1.5 29.1-4.9 23.9-26zm-434.1-308.1c-15.6-15.6-15.6-39.6 0-55.2l47.9-47.9c15.2-15.2 40-15.2 55.2 0l238.4 238.4h-27.1c-11.4 0-20.8 9.4-20.8 20.8v34.3h-34.3c-11.4 0-20.8 9.4-20.8 20.8v26.1l-238.5-237.3zm280 261.3v-29.2h34.3c18 1.7 20.8-16.5 20.8-20.8v-34.4h29.2l24 109.3-108.3-24.9z"/></svg>`
                    div3.style.stroke = "var(--primary-light)";
                    div3.setAttribute("studysheet", library[i].name);
                    div3.id = "studysheet"+i;
                    div3.onclick = function(){
                        var studysheetname = document.getElementById(this.id).getAttribute("studysheet")       
                        window.localStorage.setItem("chosenSheet", studysheetname)
                        window.location.href="studysheetpage.html";
                    }


                    div5 = document.createElement("div");
                    div5.style.display = "flex";
                    div5.style.alignItems = "center";
                    div5.style.justifyContent = "center";
                    // div5.style.backgroundColor = "var(--primary-dark)";
                    div5.setAttribute("studysheet", library[i].name);
                    div5.id = "studysheetDel"+i;
                    div5.onclick = async function(){

                        //showElement(document.getElementById("deleteConfirmation"))

                        
                    }
                    //div5.innerHTML=`<svg class="studysheetDelete" width="24px" height="24px" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><path d="M17 9L11 15M11.0002 9L17.0002 15M9 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H9L3 12L9 6Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                    document.getElementById("studysheetGridContainer").append(div5);

                    document.getElementById("studysheetGridContainer").append(div3);

                }
                
                tmp = library[0]
                document.getElementById("termCount").innerHTML = tmp.length;
                document.getElementById("lastModified").innerHTML = tmp.date_modified;
                document.getElementById("created").innerHTML = tmp.date_created;
                document.getElementById("createdBy").innerHTML = username;
                document.getElementById("0").classList.add("selected");
                document.getElementById("studysheet0").classList.add("selected");
                document.getElementById("studysheetDel0").classList.add("selected");
            }
        }
    }
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
    index = document.getElementsByClassName("selected")[0].id;
    console.log("index is: "+index)
    console.log("newarr[index] is: "+library[index])
    document.getElementById("loadingscreen").style.opacity = "1";
    document.getElementById("loadingscreen").classList = "verticalFlex";
    document.getElementById("loadingscreen").style.display = "flex"
    hideElement(document.getElementById("deleteConfirmation"))
    link = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/"+ library[index].name+"/delete"
    console.log("link is: "+link)
    await httpGet(link)
    window.location.reload()


}


function failedServerConnectionOnStart(){
    showElement(document.getElementById("failedServerConnection"))
    console.log("failed server connection")
}

function goToSSPage(){
    index = document.getElementsByClassName("selected")[0].id;
    console.log("index is: "+index)
    console.log("newarr[index] is: "+library[index])
    window.localStorage.setItem("chosenSheet", library[index].name)
    window.location.href="studysheetpage.html";
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
                // window.location.href="homepage.html";
            }
        };
        var data = feedback;
        console.log("sending " + data + " to " + url);
        xhr.send(data);
    }
}