<template>
  <div id="downloads">
    <h3 class="title">Downloads</h3>
    <h5 class="subtitle">
      Download or watch episodes and shorts.
    </h5>

    <b-tabs
      position="is-centered"
      class="block"
      v-model="activeTab">
      <b-tab-item label="Episodes" icon="television">
        <div class="box legal-links" v-if="ep_legal.length > 0">
          Please consider official and legal links.<br>
          <a
            class="button"
            v-for="t in ep_legal"
            :key="t.url"
            :href="t.url">
            <b-icon :icon="t.icon"></b-icon>
            <span>{{ t.title }}</span>
          </a>
        </div>

        <div class="columns is-multiline">
          <div
            class="dl-entry column is-10 is-offset-1"
            v-for="l in ep"
            :key="l.code">
            <span class="dl-title">
              S{{ l.season | leftPad(2, '0') }}E{{ l.episode | leftPad(2, '0') }}: <strong>{{ l.title }}</strong>
            </span>

            <span class="dl-links">
              <b-tooltip label="Direct">
                <a class="button is-small is-dark" :href="l.direct">
                  <b-icon icon="download"></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip label=".torrent">
                <a class="button is-small is-dark" :href="l.torrent_file">
                  <b-icon icon="connectdevelop"></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip label="Magnet">
                <a class="button is-small is-dark" :href="l.magnet">
                  <b-icon icon="magnet"></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip label="Mega">
                <a class="button is-small is-dark" :href="l.mega">
                  <b-icon icon="cloud-download"></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip label="Dailymotion">
                <a class="button is-small is-dark" :href="l.dailymotion">
                  <b-icon icon="video-camera"></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip label="CTOON">
                <a class="button is-small is-dark" :href="l.ctoon">
                  <b-icon icon="play-circle"></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip label="Other">
                <a class="button is-small is-dark" :href="l.other">
                  <b-icon icon="external-link"></b-icon>
                </a>
              </b-tooltip>
            </span>
          </div>
        </div>
      </b-tab-item>

      <b-tab-item label="Shorts" icon="video-camera" v-if="sh.length > 0">
        <div class="box legal-links" v-if="sh_legal.length > 0">
          Please consider official and legal links.
          <div class="field has-addons">
            <p class="control"
              v-for="t in sh_legal"
              :key="t.url">
              <a
                class="button"
                :href="t.url">
                <b-icon :icon="t.icon"></b-icon>
                <span>{{ t.title }}</span>
              </a>
            </p>
          </div>
        </div>
      </b-tab-item>

      <b-tab-item label="Comics" icon="book" v-if="co.length > 0">
        <div class="box legal-links" v-if="co_legal.length > 0">
          Please consider official and legal links.
          <div class="field has-addons">
            <p class="control"
              v-for="t in co_legal"
              :key="t.url">
              <a
                class="button"
                :href="t.url">
                <b-icon :icon="t.icon"></b-icon>
                <span>{{ t.title }}</span>
              </a>
            </p>
          </div>
        </div>
      </b-tab-item>

      <b-tab-item label="Soundtrack" icon="music" v-if="mu.length > 0">
        <div class="box legal-links" v-if="mu_legal.length > 0">
          Please consider official and legal links.
          <div class="field has-addons">
            <p class="control"
              v-for="t in mu_legal"
              :key="t.url">
              <a
                class="button"
                :href="t.url">
                <b-icon :icon="t.icon"></b-icon>
                <span>{{ t.title }}</span>
              </a>
            </p>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'downloads',
  metaInfo: {
    title: 'Downloads'
  },
  data () {
    return {
      ep: [],
      ep_legal: [],
      sh: [],
      sh_legal: [],
      co: [],
      co_legal: [],
      mu: [],
      mu_legal: [],
      activeTab: 0
    }
  },
  mounted () {
    // Shortcut and URL to our API
    var t = this
    var apiUrl = 'https://data.okko.fun/api/latest/downloads.json'

    // Fetch our API
    fetch(apiUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        t.ep = json['episodes']['list']
        t.ep_legal = json['episodes']['legal_links']
        t.sh = json['shorts']['list']
        t.sh_legal = json['shorts']['legal_links']
        t.co = json['comics']['list']
        t.co_legal = json['comics']['legal_links']
        t.mu = json['soundtrack']['list']
        t.mu_legal = json['soundtrack']['legal_links']
      })
  }
}
</script>

<style lang="scss">
.tabs {
  li:not(.is-active) span:not(.icon) {
    display: none !important;
  }
}

.legal-links {
  margin: 1.5rem;
}

.dl-entry {
  display: flex;
  flex-direction: row;

  .dl-title {
    flex: auto;
  }

  .dl-links {
    flex: none;
    max-width: 220px;
  }
}
</style>
