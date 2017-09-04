<template>
  <div id="home">
    <div class="columns is-multiline is-tablet">
      <div class="column is-one-thirds-tablet">
        <strong>We're still building the website!</strong><br>
        Some pages might not be complete, but we're getting there. ;)
      </div>
      <div class="column is-two-thirds-tablet">
        <h5 class="subtitle">Latest from the official Tumblr</h5>
        <div class="box" v-if="!tumblr.latest">
          <strong>Loading...</strong>
        </div>
        <div class="card" v-if="tumblr.latest">
          <div class="card-image">
            <figure
              class="image-center"
              v-if="tumblr.latest['embed']"
              v-html="tumblr.latest['embed']['html']">
            </figure>
            <figure
              class="image-center"
              v-if="tumblr.latest['photos']">
              <img v-img :src="tumblr.latest['photos'][0]">
            </figure>
            <div
              class="columns is-multiline"
              v-if="tumblr.latest['photos'].length > 1">
              <figure
                class="column is-one-quarter image-thumbnails"
                v-for="(i, j) in tumblr.latest['photos'].slice(1)"
                :key="j">
                <img v-img :src="i">
              </figure>
            </div>
          </div>

          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="tumblr.latest['author']['avatar']" :alt="tumblr.latest['author']['name']">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  {{ tumblr.latest['author']['name'] }}
                </p>
                <p class="subtitle is-6">
                  <a :href="tumblr.latest['url']">
                    {{ getDate(tumblr.latest['timestamp']) }}
                  </a>
                </p>
              </div>
            </div>

            <div class="content">
              <div v-html="tumblr.latest['caption']"></div>
              <small>
                <span v-if="tumblr.latest['tags'].length > 0">
                  <br> Tags:
                  <a
                    v-for="l in tumblr.latest['tags']"
                    :key="l.name"
                    :href="l.url">
                    #{{ l.name }}
                  </a>
                </span>
              </small>
            </div>
          </div>
        </div>
        <div
          class="box"
          v-for="(p, j) in tumblr.previous"
          :key="j">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="p['author']['avatar']">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ p['author']['name'] }}</strong> <small><a :href="p['url']">{{ getDate(p['timestamp']) }}</a></small>
                  <br>
                  {{ p['summary'] }}
                </p>
              </div>
            </div>
          </article>
        </div>
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
      tumblr: {
        latest: false,
        previous: []
      }
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
