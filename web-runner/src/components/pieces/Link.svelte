<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={clicked} class="underline text-link cursor-pointer" role="link">
    {text}
</div>

<script lang="ts">
    export let text: string = "";
    export let nextLocation: string = "";

    function clicked() {
        window.location.hash = `#${nextLocation}`;
    }
</script>