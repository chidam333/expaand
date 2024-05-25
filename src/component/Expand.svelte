<script>
	import { onMount } from "svelte";
    onMount(()=>{
        let map = new Map()
        let stateTracker = new Map()
        let style = "";
        for(let cur=1;;cur++){
            let expandParent = document.getElementsByClassName(`exp-par${cur}`)
            if(expandParent.length==0) break;
            stateTracker.set(`exp${cur}`,false)
            style += 
            `
            .exp${cur}{
                display:inline-block;
            }
            .no-exp${cur}{
                display:none;
            }
            ` 
            let expandChild = document.getElementsByClassName(`exp-ch${cur}`)
            //map.set(expandParent,expandChild)
            for(let i=0;i<expandParent.length;i++){
                expandParent[i].addEventListener("click",()=>{
                    stateTracker.set(`exp${cur}`,!stateTracker.get(`exp${cur}`))
                    if(stateTracker.get(`exp${cur}`)){
                        for(let j = 0;j<expandChild.length;j++){
                            expandChild[j].classList.remove(`exp${cur}`)
                            expandChild[j].classList.add(`no-exp${cur}`)
                        }
                    }else{
                        for(let j = 0;j<expandChild.length;j++){
                            expandChild[j].classList.remove(`no-exp${cur}`)
                            expandChild[j].classList.add(`exp${cur}`)
                        }
                    }
                })
            }
            for(let i=0;i<expandChild;i++){
                expandChild[i].classList.add(`no-exp${cur}`)
            }
        }
        let styleElement = document.createElement("style")
        styleElement.innerText = style
        document.head.appendChild(styleElement)
    })
</script>
<main>
    <slot/>
</main>
<style>
</style>