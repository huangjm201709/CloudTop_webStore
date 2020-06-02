// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { Icon,Rate,Pagination,Dropdown,DropdownMenu,Carousel,CarouselItem,
    DropdownItem,Button,Steps,Step,Message,Popconfirm,Table,TableColumn,Collapse,CollapseItem} 
  from 'element-ui';

Vue.config.productionTip = false
//自定义全局注册的 
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$host = 'http://localhost:8082/cloudtopback/api'
Vue.prototype.$message = Message
//element-ui
Vue.use(Icon)
Vue.use(Button)
Vue.use(Rate)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Popconfirm)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(CarouselItem)
Vue.use(Carousel)

router.beforeEach((to, from, next) => {
    //根据字段判断是否路由过滤
    if (to.matched.some(record => record.meta.auth)) {
        if (sessionStorage.getItem("user") !== null) {
            next()
        } else {
            //防止无限循环
            if (to.name === 'login') {
                next();
                return
            }
            next({
                path: '/login',
            });
        }
    } else {
        next()//若点击的是不需要验证的页面,则进行正常的路由跳转
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
