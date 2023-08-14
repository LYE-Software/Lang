//Written by nwvbug- https://github.com/nwvbug 
//GitHub Repo: https://github.com/lye-software/Lang


var sessionid;
var toSend;
//saving & creator stuff
function saveToCloud(lucy, dl){
    sessionid = localStorage.getItem("usertoken");
    var okToUpload = true;
    customusername = localStorage.getItem("customusername");
    // document.getElementById("sendingLoader").style.display="";
    if (!lucy){
        showElement(document.getElementById("sendingLoader"));
    }
    if(document.getElementById("sstitle").innerHTML == "" && !lucy){
        showPopup("You forgot to name your Studysheet!")
        hideElement(document.getElementById("sendingLoader"));
        okToUpload = false;
    } else if (document.getElementById("sstitle").innerHTML.includes("/")){
        document.getElementById("sstitle").innerHTML = document.getElementById("sstitle").innerHTML.replace("/", "-");
    } 
    else if (document.getElementById("sstitle").innerHTML.includes("'")){
        document.getElementById("sstitle").innerHTML = document.getElementById("sstitle").innerHTML.replace("'", "\u2019");
    }
    else if (customusername == "invalidsession"){
        // document.getElementById("sendingLoader").style.display="none";
        hideElement(document.getElementById("sendingLoader"));
        document.getElementById("failedSignIn").style.display="";
    }
    else{
        filename = document.getElementById("sstitle").innerText;
        const studysheet = new Studysheet(filename);
        
        var all = document.querySelectorAll("div[data-input]")
        for (var i = 0; i>all.length; i++){
            all[i] = all[i].replaceAll("&nbsp;", "")
            all[i] = all[i].replaceAll("&nbsp;", "")
            all[i] = all[i].replaceAll("<div><br></div>", "")
            all[i] = all[i].replaceAll("<div><br></div>", "")
            if (all[i].getAttribute("data-text") == "Answer"){
                all[i] = all[i].replaceAll("\n", "_")
                all[i] = all[i].replaceAll("\n", "_")
                all[i] = all[i].replaceAll("\t", "   ")
                all[i] = all[i].replaceAll("\t", "   ")
            }
            
        }
        //loop through overalldivs, loop through each one and get all text input.
        //loop through array of text inputs and sort based on data-text value into correct array
        //sorting changes if multi
        var overallDivArray = document.getElementById("insideCreator").children;
        console.log("overall div array: "+overallDivArray)
        for (var i = 0; i<overallDivArray.length; i++){
            console.log("overall div array item "+i+" it is: "+overallDivArray[i])
        }
        var tester = 0;
        for (var i = 0; i<overallDivArray.length; i++){
            var hasImage = false;
            var currentDiv = overallDivArray[i];
            if (currentDiv.getAttribute("data-multi") == "false"){
                var textInputs = currentDiv.querySelectorAll("div[data-input]");
                console.log("textinputs: "+textInputs)
                console.log("textinput length "+textInputs.length)
                console.log("textinput vals: "+textInputs[0].innerHTML+" | "+textInputs[1].innerHTML)
                if (currentDiv.children[0].children[0].className == "showImageHolder"){
                    hasImage = true;
                }
                const term = new Term(false, textInputs[0].innerHTML, textInputs[1].innerHTML, hasImage);
                if (hasImage){
                    var imageUrl = currentDiv.children[0].children[0].src
                    imageUrl = imageUrl.split("/")
                    imageUrl = imageUrl[imageUrl.length-1];
                    term.addImage(imageUrl)                
                }
                studysheet.add(term);
            } else {
                var textInputs = currentDiv.querySelectorAll("div[data-input]");
                console.log("textinputs: "+textInputs)
                var terms = []
                var answers = []
                for (var j = 2; j<textInputs.length; j++){
                    if (j%2==0){
                        console.log("appending "+textInputs[j].innerHTML+" to terms")
                        terms.push(textInputs[j].innerHTML);
                    } else {
                        console.log("appending "+textInputs[j].innerHTML+" to answers")
                        answers.push(textInputs[j].innerHTML)
                    }
                }
                if (currentDiv.children[0].children[0].className == "showImageHolder"){
                    hasImage = true;
                }
                const term = new MultiTerm(terms, answers, textInputs[0].innerHTML, hasImage)
                if (hasImage){
                    var imageUrl = currentDiv.children[0].children[0].src
                    imageUrl = imageUrl.split("/")
                    imageUrl = imageUrl[imageUrl.length-1];
                    term.addImage(imageUrl)
                }
                studysheet.add(term)

            }
            tester = i;
        }

        console.log("i was: "+tester+" when it stopped and ovdivarr length was: "+overallDivArray.length)

        if (dl){
            okToUpload = false;
            save(JSON.stringify(studysheet), document.getElementById("sstitle").innerHTML)
            hideElement(document.getElementById("sendingLoader"));

        }

        if (okToUpload == true){
           
            if ((studysheet.returnRawData() == null || studysheet.returnRawData() == [] || studysheet.returnRawData == "" || studysheet.length == 0) && !lucy){
                showPopup("You cannot upload an empty Studysheet.");
                hideElement(document.getElementById("sendingLoader"));
                okToUpload = false;
            }
            
            var toUpload = JSON.stringify(studysheet)

            console.log(toUpload);

            // var convertedSS = Object.assign(new Studysheet, JSON.parse(toUpload));
            // convertedSS.parseTerms();
            // console.log(convertedSS.returnRawData());
            // console.log(convertedSS.name)
            // console.log(convertedSS.getNthTerm(0).check("test"))
            // console.log("ABOVE")

            if(window.localStorage.getItem('editSheet')=="true") {
                var url = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/edit/"+filename;
            } else {
                var url = "https://backend.langstudy.tech/"+sessionid+"/Studysheets/upload/"+filename;
            }
            if(okToUpload == true && !lucy){
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                if (sessionid != null){
                    console.log("sessionidHeader")
                    xhr.setRequestHeader("lye-session", sessionid)
                }
                xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                        window.location.href="homepage.html";
                    }
                };
                var data = toUpload;
                console.log("sending " + data + " to " + url);
                xhr.send(data);
            } else if (lucy){
                return toUpload;
            }
            
        }
    }
        
    
}


