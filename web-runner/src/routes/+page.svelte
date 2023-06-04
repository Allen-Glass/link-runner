<main id="container" class="bg-primary text-quartinary w-full min-h-screen">
    <div class="text-2xl grid grid-rows-9 min-h-screen px-4">
        <div class="row-span-2">

        </div>
        <div class="row-span-3">
            <ArticleFactory />
        </div>
        <diV class="row-span-4 justify-self-center">
            <CodeFactory />
        </diV>
    </div>
</main>

<script lang="ts">
    import "../app.css";
    import ArticleFactory from "../components/articleFactory.svelte";
    import CodeFactory from "../components/codeFactory.svelte";
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

main {
  font-family: 'Courier', monospace;
}
</style>
