<template>
  <div id="schedule">
    <h3 class="title">Next TV Airings</h3>
    <h5 class="subtitle">This is the EST schedule.</h5>
    <div class="content">
      Want to see more schedules?
      <a target="_blank" href="https://cnschedulearchive.tumblr.com/">CN Schedule Archive</a> - <a target="_blank" href="https://schedule.ctoon.network/">CN Online Schedule</a>
    </div>

    <transition name="fadeUp" :duration="500" mode="out-in">
      <h4 key="lo" v-if="!$parent.schedule.ready" class="title has-text-centered">Loading...</h4>
      <h4 key="em" v-else-if="$parent.schedule.ready && $parent.schedule.episodes.length === 0" class="title has-text-centered">Empty for now...</h4>
    </transition>

    <transition-group name="fadeUp" tag="div" :duration="1500" class="columns is-multiline is-mobile is-centered">
      <div class="column is-8 card"
        v-if="mnt && $parent.schedule.ready"
        v-for="episode in $parent.schedule.episodes"
        :key="episode.timestamp">
        <div class="content">
          <transition name="zoomLeft">
            <div class="newnewnewnew" v-if="$parent.schedule.premiereTs.indexOf(episode.timestamp) > -1">
              <span style="color: #ec1ad8">NEW</span><br>
              <span style="color: #0187ff">NEW</span><br>
              <span style="color: #ffecff">NEW</span><br>
              <span style="color: #001003">NEW</span>
            </div>
          </transition>
          <h4 class="title">
            {{ episode.episode }}
          </h4>
          <h5 class="subtitle" :data-ts="episode.timestamp">
            {{ $parent.getDate(episode.timestamp) }}
          </h5>
        </div>
      </div>
    </transition-group>
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

<style lang="scss" scoped>
h5.subtitle {
  font-weight: 400;
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

  span {
    animation-duration: 3s;
    animation-name: newnewnewnew;
    animation-iteration-count: infinite;
    position: relative;
    top: 0px;
  }
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
