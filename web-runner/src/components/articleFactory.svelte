<div id="article" class="typewriter">
    Hello Las Vegas! How is everyone doing tonight. Welcome to the <Link nextLocation="elsewhere" text="Lodge" />.
</div>

<script lang="ts">
    import Link from "./pieces/Link.svelte";
    function generateComponent() {
    }
</script>

<style>
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* Apply the animation to the text */
.typewriter {
  display: inline-block;
  overflow: hidden; /* Ensures the text is not visible until animation starts */
  animation: typing 1s steps(20, end); /* 1s duration, 20 steps, ends at final state */
  white-space: nowrap; /* Prevents line breaks */
  font-size: 24px; /* Change as needed */
  font-family: 'Courier', monospace; /* Change as needed */
}
</style>