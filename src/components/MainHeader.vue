<template>
  <div id="main-header">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item is-home" to="/">
          Home
        </router-link>

        <a class="navbar-item is-hidden-desktop" href="https://twitter.com/okkofun" target="_blank">
          <b-icon icon="twitter"></b-icon>
        </a>

        <div class="navbar-burger burger" data-target="navMenuHeader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenuHeader" class="navbar-menu">
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
        </div>

        <div class="navbar-end is-hidden-mobile">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-info" href="https://twitter.com/okkofun" target="_blank">
                  <b-icon icon="twitter"></b-icon>
                  <span>
                    Twitter
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <header>
      <div class="container">
        <h1 class="title">
          <img src="../assets/OK_KO.png" alt="OK K.O.! - Let's be heroes">
        </h1>
        <h2 class="subtitle">Fansite</h2>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'main-header'
}

document.addEventListener('DOMContentLoaded', function () {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target
        var $target = document.getElementById(target)

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})
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
