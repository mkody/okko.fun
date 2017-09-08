<template>
  <div id="app">
    <transition
      appear
      name="fadeDown">
      <main-header></main-header>
    </transition>

    <section class="section">
      <div class="container is-widescreen">
        <transition
          appear
          name="fade"
          leave-active-class="fadeOutLeft"
          mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </section>

    <main-footer></main-footer>
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    titleTemplate: '%s | OK K.O.! Fansite'
  },
  data () {
    return {
      mntDelay: 300,
      loading: true,
      currentTs: parseInt(Date.now() / 1000, 10),
      tweets: [],
      tumblr: {
        latest: false,
        previous: []
      },
      schedule: {
        episodes: [],
        premieres: [],
        premiereTs: []
      },
      downloads: {
        ep: [],
        ep_legal: null,
        sh: [],
        sh_legal: null,
        co: [],
        co_legal: null,
        mu: [],
        mu_legal: null,
        restricted: false,
        ext_blocked: false
      },
      links_ressources: [],
      previews: [],
      timeline: []
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
    var allUrl = 'https://data.okko.fun/api/latest/all.json'

    // Fetch our API
    fetch(allUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        // Premieres
        Object.keys(json['premiere-ts']).map(pKey => {
          t.schedule.premiereTs.push(json['premiere-ts'][pKey]['ts'])
          if (json['premiere-ts'][pKey]['ts'] > t.currentTs) {
            t.schedule.premieres.push(json['premiere-ts'][pKey])
          }
        })

        // Tumblr posts
        t.tumblr.latest = json['tumblr-posts'][0]
        t.tumblr.previous = json['tumblr-posts'].slice(1)

        // Links
        t.links_ressources = json['links']

        // Timline
        t.timeline = json['timeline']
      })
      .then(() => {
        // Get the schedule from CN Schedule
        var scheduleUrl = 'https://api.sug.rocks/cnschedule.json'
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
                  if (el['show'] === 'OK K.O.! Let\'s Be Heroes' && el['timestamp'] > t.currentTs) {
                    t.schedule.episodes.push(el)
                  }
                })
              }
            })
          })

        // Get the previews
        var prevUrl = 'https://api.sug.rocks/all-leaks.json'
        fetch(prevUrl)
          .then(data => {
            return data.json()
          }, err => {
            console.log(err)
          })
          .then(json => {
            Object.keys(json).map(prevKey => {
              var prev = json[prevKey]
              if (prev['show'] === 'OK K.O.! Let\'s Be Heroes') {
                t.previews.push(prev)
              }
            })
          })

        // Get the downloads
        var dlUrl = 'https://data.okko.fun/api/latest/downloads.json'
        var checkCountry = 'https://okko-region.herokuapp.com/json/'

        if (localStorage.getItem('awesome') === 'yes') {
          t.restricted = true
          return
        }

        fetch(checkCountry)
          .then(data => {
            return data.json()
          })
          .catch(() => {
            console.error('Something broke when getting downloads bro.')
            t.downloads.ext_blocked = true
          })
          .then(json => {
            console.log(json)
            if (json['country_code'] !== 'A1' || localStorage.getItem('ImADick') === 'totally') {
              // Fetch our downloads
              fetch(dlUrl)
                .then(data => {
                  return data.json()
                }, err => {
                  console.error(err)
                }).catch(() => {
                  console.error('Something broke when getting downloads bro.')
                  t.downloads.ext_blocked = true
                })
                .then(json => {
                  if (json['error']) {
                    if (json['error']['code'] === 451) {
                      t.restricted = true
                      localStorage.setItem('awesome', 'yes')
                    } else {
                      console.error('Something broke when getting downloads bro.\n' + json['error']['message'])
                      t.downloads.ext_blocked = true
                    }
                    return
                  }
                  t.downloads.ep = json['episodes']['list']
                  t.downloads.ep_legal = json['episodes']['legal_links']
                  t.downloads.sh = json['shorts']['list']
                  t.downloads.sh_legal = json['shorts']['legal_links']
                  t.downloads.co = json['comics']['list']
                  t.downloads.co_legal = json['comics']['legal_links']
                  t.downloads.mu = json['soundtrack']['list']
                  t.downloads.mu_legal = json['soundtrack']['legal_links']
                })
            } else {
              t.restricted = true
              localStorage.setItem('awesome', 'yes')
            }
          })
      })
      .then(() => {
        t.loading = false
      })
  }
}
</script>

<style lang="scss">
@import './assets/styles';

#app > .section > .container {
  min-height: calc(100vh - 250px);
}
</style>
