<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item is-home" to="/">
          Home
        </router-link>

        <a class="navbar-item is-hidden-desktop" href="https://twitter.com/okkofun" target="_blank">
          <b-icon icon="twitter"></b-icon>
        </a>

        <div class="navbar-burger burger" @click="toggleBurger" :class="{'is-active': burgerOpen}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div @click="closeBurger" :class="{'navbar-menu': true, 'is-active': burgerOpen}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/schedule">
            Schedule
          </router-link>

          <router-link class="navbar-item" to="/previews">
            Previews (Leaks)
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" to="/about">
              About
            </router-link>

            <div class="navbar-dropdown is-boxed">
              <!--
              <router-link class="navbar-item" to="/about/show">
                The Show
              </router-link>
              -->

              <router-link class="navbar-item" to="/about/timeline">
                Show Timeline
              </router-link>

              <!--
              <router-link class="navbar-item" to="/about/staff">
                The Staff
              </router-link>

              <router-link class="navbar-item" to="/about/here">
                This Website
              </router-link>
              -->
            </div>
          </div>

          <router-link class="navbar-item" to="/links">
            Links
          </router-link>

          <!--
          <router-link class="navbar-item" to="/news">
            News
          </router-link>
          -->

          <transition name="fade">
            <router-link
              class="navbar-item"
              to="/downloads"
              v-if="$parent.downloads.whitelist.indexOf($parent.downloads.country) > -1">
              Downloads
            </router-link>
          </transition>
        </div>

        <div class="navbar-end is-hidden-mobile">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-info" href="https://twitter.com/okkofun" target="_blank">
                  <b-icon icon="twitter"></b-icon>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <h1 class="title">
        <img src="../assets/OK_KO.png" alt="OK K.O.! - Let's be heroes">
      </h1>
      <h2 class="subtitle">Fansite</h2>
    </div>
  </header>
</template>

<script>
export default {
  name: 'main-header',
  data () {
    return {
      burgerOpen: false
    }
  },
  methods: {
    toggleBurger: function () {
      this.burgerOpen = !this.burgerOpen
    },
    closeBurger: function () {
      this.burgerOpen = false
    }
  }
}
</script>

<style lang="scss">
header {
  text-align: center;

  img {
    max-height: 150px;
    max-width: 100%;
  }
}
</style>
