<template>
  <div id="previews">
    <h3 class="title">Previews <small>(or "leaks")</small></h3>
    <h5 class="subtitle">
      Two minutes previews and some random screenshots.<br>
      <u class="blink">Spoilers!</u>
    </h5>

    <transition-group name="fadeUp" tag="div" class="columns is-multiline">
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
          <video-player
            v-if="leak.videos.length > 0"
            class="preview-video"
            ref="videoPlayer"
            :options="{
              muted: false,
              sources: [{
                type: 'video/mp4',
                src: leak.videos[0].url
              }],
              poster: 'https://proxy.sug.rocks/' + leak.images[0].url,
              fluid: true
            }"
            :playsinline="true">
          </video-player>
          <div class="columns is-multiline">
            <div class="column is-half"
              v-for="image in leak.images"
              :key="image.url">
              <img
                v-img="{
                  group: leak.id,
                  src: 'https://proxy.sug.rocks/' + image.url,
                  cursor: 'zoom-in'
                }"
                :src="'https://proxy.sug.rocks/400x/' + image.url">
            </div>
          </div>
        </div>
      </b-panel>
    </transition-group>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
require('video.js/dist/video-js.css')

export default {
  name: 'previews',
  metaInfo: {
    title: 'Previews'
  },
  data () {
    return {
      leaks: []
    }
  },
  components: {
    videoPlayer
  },
  methods: {
    getDate: (ts) => {
      // Get current timestamp and check if current element is on air
      var dateObj = new Date(ts * 1000)
      return dateObj.toLocaleString(navigator.language, {weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})
    },
    open: () => {
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

.preview-video {
  margin-bottom: 1rem;
}

.preview-video .vjs-big-play-button {
  left: 50% !important;
  top: 50% !important;
  margin-left: -1.5em !important;
  margin-top: -0.75em !important;
}

.preview-video .vjs-current-time {
  display: inline !important;
}
</style>
