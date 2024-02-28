function splitIntoLinesRegex(text, file){ //returns lineArray
    var regex = /[!?]+|(?<!\.)\. (?!\.)((?<!Mr\.|Ms\.)(?<!Mrs\.))/;
    var splitted = text.split(regex);
    console.log(splitted);
    return createLines(splitted, file);
}

function splitIntoLinesGPT(text, file){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://util.nwvbug.com/langpresent/aisplit");
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            var reply = xhr.responseText;
            var splitted = reply.split("\n")
            console.log(splitted)
            return splitted;
        }
    };
    xhr.send(text);
}

function createLines(textArray, file){ //returns lineArray
    var lineArray = [];
    for (var i = 0; i<textArray.length; i++){
        if (textArray[i] != null && textArray[i] != ""){
            lineArray.push(new Line(textArray[i], file));
        }
    }
    return lineArray;
}

class Presentation{
    constructor(name, lines, type){
        this.name = name;
        this.lines = lines;
        this.length = lines.length;
        this.type = type;
    }

    getLine(n){
        return this.lines[n];
    }

    addLine(newLine){
        this.lines.push(newLine)
    }

    getType(){
        return this.type;
    }
}

class Line{
    constructor(data, file){
        this.data = data;
        this.file = file;
        this.confidence = 6;
    }

    getText(){
        return this.data;
    }

    getImage(){
        return this.file;
    }

    isNewImage(old){
        if (this.file == old){
            return false;
        } return true;
    }
    //confidence ratings: 6,5,4,3,2,1 (1 is completely confident, all words removed, 6 is not confident at all, no words removed)

    getReviewLine(){
        if (this.confidence == 6){
            return this.data;
        }
        var wordArrayLen = this.data.split(" ").length;
        var wordArray = this.data.split(" ")
        //console.log("WA: "+wordArray)
        var toRemove = wordArrayLen/this.confidence;
        toRemove = Math.round(toRemove);
        //console.log(toRemove)
        var arr = [];
        while(arr.length < toRemove){
            var r = Math.floor(Math.random() * wordArrayLen);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        //use n (confidence score) to return a partial line with dashes or something where the words are missing
        //console.log(arr)
        for (var i = 0; i<arr.length; i++){
            var word = wordArray[arr[i]]
            //console.log(word)
            var dashes = "";
            for (var j = 0; j<word.length; j++){
                dashes = dashes+"-"
            }
            wordArray[arr[i]] = dashes;
        }

        var newLine = "";
        for (var i = 0; i<wordArrayLen; i++){
            newLine = newLine + wordArray[i] + " ";
        }
        return newLine.trim();
    }

    rankUpConfidence(){
        console.log("Getting more confident")
        if (this.confidence==1){
            console.log("Most confident;")
        } else {
            this.confidence--;
        }
    }

    rankDownConfidence(){
        console.log("Getting less confident")
        if (this.confidence==6){
            console.log("Least confident;")
        } else {
            this.confidence++;
        }
    }
}



//testing

l = new Line("Yo administraría un equipo pequeño. También, dirigiría reuniones sobre nuevos inventos para la compañía.", null);

console.log("6: "+l.getReviewLine());
l.rankUpConfidence();
console.log("5: "+l.getReviewLine());
l.rankUpConfidence();
console.log("4: "+l.getReviewLine());
l.rankUpConfidence();
console.log("3: "+l.getReviewLine());
l.rankUpConfidence();
console.log("2: "+l.getReviewLine());
l.rankUpConfidence();
console.log("1: "+l.getReviewLine());


console.log("New Line---")

l = new Line("¿Por qué te despidieron?", null);

console.log("6: "+l.getReviewLine());
l.rankUpConfidence();
console.log("5: "+l.getReviewLine());
l.rankUpConfidence();
console.log("4: "+l.getReviewLine());
l.rankUpConfidence();
console.log("3: "+l.getReviewLine());
l.rankUpConfidence();
console.log("2: "+l.getReviewLine());
l.rankUpConfidence();
console.log("1: "+l.getReviewLine());
