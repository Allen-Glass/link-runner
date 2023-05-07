<div class="snowflake" />

<style>
@keyframes snowfall {
  from { transform: translateY(-100%); }
  to { transform: translateY(100vh); }
}

.snowflake {
  position: fixed;
  top: -10px;
  left: calc(100% * var(--random));
  animation: snowfall 5s linear infinite;
  color: white;
  font-size: 2em;
}

.snowflake::before {
  content: "❄";
}

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