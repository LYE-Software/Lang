const SERVER_LIST = [
    "https://relay.langstudy.tech:853",
    "https://backend.langstudy.tech"
]

function connect(){
    var random = parseInt(Math.random()*2);
    console.log(random)
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