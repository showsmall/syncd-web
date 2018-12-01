import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = file => () => import('../views/' + file + '.vue')
const routerMap = [
    {
        path: '/',
        component: _import('Layer'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: _import('Dashboard'),
            },
        ],
        
    },
]

const router = new Router({
    routes: routerMap,
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
})

export default router
