import Vue from 'vue'
import Meta from 'vue-meta'
import Router from 'vue-router'
// Our components
import About from '@/components/About'
import AboutShow from '@/components/AboutShow'
import AboutStaff from '@/components/AboutStaff'
import AboutUs from '@/components/AboutUs'
import Downloads from '@/components/Downloads'
import Home from '@/components/Home'
import Links from '@/components/Links'
import News from '@/components/News'
import Previews from '@/components/Previews'
import Schedule from '@/components/Schedule'
import Timeline from '@/components/Timeline'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
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
      path: '/about/show',
      name: 'AboutShow',
      component: AboutShow
    },
    {
      path: '/about/staff',
      name: 'AboutStaff',
      component: AboutStaff
    },
    {
      path: '/about/timeline',
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/about/here',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/downloads',
      name: 'Downloads',
      component: Downloads
    },
    {
      path: '/links',
      name: 'Links',
      component: Links
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/previews',
      name: 'Previews',
      component: Previews
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    }
  ]
})
