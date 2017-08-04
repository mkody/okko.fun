// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Styles
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
// Our components
import ScheduleElement from '@/components/ScheduleElement'
import TimelineElement from '@/components/TimelineElement'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

// Load components
Vue.component('schedule-element', ScheduleElement)
Vue.component('timeline-element', TimelineElement)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
