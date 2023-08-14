var review = false;
var term;

function review(term){
    write(term)
    review = true;
}

function write(term_, reviewing){
    document.getElementById("term_image").style.display = "none";
    if (reviewing == null){
        reviewing = false;
    }
    review = reviewing
    document.getElementById("write").style.display = "";
    term = term_;
    
    if (term.hasImage){
        let urlForImage = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+term.imageSrc;
        document.getElementById("term_image").children[0].src = urlForImage;
        document.getElementById("term_image").style.display = "";
    }
    document.getElementById("displayWord").innerHTML = term.term;
}

function checkWrite(){
    usrInput = input.value.toLowerCase();
    usrInput = usrInput.trim();
    if (usrInput == "" || usrInput == null){
        console.log("[WRITE] nothing detected")
    } else {
        console.log("[WRITE]Checking answer by comparing "+usrInput+" to "+term.answer.toLowerCase())
        if (usrInput == term.answer){
            console.log("[WRITE]Answer determined to be correct")
            // console.log("Advancing T "+t+"which would be "+group[t])
            
            
            document.getElementById("goButton").style.backgroundColor = "#3e8e41"
            setTimeout(function () { document.getElementById("goButton").style.backgroundColor = "wheat" }, 1000)
            
            advance(term)
            
        }
        else{
            console.log("[WRITE]Answer determined to be incorrect")
            
            document.getElementById("goButton").style.backgroundColor = "#ce1483"
            document.getElementById("wherearewe").innerHTML = "Correct answer was: "+term.answer
            setTimeout(function () { document.getElementById("goButton").style.backgroundColor = "wheat" }, 1000)
            setTimeout(function () { document.getElementById("wherearewe").innerHTML = "" }, 4000)
        }
        if (!review){
            postModeChecks()
        } else {
            groupLoc()
            plusCorrect()
            logic()
        }
        input.value = "";
    }
    
    
}


function multipleChoice(term_, arr){
    document.getElementById("term_image_mcq").style.display = "none";
    document.getElementById("multchoice").style.display="flex"
    document.getElementById("questionheader").innerHTML = term_.term
    term = term_;
    console.log("[MULT] arr: "+arr)
    var fakes = getMultiFakes(term_, arr)
    if (term.hasImage){
        let urlForImage = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+term.imageSrc;
        document.getElementById("term_image_mcq").children[0].src = urlForImage;
        document.getElementById("term_image_mcq").style.display = "";
    }
    fakes.push(term_)
    console.log("[MULT] pre-random "+fakes)
    for (let z = fakes.length - 1; z > 0; z--) {
        const j = Math.floor(Math.random() * (z + 1));
        const temp = fakes[z];
        fakes[z] = fakes[j];
        fakes[j] = temp;
    }
    console.log("[MULT]fakes: "+fakes)
    document.getElementById("a").innerHTML = fakes[0].answer;
    document.getElementById("b").innerHTML = fakes[1].answer;
    document.getElementById("c").innerHTML = fakes[2].answer;
    document.getElementById("d").innerHTML = fakes[3].answer;

}

function getMultiFakes(real, arr){
    var seperate = []
    for (var i=0; i<arr.length; i++){
        if (real.answer == arr[i].answer){
            console.log("[MULT]found answer "+arr[i].answer+ " at index + "+i)
        } else {
            console.log("[MULT] pushing "+arr[i].answer+" at index "+i)
            seperate.push(arr[i])
        }
    }
    console.log("[MULT]arr is now: "+seperate)
    for (let z = seperate.length - 1; z > 0; z--) {
        const j = Math.floor(Math.random() * (z + 1));
        const temp = seperate[z];
        seperate[z] = seperate[j];
        seperate[j] = temp;
    }

    return [seperate[0], seperate[1], seperate[2]]
}

async function checkMulti(letter){
    if (document.getElementById(letter).innerHTML == term.answer){
        document.getElementById(letter).style.backgroundColor = "#3e8e41";
        await sleep(1000);
        document.getElementById(letter).style.backgroundColor = "wheat";
        advance(term);
    } else {
        var arrOf = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")]
        var correctId;
        for (var i = 0; i<arrOf.length; i++){
            if (arrOf[i].innerHTML == term.answer){
                correctId = arrOf[i].id;
            }
        }
        document.getElementById(correctId).style.backgroundColor = "#3e8e41";
        document.getElementById(letter).style.backgroundColor = "red";
        await sleep(1000);
        document.getElementById(correctId).style.backgroundColor = "wheat";
        document.getElementById(letter).style.backgroundColor = "wheat";
    }
    postModeChecks()
}

function learn(term_){
    document.getElementById("term_image_learn").style.display = "none";
    term = term_;
    if (term.hasImage){
        let urlForImage = "https://backend.langstudy.tech/"+window.localStorage.getItem("usertoken")+"/image/get/"+term.imageSrc;
        document.getElementById("term_image_learn").children[0].src = urlForImage;
        document.getElementById("term_image_learn").style.display = "";
    }
    document.getElementById("TermAndDef").style.display = "";
    document.getElementById("term").innerHTML = term_.term;
    document.getElementById("def").innerHTML = term_.answer;
}

function completeLearn(){
    advance(term)
    postModeChecks()
}