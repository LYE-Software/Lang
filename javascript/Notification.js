class Notification {
    constructor(title, body, priority){
        this.title = title; this.body = body; this.priority = priority;
    }

    getHTML(){
        if (this.priority){
            var html = `
            
            `
        }
    }

    static checkIfUnreads(){
        if (window.localStorage.getItem("notifs") != amountOfNotifications){
            document.getElementById("notif").className = "notif hasUnreads"
        } else {
            document.getElementById("notif").className = "notif"
        }
    }
}