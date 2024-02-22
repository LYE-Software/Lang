class Presentation{
    constructor(name, files){
        this.name = name;
        this.lines = [];
        this.files = files;
        this.length = 0;
    }

    getLine(n){
        return this.lines[n]
    }

    getFiles(){
        return this.files;
    }

    //confidence ratings: 0, 1, 2, 3, 4

    assignConfidence(line, confidence){
        this.lines[line].confidence = confidence;
    }

    getReviewLine(lineNo){
        line = this.lines[lineNo];
        //use line's confidence to determine how many words to remove
    }

}

class Line{
    constructor(data){
        this.data = data;
        this.confidence = 0;
    }
}