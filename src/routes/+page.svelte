<script>
    //import Expand from  "expaand/Expand.svelte";
    import Expand from "$lib/Expand.svelte"
</script>
<main>
    <Expand>
        <span class="exp-ch1">Wow it really expands</span>
        <span class="exp-par1 exp-state-5">Click here because things expand</span>
    </Expand>
</main>
<style>
    .highlight{
        background: linear-gradient(transparent 60%, yellow 60%);
        padding: 0.1em 0;
    }
</style>