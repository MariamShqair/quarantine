var fs=require("fs")

class Quarantine{

    constructor(func){
        this._funcs = []
        this._funcs.push(func)
    }
    bind(func){
        this._funcs.push(func)
        return this
    }
    execute(){
       function guard_callable(v){
           if(typeof v == "function")return v()
            return v    
       } 
        let value = null
        for(let index in this._funcs){
            value = this._funcs[index](guard_callable(value))
        }
        console.log(value)
    } 
}

function RemoveStopWordsFromStory(pathToFile){
    function _f(){
        let storyAfterRemove=[]
        let story = fs.readFileSync(pathToFile).toString().split(" ")
        let stopwords = fs.readFileSync("stopwords.txt").toString().split(" ")
    
        for(let i in story)
            if(!stopwords.includes(story[i])){
                storyAfterRemove.push(story[i])
            }
        return storyAfterRemove
    }     
    return _f   
}

function Freq(story){
    let storyAfterFreq=[]
    for(let i in story){ 
       let findWord=storyAfterFreq.find(object => object.key === story[i])
        if(findWord){
            findWord.count++
        }else{
            storyAfterFreq.push({key:story[i],count:1})
        }
    }
    return storyAfterFreq    
}

function Sort(storyAfterFreq){
   return  storyAfterFreq.sort((a,b) =>  b.count - a.count)
}

function passFileName(){
    function _f(){
        return process.argv[2]
    }
    return  _f
}

let Qua = new Quarantine(passFileName);

Qua.bind(RemoveStopWordsFromStory)
.bind(Freq)
.bind(Sort)
.execute()
//node app.js story.txt
