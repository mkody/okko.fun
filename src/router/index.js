import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'
// Our components
import About from '@/components/About'
import Community from '@/components/Community'
import Home from '@/components/Home'
import News from '@/components/News'
import Schedule from '@/components/Schedule'
import Timeline from '@/components/Timeline'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline
    }
  ]
})
