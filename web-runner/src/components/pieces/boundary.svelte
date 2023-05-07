{#if type === "horizontal" }
<div>a</div>
{:else}
<div>b</div>
{/if}

<script lang="ts">
    let type: "horizontal" | "vertical" = "horizontal"
</script>