function creatorModeSelect(){
    override = true;

    if (window.localStorage.getItem("doLocal")=="true"){
        document.getElementById("localAdvanced").style.display = "";
        document.getElementById("exporter").style.display = "block";
    } else {
        console.log("Local Studying is disabled.")
    }

    if(window.localStorage.getItem("fullstudysheet")=="" || window.localStorage.getItem("fullstudysheet")==null){
        console.log("Entering Standard Creator Mode")
    } else if(window.localStorage.getItem('editSheet')=="true") {
        console.log("Entering edit mode")
        customWords = window.localStorage.getItem("fullstudysheet")
        var tmpss = parseFromJSON(customWords)
        window.localStorage.setItem("fullstudysheet", "");
        document.getElementById("topheader").innerHTML = "Editing "+window.localStorage.getItem("chosenSheet");
        document.getElementById("sstitle").innerHTML = window.localStorage.getItem("chosenSheet");
        for (i = 0; i<tmpss.length; i++){
            var term = tmpss.getNthTerm(i);
            
            if (term.isMulti){
                imageSrc = null;
                if (term.hasImage){
                    imageSrc = term.imageSrc
                }
                createCreatorInput(term.question, i, imageSrc)
                document.getElementById("tdc"+i).children[1].children[2].click();
                //document.getElementById("tdc"+i).children[1].children[1].innerHTML = term.question;
                console.log("WHAT IS THE TERM QUESTION:: "+term.question)
                var firstTwo = document.getElementById("tdc"+i).children[2].children[1].querySelectorAll("div[data-input]");
                firstTwo[0].innerHTML = term.terms[0];
                firstTwo[1].innerHTML = term.answers[0];
                var x = 3;
                for (var j =1; j<term.length; j++){
                    //continue making & filling after 1st alt
                    document.getElementById("tdc"+i).children[1].children[2].click();
                    var next = document.getElementById("tdc"+i).children[x].children[1].querySelectorAll("div[data-input]");
                    next[0].innerHTML = term.terms[j]
                    next[1].innerHTML = term.answers[j]
                    x++;
                }


            } else {
                console.log("why is that a zero??? term.answer: "+term.answer)
                imageSrc = null;
                if (term.hasImage){
                    imageSrc = term.imageSrc
                }
                makeInputs("single", i, term.term, term.answer, imageSrc)
            }
        }
        
    } else {
        console.log("Entering Quizlet Creator Mode")
        customWords = window.localStorage.getItem("fullstudysheet")
        let arrayText = customWords.split('\n')
        window.localStorage.setItem("fullstudysheet", "");
        document.getElementById("topheader").innerHTML = "Imported From Outside Source"
        for (i = 0; i<arrayText.length; i++){
            let wordPair = getRandomQuestion(customWords);
            createCreatorInput(wordPair[0], wordPair[1])
        }
    }
}



