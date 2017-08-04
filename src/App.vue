<template>
  <div id="app">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="/static/img/icons/android-chrome-36x36.png" alt="OKKO.fun" height="28"  width="28">
        </router-link>

        <a class="navbar-item is-hidden-desktop" href="https://twitter.com/okkofun" target="_blank">
          <b-icon icon="twitter"></b-icon>
        </a>

        <a class="navbar-item is-hidden-desktop" href="https://okkofun.tumblr.com" target="_blank">
          <b-icon icon="tumblr"></b-icon>
        </a>

        <!--
        <div class="navbar-burger burger" data-target="navMenuHeader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        -->
      </div>

      <div id="navMenuHeader" class="navbar-menu">
        <div class="navbar-start">
          <!--
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" to="/about">
              About
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link class="navbar-item" to="/about/show">
                The Show
              </router-link>
              <router-link class="navbar-item" to="/about/timeline">
                Show Timeline
              </router-link>
              <router-link class="navbar-item" to="/about/staff">
                The Staff
              </router-link>
              <router-link class="navbar-item" to="/about/here">
                This Website
              </router-link>
            </div>
          </div>
          <router-link class="navbar-item" to="/community">
            Community
          </router-link>
          <router-link class="navbar-item" to="/news">
            News
          </router-link>
          <router-link class="navbar-item" to="/schedule">
            Schedule
          </router-link>
          -->
        </div>

        <div class="navbar-end">
          <a class="navbar-item is-hidden-desktop-only" href="https://twitter.com/jgthms" target="_blank">
            <b-icon icon="twitter"></b-icon>
            Twitter
          </a>
          <a class="navbar-item is-hidden-desktop-only" href="https://github.com/jgthms/bulma" target="_blank">
            <b-icon icon="tumblr"></b-icon>
            Tumblr
          </a>
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button" href="https://twitter.com/okkofun" target="_blank">
                  <b-icon icon="twitter"></b-icon>
                  <span>
                    Twitter
                  </span>
                </a>
              </p>
              <p class="control">
                <a class="button is-info" href="https://okkofun.tumblr.com" target="_blank">
                  <b-icon icon="tumblr"></b-icon>
                  <span>
                    umblr
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <header class="section">
      <div class="container">
        <h1 class="title">
          <img src="./assets/OK_KO.png" alt="OK K.O.! - Let's be heroes">
        </h1>
        <h2 class="subtitle">Fansite</h2>
      </div>
    </header>
    <section class="section">
      <div class="container is-widescreen">
        <router-view></router-view>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            © <b>OKKO.fun</b> 2017<br>
            <b>OK K.O! Let's Be Heroes</b> TM & © Cartoon Network.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    titleTemplate: '%s | OK K.O.! Fansite'
  }
}
</script>

<style lang="less">
header {
  text-align: center;

  img {
    max-height: 150px;
    max-width: 100%;
  }
}
</style>
