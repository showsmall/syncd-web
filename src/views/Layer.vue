<template>
    <a-layout class="app-layer-main">
        <a-layout-sider
            :trigger="null"
            theme = "light"
            collapsible
            v-model="collapsed"
            class="app-layer-aside">
            <div class="logo">
                <span>~/.syncd</span>
            </div>
            <a-menu
                @select="handleMenuSelect"
                theme="light"
                mode="inline"
                :selectedKeys="selectedKeys"
                :openKeys="openKeys"
                @openChange="handleOpenChange"
                class="app-layer-menu">
                <template v-for="menu in appMenu">
                    <a-menu-item :key="menu.children[0].name" v-if="menu.meta.single && menu.children && menu.children.length == 1">
                        <component :is="menu.children[0].meta.icon" />
                        <span class="app-menu-title">{{ menu.children[0].meta.title }}</span>
                    </a-menu-item>
                    <a-sub-menu :key="menu.name" v-else>
                        <span slot="title">
                            <component :is="menu.meta.icon" />
                            <span class="app-menu-title">{{ menu.meta.title }}</span>
                        </span>
                        <a-menu-item v-for=" childMenu in menu.children" :key="childMenu.name" class="app-menu-title">
                            <icon-square />
                            <span class="app-menu-title sub-menu">{{ childMenu.meta.title }}</span>
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout class="app-layer-body">
            <a-layout-header class="app-layer-header">
                <div @click="handleCollapsed" class="icon-menu-fold">
                    <IconMenuFold v-if="collapsed" />
                    <IconMenuUnfold v-else />
                </div>
                <div class="header-right">

                    <a-dropdown ref="avatarDropdownRef" :trigger="['click']" class="dropdown">
                        <span class="ant-dropdown-link" href="#">
                            <icon-question class="icon" />
                            <icon-caret-down class="icon-small" />
                        </span>
                        <a-menu slot="overlay" class="menu-wide">
                            <a-menu-item>
                                <span>帮助</span>
                            </a-menu-item>
                            <a-menu-item>
                                <span>为Syncd做贡献</span>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>

                    <a-dropdown ref="avatarDropdownRef" :trigger="['click']" class="dropdown">
                        <span class="ant-dropdown-link" href="#">
                            <a-avatar shape="square" size="small" :src="userAvatar">{{ userName }}</a-avatar>
                            <icon-caret-down class="icon-small" />
                        </span>
                        <a-menu slot="overlay" class="menu-wide">
                            <a-menu-item class="pure-text">
                                <strong>Dreamans</strong>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item>
                                <span><icon-user /> 个人主页</span>
                            </a-menu-item>
                            <a-menu-item>
                                <span><icon-setting /> 个人设置</span>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item>
                                <span><icon-logout /> 退出登录</span>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </a-layout-header>
            <a-layout-content class="app-layer-content">
                <div class="app-layer-content-header">
                    <a-breadcrumb v-if="breadCrumb.length" class="header-breadcrumb">
                        <a-breadcrumb-item v-for="bread in breadCrumb">{{bread}}</a-breadcrumb-item>
                    </a-breadcrumb>
                    <h1 v-if="headerTitle" class="header-title">{{ headerTitle }}</h1>
                    <div v-if="headerTips" class="header-tips">{{ headerTips }}</div>
                </div>
                <div class="app-layer-content-body">
                    <router-view />
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { routerMap } from '@/router'
export default {
    data(){
        return {
            collapsed: false,
            openKeys: [],
            selectedKeys: [],
            userAvatar: 'https://avatars2.githubusercontent.com/u/3644570',
            userName: 'D',

            breadCrumb: [],
            headerTitle: '',
            headerTips: '',
        }
    },
    computed: {
        appMenu() {
            let newRouterMap = []
            routerMap.forEach(first => {
                let item = {
                    name: first.name,
                    meta: first.meta,
                    children: [],
                }
                first.children.forEach(second => {
                    if (!second.meta.hide || this.$route.name == second.name) {
                        item.children.push({
                            name: second.name,
                            meta: second.meta,
                        })
                    }
                })
                newRouterMap.push(item)
            })
            return newRouterMap
        },
        defaultOpenKeys() {
            let defOpenKeys = []
            this.appMenu.forEach(first => {
                if (first.children && !first.meta.single) {
                    first.children.forEach(sub => {
                        if (sub.name == this.$route.name) {
                            defOpenKeys = [first.name]
                        }
                    })
                }
            })
            return defOpenKeys
        },
    },
    watch: {
        '$route.name'() {
            this.initMenuSelectStatus()
        },
    },
    methods: {
        handleCollapsed() {
            if (!this.collapsed) {
                this.openKeys = []
            }
            this.collapsed = !this.collapsed
        },
        handleMenuSelect({ key }) {
            let breadCrumb = []
            let headerTitle = ''
            let headerTips = ''
            routerMap.forEach(menu => {
                menu.children.forEach(sub => {
                    if (sub.name != key) {
                        return
                    }
                    headerTitle = sub.meta.title
                    if (sub.meta.description) {
                        headerTips = sub.meta.description
                    }
                    if (menu.meta.title) {
                        breadCrumb.push(menu.meta.title)
                    }
                    breadCrumb.push(sub.meta.title)
                })
            })
            this.breadCrumb = breadCrumb
            this.headerTitle = headerTitle
            this.headerTips = headerTips
            this.selectedKeys = [key]
            this.$router.push({name: key})
        },
        handleOpenChange(openKeys) {
            if (!openKeys.length) {
                this.openKeys = []
            } else {
                this.openKeys = [openKeys[openKeys.length - 1]]
            }
        },
        initMenuSelectStatus() {
            this.handleMenuSelect({key: this.$route.name})
            this.handleOpenChange(this.defaultOpenKeys)
        },
    },
    mounted() {
        this.initMenuSelectStatus()
    },
}
</script>
