import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Store from '@/pages/Store'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import StoreProducts from '@/pages/StoreProducts'
import Admin from '@/pages/admin/Template'
import Dashboard from '@/pages/admin/Dashboard'
import Products from '@/pages/admin/Products'
import Users from '@/pages/admin/Users'
import Categories from '@/pages/admin/Categories'
import Orders from '@/pages/admin/Orders'
import Delivered from '@/pages/admin/Delivered'

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
            path: '/login',
            name: 'Login',
            component: Login,
            props:true
        },
       {
            path: '/register',
            name: 'Register',
            component: Register
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
        },
        {
            path: '/store/:category/:subcategory?',
            name: 'Category',
            component: StoreProducts,
            props:true
        },
        {
            path: '/admin',
            component: Admin,
            children:[
                {
                    path: '',
                    component: Dashboard
                },
                {
                    path: 'products',
                    component: Products
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Users
                },
                {
                    path: 'category',
                    component: Categories
                },
                {
                    path: 'orders',
                    component: Orders
                },
                {
                    path: 'delivered',
                    component: Delivered
                }
            ]
        }
    ]
})