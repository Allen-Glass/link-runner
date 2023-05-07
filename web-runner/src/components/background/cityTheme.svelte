<div class="sky h-48 w-48" />

<script lang="ts">
	import { onMount } from "svelte";


    onMount(() => {
        const spotlight = document.querySelector('.spotlight') as HTMLElement;

        document.addEventListener('mousemove', (e) => {
            if (!spotlight || !spotlight.style)
                return;

            spotlight.style.left = e.pageX - 150 + 'px';
            spotlight.style.top = e.pageY - 150 + 'px';
        });
    })



</script>

<style>
.sky {
  background: linear-gradient(#1a1a2e, #0f3460);
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.spotlight {
  background: radial-gradient(transparent 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  height: 300px;
  position: absolute;
  transition: transform 0.2s ease-out;
  width: 300px;
  z-index: 1;
}

.sky:hover .spotlight {
  transform: scale(2);
}
</style>