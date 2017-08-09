<template>
  <div id="about" class="has-text-centered">
    <h3 class="subtitle">I want to know more about...</h3>

    <router-link class="button" disabled to="/about/show">
      The Show
    </router-link>

    <router-link class="button" to="/about/timeline">
      The Show's Timeline
    </router-link>

    <router-link class="button" disabled to="/about/staff">
      The Staff
    </router-link>

    <router-link class="button" disabled to="/about/here">
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
#about .subtitle {
  margin-bottom: 0.5rem;
}
</style>