<div id="player" style="top: {playerTop}px; left: {playerLeft}px;" class="player white" />

<script lang="ts">
	import { onMount } from "svelte";
	import type { Collider } from "../../models/collider";
	import { generateBorderHashes, generateLinkHashes, getCurrentPlayerHash } from "../../services/pageHasher";
	import { IsOverlappingCollider } from "../../services/overlapChecker";

    let playerTop: number = 20;
    let playerLeft: number = 20;
    let gravity: number = 60;
    let playerMomentumY = 0; //positive means falling
    let playerMomentumX = 0; //positive means right
    let canJump: boolean = true;
    let playerFalling: boolean = true;
    let canMoveLeft: boolean = true;
    let canMoveRight: boolean = true;
    let tickIntervalMs: number = 20;
    let playerGridHash: number = 0;
    let colliderHashing: Map<number, Collider[]> = new Map();
    const tickIntervalPerSecond = tickIntervalMs/1000;

    onMount(() => {
        //initializeColliders();
        //initializeListeners();
        //initializeTick();
    })

    function onTick() {
        //getPlayerGridLocation();
        //updatePosition();
        //checkOverlap();
        //ensurePlayerIsInBounds();
        //gravityChangeMomentum();
    }

    function initializeColliders() {
        const body = document.body;
        const links = Array.from(document.querySelectorAll('[role=link]'));
        const hrefBlocks = links.map(h => h.getBoundingClientRect());
        const linkHashes = generateLinkHashes(hrefBlocks);
        const borderHashes = generateBorderHashes(body.scrollHeight, body.scrollWidth)
        colliderHashing = new Map([...linkHashes, ...borderHashes]);
    }

    function initializeListeners() {
        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (event.code === 'Space') {
                jump();
            }
            if (event.code === 'ArrowLeft') {
                moveLeft();
            }
            if (event.code === 'ArrowRight') {
                moveRight();
            }
            if (event.code === 'ArrowUp') {
                jump();
            }
            if (event.code === 'KeyE') {
                jump();
            }
            if (event.code === 'ArrowDown') {
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

    function ensurePlayerIsInBounds() {
        const body = document.body;
        const playerNode = document.getElementById("player");
        canMoveLeft = (playerNode?.getBoundingClientRect().left ?? 0) > 0;
        canMoveRight = (playerNode?.getBoundingClientRect().right ?? 0) < body.scrollWidth;
    }

    function updatePosition() {
        playerTop = playerTop + tickIntervalPerSecond * playerMomentumY;
        playerLeft = playerLeft + tickIntervalPerSecond * playerMomentumX;
    }

    function checkOverlap() {
        const playerNode = document.getElementById("player");

        if (!playerNode)
            return;

        //console.log(collidersInGrid)
        const playerLocation = playerNode.getBoundingClientRect();
        if (playerLocation.bottom > (document.body.scrollHeight - 5)) {
            playerFalling = false;
            playerMomentumY = 0;
        }

        if (!colliderHashing.has(playerGridHash)) {
            playerFalling = true;
            return;
        }

        const collidersInGrid = colliderHashing.get(playerGridHash);

        if (!collidersInGrid)
            return;



        const collision = IsOverlappingCollider(playerLocation, collidersInGrid);
        if (collision.yAxisCollisionPositive) {
            playerMomentumY = 0;
            playerFalling = false;
        } else {
            playerFalling = true;
        }
        if (collision.yAxisCollisionNegative)
            playerMomentumY = 10;
        if (collision.xAxisCollisionPositive)
            playerMomentumX = 10;
        if (collision.xAxisCollisionNegative)
            playerMomentumX = 10;
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
        
        playerMomentumY = -600; //reset momentum and propel upwards
    }

    function moveLeft() {
        playerMomentumX = canMoveLeft ? -100 : 0;
    }

    function moveRight() {
        playerMomentumX = canMoveRight ? 100 : 0;
    }
</script>

<style>
.player {
    position: absolute;
    width: 20px;
    min-height: 20px;
    border-radius: 100%;
    border: 1px solid whitesmoke;
}
</style>