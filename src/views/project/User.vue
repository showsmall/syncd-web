<template>
    <div>
        <a-card
        class="app-card"
        title="成员管理"
        :bordered="false">
            <div class="app-btn-group">
                <div style="margin-bottom: 15px;">添加新成员到 <strong>{{ this.spaceDetail.name }}</strong> 项目空间</div>
                <a-row :gutter="10">
                    <a-col :span="12">
                        <a-select
                        labelInValue
                        showSearch
                        allowClear
                        :defaultActiveFirstOption="false"
                        :showArrow="false"
                        :filterOption="false"
                        style="width:100%;"
                        :notFoundContent="searchFetching ? undefined : '未找到用户'"
                        placeholder="通过用户名、邮箱搜索用户"
                        v-model="selectedUser"
                        @search="handleSearchUser">
                            <a-spin v-if="searchFetching" slot="notFoundContent" size="small"/>
                            <a-select-option v-for="u in searchUserList"
                            :value="`${u.id}`">
                                {{ u.name }} - {{ u.email }} - {{u.group_name}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="8">
                        <a-button @click="handleAppendUser" type="primary">添加</a-button>
                    </a-col>
                </a-row>
            </div>
            <a-divider></a-divider>
            <a-table
            :columns="tableColumns"
            :dataSource="tableSource"
            :pagination="pagination"
            @change="handleTableChange"
            :loading="tableLoading">

            </a-table>
        </a-card>
    </div>
</template>

<script>
import { getSpaceDetailApi, addSpaceUserApi, getSpaceUserListApi } from '@/api/project.js'
import { searchUserApi } from '@/api/user.js'
export default {
    data () {
        return {
            spaceDetail: {},
            selectedUser: {},
            searchUserTimer: null,
            searchFetching: false,
            searchUserList: [],

            tableLoading: false,
            tableColumns: [
                {dataIndex: "name", title: '用户名'},
                {dataIndex: "email", title: '邮箱'},
                {dataIndex: "group_name", title: '角色', width: '15%'},
                {dataIndex: "lock_status", title: '状态', width: '10%', scopedSlots: { customRender: 'lock_status' }},
                {dataIndex: "op", title: '操作', width: '15%', align: 'right', scopedSlots: { customRender: 'op' }},
            ],
            tableSource: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
            },
        }
    },
    methods: {
        handleSearchUser(value) {
            clearTimeout(this.searchUserTimer)
            let vm = this
            vm.searchFetching = true
            vm.searchUserList = []
            vm.searchUserTimer = setTimeout(function() {
                searchUserApi({keyword: value}).then(res => {
                    vm.searchUserList = res.list
                    vm.searchFetching = false
                }).catch(err => {
                    vm.searchFetching = false
                })
            }, 500)
        },
        handleAppendUser() {
            if (!this.selectedUser) {
                this.$message.error('请先选择用户再添加');
            }
            addSpaceUserApi({space_id: this.spaceId, user_id: this.selectedUser.key}).then(res => {
                this.$message.success('用户添加成功');
                this.selectedUser = undefined
            }).catch(err => {
                this.selectedUser = undefined
            })
            this.searchUserList = []
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current
            this.getDataList({
                page: pagination.current,
                pageSize: pagination.pageSize,
            })
        },
        getDataList(params) {
            this.tableLoading = true
            let offset = (params.page - 1) * params.pageSize
            getSpaceUserListApi({offset: offset, limit: params.pageSize}).then(res => {
                this.tableLoading = false
                this.pagination.total = res.total
                this.tableSource = res.list
            }).catch(err => {
                this.tableLoading = false
            })
        },
        getSpaceDetail(spaceId) {
            getSpaceDetailApi({id: spaceId}).then(res => {
                this.spaceDetail = res
            })
        },
    },
    mounted() {
        let spaceId = parseInt(this.$route.query.space)
        if (!spaceId) {
            this.$root.GotoRouter('projectSpace')
        }
        this.spaceId = spaceId
        this.getSpaceDetail(this.spaceId)
        this.handleTableChange(this.pagination)
    },
}
</script>
