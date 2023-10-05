function showBlocker(uniqueLine){
    if (uniqueLine == null){
        uniqueLine = "This feature requires connectivity with Lang's servers."
    }
    var html = `
    <div class="popupContainer" id="notificationPopup" style="opacity:1; pointer-events:all;">
        <div class="popup" style="width:700px; max-width: 90vw; display:flex; flex-direction:column; align-items:center;">
            <div class="horizonalFlex centerFlex" style="display:flex; margin:30px;">
                <img src="assets/icons/langerror.png" style="height:5vh;">
            </div>
            <div style="text-align: center;font-size: 30px; margin-bottom:10px;"><strong>You need a Lang account to proceed.</strong></div>
            <div style="text-align: center; font-size: 20px; margin-bottom:20px;" >${uniqueLine}</div>
            <div style="margin-top: 10px;">Please <strong>log in</strong> or <strong>create a new account</strong> below to continue using Lang.</div>
            <div class="button buttonHoverDark horizontalFlex centerFlex" style="width: 25%; margin-bottom: 0;" onclick="window.location.href='https://lye.software/signin?forward=langstudy.tech-homepage.html'">Log In</div>
            <div class="button buttonHoverDark horizontalFlex centerFlex" style="width: 25%;" onclick="window.location.href='https://lye.software/signup?forward=langstudy.tech-homepage.html'">Sign Up</div>
            <div style="font-size: 10px;">By signing up for an account, you agree to the Lang Terms of Service, which can be found <a href='langlegal.html' style="color: var(--primary-dark)">here</a></div>
        </div>
    </div>`
    document.body.innerHTML+=html;
}