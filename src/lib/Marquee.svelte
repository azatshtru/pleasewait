<script>

  let text;

  function getLine () {
    let r = 20 + Math.random() * 15;
    text = "please.rip ".repeat(r);
    return text;
  }

  function getOtherLine () {
    return text;
  }

</script>

<div class="marqueeContainer">
  {#each Array(100) as _}
    <p class="marquee">
      <span>{getLine()}&nbsp;</span></p>
    <p class="marquee marquee2">
      <span>{getOtherLine()}&nbsp;</span>
    </p>
    <br>
  {/each}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

  .marqueeContainer {
    transform: translate(-20%, -10%) rotateZ(-30deg);
  }

  .marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;

  }

  .marquee span {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 40s linear infinite;

    font-family: 'Space Mono', monospace;
    font-size: 1.5em;
    color: rgb(185, 185, 185);

  }

  .marquee2 span {
    animation-delay: 20s;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media only screen and (max-width: 768px) {
    .marquee span {
      animation: marquee 20s linear infinite;

    }

    .marquee2 span {
      animation-delay: 10s;
    }
  }
</style>