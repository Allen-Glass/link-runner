<div id="article" class="typewriter break-words flex items-center">

</div>

<script lang="ts">
	import type { Link, Manuscript, Text } from "../models/script";
	import json from "../models/script.json";
	import { onMount } from "svelte";

	let script: Manuscript = null;

	onMount(() => {
		script = json;
		loadText();
		addEventListener("hashchange", () => {
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
		articleDiv.innerHTML = "";
		injectTextElements(text, articleDiv);
	}

	function injectTextElements(scriptText: Text, articleDiv: HTMLElement) {
		let elementTextMapping: Map<string, string> = new Map<string, string>();
		const words = scriptText.text.split(" ");
		let spanText: string = "";
		let linkCount = 0;
		let spanCount = 0;
		for (let i = 0; i < words.length; i++) {
			if (words[i].includes("{") && words[i].includes("}")) {

				if (spanText) {
					let newSpan = createTextSpan(`${spanText} `);
					elementTextMapping.set(`text-${spanCount + linkCount}`, `${spanText} `);
					articleDiv.append(newSpan);
					spanText = "";
					spanCount++;
				}

				const link = scriptText.links[linkCount++];
				const linkElement = createLinkElement(link);
				elementTextMapping.set(`text-${spanCount + linkCount}`, `${link.to}`);
				articleDiv.append(linkElement);
			} else {
				spanText = !!spanText || spanCount ? `${spanText} ${words[i]}` : words[i]
			}
		}

		const newSpan = createTextSpan(spanText);
		articleDiv.append(newSpan);
	}

	function createTextSpan(text: string) {
		const newSpan = document.createElement("span");
		newSpan.innerText = text;
		return newSpan;
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