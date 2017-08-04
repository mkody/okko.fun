<template>
  <div id="app">
    <main-header></main-header>

    <section class="section">
      <div class="container is-widescreen">
        <router-view></router-view>
      </div>
    </section>

    <main-footer></main-footer>
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

<style lang="scss">
@import './assets/styles'
</style>
