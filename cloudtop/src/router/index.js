import Vue from 'vue'
import Router from 'vue-router'
//import head from '../components/header/Head.vue'
//import HelloWorld from '@/components/HelloWorld'
import home from '../pages/Home.vue'
import login from '../pages/Login.vue'
import register from '../pages/Register.vue'
import meau from '../pages/Meau.vue'
import item from '../pages/Item.vue'
import shop from '../pages/Shop.vue'
import address from '../pages/Address.vue'
import pay  from '../pages/Pay.vue'
import account from '../pages//Account.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/login',
      component: login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/register',
      component:register,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/meau',
      component: meau,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/item',
      component: item,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/shop',
      component: shop,
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/address',
      component: address,
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/pay',
      component: pay,
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/account',
      component: account,
      meta: {
        keepAlive: true,
        auth: true
      }
    },

  ]
})
