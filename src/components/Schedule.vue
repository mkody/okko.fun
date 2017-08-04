<template>
  <div id="schedule">
    <page-not-ready></page-not-ready>
    <schedule-element
      v-for="episode in episodes"
      v-bind:episode="episode"
      v-bind:key="episode.id">
    </schedule-element>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  metaInfo: {
    title: 'Schedule'
  },
  data () {
    return {
      episodes: {}
    }
  }
}
</script>
