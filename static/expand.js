export let stateTracker = new Map()
window.exPlus = function(cur){
    stateTracker.set(cur,stateTracker.get(cur)+1)
    console.log({stateTracker})
}
export function exReduce(cur){
    let newVal = stateTracker.get(cur)-1<=0 ? 0 : stateTracker.get(cur)-1 
    stateTracker.set(cur,newVal)
}
let style = "";
// rewrite starts
collectParent(1)
function collectParent(cur){
    parentOuter: while(true){
        let expandParent =  document.getElementsByClassName(`exp-par${cur}`);
        if(expandParent.length==0) break parentOuter;
        let parentClassList = Array.from(expandParent[0].classList)
        let [expandState] = parentClassList.filter((x)=>{
            return (x.slice(0,9)=='exp-state');
        });
        expandState = expandState ?? "exp-state-0";
        let state = parseInt(expandState.slice(10,))
        console.log({state})
        stateTracker.set(`exp${cur}`,state);
        style += 
        `
        .exp-ch${cur}{
            display:none;
        }
        .exp${cur}{
            display:inline-block;
        }
        .no-exp${cur}{
            display:none;
        }
        `;
        let expandChild = document.getElementsByClassName(`exp-ch${cur}`)
        for(let i=0;i<expandParent.length;i++){
            attachClickEvent(expandParent[i],expandChild,cur)
        }
        if(stateTracker.get(`exp${cur}`)==0){
            hideChilds(expandChild)        
        }
        let styleElement = document.createElement("style")
        styleElement.innerText = style
        document.head.appendChild(styleElement)

        cur++
    }
}
function attachClickEvent(parentNode,childNodes,cur){
    parentNode.addEventListener("click",()=>
        {
            if(stateTracker.get(`exp${cur}`)>0){
                stateTracker.set(`exp${cur}`,stateTracker.get(`exp${cur}`)-1)
                if(stateTracker.get(`exp${cur}`)==0){
                    hideChilds(childNodes,cur)
                }
            }else{
                stateTracker.set(`exp${cur}`,1)
                displayChilds(childNodes,cur)
            }
        }
        
    )
}
function hideChilds(childNodes,cur){
    for(let n of childNodes){
        n.classList.remove(`no-exp${cur}`)
        n.classList.add(`exp${cur}`)
    }
}
function displayChilds(childNodes,cur){
    for(let n of childNodes){
        n.classList.remove(`exp${cur}`)
        n.classList.add(`no-exp${cur}`)
    }
}