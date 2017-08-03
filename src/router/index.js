import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  linkActiveClass: 'selected',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
