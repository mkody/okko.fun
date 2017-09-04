<template>
  <div id="schedule">
    <h3 class="title">Next TV Airings</h3>
    <h5 class="subtitle">Dates are converted to your computer timezone</h5>
    <div class="content">
      Want to see more schedules?
      <a target="_blank" href="https://cnschedulearchive.tumblr.com/">CN Schedule Archive</a> - <a target="_blank" href="https://cn.sug.rocks/">CN Online Schedule</a>
    </div>

    <div class="columns is-multiline is-mobile is-centered">
      <div class="column is-8 card"
        v-for="episode in episodes"
        :key="episode.timestamp">
        <div class="content">
          <div class="newnewnewnew" v-if="premiereTs.indexOf(episode.timestamp) > -1">
            <span style="color: #ec1ad8">NEW</span><br>
            <span style="color: #0187ff">NEW</span><br>
            <span style="color: #ffecff">NEW</span><br>
            <span style="color: #001003">NEW</span>
          </div>
          <h4 class="title">
            {{ episode.title }}
          </h4>
          <h5 class="subtitle" :data-ts="episode.timestamp">
            {{ getDate(episode.timestamp) }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Polyfill for fetch()
import 'whatwg-fetch'

export default {
  name: 'schedule',
  metaInfo: {
    title: 'Next TV Airings'
  },
  data () {
    return {
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
              if (el['show'] === 'OK K.O.! Let\'s Be Heroes' && el['timestamp'] > t.currentTS) {
                t.episodes.push(el)
              }
            })
          }
        })
      })

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
      })
  }
}
</script>

<style scoped>
h5.subtitle {
   margin-bottom: 0;
}

.card .content h5 {
    margin-bottom: 0;
}

.newnewnewnew {
    /* background: linear-gradient(0deg, #ffc100, #e3e81d); */
    background: linear-gradient(180deg, #1ddde8, #1de840);
    float: right;
    font-size: 18px;
    font-weight: bold;
    line-height: 17px;
    margin: -12px -12px -12px 10px;
    overflow: hidden;
    padding: 2px 5px 0;
}

.newnewnewnew span {
    animation-duration: 3s;
    animation-name: newnewnewnew;
    animation-iteration-count: infinite;
    position: relative;
    top: 0px;
}

@keyframes newnewnewnew {
    0% {
       top: 70px;
    }
    10% {
       top: 70px;
    }
    12% {
       top: 51px;
    }
    20% {
       top: 51px;
    }
    22% {
       top: 34px;
    }
    30% {
       top: 34px;
    }
    32% {
       top: 17px;
    }
    40% {
       top: 17px;
    }
    42% {
       top: 0px;
    }
    90% {
       opacity: 1;
    }
    100% {
       opacity: 0;
    }
}
</style>
