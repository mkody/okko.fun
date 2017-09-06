<template>
  <div id="home">
    <div class="columns is-multiline is-tablet">
      <div class="column is-one-thirds-tablet">
        <div class="box">
          <strong>We're still building the website!</strong><br>
          Some pages might not be complete, but we're getting there. ;)
        </div>

        <br>

        <transition name="fadeUp">
          <div v-if="episodes.length > 0">
            <h5 class="subtitle">New New New New on TV</h5>
            <div class="columns is-multiline is-desktop is-centered">
              <div class="column is-12 card"
                v-for="episode in episodes"
                :key="episode.timestamp">
                <div class="content">
                  <strong>
                    {{ episode.title }}
                  </strong>
                  <br>
                  {{ getDate(episode.timestamp) }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="column is-two-thirds-tablet">
        <h5 class="subtitle">From the official Tumblr</h5>

        <transition name="fadeUp">
          <div class="card" v-if="tumblr.latest">
            <div class="card-image">
              <span v-if="tumblr.latest.embed">
                <figure
                  class="image-center"
                  v-if="tumblr.latest.embed.html.startsWith('\n<video ')">
                  <a target="_blank" :href="tumblr.latest.url">
                    <img :src="tumblr.latest.embed.thumbnail">
                  </a>
                </figure>
                <figure
                  class="image-center"
                  v-else
                  v-html="tumblr.latest.embed.html">
                </figure>
              </span>
              <span v-if="tumblr.latest.photos">
                <figure
                  class="image-center">
                  <img v-img :src="tumblr.latest.photos[0]">
                </figure>
                <div
                  class="columns is-multiline"
                  v-if="tumblr.latest.photos.length > 1">
                  <figure
                    class="column is-one-quarter image-thumbnails"
                    v-for="(i, j) in tumblr.latest.photos.slice(1)"
                    :key="j">
                    <img v-img :src="i">
                  </figure>
                </div>
              </span>
            </div>

            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="tumblr.latest.author.avatar" :alt="tumblr.latest.author.name">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">
                    {{ tumblr.latest.author.name }}
                  </p>
                  <p class="subtitle is-6">
                    <b-tooltip
                      label="See original post"
                      dashed
                      animated>
                      <a target="_blank" :href="tumblr.latest.url">
                        {{ getDate(tumblr.latest.timestamp) }}
                      </a>
                    </b-tooltip>
                  </p>
                </div>
              </div>

              <div class="content">
                <div v-html="tumblr.latest.caption"></div>
                <small>
                  <span v-if="tumblr.latest.tags.length > 0">
                    <br> Tags:
                    <a
                      target="_blank"
                      v-for="l in tumblr.latest.tags"
                      :key="l.name"
                      :href="l.url">
                      #{{ l.name }}
                    </a>
                  </span>
                </small>
              </div>
            </div>
          </div>
        </transition>

        <transition-group name="fadeUp">
          <div
            class="box"
            v-for="(p, j) in tumblr.previous"
            :key="j">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="p.author.avatar">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ p.author.name }}</strong>

                    <b-tooltip
                      label="See original post"
                      dashed
                      animated>
                      <small>
                        <a target="_blank" :href="p.url">{{ getDate(p.timestamp) }}</a>
                      </small>
                    </b-tooltip>
                    <br>
                    {{ p.summary }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  metaInfo: {
    title: 'Home'
  },
  data () {
    return {
      tweets: [],
      tumblr: {
        latest: false,
        previous: []
      },
      episodes: [],
      currentTS: parseInt(Date.now() / 1000, 10),
      premiereTs: []
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
    var premieresUrl = 'https://data.okko.fun/api/latest/premiere-ts.json'

    // Fetch our API
    fetch(premieresUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        Object.keys(json).map(pKey => {
          t.premiereTs.push(json[pKey]['ts'])
        })
      }).then(() => {
        var scheduleUrl = 'https://api.sug.rocks/cnschedule.json'

        // Fetch our API
        fetch(scheduleUrl)
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
                  if (el['show'] === 'OK K.O.! Let\'s Be Heroes' &&
                      el['timestamp'] > t.currentTS &&
                      t.premiereTs.indexOf(el['timestamp']) > -1) {
                    t.episodes.push(el)
                  }
                })
              }
            })
          })
      })

    var postApi = 'https://data.okko.fun/api/latest/tumblr-posts.json'

    // Fetch our API
    fetch(postApi)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        t.tumblr.latest = json[0]
        t.tumblr.previous = json.slice(1)
      })
  }
}
</script>

<style lang="scss">
.image-center {
  width: 100% !important;
  text-align: center !important;

  img {
    max-height: 500px !important;
  }
}

.image-thumbnails {
  text-align: center !important;

  img {
    max-height: 100px !important;
  }
}

.box {
    margin-bottom: 0 !important;
    margin-top: 0.5rem !important;
}
</style>
