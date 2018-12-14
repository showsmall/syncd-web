<template>
    <div>
        <a-card
        class="app-card"
        :bordered="false">
            <div class="app-btn-group">
                <a-button @click="handleOpenAddServerDialog" type="primary" icon="plus">新增服务器</a-button>
            </div>
            <a-table
            :columns="tableColumns"
            :dataSource="tableSource"
            :pagination="pagination"
            @change="handleTableChange"
            :loading="tableLoading">
                <template slot="group_id" slot-scope="text, record">
                    <span v-if="groupList[text]">{{ groupList[text].name }}</span>
                    <span v-else>{{ text }}</span>
                </template>
                <span slot="op" slot-scope="text, record">
                    <span class="app-link app-op"><icon-verify />检测</span>
                    <span  @click="handleOpenEditServerDialog(record.id)" class="app-link app-op"><a-icon type="edit" />编辑</span>
                    <a-popconfirm title="确定要删除此服务器吗？" @confirm="handleDeleteServer(record.id)" okText="删除" cancelText="取消">
                        <span class="app-link app-op app-remove"><a-icon type="delete" />删除</span>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>
        <a-modal
        :title="dialogTitle"
        :visible="dialogVisible"
        @ok="dialogSubmit"
        :confirmLoading="dialogConfirmLoading"
        :keyboard="false"
        :maskClosable="false"
        okText="确定"
        cancelText="取消"
        :destroyOnClose="true"
        @cancel="dialogCancel">
            <a-spin :spinning="dialogLoading">
                <group-update-compnent :group-list="dialogGroupList" :detail="dialogDetail" ref="groupUpdateRef"></group-update-compnent>
            </a-spin>
        </a-modal>
    </div>
</template>

<script>
import GroupUpdateCompnent from './ServerUpdateCompnent.vue'
import { updateServerApi, getServerListApi, getServerDetailApi, deleteServerApi, getGroupListApi } from '@/api/server.js'
export default {
    data() {
        return {
            tableColumns: [
                {dataIndex: "id", title: 'ID', width: '6%'},
                {dataIndex: "name", title: '名称'},
                {dataIndex: "group_id", title: '分组', width: '20%', scopedSlots: { customRender: 'group_id' }},
                {dataIndex: "ip", title: 'IP', width: '15%'},
                {dataIndex: "ssh_port", title: 'SSH Port', width: '10%'},
                {dataIndex: "op", title: '操作', width: '20%', align: 'right', scopedSlots: { customRender: 'op' }},
            ],
            tableSource: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
            },
            tableLoading: false,

            dialogTitle: '',
            dialogVisible: false,
            dialogConfirmLoading: false,
            dialogDetail: {},
            dialogGroupList: [],
            dialogLoading: false,
        }
    },
    components: {
        GroupUpdateCompnent,
    },
    computed: {
        groupList() {
            let newGroupList = {}
            this.dialogGroupList.forEach(g => {
                newGroupList[g.id] = g
            })
            return newGroupList
        },
    },
    methods: {
        handleTableChange(pagination) {
            this.pagination.current = pagination.current
            this.getDataList({
                page: pagination.current,
                pageSize: pagination.pageSize,
            })
        },
        handleOpenAddServerDialog() {
            this.dialogTitle = '新增服务器'
            this.dialogVisible = true
            this.dialogDetail = {}
        },
        handleOpenEditServerDialog(id) {
            this.dialogTitle = '编辑服务器信息'
            this.dialogVisible = true
            this.dialogDetail = {}
            this.getDataDetail(id)
        },
        handleDeleteServer(id) {
            deleteServerApi({id}).then(res => {
                this.$message.success("删除成功", 1)
                this.handleTableChange(this.pagination)
            })
        },
        dialogCancel() {
            this.dialogVisible = false
        },
        dialogSubmit() {
            this.$refs.groupUpdateRef.validateFields((err, values) => {
                if (err) {
                    return
                }
                this.dialogConfirmLoading = true
                updateServerApi(values).then(res => {
                    let msg = this.dialogDetail.id ? '服务器信息更新成功': '服务器信息创建成功'
                    this.$message.success(msg, 1, () => {
                        this.dialogCancel()
                        this.dialogConfirmLoading = false
                        this.handleTableChange(this.pagination)
                    })
                }).catch(err => {
                    this.dialogConfirmLoading = false
                })
            })
        },
        getDataDetail(id) {
            this.dialogLoading = true
            getServerDetailApi({id}).then(res => {
                this.dialogLoading = false
                this.dialogDetail = res.detail
            }).catch( err => {
                this.dialogLoading = false
            })
        },
        getDataList(params) {
            this.tableLoading = true
            let offset = (params.page - 1) * params.pageSize
            getServerListApi({offset: offset, limit: params.pageSize}).then(res => {
                this.tableLoading = false
                this.pagination.total = res.total
                this.tableSource = res.list
            }).catch(err => {
                this.tableLoading = false
            })
        },
        getDataGroupList() {
            getGroupListApi({offset: 0, limit: 9999}).then(res => {
                this.dialogGroupList = res.list
            })
        },
    },
    mounted() {
        this.handleTableChange(this.pagination)
        this.getDataGroupList()
        if (this.$route.query.op == 'edit') {
            if (this.$route.query.id) {
                this.handleOpenEditServerDialog(this.$route.query.id)
            }
        }
    },
}
</script>
