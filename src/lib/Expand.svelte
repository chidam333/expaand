<script>
	import { onMount } from "svelte";
    let stateTracker = new Map()
    export function exPlus(cur){
        stateTracker.set(cur,stateTracker.get(cur)+1)
    }
    export function exReduce(cur){
        let newVal = stateTracker.get(cur)-1<=0 ? 0 : stateTracker.get(cur)-1 
        stateTracker.set(cur,newVal)
    }
    onMount(()=>{
        let map = new Map()
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
               let state = Number(expandState.slice(10,))
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
                n.classList.remove(`no-exp${cur}`)
                n.classList.add(`exp${cur}`)
            }
        }
        // rewrite ends
        // for(let cur=1;;cur++){
        //     let expandParent = document.getElementsByClassName(`exp-par${cur}`)
        //     if(expandParent.length==0) break;
        //     stateTracker.set(`exp${cur}`,false)
        //     style += 
        //     `
        //     .exp-ch${cur}{
        //         display:none;
        //     }
        //     .exp${cur}{
        //         display:inline-block;
        //     }
        //     .no-exp${cur}{
        //         display:none;
        //     }
        //     ` 
        //     let expandChild = document.getElementsByClassName(`exp-ch${cur}`)
        //     map.set(expandParent,expandChild)
        //     for(let i=0;i<expandParent.length;i++){
        //         expandParent[i].addEventListener("click",()=>{
        //             console.log({i},expandParent[i].classList)
        //             console.log("lol",stateTracker)
        //             stateTracker.set(`exp${cur}`,!stateTracker.get(`exp${cur}`))
        //             if(!stateTracker.get(`exp${cur}`)){
        //                 for(let j = 0;j<expandChild.length;j++){
        //                     expandChild[j].classList.remove(`exp${cur}`)
        //                     expandChild[j].classList.add(`no-exp${cur}`)
        //                 }
        //             }else{
        //                 for(let j = 0;j<expandChild.length;j++){
        //                     expandChild[j].classList.remove(`no-exp${cur}`)
        //                     expandChild[j].classList.add(`exp${cur}`)
        //                 }
        //             }
        //         })
        //     }
        //     for(let i=0;i<expandChild;i++){
        //         expandChild[i].classList.add(`no-exp${cur}`)
        //     }
        // }
        // let styleElement = document.createElement("style")
        // styleElement.innerText = style
        // document.head.appendChild(styleElement)
    })
    let expele;
</script>
<main>
    <slot {exReduce}/>
</main>
<style>
</style>