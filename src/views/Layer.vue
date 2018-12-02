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
                :defaultSelectedKeys="['6']"
                :defaultOpenKeys="['1']"
                :openKeys="openKeys"
                @openChange="handleOpenChange"
                class="app-layer-menu">
                <a-menu-item key="dashboard">
                    <icon-dashboard/>
                    <span class="app-menu-title">控制台</span>
                </a-menu-item>
                <a-sub-menu key="deploy">
                    <span slot="title">
                        <icon-send/>
                        <span class="app-menu-title">发布</span>
                    </span>
                    <a-menu-item key="deployApply" class="app-menu-title">
                        <icon-square />
                        <span class="app-menu-title sub-menu">提交上线申请</span>
                    </a-menu-item>
                    <a-menu-item key="deployPending" class="app-menu-title">
                        <icon-square />
                        <span class="app-menu-title sub-menu">上线单审核</span>
                    </a-menu-item>
                    <a-menu-item key="deployList" class="app-menu-title">
                        <icon-square />
                        <span class="app-menu-title sub-menu">上线单列表</span>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="project">
                    <span slot="title">
                        <icon-project/>
                        <span class="app-menu-title">项目</span>
                    </span>
                    <a-menu-item key="projectNew" class="app-menu-title">新建项目</a-menu-item>
                    <a-menu-item key="projectList" class="app-menu-title">项目列表</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="user">
                    <span slot="title">
                        <icon-user />
                        <span class="app-menu-title">用户</span>
                    </span>
                    <a-menu-item key="userNew" class="app-menu-title">添加用户</a-menu-item>
                    <a-menu-item key="userList" class="app-menu-title">用户列表</a-menu-item>
                    <a-menu-item key="userGroup" class="app-menu-title">用户组</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="server">
                    <span slot="title">
                        <icon-server />
                        <span class="app-menu-title">服务器</span>
                    </span>
                    <a-menu-item key="userGroup" class="app-menu-title">新增服务器</a-menu-item>
                    <a-menu-item key="serverGroup" class="app-menu-title">服务器分组</a-menu-item>
                    <a-menu-item key="serverList" class="app-menu-title">服务器列表</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="ops">
                    <span slot="title">
                        <icon-shell />
                        <span class="app-menu-title">运维</span>
                    </span>
                </a-sub-menu>
                <a-menu-item key="setting">
                    <icon-setting />
                    <span class="app-menu-title">设置</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout class="app-layer-body">
            <a-layout-header class="app-layer-header">
                <span @click="handleCollapsed" class="icon-menu-fold">
                    <IconMenuFold v-if="collapsed" />
                    <IconMenuUnfold v-else />
                </span>
            </a-layout-header>
            <a-layout-content class="app-layer-content">
                Content
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { AppMenu } from '@/router'
export default {
    data(){
        return {
            collapsed: false,
            openKeys: [],
        }
    },
    methods: {
        handleCollapsed() {
            if (!this.collapsed) {
                this.openKeys = []
            }
            this.collapsed = !this.collapsed
        },
        handleMenuSelect({ item, key, selectedKeys }) {
            console.log(item, key, selectedKeys)
        },
        handleOpenChange(openKeys) {
            if (!openKeys.length) {
                this.openKeys = []
            } else {
                this.openKeys = [openKeys[openKeys.length - 1]]
            }
        },
    },
    mounted() {
        console.log(AppMenu)
    },
}
</script>

<style lang="scss">
.app-layer-main {
    .app-layer-aside,.app-layer-body {
        min-height: 100vh;
    }
    .app-layer-aside {
        border-right: 1px solid #eaeaea;
        .logo {
            box-sizing: border-box;
            height: 55px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #303f9f;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .app-layer-menu {
            padding-top: 12px;
            .ant-menu-item {
                margin-top: 0;
                margin-bottom: 0;
            }
        }
        .ant-menu-inline-collapsed {
            .app-menu-title {
                max-width: 0;
                display: inline-block;
                opacity: 0;
            }
        }
        .app-menu-title {
            user-select: none;
        }
    }
    .app-layer-header {
        height: 55px;
        background: #3f51b5;
        color: #fff;
        padding: 0;
        .trigger {
            font-size: 18px;
            line-height: 55px;
            padding: 0 24px;
            cursor: pointer;
            transition: color .3s;
        }
        .icon-menu-fold {
            font-size: 18px;
            cursor: pointer;
            margin-left: 20px;
        }
    }
    .app-layer-content {
        padding: 24px;
        margin: 24px;
        background: #fff;
        min-height: 280px;
    }
}
.hey-icon+span {
    margin-left: 10px;
    &.sub-menu {
        margin-left: 3px;
    }
}
</style>
