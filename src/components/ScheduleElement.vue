<template>
  <div class="column is-8 is-offset-2 card">
    <div class="content">
      <div class="newnewnewnew" v-if="premiereTs.indexOf(episode.timestamp) > -1">
        <span style="color: #ec1ad8">NEW</span><br>
        <span style="color: #0187ff">NEW</span><br>
        <span style="color: #ffecff">NEW</span><br>
        <span style="color: #001003">NEW</span>
      </div>
      <h4 class="title">
        {{ episode.title }}
      </h4>
      <h5 class="subtitle" :data-ts="episode.timestamp">
        {{ getDate(episode.timestamp) }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule-element',
  props: ['episode'],
  data () {
    return {
      premiereTs: [
        1502404200,
        1502749800,
        1502836200,
        1502922600,
        1503009000,
        1503354600,
        1503441000,
        1503527400,
        1503613800
      ]
    }
  },
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
.newnewnewnew {
  /* background: linear-gradient(0deg, #ffc100, #e3e81d); */
  background: linear-gradient(180deg, #1ddde8, #1de840);
  float: right;
  font-size: 18px;
  font-weight: bold;
  line-height: 14px;
  margin: -12px -12px -12px 10px;
  padding: 5px;
}
</style>