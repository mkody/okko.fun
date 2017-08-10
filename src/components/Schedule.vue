<template>
  <div id="schedule">
    <h3 class="title">Next TV Airings</h3>
    <h5 class="subtitle">Dates are converted to your computer timezone</h5>
    <div class="content">
      Want to see more schedules?
      <a target="_blank" href="https://cnschedulearchive.tumblr.com/">CN Schedule Archive</a> - <a target="_blank" href="https://cn.sug.rocks/">CN Online Schedule</a>
    </div>

    <div class="columns is-multiline">
      <schedule-element
        v-for="episode in episodes"
        v-bind:episode="episode"
        v-bind:key="episode.timestamp">
      </schedule-element>
    </div>
  </div>
</template>

<script>
// Polyfill for fetch()
import 'whatwg-fetch'

export default {
  name: 'schedule',
  metaInfo: {
    title: 'Next TV Airings'
  },
  data () {
    return {
      episodes: [],
      currentTS: parseInt(Date.now() / 1000, 10)
    }
  },
  mounted () {
    // Shortcut and URL to our API
    var t = this
    var url = 'https://api.sug.rocks/cnschedule.json'

    // Fetch our API
    fetch(url)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        Object.keys(json).map(dayKey => {
          var day = json[dayKey]

          if (day['source'] === 'Cartoon Network') {
            Object.keys(day['schedule']).map(scheduleKey => {
              var el = day['schedule'][scheduleKey]
              if (el['show'] === 'OK K.O.! Let\'s Be Heroes' && el['timestamp'] > t.currentTS) {
                t.episodes.push(el)
              }
            })
          }
        })
      })
  }
}
</script>

<style scoped>
  h5.subtitle {
    margin-bottom: 0;
  }
</style>