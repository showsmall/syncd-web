<template>
    <div>
        <a-card
        class="app-card"
        :bordered="false">
            <div class="app-btn-group">
                <a-row :gutter="10">
                    <a-col :span="18"></a-col>
                    <a-col :span="6">
                        <a-input-search v-model="search.keyword" placeholder="关键词搜索，ID、名称" @search="handleSearch" enterButton/>
                    </a-col>
                </a-row>
            </div>
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
                    <span @click="handleShowViewDialog(record.id)" class="app-link app-op"><a-icon type="eye" />查看</span>
                    <span @click="handleShowUpdateDialog(record.id)" class="app-link app-op"><a-icon type="edit" />编辑</span>
                    <template v-if="record.status == 0">
                        <a-popconfirm title="确定要删除此分组吗？" @confirm="handleDeleteProject(record.id)" okText="删除" cancelText="取消">
                            <span class="app-link app-op app-remove"><a-icon type="delete" />删除</span>
                        </a-popconfirm>
                    </template>
                    <template v-else>
                        <a-tooltip placement="topRight" >
                            <template slot="title">
                                <span>删除项目前请先停用项目</span>
                            </template>
                            <span class="app-op app-color-gray app-no-allow"><a-icon type="delete" />删除</span>
                        </a-tooltip>
                    </template>
                </span>
            </a-table>
        </a-card>

        <a-modal
        title="查看项目"
        :visible="dialogViewVisible"
        :destroyOnClose="true"
        :footer="null"
        width="60vw"
        @cancel="dialogViewVisible = false">
            <project-view-component :project-id="projectId"></project-view-component>
        </a-modal>

        <a-modal
        title="编辑项目"
        :visible="dialogUpdateVisible"
        :destroyOnClose="true"
        :footer="null"
        :keyboard="false"
        :maskClosable="false"
        width="60vw"
        @cancel="dialogUpdateVisible = false">
            <project-update-component @close="closeUpdateDialog" :project-id="projectId"></project-update-component>
        </a-modal>

    </div>
</template>

<script>
import { listProjectApi, deleteProjectApi } from '@/api/project.js'
import { getGroupMultiApi } from '@/api/server.js'
import ProjectViewComponent from './ProjectViewComponent.js'
import ProjectUpdateComponent from './ProjectUpdateComponent.js'
export default {
    components: {
        ProjectViewComponent, ProjectUpdateComponent,
    },
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
                pageSize: 10,
                current: 1,
                total: 0,
            },
            search: {},
            dialogViewVisible: false,
            dialogUpdateVisible: false,
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
            projectId: 0,

            space: 0,
        }
    },
    methods: {
        handleSearch(value) {
            this.search.keyword = value
            this.pagination.current = 1
            this.handleTableChange(this.pagination)
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current
            this.getDataList({
                page: pagination.current,
                pageSize: pagination.pageSize,
            })
        },
        handleDeleteProject(id) {
            deleteProjectApi({id}).then(res => {
                this.$message.success('删除成功', 1)
                this.$root.ResetPagination(this.pagination)
                this.handleTableChange(this.pagination)
            })
        },
        handleShowViewDialog(id) {
            this.projectId = id
            this.dialogViewVisible = true
        },
        handleShowUpdateDialog(id) {
            this.projectId = id
            this.dialogUpdateVisible = true
        },
        closeUpdateDialog() {
            this.dialogUpdateVisible = false
            this.handleTableChange(this.pagination)
        },
        getDataList(params) {
            this.tableLoading = true
            let offset = (params.page - 1) * params.pageSize
            listProjectApi({keyword: this.search.keyword, offset: offset, limit: params.pageSize}).then(res => {
                this.tableLoading = false
                this.pagination.total = res.total
                this.tableSource = res.list
            }).catch(err => {
                this.tableLoading = false
            })
        }
    },
    mounted() {
        let space = this.$route.query.space
        if (!space) {
            this.$root.GotoRouter('projectSpace')
        }
        this.space = space
        this.handleTableChange(this.pagination)
    },
}
</script>
