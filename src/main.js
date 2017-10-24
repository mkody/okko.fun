/* globals VERSION COMMITHASH BRANCH */
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
import 'vue2-animate/dist/vue2-animate.min.css'
// Cool stuff
import VueImg from 'v-img'
import VueFilter from 'vue-filter'
import VueAnalytics from 'vue-analytics'
// Our components
import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import PageNotReady from '@/components/PageNotReady'

// Test if the browser doesn't support console and localStorage
if (typeof console === 'undefined' || typeof localStorage === 'undefined') {
  var errorMsgUnsupported = '<h1>OKKO.fun</h1>'
  errorMsgUnsupported += '<b>You\'re currently using an unsupported browser</b>.<br>'
  errorMsgUnsupported += 'Please upgrade to the latest version of Chrome, Opera, Brave, Firefox, Microsoft Edge or Safari to continue.<br>'
  errorMsgUnsupported += '<a href="https://whatbrowser.org/">More details on having a good and updated browser here.</a>'

  document.getElementById('jserror').innerHTML = errorMsgUnsupported
  throw new Error('Unsupported browser')
}

// Test if we can write things to localStorage (IE's "Access Denied" / iOS Private Browsing)
try {
  window.localStorage.setItem('OK K.O.!', 'Let\'s Be Heroes!')
} catch (error) {
  var errorMsgLS = '<h1>OKKO.fun</h1>'
  errorMsgLS += '<b>This app doesn\'t work with your current browser state.</b><br>'
  errorMsgLS += 'iOS users: Private browsing mode breaks the saving/loading feature of the app. Please go to normal mode.<br>'
  errorMsgLS += 'Internet Explorer users: Your browser doesn\'t allow this website to save local content.'
  errorMsgLS += 'This might be a security measure from your computer or your company.'
  errorMsgLS += 'If you can, add this website to the thrusted sites list or temporarly use an another browser.'

  document.getElementById('jserror').innerHTML = errorMsgLS
  throw new Error('Can\'t write to localStorage')
}

// Stop posting tips
Vue.config.productionTip = false

// Load components
Vue.component('main-footer', MainFooter)
Vue.component('main-header', MainHeader)
Vue.component('page-not-ready', PageNotReady)

// Enable plugins
if (!window.navigator.userAgent.indexOf('PhantomJS') > -1) {
  // Don't enable Raven on PhantomJS
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
}
Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultTooltipAnimated: true
})
Vue.use(VueImg, {
  sourceButton: true
})
Vue.use(VueFilter)
Vue.use(VueAnalytics, {
  id: 'UA-103935709-3',
  router
})

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
var v = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// Display a snackback if the webworker was updated and ask user to reload the page
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    v.$snackbar.open({
      message: 'An update is available!',
      type: 'is-warning',
      position: 'is-top-left',
      actionText: 'Reload',
      duration: 86400000,
      onAction: () => {
        // On click on the action button, we force the reload
        window.location.reload(true)
      }
    })
  })
}
