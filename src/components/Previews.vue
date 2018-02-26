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

    <div class="notification is-danger">
      Cartoon Network stopped using their old system to manage their video catalog and are now exclusively using the new video-data api, the same one as the mobile app.<br/>
      This means that we can't juste "guess" the episodes IDs (which was just a number) since they now use hashes (long string of "random" chars that we can't just guess).<br/>
      Until we can fully document all the new system, we can't be sure if there's a way to find "non-active" content.<br/>
      CTOON's preview platform will be updated in March to support the app data but only for what we can actually see.<br/>
      <br/>
      If you know how to get the new data or have some hints, feel free to drop me a tweet/DM (@CTOONnet), send an email (kdy@airmail.cc) or use Discord (Kody#1337).
    </div>

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
