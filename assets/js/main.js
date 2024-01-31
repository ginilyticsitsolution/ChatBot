"use-strict"

var convo;
const deepClone = (_ele) => {
    if (_ele instanceof HTMLElement) {
        const cloned = _ele.cloneNode();

        _ele.childNodes.forEach(ch => ch instanceof Text && cloned.append(ch.cloneNode()) || ch instanceof HTMLElement && cloned.append(
            deepClone(ch)
        ));

        return cloned;
    }
}


const inputState =  {
    inputVal:[]
}
 var userinput;
// load json file with formless data
window.onload = () => {
    loadJSON("main", res => startConversation(res))

    setTimeout(_=>{
debugger;
     

        Array.prototype.forEach.bind(document.getElementsByTagName("textarea"))(

            txta=>{
                  var cl = txta.cloneNode();
                  txta.parentNode.replaceChild(cl,txta);

                  cl.addEventListener("keydown",function(e){ 

                    if(e.key.toLocaleLowerCase() =="backspace") {
                        inputState.inputVal.pop();
                    }  else{
                        if(!(e.key.length>2)){

                            inputState.inputVal.push(e.key);
                        }
                    }     
              })
            }
        )
        var originalElement = document.getElementsByTagName('cf-input-button');

        Array.prototype.forEach.bind(originalElement)(
            ele=>{
                var clonedElement = deepClone(ele);
                ele.parentNode.replaceChild(clonedElement, ele);
                clonedElement.addEventListener("click", function () {
                    
                    var inputValue = inputState.inputVal.toString().replace(/,/g, '');
                    console.log(inputValue);
                
                   
                    submitAndLoadBranch(inputValue);
                });
            
            }
        );
    },1000);
}
function submitAndLoadBranch(inputValue) {
    debugger;
    if (inputValue.toLowerCase().includes('product')) {
        
        userinput = 'opt-Product-category';
    }
    loadBranch(userinput, (succ) => {
        if (!succ) {
            console.error("Failed to load branch");
        }
    });
    
    convo.addUserChatResponse(inputValue);
}

function startConversation(json) {
    // add callback hooks..
    json.options.submitCallback = onFormlessSubmitted.bind(window);
    json.options.flowStepCallback = onStepCallback.bind(window);
    let md = new MobileDetect(window.navigator.userAgent)
    if (md.mobile()) {
        json.options.hideUserInputOnNoneTextInput = true
    }
    convo = window.cf.ConversationalForm.startTheConversation(json)
    document.getElementById("cf-context").appendChild(convo.el)
}

// Form was submitted/finished
let onFormlessSubmitted = () => {
    convo.addRobotChatResponse("Thanks for chatting!")
    
    setTimeout(function(){
        window.location.reload();
     }, 5000);
}

let onStepCallback = function (dto, success, error) {
    console.log(dto)

    if (!dto.tag._values) {
        console.log("No conditional... continuing")
        success()
        return
    }
    debugger;

    let cond = dto.tag._values[0]
    console.log("Loading branch... " + cond)
  
    loadBranch(cond, (succ) => {
        if (!succ) {
            error()
        } else {
            success()
        }
    })
}

function loadBranch(branch, callback) {
    debugger;
    loadJSON(branch, (json) => {
        if (!json) {
            callback(false)
        } else {
            console.log(json.tags)
            convo.addTags(json.tags, true)
            callback(true)
        }
    })
}

// Loads JSON chat file
function loadJSON(name, callback) {
debugger;
    let xhr = new XMLHttpRequest()
    xhr.overrideMimeType('application/json')
    xhr.onload = () => {
        callback(JSON.parse(xhr.responseText))
    }
    xhr.onerror = () => {
        callback(false)
    }

if(name.match(/opt|main/g)&&name.match(/opt|main/g).length>0){
    xhr.open("GET", "assets/json/" + name + ".json")
}else 
    xhr.open("GET", window.location.origin+'/'+name )
    xhr.send(null)
}








