// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Styles
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'vue2-animate/dist/vue2-animate.min.css'
// Cool stuff
import VueImg from 'v-img'
import VueFilter from 'vue-filter'
// Our components
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import PageNotReady from '@/components/PageNotReady'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultTooltipAnimated: true
})
Vue.use(VueImg)
Vue.use(VueFilter)

// Load components
Vue.component('main-footer', MainFooter)
Vue.component('main-header', MainHeader)
Vue.component('page-not-ready', PageNotReady)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
