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
                    <span @click="$root.GotoRouter('projectEdit', {id: record.id})" class="app-link app-op"><a-icon type="edit" />编辑</span>
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
        :visible="dialogVisible"
        :destroyOnClose="true"
        :footer="null"
        width="60vw"
        @cancel="dialogVisible = false">
            <a-spin :spinning="dialogLoading">
                <a-form>
                    <a-form-item label='项目ID' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.id }}
                    </a-form-item>
                    <a-form-item label='项目名称' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.name }}
                    </a-form-item>
                    <a-form-item label='项目描述' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.description }}
                    </a-form-item>
                    <a-form-item label='项目空间' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.space }}
                    </a-form-item>
                    <a-form-item label='开启审核' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <span v-if="dialogDetail.need_audit == 1">需要审核</span>
                        <span v-else>不需要审核</span>
                    </a-form-item>
                    <a-form-item label='项目启用' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <span class="app-color-success" v-if="dialogDetail.status == 1">
                            <a-icon type="check" /> 启用
                        </span>
                        <span class="app-color-error" v-else>
                            <a-icon type="close" /> 停用
                        </span>
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item label='代码仓库类型' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.repo }}
                    </a-form-item>
                    <a-form-item label='代码仓库地址' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.repo_url }}
                    </a-form-item>
                    <a-form-item label='用户名' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.repo_user }}
                    </a-form-item>
                    <a-form-item label='密码' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <template v-if="dialogDetail.repo_pass">
                            ******
                        </template>
                        <template v-else>
                            未设置
                        </template>
                    </a-form-item>
                    <a-form-item label='上线模式' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <span v-if="dialogDetail.repo_mode == 1">
                            <a-icon type="branches" /> 分支上线
                        </span>
                        <span v-if="dialogDetail.repo_mode == 2">
                            <a-icon type="tag" /> Tag上线
                        </span>
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item label='编译/打包脚本' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <a-textarea readonly="readonly" :value="dialogDetail.build_script" :autosize="{ minRows: 3, maxRows: 20 }" />
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item label='上线集群' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <template v-for="g in dialogDetail.server_group">
                            <a-tooltip placement="top" >
                                <template slot="title">
                                    <span>点击可查看服务器列表</span>
                                </template>
                                <a :href="'/server/group?op=view&id=' + g.id" target="_blank">
                                    <a-tag><a-icon type="cluster" /> {{g.name}}</a-tag>
                                </a>
                            </a-tooltip>
                        </template>
                    </a-form-item>
                    <a-form-item label='用户' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.deploy_user }}
                    </a-form-item>
                    <a-form-item label='目录' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.deploy_path }}
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item label='历史版本保留数' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.deploy_history }}
                    </a-form-item>
                    <a-form-item label='pre_deploy' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.pre_deploy_cmd }}
                    </a-form-item>
                    <a-form-item label='post_deploy' :labelCol="labelCol" :wrapperCol="wrapperCol">
                        {{ dialogDetail.post_deploy_cmd }}
                    </a-form-item>
                </a-form>
            </a-spin>
        </a-modal>

    </div>
</template>

<script>
import { listProjectApi, deleteProjectApi, getProjectApi } from '@/api/project.js'
import { getGroupMultiApi } from '@/api/server.js'
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
                pageSize: 10,
                current: 1,
                total: 0,
            },
            search: {},

            dialogVisible: false,
            dialogLoading: false,
            dialogDetail: {},
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
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
                this.handleTableChange(this.pagination)
            })
        },
        handleShowViewDialog(id) {
            this.dialogLoading = true
            this.dialogDetail = {}
            getProjectApi({id}).then(res => {
                this.dialogDetail = res
                this.dialogVisible = true
                this.dialogLoading = false
                if (res.deploy_server.length > 0) {
                    getGroupMultiApi({ids: res.deploy_server.join(",")}).then(res => {
                        this.$set(this.dialogDetail, 'server_group', res.list)
                    })
                }
            })
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
        this.handleTableChange(this.pagination)
    },
}
</script>
