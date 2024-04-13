const socket = io();


socket.on("studysheet_edit", function(data){
    if (my_used_nonces.includes(data.nonce)){
        console.log("own req, ignoring")
    } else {

        let intentions = data.type;
        console.log("PACKET RECIEVED: ")
        console.log(data)
        switch(intentions){

            case "editor_joined":
                let joinedNotif = new PopupBuilder(is_notif=true, notif_settings={duration: 3000});
                joinedNotif.add(new PopupText("Editor joined!").setStyle("font-size: 20px; font-weight: bold; margin: 0;"));
                joinedNotif.add(new PopupText(data.editor_username+" joined the room.").setStyle("font-size: 15px; margin: 0;"));
                joinedNotif.show();
                break;

            case "full_sheet_update":
                sheet = data.studysheet_json;
                hideLoaders();
                break;

            case "invalid_permissions":
                showWaitingRoom();
                break;

            case "editor_trying_join":
                let requestNotif = new PopupBuilder(is_notif=true, notif_settings={duration: 3000});
                requestNotif.add(new PopupText("Editor wants to join").setStyle("font-size: 20px; font-weight: bold; margin: 0;"));
                requestNotif.add(new PopupText(data.editor_username+" wants to join the room.").setStyle("font-size: 15px; margin: 0;"));
                requestNotif.add(new PopupButton("Accept", function(){
                    socket.emit("studysheet_edit", {
                        "type":"accept_editor",
                        "sheet_id":sheetId,
                        "owner_id":ownerId,
                        "editor_id":data.editor_id,
                        "editor_username":data.editor_username
                    })
                }))
                requestNotif.add(new PopupButton("Deny", function(){
                    socket.emit("studysheet_edit", {
                        "type":"deny_editor",
                        "sheet_id":sheetId,
                        "owner_id":ownerId,
                        "editor_id":data.editor_id,
                        "editor_username":data.editor_username
                    })
                }))
                requestNotif.show();
                break;

            case "editor_accepted":
                sendRoomConnectRequest();
                hideElement(document.getElementById("WaitingRoom")); //swap from waitinglist back to loader
                showElement(document.getElementById("LoadingScreen"));
                break;

            case "update":
                update_json(sheet, data.path, data.value, data.update_type, false);
                break;
        }
    }
});


function sendRoomConnectRequest(){
    socket.emit("studysheet_edit", {
        "type":"register_editing",
        "sheet_id":sheetId,
        "owner_id":ownerId
    });
}



function update_json(json_data, path, value, type, propagate=true, ) { 
    console.log("Setting " + path + " to " + value + " (" + type + ")")
    var path = path.split('.');
    for (let i = 0; i < path.length; i++) {
        if (!isNaN(path[i])) {
            path[i] = parseInt(path[i]);
        }
    }
    let obj = json_data;

    if (type == "set_value") { //changed from lyelists
        for (let i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]];
        }
        obj[path[path.length - 1]] = value;
    } else if (type == "remove_key") {
        for (let i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]];
        }
        delete obj[path[path.length - 1]];
    }

    if (type == "add_to_array") {
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        obj.push(value);
    } else if (type == "remove_from_array") {
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        obj.splice(value, 1);
    }

    window.localStorage.setItem("fullstudysheet", JSON.stringify(initialSheet));

    if (propagate && doCloudsave) {
        socket.emit('studysheet_edit', {
            type: "update",
            updates: [
                {
                    update_type: type,
                    json_data: json_data,
                    path: path,
                    value: value,
                    nonce: get_nonce()
                }
            ],
            sheet_id:sheetId,
            owner_id:ownerId
        });
    } else {
        console.log("Not propogating")
    }

    //DOM


}