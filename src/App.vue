<template>
  <div id="app">
    <header>
      <img src="./assets/OK_KO.png" alt="OK K.O.! - Let's be heroes">
      <h2>Fansite</h2>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      OKKO.fun © 2017<br>
      "OK K.O! Let's be heroes" TM & © Cartoon Network.
    </footer>
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
    max-height: 150px;
    max-width: 100%;
  }

  h2 {
    margin-top: 0;
  }
}

main {
  margin: 0 auto;
  max-width: 900px;
  padding-left: 1rem;
  padding-right: 1rem;
}

footer {
  font-size: 0.8rem;
  padding: 2rem 1rem;
  text-align: center;
}
</style>
