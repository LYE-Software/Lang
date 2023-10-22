
class LangError{

    constructor(devMessage, filename, lineno, where, userReadable, show, additionalInfo){
        console.log("LangError is handling the error.")
        console.log(devMessage, filename, lineno, where, userReadable, show)
        this.filename = filename;
        this.lineno = lineno;
        this.where = where;
        this.userReadable = userReadable;
        this.devMessage = devMessage;
        this.additionalInfo = additionalInfo;
        if (show){
            this.showError();
        }
        this.reportError();
        console.error(devMessage)
    }

    showError(){
        var background = document.createElement("DIV");
        background.style.width = "100vw";
        background.style.height = "100vh";
        background.style.display = "flex";
        background.style.alignItems = "center";
        background.style.justifyContent = "center";
        background.style.position = "absolute";
        background.style.top = "0";
        background.style.zIndex = "10000";
        background.style.backgroundColor = "rgba(46, 2, 2, 0.5)";
        document.body.appendChild(background);

        var popup = document.createElement("DIV");
        popup.style.backgroundColor = "#f5deb3";
        popup.style.width = "500px";
        popup.style.padding = "20px";
        popup.style.height = "600px";
        popup.style.textAlign = "center";
        popup.style.borderRadius = "20px";
        popup.innerHTML = "<img src='../assets/icons/langerror.png' style='width:100px; height:100px;'><h1>[Lang Error]</h1>\n<h3>"+this.userReadable+"<h3>\n\n<p><strong>We apologize for this. Most errors can be fixed by restarting your Lang session. A bug report was sent to the Lang Study team and we are working on fixing the issue.</strong></p><p style='font-weight:100;'><em>Error Information (For Lang Developers): "+this.devMessage+"</em></p><button style='width:150px; height:70px; background-color:#001945; color:wheat; border-radius:15px; font-family:Poppins;' onclick='window.location.href=\"../homepage.html\"'>Home</button>";
        background.appendChild(popup)
    }

    reportError(){
        let sessionid = window.localStorage.getItem("usertoken")
        if (sessionid == "" || sessionid == null){
            console.log("Unable to report error. Returning.")
            return;
        }
        if (location.hostname!="langstudy.tech"){
            console.log("Not on LANGSTUDY- not reporting.");
            console.log("Would have reported this: ")
            var em = "[AUTO ERROR LOG ON "+this.filename+"]" + "Line#: "+this.lineno+" | Program desc: "+this.where+" | Shown to User: "+this.userReadable+" | ERROR MESSAGE: "+this.devMessage +" | Additional Info: "+this.additionalInfo;
            console.log(em);
            return;
        }
        var em = "[AUTO ERROR LOG ON "+this.filename+"]" + "Line#: "+this.lineno+" | Program desc: "+this.where+" | Shown to User: "+this.userReadable+" | ERROR MESSAGE: "+this.devMessage +" | Additional Info: "+this.additionalInfo;
        var url = "https://backend.langstudy.tech/feedback/"+sessionid;
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
        var data = em;
        console.log("sending " + data + " to " + url);
        xhr.send(data);
    }
}