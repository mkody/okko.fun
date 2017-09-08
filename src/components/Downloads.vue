<template>
  <div id="downloads">
    <h3 class="title">Downloads</h3>
    <h5 class="subtitle">
      Download or watch episodes and shorts.
    </h5>

    <transition name="fadeLeft">
      <div class="notification is-danger" v-if="$parent.downloads.restricted">
        <strong>Sorry, but we can't show you this page.</strong><br>
        It looks like you're in a country where the show is freely available from legal sources.<br>
        Please use those sources instead of pirating the show. Thanks!
      </div>
    </transition>

    <transition name="fadeLeft">
      <div class="notification is-danger" v-if="$parent.downloads.ext_blocked">
        <strong>An external ressource couldn't be loaded.</strong><br>
        Sorry, but we couldn't load an external ressource needed to verify your connexion to our downloads.<br>
        Please disable your adblocker for this website (promise: we don't have ads)
        and/or allow <code>https://okko-region.herokuapp.com</code> to load.
      </div>
    </transition>

    <transition name="fadeUp">
      <b-tabs
        position="is-centered"
        class="block"
        v-if="$parent.downloads.ep.length > 0">
        <b-tab-item label="Episodes" icon="television" v-if="ep.length > 0">
          <div class="box legal-links" v-if="$parent.downloads.ep_legal !== null">
            Please consider official and legal links if available.<br>
            <a
              class="button"
              v-for="t in $parent.downloads.ep_legal"
              :key="t.url"
              :href="t.url">
              <b-icon :icon="t.icon"></b-icon>
              <span>{{ t.title }}</span>
            </a>
          </div>

          <div class="dl-entries columns is-multiline is-mobile is-centered">
            <div
              class="dl-entry column is-10"
              v-for="l in $parent.downloads.ep"
              :key="l.code">
              <span class="dl-title">
                S{{ l.season.toString() | leftPad(2, '0') }}E{{ l.episode.toString() | leftPad(2, '0') }}:
                <strong>{{ l.title }}</strong>
              </span>

              <span class="dl-links">
                <b-tooltip label="Direct" v-if="l.direct">
                  <a class="button is-small is-dark" :href="l.direct">
                    <b-icon icon="download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label=".torrent" v-if="l.torrent_file">
                  <a class="button is-small is-dark" :href="l.torrent_file">
                    <b-icon icon="connectdevelop"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Magnet" v-if="l.magnet">
                  <a class="button is-small is-dark" :href="l.magnet">
                    <b-icon icon="magnet"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Mega" v-if="l.mega">
                  <a class="button is-small is-dark" :href="l.mega">
                    <b-icon icon="cloud-download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Dailymotion" v-if="l.dailymotion">
                  <a class="button is-small is-dark" :href="l.dailymotion">
                    <b-icon icon="video-camera"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="CTOON" v-if="l.ctoon">
                  <a class="button is-small is-dark" :href="l.ctoon">
                    <b-icon icon="play-circle"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Other" v-if="l.other">
                  <a class="button is-small is-dark" :href="l.other">
                    <b-icon icon="external-link"></b-icon>
                  </a>
                </b-tooltip>
              </span>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="Shorts" icon="video-camera" v-if="$parent.downloads.sh.length > 0">
          <div class="box legal-links" v-if="$parent.downloads.sh_legal !== null">
            Please consider official and legal links if available.<br>
            <a
              class="button"
              v-for="t in $parent.downloads.sh_legal"
              :key="t.url"
              :href="t.url">
              <b-icon :icon="t.icon"></b-icon>
              <span>{{ t.title }}</span>
            </a>
          </div>

          <div class="dl-entries columns is-multiline">
            <div
              class="dl-entry column is-10 is-offset-1"
              v-for="l in sh"
              :key="l.code">
              <span class="dl-title">
                <strong>{{ l.title }}</strong>
              </span>

              <span class="dl-links">
                <b-tooltip label="Direct" v-if="l.direct">
                  <a class="button is-small is-dark" :href="l.direct">
                    <b-icon icon="download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label=".torrent" v-if="l.torrent_file">
                  <a class="button is-small is-dark" :href="l.torrent_file">
                    <b-icon icon="connectdevelop"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Magnet" v-if="l.magnet">
                  <a class="button is-small is-dark" :href="l.magnet">
                    <b-icon icon="magnet"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Mega" v-if="l.mega">
                  <a class="button is-small is-dark" :href="l.mega">
                    <b-icon icon="cloud-download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Dailymotion" v-if="l.dailymotion">
                  <a class="button is-small is-dark" :href="l.dailymotion">
                    <b-icon icon="video-camera"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="CTOON" v-if="l.ctoon">
                  <a class="button is-small is-dark" :href="l.ctoon">
                    <b-icon icon="play-circle"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Other" v-if="l.other">
                  <a class="button is-small is-dark" :href="l.other">
                    <b-icon icon="external-link"></b-icon>
                  </a>
                </b-tooltip>
              </span>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="Comics" icon="book" v-if="$parent.downloads.co.length > 0">
          <div class="box legal-links" v-if="$parent.downloads.co_legal !== null">
            Please consider official and legal links if available.<br>
            <a
              class="button"
              v-for="t in $parent.downloads.co_legal"
              :key="t.url"
              :href="t.url">
              <b-icon :icon="t.icon"></b-icon>
              <span>{{ t.title }}</span>
            </a>
          </div>

          <div class="dl-entries columns is-multiline">
            <div
              class="dl-entry column is-10 is-offset-1"
              v-for="l in co"
              :key="l.code">
              <span class="dl-title">
                <strong>{{ l.title }}</strong>
              </span>

              <span class="dl-links">
                <b-tooltip label="Direct" v-if="l.direct">
                  <a class="button is-small is-dark" :href="l.direct">
                    <b-icon icon="download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label=".torrent" v-if="l.torrent_file">
                  <a class="button is-small is-dark" :href="l.torrent_file">
                    <b-icon icon="connectdevelop"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Magnet" v-if="l.magnet">
                  <a class="button is-small is-dark" :href="l.magnet">
                    <b-icon icon="magnet"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Mega" v-if="l.mega">
                  <a class="button is-small is-dark" :href="l.mega">
                    <b-icon icon="cloud-download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Other" v-if="l.other">
                  <a class="button is-small is-dark" :href="l.other">
                    <b-icon icon="external-link"></b-icon>
                  </a>
                </b-tooltip>
              </span>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="Soundtrack" icon="music" v-if="$parent.downloads.mu.length > 0">
          <div class="box legal-links" v-if="$parent.downloads.mu_legal !== null">
            Please consider official and legal links if available.<br>
            <a
              class="button"
              v-for="t in $parent.downloads.mu_legal"
              :key="t.url"
              :href="t.url">
              <b-icon :icon="t.icon"></b-icon>
              <span>{{ t.title }}</span>
            </a>
          </div>

          <div class="dl-entries columns is-multiline">
            <div
              class="dl-entry column is-10 is-offset-1"
              v-for="l in mu"
              :key="l.code">
              <span class="dl-title">
                <strong>{{ l.title }}</strong>
              </span>

              <span class="dl-links">
                <b-tooltip label="Direct" v-if="l.direct">
                  <a class="button is-small is-dark" :href="l.direct">
                    <b-icon icon="download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label=".torrent" v-if="l.torrent_file">
                  <a class="button is-small is-dark" :href="l.torrent_file">
                    <b-icon icon="connectdevelop"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Magnet" v-if="l.magnet">
                  <a class="button is-small is-dark" :href="l.magnet">
                    <b-icon icon="magnet"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Mega" v-if="l.mega">
                  <a class="button is-small is-dark" :href="l.mega">
                    <b-icon icon="cloud-download"></b-icon>
                  </a>
                </b-tooltip>
                <b-tooltip label="Other" v-if="l.other">
                  <a class="button is-small is-dark" :href="l.other">
                    <b-icon icon="external-link"></b-icon>
                  </a>
                </b-tooltip>
              </span>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'downloads',
  metaInfo: {
    title: 'Downloads'
  },
  mounted () {
    // Shortcut and URL to our API
    var t = this
    t.$parent.loading = true
    // var checkCountry = 'https://okko-region.herokuapp.com/json/'
    var apiUrl = 'https://data.okko.fun/api/latest/downloads.json'

    if (localStorage.getItem('awesome') === 'yes') {
      t.restricted = true
      return
    }

    /*
    fetch(checkCountry)
      .then(data => {
        return data.json()
      })
      .catch(() => {
        t.$dialog.alert({
          title: 'Something went wrong!',
          message: 'Please check that you don\'t block some external ressources with an adblocker and please try again!<br>(If needed, send us a tweet.)',
          type: 'is-danger',
          hasIcon: true
        })
      })
      .then(json => {
        console.log(json)
        if (json['country_code'] !== 'A1' || localStorage.getItem('ImADick') === 'totally') {
    */
    // Fetch our API
    fetch(apiUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.error(err)
      }).catch(() => {
        t.$dialog.alert({
          title: 'Something went wrong!',
          message: 'Sorry we broke. Please try again later!<br>(If needed, send us a tweet.)',
          type: 'is-danger',
          hasIcon: true
        })
      })
      .then(json => {
        if (json['error']) {
          if (json['error']['code'] === 451) {
            t.restricted = true
            localStorage.setItem('awesome', 'yes')
          } else {
            t.$dialog.alert({
              title: 'Something went wrong!',
              message: json['error']['message'],
              type: 'is-danger',
              hasIcon: true
            })
          }
          return
        }
        t.ep = json['episodes']['list']
        t.ep_legal = json['episodes']['legal_links']
        t.sh = json['shorts']['list']
        t.sh_legal = json['shorts']['legal_links']
        t.co = json['comics']['list']
        t.co_legal = json['comics']['legal_links']
        t.mu = json['soundtrack']['list']
        t.mu_legal = json['soundtrack']['legal_links']
      })
      .then(() => {
        setTimeout(() => {
          t.$parent.loading = false
        }, 1000)
      })
    /*
        } else {
          t.restricted = true
          localStorage.setItem('awesome', 'yes')
        }
      })
    */
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
  margin: 1.5rem 1.5rem 0 !important;
  text-align: center;
}

.dl-entries {
  margin-top: 1.5rem !important;

  .dl-entry {
    display: flex;
    flex-direction: row;

    &:nth-child(even) {
      background-color: hsl(0, 0%, 96%);
    }

    .dl-title {
      flex: auto;
    }

    .dl-links {
      flex: none;
      max-width: 220px;
    }
  }
}
</style>
