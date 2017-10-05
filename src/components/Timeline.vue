<template>
  <transition-group v-if="mnt" name="fadeUp" tag="div" id="timeline" class="timeline">
    <div class="timeline-item"
      v-for="thing in $parent.timeline"
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
      mnt: false
    }
  },
  mounted () {
    var t = this
    setTimeout(function () {
      t.mnt = true
    }, t.$parent.mntDelay)
  }
}
</script>

<style lang="scss">
// Variables
$timeline-color: #ee4d4d;
@import '../assets/timeline';
</style>
