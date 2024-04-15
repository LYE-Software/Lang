const notifications = [
    `<div class="notifBox">
    <h3>New Train Features!</h3>
    <p>Train has been upgraded: Now your progress is saved! Additionally, error complaints were addressed and have been fixed.</p>
    </div>`,
    `<div class="notifBox">
    <h3>Flashcards fixed!</h3>
    <p>Flashcards has been updated to fix some errors with rapid movement through cards. Also, it has a pretty animation now!</p>
    </div>`,
    `<div class="notifBox">
    <h3>December is here!</h3>
    <p>Lang's background has once again been updated to match the December timeframe. Enjoy the snow, and good luck on finals!<br><br><i>If you do not like the snow, it causes performance issues, or you live in a place where it is not winter right now, feel free to disable the backgrounds in settings.</i></p>
    </div>`,
    `<div class="notifBox">
    <h3>Changes coming soon.</h3>
    <p>I thought we'd give you a heads up for some new things we are working on for Lang:<br><br><strong>Practice Test Styles</strong>- Make a practice test in the style of an AP FRQ, MCQ, or anything you can think of!</p>
    </div>`,
    `<div class="notifBox">
    <h3>We're working on it!</h3>
    <p>Huge thank-yous to everyone using Lang and reporting errors in the bug / feedback reporter. We see your messages and are working on them. Train's patch has already rolled out and Practice Test is getting upgrades soon. New features are on their way!</p>
    </div>`,
    `<div class="notifBox">
    <h3>Thank you for using Lang!</h3>
    <p>Thank you for signing up to Lang! Your support allows us to continue providing this service free for all.</p>
    </div>`
]

function displayNotifications(){
    
}

function hideElement(element) {
    element.style.pointerEvents = "none";
    element.style.opacity = "0";
}

function showElement(element) {
    element.style.pointerEvents = "auto";
    element.style.opacity = "1";
}

function showPopup(textToShow){
    showElement(document.getElementById("popup"));
    try{
        hideElement(document.getElementById("savePopup"))
    } catch (error){
        console.log("not on creator")
    }
    document.getElementById("popupText").innerHTML = textToShow;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deactivate(element){
    console.log("deactivating "+element)
    element.style.backgroundColor = "#85888c"
    element.pointerEvents = "none"
}

function reactivate(element, prev){
    console.log("activating "+element)
    element.style.backgroundColor = prev
    element.pointerEvents = "all"
}


function moveBar(newAmt, elem){
    elem.style.width = newAmt + '%';
}

// CRITICAL
my_used_nonces = []
function get_nonce() {
    let nonce = Math.floor(Math.random() * 1000000000);
    my_used_nonces.push(nonce);
    return nonce;
}