const SERVER_VAR = "wss://backend.langstudy.tech"
//connect to the server via socket.io
const socket = io(SERVER_VAR);

//connect event
socket.on('connect', () => {
    console.log("connected to server");
});


function sendMessage() {
    startAnimation()
    //get the message from the input field
    var text = document.getElementById("thearea").value;
    // json = `{"session":"${window.localStorage.getItem("usertoken")}", "data":"${text}"}`;
    // json = JSON.stringify(json);
    var badjson = `${window.localStorage.getItem("usertoken")}|${text}`;
    //send the message to the server
    console.log("json: "+badjson)
    socket.emit('langbot_notes', badjson);
    //clear the input field
    document.getElementById("thearea").value = "";
}


//listen for langbot_notes event
socket.on('langbot_notes', (message) => {
    console.log(message);
    addNote(message)
});


socket.on('langbot_notes_done', (message) => {
    console.log("done");
    //create a new p element
    var p = document.createElement("p");
    //set the innerHTML to the message
    p.innerHTML = message;
    var parsedMessage = JSON.parse(message)
    console.log(parsedMessage)
    if (parsedMessage.error == "session_invalid" || parsedMessage.error == "ratelimit_exceeded"){
        console.log("ratelimited")
        setTimeout(function(){
            addNote("You have exceeded your allotted Lang Assistant quota for today (11/11 requests). Check back tomorrow.")
        }, 1250)
    } else{
        console.log("success")
        window.localStorage.setItem("fullstudysheet", message);
        //window.location.href="creator.html";
    }
    
});