<template>
    <div>
        <a-card
        class="app-card"
        title="项目管理"
        :bordered="false">
            <a-spin :spinning="spaceLoading" tip="Loading...">
                <div class="app-content-list">
                    <h3>{{ this.spaceDetail.name }}</h3>
                    <p v-if="this.spaceDetail.description" class="description">{{ this.spaceDetail.description }}</p>
                </div>
            </a-spin>
            <a-divider></a-divider>
            <div class="app-btn-group">
                <a-row :gutter="10">
                    <a-col :span="4">
                        <a-button @click="handleOpenAddDialog" type="primary" icon="plus">新增项目</a-button>
                    </a-col>
                    <a-col :span="14"></a-col>
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
                <template slot="status" slot-scope="text, record">
                    <a-switch @click="handleProjectChange(record)" checkedChildren="启用" unCheckedChildren="未启用" v-model="record.status" />
                </template>
                <template slot="need_audit" slot-scope="text">
                    <span v-if="text == 1">是</span>
                    <span v-else>否</span>
                </template>
                <span slot="op" slot-scope="text, record">
                    <span @click="handleResetRepo(record.id)" class="app-link app-op"><a-icon type="scan" />仓库重置</span>
                    <span @click="handleOpenViewDialog(record.id)" class="app-link app-op"><a-icon type="eye" />查看</span>
                    <span @click="handleOpenUpdateDialog(record.id)" class="app-link app-op"><a-icon type="edit" />编辑</span>
                    <template v-if="record.status == 0">
                        <a-popconfirm title="确定要删除此分组吗？" @confirm="handleDeleteProject(record.id)" okText="删除" cancelText="取消">
                            <span class="app-link app-op app-remove"><a-icon type="delete" />删除</span>
                        </a-popconfirm>
                    </template>
                    <template v-else>
                        <a-tooltip placement="topRight">
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
            <project-update-component @close="closeUpdateDialog" :space-id="spaceId" :project-id="projectId"></project-update-component>
        </a-modal>

    </div>
</template>

<script>
import { resetRepoApi, listProjectApi, deleteProjectApi, getSpaceDetailApi, changeProjectStatusApi } from '@/api/project.js'
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
                {dataIndex: "op", title: '操作', width: '30%', align: 'right', scopedSlots: { customRender: 'op' }},
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

            spaceId: 0,
            spaceLoading: false,
            spaceDetail: {},
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
        handleOpenAddDialog() {
            this.projectId = 0
            this.dialogUpdateVisible = true
        },
        handleOpenViewDialog(id) {
            this.projectId = id
            this.dialogViewVisible = true
        },
        handleOpenUpdateDialog(id) {
            this.projectId = id
            this.dialogUpdateVisible = true
        },
        handleProjectChange(item) {
            changeProjectStatusApi({id: item.id, status: item.status ? 1: 0}).then(res => {

            }).catch(err => {
                item.status = !item.status
            })
        },
        handleResetRepo(id) {
            const hideLoading = this.$message.loading('代码仓库重置中，请不要离开此页面...', 0);
            resetRepoApi({id}).then(res => {
                hideLoading()
                setTimeout(() => {
                    this.$message.success("代码仓库重置成功")
                }, 500)
            }).catch(err => {
                hideLoading()
                this.$message.error("代码仓库重置失败")
            })
        },
        closeUpdateDialog() {
            this.dialogUpdateVisible = false
            this.handleTableChange(this.pagination)
        },
        getDataList(params) {
            this.tableLoading = true
            let offset = (params.page - 1) * params.pageSize
            listProjectApi({space_id: this.spaceId, keyword: this.search.keyword, offset: offset, limit: params.pageSize}).then(res => {
                this.tableLoading = false
                this.pagination.total = res.total
                if (res.list) {
                    res.list.forEach((item, index) => {
                        res.list[index].status = item.status ? true: false
                    })
                }
                this.tableSource = res.list
            }).catch(err => {
                this.tableLoading = false
            })
        },
        getSpaceDetail(spaceId) {
            this.spaceLoading = true
            getSpaceDetailApi({id: spaceId}).then(res => {
                this.spaceLoading = false
                this.spaceDetail = res
            }).catch(err => {
                this.spaceLoading = false
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
