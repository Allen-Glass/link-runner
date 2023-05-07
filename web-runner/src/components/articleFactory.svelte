<div id="article" class="typewriter break-words flex items-center">
	<div bind:this={textElement}></div>
</div>

<script lang="ts">
	import type { Link, Manuscript, Text } from "../models/script";
	import json from "../models/script.json";
	import { onMount } from "svelte";

	let textElement: HTMLElement = null;
	let script: Manuscript = null;

	onMount(() => {
		script = json;
		loadText();
		addEventListener("hashchange", (e) => {
			loadText();
		});
	})

	function loadText() {
		const route = window.location.hash.replace('#', '');
		const loadedText = script.texts.find(t => t.route === route)

		if (!loadedText)
			return;

		createText(loadedText);
	}

	function createText(text: Text) {
		const articleDiv = document.getElementById("article");
		const span = document.createElement("span");
		const linkElements = injectLinkTextElements(text, span);
		span.innerText = text.text;
		articleDiv.append(span);
	}

	function injectLinkTextElements(scriptText: Text, parentSpan: HTMLSpanElement) {
		const words = scriptText.text.split(" ");
		const linkTexts = words.filter(w => w.includes("{") && w.includes("}"));
		const html = words.map((linkText, index) => {
			const link = scriptText.links[index];
			const linkElement = createLinkElement(link);

		});
		
		return html;
	}

	function createLinkElement(link: Link) {
		const span = document.createElement("span");
		span.classList.add("text-link");
		span.classList.add("underline");
		span.classList.add("cursor-pointer");
		span.setAttribute("data-to", link.to);
		span.setAttribute("role", "link");
		span.innerText = link.text;
		span.addEventListener('click', ev => directHandler(ev))
		return span;
		const newLink = `<span data-to="${link.to}" role="link" class="text-link underline cursor-pointer">
							${link.text}
						</span>`
	}

	function directHandler(ev: MouseEvent) {
		const spanElement = ev.currentTarget as HTMLSpanElement
		const to = spanElement.getAttribute("data-to");
        window.location.hash = `#${to}`;
	}
</script>

<style>
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}

/* Apply the animation to the text */
.typewriter {
  display: inline-block;
  overflow: hidden; /* Ensures the text is not visible until animation starts */
  white-space: pre-wrap; /* Prevents line breaks */
  font-family: 'Courier', monospace; /* Change as needed */
  /*animation: typing 1s steps(60, end),
    blink-caret .75s step-end infinite;; /* 1s duration, 20 steps, ends at final state */
}
</style>