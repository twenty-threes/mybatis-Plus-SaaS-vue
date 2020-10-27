import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import homePage from '@/components/homespage'

Vue.use(Router)

export default new Router({
  routes: [
    //登录页
    {
      path: '/login',
      name: 'login',
      component: login,
      children:[
        {
          path: '/home',
          name: 'home',
          component: homePage
        }
      ]
    },
  ]
})
