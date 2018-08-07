<template>
  <div id="home">
    <div class="columns is-multiline is-tablet">
      <div class="column is-one-thirds-tablet">
        <h5 class="subtitle">Schedule</h5>

        <transition name="fade" :duration="500" mode="out-in">
          <div key="lo" class="box" v-if="!$parent.schedule.ready">
            Loading...
          </div>
          <div key="em" class="box" v-else-if="$parent.schedule.ready && $parent.schedule.episodes.length === 0">
            No known dates for now.
          </div>
        </transition>

        <transition name="fadeUp" :duration="1500">
          <div v-if="mnt && $parent.schedule.episodes.length > 0">
            <div class="columns is-multiline is-desktop is-centered">
              <div class="column is-12 card"
                v-for="episode in $parent.schedule.episodes.slice(0, 5)"
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
                  <strong>
                    {{ episode.episode }}
                  </strong>
                  <br>
                  {{ $parent.getDate(episode.timestamp) }}
                </div>
              </div>
              <div class="column is-12 card"
                v-if="$parent.schedule.episodes.length > 5">
                <router-link tag="div" class="content clickable" to="/schedule">
                  Click here for more...
                </router-link>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="column is-two-thirds-tablet">
        <h5 class="subtitle">From the official Tumblr</h5>

        <transition name="fadeUp">
          <div v-if="mnt && $parent.tumblr.latest">
            <div class="card">
              <div class="card-image">
                <span v-if="$parent.tumblr.latest.embed">
                  <figure
                    class="image-center"
                    v-if="$parent.tumblr.latest.embed.html.startsWith('\n<video ')">
                    <a target="_blank" :href="$parent.tumblr.latest.url">
                      <span class="ext">Click here to play this media on Tumblr.</span>
                      <img
                        v-img="{
                          group: 'tumblr',
                          src: $parent.tumblr.latest.embed.thumbnail,
                          cursor: 'zoom-in'
                        }"
                        :src="'https://proxy.sug.rocks/x500/' + $parent.tumblr.latest.embed.thumbnail">
                    </a>
                  </figure>
                  <figure
                    class="image-center"
                    v-else
                    v-html="$parent.tumblr.latest.embed.html">
                  </figure>
                </span>
                <span v-if="$parent.tumblr.latest.photos">
                  <figure
                    class="image-center">
                    <img
                      v-img="{
                        group: 'tumblr',
                        src: $parent.tumblr.latest.photos[0],
                        cursor: 'zoom-in'
                      }"
                      :src="'https://proxy.sug.rocks/x500/' + $parent.tumblr.latest.photos[0]">
                  </figure>
                  <div
                    class="columns is-multiline is-mobile is-centered"
                    v-if="$parent.tumblr.latest.photos.length > 1">
                    <figure
                      class="column is-one-quarter-tablet is-one-third-mobile image-thumbnails"
                      v-for="(i, j) in $parent.tumblr.latest.photos.slice(1)"
                      :key="j">
                      <img
                        v-img="{
                          group: 'tumblr',
                          src: i,
                          cursor: 'zoom-in'
                        }"
                        :src="'https://proxy.sug.rocks/x100/' + i">
                    </figure>
                  </div>
                </span>
              </div>

              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        :src="$parent.tumblr.latest.author.avatar"
                        :alt="$parent.tumblr.latest.author.name">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">
                      {{ $parent.tumblr.latest.author.name }}
                    </p>
                    <p class="subtitle is-6">
                      <b-tooltip
                        label="See original post"
                        dashed
                        animated>
                        <a target="_blank" :href="$parent.tumblr.latest.url">
                          {{ $parent.getDate($parent.tumblr.latest.timestamp) }}
                        </a>
                      </b-tooltip>
                    </p>
                  </div>
                </div>

                <div class="content">
                  <div v-html="$parent.tumblr.latest.caption"></div>
                  <small>
                    <span v-if="$parent.tumblr.latest.tags.length > 0">
                      <br> Tags:
                      <a
                        target="_blank"
                        v-for="l in $parent.tumblr.latest.tags"
                        :key="l.name"
                        :href="l.url">
                        #{{ l.name }}
                      </a>
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition-group name="fadeUp">
          <div
            class="box"
            v-if="mnt"
            v-for="(p, j) in $parent.tumblr.previous"
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
                        <a target="_blank" :href="p.url">{{ $parent.getDate(p.timestamp) }}</a>
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

<style lang="scss">
.image-center {
  text-align: center !important;
  width: 100% !important;

  img {
    max-height: 500px !important;
  }

  .ext {
    background-color: white;
    border-radius: 0 0 15px;
    box-shadow: 6px 6px 10px 3px rgba(0, 0, 0, 0.42);
    padding: 7px 15px;
    position: absolute;
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
