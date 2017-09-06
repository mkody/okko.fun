// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Raven to use with Sentry.io
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
// Styles
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
// Cool stuff
import VueImg from 'v-img'
import VueFilter from 'vue-filter'
// Our components
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import PageNotReady from '@/components/PageNotReady'

Vue.config.productionTip = false
// Enable plugins
Raven
  .config('https://2bb55e55d64d47a39812ef0c33533c17@sentry.io/213579', {
    release: VERSION,
    tags: {
      git_commit: COMMITHASH,
      git_branch: BRANCH
    },
    environment: process.env
  })
  .addPlugin(RavenVue, Vue)
  .install()
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

// Say hi to whoever opens the console
console.log(
  '%cOKKO.fun',
  'font-size:70px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);'
)
console.log(
  '%cby CTOON Webmedia Group',
  'font-style:italic;'
)
console.log(
  '%cVersion: ' + VERSION +
  '\nCommit: ' + COMMITHASH +
  '\nBranch: ' + BRANCH,
  'color:green;'
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
