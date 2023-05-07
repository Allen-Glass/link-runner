<main id="container" class="bg-primary text-quartinary w-full min-h-screen">
    <div class="text-2xl grid grid-rows-9 min-h-screen px-4">
        <div class="row-span-1">

        </div>
        <div class="row-span-3">
            <ArticleFactory />
        </div>
        <diV class="row-span-5">

        </diV>
    </div>
</main>

<script lang="ts">
    import "../app.css";
    import ArticleFactory from "../components/articleFactory.svelte";
</script>
    
<style>
.player {
    position: absolute;
    width: 20px;
    min-height: 20px;
    border-radius: 100%;
    border: 1px solid whitesmoke;
}

a {
    color: #635985;
}
a:visited {
    color: #635985;
}
</style>
