import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = file => () => import('../views/' + file + '.vue')

const appMap = [
    {
        path: '/login',
        name: 'login',
        component: _import('Login'),
    },
]

const routerMap = [
    {
        path: '/',
        component: _import('Layer'),
        meta: {
            single: true,
        },
        redirect: { name: 'dashboard' },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                    title: '控制台',
                    icon: 'icon-dashboard',
                },
                component: _import('Dashboard'),
            },
        ],
    },
    {
        path: '/deploy',
        name: 'deploy',
        component: _import('Layer'),
        meta: {
            title: '发布',
            icon: 'icon-send',
        },
        children: [
            {
                path: 'apply',
                name: 'deployApply',
                meta: {
                    title: '提交上线申请',
                    role: 1001,
                },
                component: _import('deploy/Apply'),
            },
            {
                path: 'deploy',
                name: 'deployDeploy',
                meta: {
                    title: '上线单管理',
                    role: 1002,
                },
                component: _import('deploy/Deploy'),
            },
        ],
    },
    {
        path: '/project',
        name: 'project',
        component: _import('Layer'),
        meta: {
            title: '项目',
            icon: 'icon-project',
        },
        children: [
            {
                path: 'space',
                name: 'projectSpace',
                meta: {
                    title: '项目空间',
                    role: 2001,
                },
                component: _import('project/Space'),
            },
            {
                path: 'project',
                name: 'projectProject',
                meta: {
                    title: '项目管理',
                    hide: true,
                    role: 2201,
                },
                component: _import('project/Project'),
            },
            {
                path: 'user',
                name: 'projectUser',
                meta: {
                    title: '成员管理',
                    hide: true,
                    role: 2100,
                },
                component: _import('project/User'),
            },
        ],
    },
    {
        path: '/user',
        name: 'user',
        component: _import('Layer'),
        meta: {
            title: '用户',
            icon: 'icon-team',
        },
        children: [
            {
                path: 'group',
                name: 'userGroup',
                meta: {
                    title: '角色管理',
                    role: 3001,
                },
                component: _import('user/Group'),
            },
            {
                path: 'list',
                name: 'userList',
                meta: {
                    title: '用户管理',
                    role: 3101,
                },
                component: _import('user/User'),
            },
        ],
    },
    {
        path: '/server',
        name: 'server',
        component: _import('Layer'),
        meta: {
            title: '服务器',
            icon: 'icon-server',
        },
        children: [
            {
                path: 'group',
                name: 'serverGroup',
                meta: {
                    title: '集群管理',
                    role: 4001,
                },
                component: _import('server/Group'),
            },
            {
                path: 'list',
                name: 'serverList',
                meta: {
                    title: '服务器管理',
                    role: 4101,
                },
                component: _import('server/Server'),
            },
        ],
    },
    {
        path: '/ops',
        name: 'ops',
        component: _import('Layer'),
        meta: {
            title: '运维',
            icon: 'icon-shell',
        },
        children: [
            {
                path: 'shell',
                name: 'opsShell',
                meta: {
                    title: '远程Shell',
                    icon: 'icon-shell',
                },
                component: _import('ops/shell'),
            },
        ],
    },
    {
        path: '/',
        name: 'singleSetting',
        component: _import('Layer'),
        meta: {
            single: true,
        },
        children: [
            {
                path: 'setting',
                name: 'setting',
                meta: {
                    title: '设置',
                    icon: 'icon-setting',
                },
                component: _import('Setting'),
            },
        ],
    },
]

const router = new Router({
    routes: appMap.concat(routerMap),
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
})

export { routerMap }

export default router
