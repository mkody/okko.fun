<template>
  <div id="app">
    <transition
      appear
      name="fadeDown">
      <main-header></main-header>
    </transition>

    <section class="section">
      <div class="container is-widescreen">
        <transition
          appear
          name="fade"
          leave-active-class="fadeOutLeft"
          mode="out-in">
          <router-view></router-view>
        </transition>
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
@import './assets/styles';

#app > .section > .container {
  min-height: calc(100vh - 250px);
}
</style>
