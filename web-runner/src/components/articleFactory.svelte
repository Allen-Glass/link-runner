<div id="article" class="typewriter">
	{#if component != null}
		<svelte:component this={component} />
	{/if}
    Hello <Link nextLocation="las" text="Las Vegas" />! How is everyone doing tonight. Welcome to the <Link nextLocation="welcome" text="Lodge" />.
</div>

<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import type { SvelteComponentTyped } from 'svelte/internal';
	import Link from "./pieces/Link.svelte";
	import Welcome from "./articles/tutorial/welcome.svelte";

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	let component: C;
	let routeMaps: Map<string, C> = new Map();

	onMount(() => {
		generateRoutes();
		addEventListener("hashchange", (e) => {
			getComponent();
		});
	})

	function generateRoutes() {
		let routes: Route[] = [{
			hash: "welcome",
			component: Welcome
		}]

		for (let route of routes) {
			routeMaps.set(route.hash, route.component);
		}
	}

	function getComponent() {
		const hash = window.location.hash.replace('#', '');
		console.log(hash)
		const mappedComponent = routeMaps.get(hash);
		console.log(mappedComponent)

		if (!mappedComponent)
			return;

		component = mappedComponent;
	}

	interface Route {
		hash: string;
		component: any;
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
  font-family: 'Courier', monospace; /* Change as needed */
}
</style>