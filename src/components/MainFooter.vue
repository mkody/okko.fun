<template>
  <footer id="main-footer" class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          © <b>OKKO.fun</b> 2017<br>
          <b>OK K.O! Let's Be Heroes</b> TM & © Cartoon Network.
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
