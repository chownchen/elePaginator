import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/demo'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/demo'
      },
    {
      path: '/demo',
        component: demo
    }
    ]
})
