<template>
  <div class="column is-8 is-offset-2 schedule-element card">
    <div class="content">
      <h4 class="title">{{ episode.title }}</h4>
      <h5 class="subtitle">{{ getDate(episode.timestamp) }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule-element',
  props: ['episode'],
  methods: {
    getDate: (ts) => {
      // Get current timestamp and check if current element is on air
      var dateObj = new Date(ts * 1000)
      return dateObj.toLocaleString(navigator.language, {weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})
    }
  }

}
</script>

<style scoped>
  .card .content h5 {
    margin-bottom: 0;
  }
</style>