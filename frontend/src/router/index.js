import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
       {
            path: '/',
            name: 'Home',
            component: ()=>import('@/pages/Home'),
            props:true
        },
       {
            path: '/login',
            name: 'Login',
            component: ()=>import('@/pages/Login'),
            props:true
        },
       {
            path: '/register',
            name: 'Register',
            component: ()=>import('@/pages/Register')
        },
       {
            path: '/verify/:id',
            name: 'Verify',
            component: ()=>import('@/pages/Verify'),
            props:true
        },
       {
            path: '/store',
            name: 'Store',
            component: ()=>import('@/pages/Store'),
            props:true
        },
       {
            path: '/product/:id',
            name: 'Detail',
            component: ()=>import('@/pages/Detail'),
            props:true
        },
       {
            path: '/pay',
            name: 'Payment',
            component: ()=>import('@/pages/Payment'),
            props:true
        },
        {
            path: '/products/:category?/:subcategory?',
            name: 'Category',
            component: ()=>import('@/pages/StoreProducts'),
            props:true
        },
        {
            path: '/admin',
            component: ()=>import('@/pages/admin/Template'),
            children:[
                {
                    path: '',
                    component: ()=>import('@/pages/admin/Dashboard')
                },
                {
                    path: 'products',
                    component: ()=>import('@/pages/admin/Products')
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: ()=>import('@/pages/admin/Users')
                },
                {
                    path: 'category',
                    component: ()=>import('@/pages/admin/Categories')
                },
                {
                    path: 'orders',
                    component: ()=>import('@/pages/admin/Orders')
                },
                {
                    path: 'delivered',
                    component: ()=>import('@/pages/admin/Delivered')
                }
            ]
        }
    ]
})