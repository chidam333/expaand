<script>
    //import Expand from  "expaand/Expand.svelte";
    //import Expand from "$lib/Expand.svelte"
    //import {exPlus,exReduce} from "/static/expand.js"
	import { onMount } from "svelte";
    onMount(()=>{
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '/expand.js';
        document.body.appendChild(script);
        console.log("window",{window},window.exPlus(1))
    })
</script>
<main>
    <!-- <Expand> -->
        <div class="exp-par2">
            <span class="exp-ch1">Wow it really expands</span>
            <span class="exp-par1">Click here because things expand</span>
        </div>
        <div class="name exp-ch2">my name is chidambaranathan</div>
    <!-- </Expand> -->
</main>
<style>
    .highlight{
        background: linear-gradient(transparent 60%, yellow 60%);
        padding: 0.1em 0;
    }
</style>