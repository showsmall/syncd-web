<template>
    <div>
        <a-card
        class="app-card"
        :bordered="false">
            <a-table
            :columns="tableColumns"
            :dataSource="tableSource"
            :pagination="pagination"
            @change="handleTableChange"
            :loading="tableLoading">
                <template slot="repo_mode" slot-scope="text">
                    <span v-if="text == 1">分支</span>
                    <span v-else>Tag</span>
                </template>
                <template slot="status" slot-scope="text">
                    <span class="app-color-success" v-if="text == 1"><a-icon type="check-circle" /> 启用</span>
                    <span class="app-color-gray" v-else><a-icon type="close-circle" /> 停用</span>
                </template>
                <template slot="need_audit" slot-scope="text">
                    <span v-if="text == 1">是</span>
                    <span v-else>否</span>
                </template>
                <span slot="op" slot-scope="text, record">
                    <span class="app-link app-op"><a-icon type="eye" />查看</span>
                    <span @click="$root.GotoRouter('projectEdit', {id: record.id})" class="app-link app-op"><a-icon type="edit" />编辑</span>
                    <span class="app-link app-op app-remove"><a-icon type="delete" />删除</span>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { listProjectApi } from '@/api/project.js'
export default {
    data () {
        return {
            tableColumns: [
                {dataIndex: "id", title: '项目ID', width: '10%'},
                {dataIndex: "name", title: '项目名称'},
                {dataIndex: "repo_mode", title: '上线方式', width: '10%', align: 'center', scopedSlots: { customRender: 'repo_mode' }},
                {dataIndex: "need_audit", title: '开启审核', width: '10%', align: 'center', scopedSlots: { customRender: 'need_audit' }},
                {dataIndex: "status", title: '项目启用', width: '10%', align: 'center', scopedSlots: { customRender: 'status' }},
                {dataIndex: "op", title: '操作', width: '20%', align: 'right', scopedSlots: { customRender: 'op' }},
            ],
            tableLoading: false,
            tableSource: [],
            pagination: {
                defaultPageSize: 10,
                defaultCurrent: 1,
                total: 0,
            },
        }
    },
    methods: {
        handleTableChange(pagination) {
            let page = pagination.current ? pagination.current: pagination.defaultCurrent
            this.getDataList({
                page: page,
                pageSize: pagination.defaultPageSize,
            })
        },
        getDataList(params) {
            this.tableLoading = true
            let offset = (params.page - 1) * params.pageSize
            listProjectApi({offset: offset, limit: params.pageSize}).then(res => {
                this.tableLoading = false
                this.pagination.total = res.total
                this.tableSource = res.list
            }).catch(err => {
                this.tableLoading = false
            })
        }
    },
    mounted() {
        this.handleTableChange(this.pagination)
    },
}
</script>
