<template>
  <footer id="main-footer" class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <b>OKKO.fun</b> &middot; 2017 &middot; &copy;
          <b-tooltip
            label="CTOON Webmedia Group"
            type="is-dark"
            dashed
            animated>
            CTOON
          </b-tooltip>
          <br>
          <b>OK K.O.! Let's Be Heroes</b> &middot; 2017 &middot; TM & &copy;
          <b-tooltip
            label="A Time Warner Company"
            type="is-dark"
            dashed
            animated>
            Cartoon Network
          </b-tooltip>
        </p>
        <p>
          <small><i>Website design not final.</i></small>
        </p>
      </div>
    </div>
    <cookie-law theme="blood-orange"></cookie-law>
  </footer>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
export default {
  name: 'main-footer',
  components: {
    CookieLaw
  }
}
</script>
