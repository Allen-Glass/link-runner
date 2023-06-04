{#if codeDetails !== null}
    <div class="code">
        <div>{codeDetails.displayText}</div>
        {#each fillerArray as filler, i}
            <input 
                id="code-{i}" 
                type="text" class="mx-1" 
                maxlength="1" 
                on:input={() => nextField(i)}
                bind:value={response[i]}/>
        {/each}
    </div>
{/if}

<script lang="ts">
    import type { Code, Manuscript } from "../models/script";
	import json from "../models/script.json";
	import { onMount } from "svelte";

	let script: Manuscript = null;
    let codeDetails: Code = null;
    let fillerArray: string[] = [];
    let response: string[] = [];

	onMount(() => {
		script = json;
		addEventListener("hashchange", () => {
            getCodeElement();
		});
        getCodeElement();
	})

    function getCodeElement() {
        const route = window.location.hash.replace('#', '');
		const loadedText = script.texts.find(t => t.route === route);

		if (!loadedText)
			return;

        codeDetails = loadedText.code;

        for (let i = 0; i < codeDetails.code.length; i++) {
            fillerArray.push(" ");
            response.push(null)
        }
    }

    function nextField(fieldIndex: number) {
        if (fieldIndex === codeDetails.code.length - 1) {
            console.log(response)
            return;
        }

        const nextInput = document.getElementById(`code-${fieldIndex + 1}`);
        nextInput.focus();
    }
</script>

<style>
input[type="text"] {
    background: transparent;
    border-bottom: 1px solid white;
    outline: none;
    width: .8em;
}
</style>