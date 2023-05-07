<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={clicked} class="text-link underline cursor-pointer" role="link">
    <slot></slot>
</span>

<script lang="ts">
    export let to: string = "";

    function clicked() {
        window.location.hash = `#${to}`;
    }
</script>