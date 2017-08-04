<template>
  <div class="timeline-item" :id="'event-' + thing.id">
    <!--Icon inside the circle-->
    <div class="timeline-icon">
      <b-icon :icon="thing.icon"></b-icon>
    </div>
    <div :class="rightOrLeft">
      <h2 class="title is-spaced" v-text="thing.title"></h2>
      <h3 class="subtitle" v-text="thing.date"></h3>
      <div class="content" v-html="thing.description"></div>
      <a v-if="thing.url" :href="thing.url" class="button">More...</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline-element',
  props: ['thing'],
  computed: {
    rightOrLeft: function () {
      // Load data in this component
      return {
        'right': (this.thing.id % 2),
        'timeline-content': true
      }
    }
  }
}
</script>
