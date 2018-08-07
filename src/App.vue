<template>
  <div id="app">
    <main-header></main-header>

    <main class="section">
      <div class="container is-widescreen">
        <transition
          name="fade"
          leave-active-class="fadeOutLeft"
          mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>

    <main-footer></main-footer>
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
  </div>
</template>

<script>
let xmlConvert = require('xml-js')

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
        ready: false,
        episodes: [],
        premieres: [],
        premiereTs: []
      },
      downloads: {
        ready: false,
        ep: [],
        ep_legal: null,
        sh: [],
        sh_legal: null,
        co: [],
        co_legal: null,
        mu: [],
        mu_legal: null,
        restricted: false,
        ext_blocked: false,
        country: false,
        whitelist: [
          'CH',
          'FR',
          'DE',
          'UK',
          'ES',
          'MX',
          'RU',
          'PT'
        ]
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

    if (window.navigator.userAgent.indexOf('PhantomJS') > -1) {
      // Dont' go fetch data if we're using PhantomJS
      t.loading = false
      return
    }

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
        // Get the schedule from the xml
        let scheduleUrl = 'https://cors.kdy.ch/?url=http://www.adultswim.com/adultswimdynsched/xmlServices/ScheduleServices'
        scheduleUrl += '%3FmethodName%3DgetAllShowings%26showId%3D440832%26name%3DOK%20K.O.!%26timezone%3DEST'
        fetch(scheduleUrl)
          .then(data => {
            return data.json()
          }, err => {
            console.log(err)
            t.schedule.ready = true
          })
          .then(json => {
            let eps = (xmlConvert.xml2js(json.body, { compact: true })).allShowings.show
            Object.keys(eps).map(dayKey => {
              let day = eps[dayKey]._attributes
              day.timestamp = Date.parse(day.date + ' 2018 ' + day.time) / 1000
              t.schedule.episodes.push(day)
            })
            t.schedule.ready = true
          })

        // Get the previews
        var prevUrl = 'https://api.ctoon.network/previews/shows/2'
        fetch(prevUrl)
          .then(data => {
            return data.json()
          }, err => {
            console.log(err)
          })
          .then(json => {
            t.previews = json
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
            console.error('Something broke when getting the country bro.')
            t.downloads.ext_blocked = true
            t.downloads.ready = true
          })
          .then(json => {
            t.downloads.country = json['country_code']
            if (t.downloads.country !== 'A1' || localStorage.getItem('ImADick') === 'totally') {
              // Fetch our downloads
              fetch(dlUrl)
                .then(data => {
                  return data.json()
                }, err => {
                  console.error(err)
                  t.downloads.ready = true
                }).catch(() => {
                  console.error('Something broke when getting downloads bro.')
                  t.downloads.ext_blocked = true
                  t.downloads.ready = true
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
                    t.downloads.ready = true

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

                  t.downloads.ready = true
                })
            } else {
              localStorage.setItem('awesome', 'yes')
              t.restricted = true
              t.downloads.ready = true
            }
          })
      })
      .then(() => {
        // Close loading
        setTimeout(function () {
          t.loading = false
        }, 500)
      })
  }
}
</script>

<style lang="scss">
@import './assets/styles';
</style>
