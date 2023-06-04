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
		const fullText = getFullText(scriptText);
		const elementIds: string[] = [];
		const words = scriptText.text.split(" ");
		let spanText: string = "";
		let breakingIndexes: number[] = [];
		let linkCount = 0;
		let spanCount = 0;
		for (let i = 0; i < words.length; i++) {
			const isLinkText = words[i].includes("{") && words[i].includes("}");
			if (!isLinkText) { //build text prior to link
				spanText = !!spanText || spanCount ? `${spanText} ${words[i]}` : words[i]
				continue;
			}

			if (spanText) { //inject text before a link
				let sum = getSum(breakingIndexes);
				const breakingIndex = spanText.length + sum;
				breakingIndexes.push(breakingIndex);
				const elementId = `text-${spanCount++ + linkCount}`;
				let newSpan = createTextSpan(elementId);
				elementIds.push(elementId);
				articleDiv.append(newSpan);
				spanText = "";
			}

			//inject link
			const link = scriptText.links[linkCount];
			const elementId = `text-${spanCount + linkCount++}`;
			const linkElement = createLinkElement(link, elementId);
			let sum = getSum(breakingIndexes);
			const breakingIndex = link.text.length + sum;
			breakingIndexes.push(breakingIndex);
			elementIds.push(elementId);
			articleDiv.append(linkElement);
		}

		
		let sum = getSum(breakingIndexes);
		breakingIndexes.push(fullText.length)
		const elementId = `text-${spanCount++ + linkCount}`;
		elementIds.push(elementId);
		const newSpan = createTextSpan(elementId);
		articleDiv.append(newSpan);
		typewriter(elementIds, breakingIndexes, fullText, 0, 0);
	}

	function getFullText(scriptText: Text) {
		let text = `${scriptText.text}`
		for (let i = 0; i < scriptText.links.length; i++) {
			let reg: RegExp = /\{0\}/i;
			text = text.replace(reg, scriptText.links[i].text);
		}

		return text;
	}

	function getSum(breakingIndexes: number[]) {
		return breakingIndexes.length 
			? breakingIndexes[breakingIndexes.length - 1]
			: 0;
	}

	function typewriter(elementIds: string[], breakingIndexes: number[], scriptText: string, currentLetterIndex: number, elementIndex: number) {
		if (currentLetterIndex > breakingIndexes[elementIndex])
			elementIndex++;

		if (currentLetterIndex === scriptText.length)
			return;

		const element = document.getElementById(elementIds[elementIndex]);
		element.innerText = element.innerText + scriptText[currentLetterIndex];

		currentLetterIndex++;
		setTimeout(function() {
			typewriter(elementIds, breakingIndexes, scriptText, currentLetterIndex, elementIndex)
		}, 40)
	}

	function createTextSpan(id: string) {
		const newSpan = document.createElement("span");
		newSpan.id = id;
		return newSpan;
	}

	function createLinkElement(link: Link, id: string) {
		const newSpan = document.createElement("span");
		newSpan.id = id;
		newSpan.classList.add("text-link");
		newSpan.classList.add("underline");
		newSpan.classList.add("cursor-pointer");
		newSpan.setAttribute("data-to", link.to);
		newSpan.setAttribute("role", "link");
		newSpan.addEventListener('click', ev => directHandler(ev))
		return newSpan;
	}

	function directHandler(ev: MouseEvent) {
		const spanElement = ev.currentTarget as HTMLSpanElement
		const to = spanElement.getAttribute("data-to");
        window.location.hash = `#${to}`;
	}
</script>

<style>
.typewriter {
  display: inline-block;
  overflow: hidden; /* Ensures the text is not visible until animation starts */
  white-space: pre-wrap;
  font-family: 'Courier', monospace;
}
</style>