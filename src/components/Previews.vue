<template>
  <div id="previews">
    <h3 class="title">Previews</h3>
    <h5 class="subtitle">
      Two minutes sneak peaks and some random screenshots.<br>
      <span class="blink is-underline">Spoilers!</span><br>
      <small>
        Note: Data is automatically fetched from Cartoon Network's servers.<br>
        More on <a target="_blank" href="https://previews.ctoon.network">previews.ctoon.network</a>.
      </small>
    </h5>

    <transition name="fadeUp">
      <div
        class="columns is-multiline is-centered"
        v-if="mnt && $parent.previews.length > 0">
        <b-collapse
          :open="false"
          animation="none"
          class="panel column is-10"
          v-for="leak in $parent.previews"
          :key="leak.id">
          <div slot="trigger" class="panel-heading">
            <b>{{ leak.title }}</b>
            <small v-if="leak.airdate"><i>({{ $parent.getDate(leak.airdate) }})</i></small>
          </div>
          <div class="panel-block">
            <div class="content full-width">
              <blockquote v-html="leak.description"></blockquote>
              <video-player
                v-if="leak.videos.length > 0"
                class="preview-video"
                ref="videoPlayer"
                :options="{
                  muted: false,
                  sources: [{
                    type: 'video/mp4',
                    src: leak.videos[0]
                  }],
                  poster: 'https://proxy.sug.rocks/' + leak.images[0],
                  fluid: true
                }"
                :playsinline="true">
              </video-player>
              <div class="columns is-multiline has-text-centered">
                <div class="column is-half"
                  v-for="image in leak.images"
                  :key="image">
                  <img
                    v-img="{
                      group: leak.id,
                      src: image,
                      cursor: 'zoom-in'
                    }"
                    :src="'https://proxy.sug.rocks/400x/' + image">
                </div>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>

      <div
        class="has-text-centered"
        v-else-if="mnt">
        <h5 class="subtitle">
          No data found, check
          <a target="_blank" href="https://previews.ctoon.network">CN Previews.</a>
        </h5>
      </div>
    </transition>
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
