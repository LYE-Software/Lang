var elem = document.getElementById("contentdiv")
function clearAll(){
    var usrname = window.localStorage.getItem("customusername")
    document.getElementById("contentdiv").innerHTML = `<h1 id='name'>${usrname}</h1>`
    var arr = document.getElementsByClassName("option");
    for (var i = 0; i<arr.length; i++){
        arr[i].style.backgroundColor = "white";
        
    }
}

function stats(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    var date = "[user sign up date coming soon]"
    var amt = "0"
    var last = "---"
    if (window.localStorage.getItem("studysheetcount")!=null && window.localStorage.getItem("studysheetcount")!=""){
        amt = window.localStorage.getItem("studysheetcount")
    } 
    if (window.localStorage.getItem("lastsheet")!=null && window.localStorage.getItem("lastsheet")!= ""){
        last = window.localStorage.getItem("lastsheet")
    }
    var data = `
    <p>You have <strong>${amt} Studysheets.</strong></p>
    <p>You last studied <strong>${last}</strong>.</p>
    <p>More statistics coming soon!</p>
    `
    append(data)
}

function manage(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    var data = `
    <p>Lang uses the Lye Account System for account management.</p>
    <p>Edit your account details here:</p>
    <button class="button" onclick="window.location.href='https://lye.software/manageuser'">Manage Lye Account</button>
    `
    append(data)
}

function switchAcc(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    var data = `
    <p>Sign out of Lang Study here, or switch to a different user account.</p>
    <button class="button" onclick="signout()">Sign Out</button>
    <button class="button" onclick="window.location.href='https://lye.software/signin?forward=langstudy.tech-homepage.html'">Switch Users</button>
    `
    append(data)
}

function display(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    var data = `
    <div class="">
    <p  font-weight:bold;" class="">Disable Fireflies</p>

        <label class="switch" style="display: inline-block"> 
            <input id = "firefliesChoice" type="checkbox" onclick="doFireflies()">
            <span class="slider round"></span>
        </label>
        </div>
        <p>This disables the glowing spot effect floating on the homepage.</p>
    <p style="margin-top: 20px; font-weight:bold;">More display customization is coming soon, including custom colors.</p>
    `
    append(data)
    if (window.localStorage.getItem("doFireflies") == "false"){
        document.getElementById("firefliesChoice").checked = true;
    }
}

function connect(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    data = `
    <p>You are connected to <strong>LS-1-APPL</strong>.</p>
    <p>To report a connection issue with this server, please use the feedback option on the homepage.</p>
    <p>Server connections are made automatically, and you may be connected to multiple different Lang Servers during use. If you experience a connection issue, please report the <strong>server name</strong> and the <strong>issue you encountered.</strong></p>
    `
    append(data)
}

function adv(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    var data = `
    <div class="">
        <p class="">Enable Debug Mode</p>
        <label class="switch" style="display: inline-block"> 
            <input id = "localchoice" type="checkbox" onclick="localAdvanced()">
            <span class="slider round"></span>
        </label>
    </div>
    <p>Debug mode allows for downloading of Lang Studysheets to better resolve issues.</p>
    <p><strong>This feature is meant for developers and those interested in how Lang operates. Please use caution when in Debug mode.</strong></p>`
    append(data)
    if (window.localStorage.getItem("doLocal") == "true"){
        document.getElementById("localchoice").checked = true;
    }
}

function build(elem){
    clearAll()
    elem.style.backgroundColor = "#f5deb3"
    document.getElementById("name").innerHTML = "About Application"
    data = `
    <div>
        <div style="display:flex; justify-content:space-evenly;">
        <img style="height:100px; " src='assets/logos/Lang 5.png'>  
        </div>
        <p>Lang Client: Version 5.0.0</p>
        <p>Lang Servers: LS Version 2</p>
        <p>Lang Assistant: LA Version 2</p>
        <p>Lang is owned by Lye Software, Inc.</p>
        <div style="display:flex; justify-content:space-evenly;">
            <img style="height:75px; " src='https://raw.githubusercontent.com/nwvbug/nwvbug-logos/main/lye%20logo/lyelogo.png'>  
        </div>
    </div>
   
    `
    append(data)
}

function getname(){

    document.getElementById("homeusername").innerHTML = window.localStorage.getItem("customusername")
    document.getElementById("name").innerHTML = window.localStorage.getItem("customusername")

}

function append(data){
    document.getElementById("contentdiv").innerHTML+=data;
}

function signout(){
    window.localStorage.setItem("usertoken", "signedout")
    window.localStorage.setItem("customusername", "")
    window.location.href = "homepage.html"
}

function hideDebug(e){
    hideElement(e)
    document.getElementById("localchoice").checked = false;
    window.localStorage.setItem("doLocal", "false")
}

function hideAndKeepOn(e){
    hideElement(e)
    window.localStorage.setItem("doLocal", true)
    

}

function localAdvanced(){
    console.log("Local Advanced")
    if (document.getElementById("localchoice").checked == true){
        showElement(document.getElementById("localPrompt"))
        window.localStorage.setItem("doLocal", "true")
    } else {
        window.localStorage.setItem("doLocal", "false")
    }
}


function doFireflies(){
    if (document.getElementById("firefliesChoice").checked == true){
        console.log("fireflies toggled off");
        window.localStorage.setItem("doFireflies", "false");
        
        

        

    }
    else{
        console.log("fireflies toggled on");
        window.localStorage.setItem("doFireflies", "true");
        
    }
}
