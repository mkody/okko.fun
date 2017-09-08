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
          <div v-if="$parent.schedule.premieres.length > 0">
            <h5 class="subtitle">New New New New on TV</h5>
            <div class="columns is-multiline is-desktop is-centered">
              <div class="column is-12 card"
                v-for="episode in $parent.schedule.premieres"
                :key="episode.timestamp">
                <div class="content">
                  <strong>
                    {{ episode.title }}
                  </strong>
                  <br>
                  {{ $parent.getDate(episode.ts) }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="column is-two-thirds-tablet">
        <h5 class="subtitle">From the official Tumblr</h5>

        <transition name="fadeUp">
          <div class="card" v-if="$parent.tumblr.latest">
            <div class="card-image">
              <span v-if="$parent.tumblr.latest.embed">
                <figure
                  class="image-center"
                  v-if="$parent.tumblr.latest.embed.html.startsWith('\n<video ')">
                  <a target="_blank" :href="$parent.tumblr.latest.url">
                    <span class="ext">Click here to play this media on Tumblr.</span>
                    <img :src="$parent.tumblr.latest.embed.thumbnail">
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
                  <img v-img :src="$parent.tumblr.latest.photos[0]">
                </figure>
                <div
                  class="columns is-multiline"
                  v-if="$parent.tumblr.latest.photos.length > 1">
                  <figure
                    class="column is-one-quarter image-thumbnails"
                    v-for="(i, j) in $parent.tumblr.latest.photos.slice(1)"
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
        </transition>

        <transition-group name="fadeUp">
          <div
            class="box"
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
</style>
