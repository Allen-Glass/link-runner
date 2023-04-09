<main id="container" class="bg-primary min-h-screen min-w-fit overflow-x-hidden overflow-y-hidden text-quartinary">
    <div class="overlay">
        <a href="https://google.com">^^^^^^</a>
    </div>
    <div class="snowflake" />
    <div class="text-2xl mx-4 mt-48">
        <ArticleFactory />
    </div>
    <Engine />
</main>

<script lang="ts">
    import "../app.css";
    import ArticleFactory from "../components/articleFactory.svelte";
    import { BackgroundType } from "../models/backgroundType";
	import Engine from "../components/physics/engine.svelte";

    function setBackground(desiredBackgroundType: BackgroundType) {
        if (!document)
            return;

        const backgroundCss = chooseBackgroundType(desiredBackgroundType);

        console.log(document)
        const container = document.getElementById('container');
        container?.classList.add(backgroundCss);
    }

    function chooseBackgroundType(background: BackgroundType) {
        switch (background) {
            case BackgroundType.none:
                return "";
            case BackgroundType.snow:
                return "snowflake";
        }
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
    border: 1px solid whitesmoke;
}

a {
    color: #635985;
}
a:visited {
    color: #635985;
}

@keyframes snowfall {
  from { transform: translateY(-100%); }
  to { transform: translateY(100vh); }
}

/* Apply the animation to the snowflakes */
.snowflake {
  position: fixed;
  top: -10px;
  left: calc(100% * var(--random));
  animation: snowfall 5s linear infinite;
  color: white;
  font-size: 2em;
}

/* Create multiple snowflakes using pseudo-elements */
.snowflake::before {
  content: "❄";
}

/* Generate random horizontal positions for the snowflakes */
:root {
  --random: 0;
}

.snowflake:nth-child(1) {
  --random: 0.1;
}

.snowflake:nth-child(2) {
  --random: 0.2;
}
</style>
