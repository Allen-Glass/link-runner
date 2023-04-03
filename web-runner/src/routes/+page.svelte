<div style="height: 100vh">
    <Article /> 
</div>
<div class="overlay">
    <hr />
</div>
<div id="player" style="top: {playerTop}px; left: {playerLeft}px;" class="player">

</div>

<script lang="ts">
	import { onMount } from "svelte";
    import Article from "../components/testArticle.svelte";
	import type { Collider } from "../models/collider";
	import { generateHrefHashes, generatePageHashes, getCurrentPlayerHash } from "../services/pageHasher";

    let playerTop: number = 20;
    let playerLeft: number = 20;
    let gravity: number = 10;
    let playerMomentumY = 0; //positive means falling
    let playerMomentumX = 0; //positive means right
    let canJump: boolean = true;
    let functions: (() => void)[] = [];
    let tickIntervalMs: number = 20;
    let playerGridHash: number = 0;
    let pageGridHashes: Map<number, Collider> = new Map();
    let hrefHashes: Set<number> = new Set();
    const tickInteralPerSecond = tickIntervalMs/1000;

    onMount(() => {
        initializeGrid();
        initializeHrefs();
        initializeGravity();
        initializeListeners();
        initializeTick();
    })

    function onTick() {
        updatePosition();
        checkOverlap();
        getPlayerGridLocation();
        gravityChangeMomentum();
    }

    function updatePosition() {
        playerTop = playerTop + tickInteralPerSecond * playerMomentumY;
        playerLeft = playerLeft + tickInteralPerSecond * playerMomentumX;
    }

    function initializeTick() {
        setInterval(onTick, tickIntervalMs); //20 ticks per second
    }

    function initializeHrefs() {
        const hrefs = Array.from(document.querySelectorAll('a'));
        const hrefBlocks = hrefs.map(h => h.getBoundingClientRect())
        hrefHashes = generateHrefHashes(hrefBlocks);
        console.log(hrefHashes)
    }

    function initializeListeners() {
        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (event.code === 'Space') {
                jump();
            }
        });
        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (event.code === 'ArrowLeft') {
                move(false);
            }
        });
        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (event.code === 'ArrowRight') {
                move(true);
            }
        });
        document.addEventListener('keyup', event => {
            event.preventDefault();
            if (event.code === 'ArrowLeft') {
                playerMomentumX = 0;
            }
        });
        document.addEventListener('keyup', event => {
            event.preventDefault();
            if (event.code === 'ArrowRight') {
                playerMomentumX = 0;
            }
        });
    }

    function initializeGravity() {
        functions.push(gravityChangeMomentum)
    }

    function initializeGrid() {
        const body = document.body;
        const bodyRect = document.body.getBoundingClientRect();
        const scrollHeightOffset = body.scrollHeight + bodyRect.top;
        const scrollWidthOffset = body.scrollWidth + bodyRect.left;
        pageGridHashes = generatePageHashes(scrollHeightOffset, scrollWidthOffset);
    }

    function getPlayerGridLocation() {
        const playerNode = document.getElementById("player");

        if (!playerNode)
            return;

        const playerLocation = playerNode.getBoundingClientRect();
        playerGridHash = getCurrentPlayerHash(playerLocation);
    }

    function gravityChangeMomentum() {
        playerMomentumY = playerMomentumY < 100 
            ? playerMomentumY + gravity 
            : playerMomentumY;
    }

    function jump() {
        if (!canJump)
            return;
        
        playerMomentumY = -250; //reset momentum and propel upwards
        const doc = document;
    }

    function move(isRight: boolean) {
        playerMomentumX = isRight ? 100 : -100;
    }

    function checkOverlap() {
        if (hrefHashes.has(playerGridHash))
            console.log(playerGridHash)
    }
</script>
    
<style>
.overlay {
    position: absolute;
    width: 40px;
    top: 30px;
}
.player {
    position: absolute;
    width: 20px;
    min-height: 20px;
    border-radius: 100%;
    border: 1px solid black;
}
</style>
