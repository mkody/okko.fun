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
        v-for="leak in $parent.previews"
        :key="leak.id">
        <span slot="header">
          <b>{{ leak.title }}</b>
          <small><i>({{ $parent.getDate(leak.air_date) }})</i></small>
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
  components: {
    videoPlayer
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
