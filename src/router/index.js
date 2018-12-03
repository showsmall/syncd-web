import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = file => () => import('../views/' + file + '.vue')

const routerMap = [
    {
        path: '/',
        component: _import('Layer'),
        meta: {
            single: true,
        },
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
                },
                component: _import('deploy/Apply'),
            },
            {
                path: 'pending',
                name: 'deployPending',
                meta: {
                    title: '上线单审核',
                },
                component: _import('deploy/Pending'),
            },
            {
                path: 'list',
                name: 'deployList',
                meta: {
                    title: '上线单列表',
                },
                component: _import('deploy/List'),
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
                path: 'new',
                name: 'projectNew',
                meta: {
                    title: '新建项目',
                    description: '创建新的上线项目',
                },
                component: _import('project/New'),
            },
            {
                path: 'list',
                name: 'projectList',
                meta: {
                    title: '项目列表',
                },
                component: _import('project/List'),
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
                path: 'new',
                name: 'userNew',
                meta: {
                    title: '添加用户',
                },
                component: _import('user/New'),
            },
            {
                path: 'list',
                name: 'userList',
                meta: {
                    title: '用户列表',
                },
                component: _import('user/List'),
            },
            {
                path: 'group',
                name: 'userGroup',
                meta: {
                    title: '用户组',
                },
                component: _import('user/Group'),
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
                path: 'new',
                name: 'serverNew',
                meta: {
                    title: '新增服务器',
                },
                component: _import('server/New'),
            },
            {
                path: 'group',
                name: 'serverGroup',
                meta: {
                    title: '服务器分组',
                },
                component: _import('server/Group'),
            },
            {
                path: 'list',
                name: 'serverList',
                meta: {
                    title: '服务器列表',
                },
                component: _import('server/List'),
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
    routes: routerMap,
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
})

export { routerMap }

export default router
