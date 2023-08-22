const SERVER_LIST = [
    "https://relay.langstudy.tech:853",
    "https://backend.langstudy.tech"
]

var override = "LS-1-APPL"

function connect(){
    var random = parseInt(Math.random()*2);
    console.log(random)
    if (override == "LS-2-ASUS"){
        console.log("OVERRIDDEN, GOING TO LS-2-ASUS")
        return SERVER_LIST[0]
    } else if (override == "LS-1-APPL"){
        console.log("OVERRIDDEN, GOING TO LS-1-APPL")
        return SERVER_LIST[1]
    } else{
        console.log("LOAD BALANCING")
        if (window.localStorage.getItem("serverStatus") == "no-issues"){
            console.log("no issues")
            if (random == 0){
                window.localStorage.setItem("currentServer", "LS-2-ASUS")
                return SERVER_LIST[0]
            } else {
                window.localStorage.setItem("currentServer", "LS-1-APPL")
                return SERVER_LIST[1]
            }
        } else {
            var serverStatusHandling = window.localStorage.getItem("serverStatus");
            var json_svr = JSON.parse(serverStatusHandling);
            console.log("issue with "+json_svr.server+", avoiding")
            if (json_svr.server == "LS-1-APPL"){
                return SERVER_LIST[0]
            } else {
                return SERVER_LIST[1]
            }
        }
    }
    
}