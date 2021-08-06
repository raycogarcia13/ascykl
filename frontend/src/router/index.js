import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Store from '@/pages/Store'
import Detail from '@/pages/Detail'

Vue.use(Router)

export default new Router({
    routes: [
       {
            path: '/',
            name: 'Home',
            component: Home,
            props:true
        },
       {
            path: '/store',
            name: 'Store',
            component: Store,
            props:true
        },
       {
            path: '/product/:id',
            name: 'Detail',
            component: Detail,
            props:true
        }
    ]
})