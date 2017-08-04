<template>
  <div class="schedule-element">
    <div class="title">
      {{ episode.title }}
    </div>
    <div class="description">
      {{ episode.description }}
    </div>
    <div class="date">
      {{ episode.date }}
    </div>
    <div class="source">
      {{ episode.source }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule-element',
  props: ['episode']
}
</script>
