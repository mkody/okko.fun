<template>
  <div id="leaks">
    <h3 class="title">Previews</h3>
    <h5 class="subtitle">
      Also known as <i>leaks</i>. Spoilers!<br>
      <small><i>Powered by /sug/.rocks LEAKBOT.</i></small>
    </h5>

    <div class="columns is-multiline">
      <b-panel
        :open="false"
        :collapsible="true"
        class="column is-10 is-offset-1"
        v-for="leak in leaks"
        :key="leak.id">
        <span slot="header">
          <b>{{ leak.title }}</b>
          <small><i>({{ getDate(leak.air_date) }})</i></small>
        </span>
        <div class="content">
          <blockquote v-html="leak.desc"></blockquote>
          <video
            v-if="leak.videos.length > 0"
            :src="leak.videos[0].url"
            controls preload="metadata"></video>
          <div class="columns is-multiline">
            <div class="column is-half"
              v-for="image in leak.images"
              :key="image.url">
              <a :href="image.url">
                <img :src="image.url">
              </a>
            </div>
          </div>
        </div>
      </b-panel>
    </div>

  </div>
</template>

<script>
export default {
  name: 'leaks',
  metaInfo: {
    title: 'Leaks'
  },
  data () {
    return {
      leaks: []
    }
  },
  methods: {
    getDate: (ts) => {
      // Get current timestamp and check if current element is on air
      var dateObj = new Date(ts * 1000)
      return dateObj.toLocaleString(navigator.language, {weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})
    }
  },
  mounted () {
    // Shortcut and URL to our API
    var t = this
    var apiUrl = 'https://api.sug.rocks/all-leaks.json'

    // Fetch our API
    fetch(apiUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        Object.keys(json).map(leakKey => {
          var leak = json[leakKey]

          if (leak['show'] === 'OK K.O.! Let\'s Be Heroes') {
            t.leaks.push(leak)
          }
        })
      })
  }
}
</script>

<style>
.panel {
  margin-bottom: 0 !important;
}
</style>
