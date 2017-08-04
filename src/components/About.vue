<template>
  <div id="about" class="has-text-centered">
    <h3 class="subtitle">I want to know more about...</h3>

    <br>

    <router-link class="button" to="/about/show">
      The Show
    </router-link>

    <router-link class="button" to="/about/timeline">
      The Show's Timeline
    </router-link>

    <router-link class="button" to="/about/staff">
      The Staff
    </router-link>

    <router-link class="button" to="/about/here">
      This Website
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'about',
  metaInfo: {
    title: 'About...'
  }
}
</script>

<style scoped>
.subtitle {
  margin-bottom: -1rem;
}
</style>