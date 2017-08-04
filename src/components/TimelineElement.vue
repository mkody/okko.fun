<template>
  <div class="timeline-element">
    <h4 class="title">
      <a :href="thing.link">
        {{ thing.title }}
      </a>
    </h4>
    <div class="description">
      {{ thing.description }}
    </div>
    <div class="date">
      {{ thing.date }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline-element',
  props: ['thing']
}
</script>
