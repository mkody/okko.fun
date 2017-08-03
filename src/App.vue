<template>
  <div id="app">
    <header>
      <img src="./assets/OK_KO.png" alt="OK K.O.! - Let's be heroes">
      <h2>Fansite</h2>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    titleTemplate: '%s | OK K.O.! Fansite'
  }
}
</script>

<style lang="less">
header {
  text-align: center;

  img {
    max-width: 100%;
    max-height: 150px;

  }

  h2 {
    margin-top: 0;
  }
}

main {
    max-width: 900px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
