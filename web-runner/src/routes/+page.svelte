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
	import { IsOverlappingCollider } from "../services/overlapChecker";

    let playerTop: number = 20;
    let playerLeft: number = 20;
    let gravity: number = 10;
    let playerMomentumY = 0; //positive means falling
    let playerMomentumX = 0; //positive means right
    let canJump: boolean = true;
    let playerFalling: boolean = true;
    let tickIntervalMs: number = 20;
    let playerGridHash: number = 0;
    let pageColliders: Collider[] = [];
    let pageGridHashes: Set<number> = new Set();
    let hrefHashes: Map<number, Collider[]> = new Map();
    const tickIntervalPerSecond = tickIntervalMs/1000;

    onMount(() => {
        initializeGrid();
        initializeHrefs();
        initializeListeners();
        initializeTick();
    })

    function onTick() {
        getPlayerGridLocation();
        updatePosition();
        checkOverlap();
        gravityChangeMomentum();
    }

    function initializeGrid() {
        const body = document.body;
        const bodyRect = document.body.getBoundingClientRect();
        const scrollHeightOffset = body.scrollHeight + bodyRect.top;
        const scrollWidthOffset = body.scrollWidth + bodyRect.left;
        pageGridHashes = generatePageHashes(scrollHeightOffset, scrollWidthOffset);
        pageColliders = [
            {x1: bodyRect.left, x2: bodyRect.right, y1: bodyRect.top, y2: bodyRect.bottom}
        ];
    }

    function initializeHrefs() {
        const hrefs = Array.from(document.querySelectorAll('a'));
        const hrefBlocks = hrefs.map(h => h.getBoundingClientRect())
        hrefHashes = generateHrefHashes(hrefBlocks);
    }

    function initializeListeners() {
        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (event.code === 'Space') {
                jump();
            }
            if (event.code === 'ArrowLeft') {
                move(false);
            }
            if (event.code === 'ArrowRight') {
                move(true);
            }
            if (event.code === 'ArrowUp') {
                jump();
            }
        });
        document.addEventListener('keyup', event => {
            event.preventDefault();
            if (event.code === 'ArrowLeft') {
                playerMomentumX = 0;
            }
            if (event.code === 'ArrowRight') {
                playerMomentumX = 0;
            }
        });
    }

    function initializeTick() {
        setInterval(onTick, tickIntervalMs); //20 ticks per second
    }

    function getPlayerGridLocation() {
        const playerNode = document.getElementById("player");

        if (!playerNode)
            return;

        const playerLocation = playerNode.getBoundingClientRect();
        playerGridHash = getCurrentPlayerHash(playerLocation);
    }


    function updatePosition() {
        playerTop = playerTop + tickIntervalPerSecond * playerMomentumY;
        playerLeft = playerLeft + tickIntervalPerSecond * playerMomentumX;
    }

    function checkOverlap() {
        if (!pageGridHashes.has(playerGridHash))
            return;

        const collidersInGrid = hrefHashes.get(playerGridHash);

        if (!collidersInGrid)
            return;

        const playerNode = document.getElementById("player");

        if (!playerNode)
            return;

        const playerLocation = playerNode.getBoundingClientRect();
        const collision = IsOverlappingCollider(playerLocation, [...collidersInGrid, ...pageColliders])

        if (collision.yAxisCollisionPositive) {
            playerMomentumY = 0;
            playerFalling = false;
        } else {
            playerFalling = true;
        }

    }

    function gravityChangeMomentum() {
        if (!playerFalling)
            return;

        playerMomentumY = playerMomentumY < 100 
            ? playerMomentumY + gravity 
            : playerMomentumY;
    }

    function jump() {
        if (!canJump)
            return;
        
        playerMomentumY = -250; //reset momentum and propel upwards
    }

    function move(isRight: boolean) {
        playerMomentumX = isRight ? 100 : -100;
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
