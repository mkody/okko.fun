<template>
  <transition-group name="fadeUp" tag="div" id="timeline">
    <div class="timeline-item"
      v-for="thing in elements"
      :key="thing.id"
      :id="'event-' + thing.id">
      <!--Icon inside the circle-->
      <div class="timeline-icon">
        <b-icon :icon="thing.icon"></b-icon>
      </div>
      <div class="timeline-content">
        <h2 class="title is-spaced" v-text="thing.title"></h2>
        <h3 class="subtitle" v-text="thing.date"></h3>
        <div class="content" v-html="thing.description"></div>
        <a v-if="thing.url" :href="thing.url" class="button">More...</a>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'timeline',
  metaInfo: {
    title: 'Timeline'
  },
  data () {
    return {
      elements: []
    }
  },
  mounted () {
    // Shortcut and URL to our API
    var t = this
    var apiUrl = 'https://data.okko.fun/api/latest/timeline.json'

    // Fetch our API
    fetch(apiUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        t.elements = json
      })
  }
}
</script>

<style lang="scss">
// Variables
$timeline-color: #ee4d4d;
@import '../assets/timeline';
</style>
