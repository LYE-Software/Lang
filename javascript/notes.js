const SERVER_VAR = "wss://backend.langstudy.tech"
//connect to the server via socket.io
const socket = io(SERVER_VAR);

//connect event
socket.on('connect', () => {
    console.log("connected to server");
});


function sendMessage() {
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
    //create a new p element
    var p = document.createElement("p");
    //set the innerHTML to the message
    p.innerHTML = message;
    //append the p element to the chatbox div
    document.body.appendChild(p);
});


socket.on('langbot_notes_done', (message) => {
    console.log("done");
    //create a new p element
    var p = document.createElement("p");
    //set the innerHTML to the message
    p.innerHTML = message;
    p.style.color = "green";
    //append the p element to the chatbox div
    document.body.appendChild(p);
});