//creates new input fields for multi & single creators + assigns them ids
var currentId = "";
function makeInputs(version, idNum, question, answer, imageSrc){
    var inputMap = new Map();
    inputMap.set("")
    if (question == null && answer == null){
        question = "";
        answer = "";
    }
    if (version=="single"){
        console.log("answer going in: "+answer)
        createCreatorInput(question, answer, imageSrc)
    }
    else{
        
        console.log(currentId);
        var outDiv = document.createElement("div");
        outDiv.style.display = "flex";
        console.log("idnum: "+idNum)
        document.getElementById("tdc"+idNum).appendChild(outDiv);
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
        verbInput.setAttribute("data-text", "Question");
        verbInput.setAttribute("data-input", "true");
        verbInput.contentEditable="true";
        
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
        answerInput.setAttribute("data-input", "true");
        answerInput.contentEditable="true";
        answerInput.setAttribute("data-text", "Answer");
        
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

var generateIdV = 0
var generateIdA = 0
var generateIdYou = 0

function createCreatorInput(term, definition, imageSrc) {
    var br = document.createElement("div")
        
        br.dataset.image = "false";
        
            
        br.className = "overallContainer"
        br.id = "tdc"+generateIdA;
        br.setAttribute("data-multi", "false")
        br.setAttribute("data-idNum", generateIdA)
        document.getElementById("insideCreator").appendChild(br);
        id1 = "input"+generateIdV
        id2 = "ans"+generateIdA
        id3 = "button"+generateIdYou

        
        var imageHolder = document.createElement("div");
        br.append(imageHolder);

        var stuffHolder = document.createElement("div");
        stuffHolder.className = "termDefContainer";
        
        br.append(stuffHolder)


        var blankImage = document.createElement("img");
        if (imageSrc!= null){
            blankImage.src = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+imageSrc;
            blankImage.className = "showImageHolder";
        } else {
            blankImage.className = "defaultImageHolder";

        }
        imageHolder.append(blankImage);

        var verbInput = document.createElement('div');
        verbInput.id=id1;
        verbInput.className="term"
        verbInput.innerHTML=term;
        verbInput.setAttribute("data-text", "Question");
        verbInput.setAttribute("data-input", "true");
        verbInput.contentEditable="true";
        generateIdV++
            // verbInput.innerHTML="Put Term / Question Here";
        stuffHolder.appendChild(verbInput);
    
        var answerInput = document.createElement("div");
        answerInput.id=id2;
        answerInput.setAttribute("id",id2)
        answerInput.className="definition"
        answerInput.contentEditable="true";
        console.log("def going in is the: "+definition)
        answerInput.innerHTML=definition;
        answerInput.setAttribute("data-text", "Answer");
        answerInput.setAttribute("data-input", "true");
        generateIdA++
        // answerInput.innerHTML="Put Answer Here";
        stuffHolder.appendChild(answerInput);

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
            this.parentNode.parentNode.setAttribute("data-multi", "true")
            console.log(this.parentNode.parentNode)
            makeInputs("Multi", this.id.substring(6,this.id.length));
            
        }
        stuffHolder.appendChild(image);
        var svg = document.createElement("div");
        svg.innerHTML = trash_svg;
        svg.className = "trash";
        svg.onclick = function(){
            generateIdA--;
            generateIdV--;
            generateIdYou--;
            console.log(this)
            this.parentNode.parentNode.remove();
            
        }
        stuffHolder.appendChild(svg);

        var svg2 = document.createElement("div");
        svg2.innerHTML = image_svg;
        svg2.className = "trash";
        svg2.onclick = function(){
            parent = this.parentNode  
            grandparent = parent.parentNode         
            toPass = grandparent;
            grandparent.setAttribute("data-image","true")
            console.log("images go here")
            invokeFilereader(toPass)
        }
        stuffHolder.appendChild(svg2);
    
        var overallContainer = document.getElementById("langCreatorContainer");
        overallContainer.scrollTop = overallContainer.scrollHeight;

        // Handle the `paste` event
        verbInput.addEventListener('paste', function (e) {
            // Prevent the default action
            e.preventDefault();

            // Get the copied text from the clipboard
            const text = e.clipboardData
                ? (e.originalEvent || e).clipboardData.getData('text/plain')
                : // For IE
                window.clipboardData
                ? window.clipboardData.getData('Text')
                : '';

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                // Insert text at the current position of caret
                const range = document.getSelection().getRangeAt(0);
                range.deleteContents();

                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.selectNodeContents(textNode);
                range.collapse(false);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });

        // Handle the `paste` event
        answerInput.addEventListener('paste', function (e) {
            // Prevent the default action
            e.preventDefault();

            // Get the copied text from the clipboard
            const text = e.clipboardData
                ? (e.originalEvent || e).clipboardData.getData('text/plain')
                : // For IE
                window.clipboardData
                ? window.clipboardData.getData('Text')
                : '';

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                // Insert text at the current position of caret
                const range = document.getSelection().getRangeAt(0);
                range.deleteContents();

                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.selectNodeContents(textNode);
                range.collapse(false);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
}


function showSavePopup(){
    customusername = localStorage.getItem("customusername");

    if(document.getElementById("sstitle").innerHTML == ""){
        showPopup("You forgot to name your Studysheet!")
        hideElement(document.getElementById("sendingLoader"));
        okToUpload = false;
    }
    else {
        document.getElementById("studysheetTitlePreview").innerHTML = document.getElementById("sstitle").innerHTML;
        document.getElementById("amountOfTerms").innerHTML = document.getElementById("insideCreator").childElementCount+" Terms";
        document.getElementById("authorName").innerHTML = "By "+customusername;
        showElement(document.getElementById('savePopup'))
    }
    
}

var randomized = false;
var setup = true;
var continued = false;
var whatQuestion = 0;

function getRandomQuestion(textBlock) {
    console.log("random question ran")
    console.log("The stuff going into random q is: "+textBlock)
    
    if (setup == true){
        arrayText = textBlock.split('\n')
        setup = false;
    }
    
    console.log("arr text fdaf "+arrayText)
   
    
    let random_question = arrayText[whatQuestion];
    console.log(arrayText)
    console.log("what quest " + whatQuestion)
    console.log("array text length "+arrayText.length)
    console.log(random_question);
    var questionArray = JSON.parse(random_question);
    whatQuestion++;
   

    if (questionArray[0].includes("--image(")){
        let splitter = questionArray[0].split("--image(")
        let image = splitter[1]
        image = image.substring(0, 64);
        let urlForImage = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+image;
        questionArray.push(urlForImage);
        questionArray[0] = splitter[0] + image.substring(64, image.length);
        
        
    }

    return questionArray
    
    
    
    // document.getElementById('file').innerText = this.result; // places text into webpage
}


async function sendLucyMessage(){
    var url = "https://backend.langstudy.tech/v2/langbot/chat";
    var message = document.getElementById("LAquery").value;
    var typingIndicators = document.getElementById("typingIndicators")
    typingIndicators.classList.remove("hiddenTypingIndicators")
    showElement(document.getElementById("assistantThinking"))
    document.getElementById("LAquery").value = "";
    if (message == "" || message == " " || message == null){
        showPopup("You cannot send an empty message.")
        document.getElementById("lucyLoader").style.display = "none";
    } else{
        createUserBubble(message)
        
        var data = saveToCloud(true);
        console.log("data")
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        
        if (sessionid != null){
            console.log("sessionidHeader")
            xhr.setRequestHeader("lye-session", sessionid)
        }
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                if (xhr.status == 500){
                    console.error("Langbot internal server error (500)")
                    createBubble("Sorry, we encountered an error. You can try again, or edit your query.")
                    var typingIndicators = document.getElementById("typingIndicators")
                    typingIndicators.classList.add("hiddenTypingIndicators")
                    showPopup("Lang Assistant encountered an error. You can try again, or edit your query.")
                }
                else if (xhr.status == 200){
                    addResponse(xhr.responseText);
                } else{
                    console.error("Langbot internal server error")
                    createBubble("Sorry, we encountered an error. You can try again, or edit your query.")
                    var typingIndicators = document.getElementById("typingIndicators")
                    typingIndicators.classList.add("hiddenTypingIndicators")
                    showPopup("Lang Assistant encountered an error. You can try again, or edit your query.")
                }
                console.log(xhr.responseText);
            }
        };
        var data;
        toSend = JSON.parse('{"studysheet": null, "user_req": null}')
        // if (data == "" || data == null){
        //     toSend.studysheet = "{}";
        // }  else {
        //    
        // }
        toSend.studysheet = data;
        toSend.user_req = message;
        xhr.setRequestHeader("Content-Length", JSON.stringify(toSend).length) 
        console.log("sending " + JSON.stringify(toSend) + " to " + url);
        console.log(xhr)
        xhr.send(JSON.stringify(toSend));


        
    }
}

function addResponse(studysheetReturned){
    setup = true;
    console.warn("THE RESPONSE IS: "+studysheetReturned)
    hideElement(document.getElementById("assistantThinking"))
    document.getElementById("insideCreator").innerHTML = ""
    parsed = JSON.parse(studysheetReturned);
    console.log(parsed)
    
    parsedSheet = parseFromJSON(parsed.studysheet);
    response = parsed.langbot_response;
    for (i = 0; i<parsedSheet.length; i++){
        var term = parsedSheet.getNthTerm(i)
        if (term.isMulti){

        } else {
            createCreatorInput(term.term, term.answer)
        }
    }
    
    createBubble(response)
    var typingIndicators = document.getElementById("typingIndicators")
    typingIndicators.classList.add("hiddenTypingIndicators")
}

function createBubble(msg){
    var genericBubble = `
    <div class="message botSentMessage">
        <div>
            ${msg}
        </div>
    </div>
    `
    var newdiv = document.createElement("DIV")
    newdiv.innerHTML = genericBubble;
    document.getElementById("messageCont").insertBefore(newdiv, document.getElementById("typingIndicators"))
    
    
}

function createUserBubble(msg){
    var genericBubble = `
    <div class="message userSentMessage">
        <div>
            ${msg}
        </div>
    </div>
    `
    var newdiv = document.createElement("DIV")
    newdiv.innerHTML = genericBubble;
    document.getElementById("messageCont").insertBefore(newdiv, document.getElementById("typingIndicators"))
}



//SVGs and assets

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

var image_svg = `
<svg length="100% height="100%" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

        
    <g>
    <path d="m375.2 242.48-23.52 22.961c-3.9219 3.9219-10.078 3.3594-13.441-1.1211l-58.238-77.84c-3.9219-5.0391-11.199-4.4805-14.559 0.55859l-95.203 150.64c-3.9219 6.1602 0.55859 14 7.8398 14h216.72c7.8398-19.602 20.16-36.398 35.281-49.281l-41.441-58.238c-3.3594-5.0391-9.5195-5.6016-13.441-1.6797z"/>
    <path d="m435.12 171.36c0 18.25-14.793 33.039-33.043 33.039-18.246 0-33.039-14.789-33.039-33.039 0-18.246 14.793-33.039 33.039-33.039 18.25 0 33.043 14.793 33.043 33.039"/>
    <path d="m543.76 302.4v-229.04c0-7.8398-6.1602-14.559-14.559-14.559h-430.64c-7.8398 0-14.559 6.1602-14.559 14.559v339.92c0 7.8398 6.1602 14.559 14.559 14.559h319.2c12.32 42 50.961 72.801 96.879 72.801 56 0 101.36-45.359 101.36-101.36 0.003906-45.359-30.797-84.562-72.234-96.883zm-129.92 96.883h-301.28v-311.36h402.08v210.56c-55.438 0-100.8 45.359-100.8 100.8zm136.08-7.2812c-2.2383 3.9219-6.1602 6.7188-10.641 6.7188h-11.762v45.359c0 7.2812-5.6016 12.879-12.879 12.879-7.2812 0-12.879-5.6016-12.879-12.879v-45.359h-11.762c-4.4805 0-8.3984-2.2383-10.641-6.7188-2.2383-3.9219-1.6797-8.9609 1.1211-12.32l24.641-33.039c2.2383-2.8008 5.6016-4.4805 9.5195-4.4805 3.9219 0 7.2812 1.6797 9.5195 4.4805l24.641 33.039c2.8008 3.3594 3.3594 8.3984 1.1211 12.32z"/>
    <use x="70" y="644" xlink:href="#x"/>
    <use x="90.550781" y="644" xlink:href="#c"/>
    <use x="104.359375" y="644" xlink:href="#a"/>
    <use x="123.347656" y="644" xlink:href="#l"/>
    <use x="142.242188" y="644" xlink:href="#b"/>
    <use x="155.628906" y="644" xlink:href="#a"/>
    <use x="174.617188" y="644" xlink:href="#k"/>
    <use x="204.410156" y="644" xlink:href="#j"/>
    <use x="224.453125" y="644" xlink:href="#i"/>
    <use x="252.453125" y="644" xlink:href="#h"/>
    <use x="274.121094" y="644" xlink:href="#w"/>
    <use x="283.71875" y="644" xlink:href="#g"/>
    <use x="293.316406" y="644" xlink:href="#f"/>
    <use x="309.914062" y="644" xlink:href="#a"/>
    <use x="338.652344" y="644" xlink:href="#v"/>
    <use x="361.894531" y="644" xlink:href="#a"/>
    <use x="380.882812" y="644" xlink:href="#u"/>
    <use x="397.550781" y="644" xlink:href="#g"/>
    <use x="407.148438" y="644" xlink:href="#t"/>
    <use x="427.191406" y="644" xlink:href="#e"/>
    <use x="70" y="672" xlink:href="#s"/>
    <use x="82.183594" y="672" xlink:href="#c"/>
    <use x="95.992188" y="672" xlink:href="#d"/>
    <use x="115.226562" y="672" xlink:href="#r"/>
    <use x="154.152344" y="672" xlink:href="#b"/>
    <use x="167.535156" y="672" xlink:href="#q"/>
    <use x="187.46875" y="672" xlink:href="#a"/>
    <use x="216.207031" y="672" xlink:href="#p"/>
    <use x="239.640625" y="672" xlink:href="#d"/>
    <use x="258.878906" y="672" xlink:href="#o"/>
    <use x="278.8125" y="672" xlink:href="#e"/>
    <use x="308.492188" y="672" xlink:href="#n"/>
    <use x="329.015625" y="672" xlink:href="#c"/>
    <use x="342.820312" y="672" xlink:href="#d"/>
    <use x="362.058594" y="672" xlink:href="#m"/>
    <use x="371.65625" y="672" xlink:href="#a"/>
    <use x="390.648438" y="672" xlink:href="#f"/>
    <use x="407.242188" y="672" xlink:href="#b"/>
    </g>
</svg>


`

var arrowSVG = `

<svg width="145" height="218" viewBox="0 0 145 218" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 177L26 171.5L26 171.5L26 177ZM142.889 180.889C145.037 178.741 145.037 175.259 142.889 173.111L107.887 138.109C105.739 135.961 102.257 135.961 100.109 138.109C97.9612 140.257 97.9612 143.739 100.109 145.887L131.222 177L100.109 208.113C97.9612 210.261 97.9612 213.743 100.109 215.891C102.257 218.039 105.739 218.039 107.887 215.891L142.889 180.889ZM5.99999 157L11.5 157L11.5 157L5.99999 157ZM142.889 83.8891C145.037 81.7412 145.037 78.2588 142.889 76.1109L107.887 41.1091C105.739 38.9612 102.257 38.9612 100.109 41.1091C97.9612 43.257 97.9612 46.7394 100.109 48.8873L131.222 80L100.109 111.113C97.9612 113.261 97.9612 116.743 100.109 118.891C102.257 121.039 105.739 121.039 107.887 118.891L142.889 83.8891ZM26 182.5L139 182.5L139 171.5L26 171.5L26 182.5ZM26 171.5C17.9919 171.5 11.5 165.008 11.5 157L0.499989 157C0.499982 171.083 11.9167 182.5 26 182.5L26 171.5ZM8.99999 85.5H139V74.5H8.99999V85.5ZM0.499969 -2.98399e-05L0.499989 157L11.5 157L11.5 -3.11953e-05L0.499969 -2.98399e-05Z" fill="#001945"/>
</svg>

`


function save(data, title) {
    filename = title+".lang"
    
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