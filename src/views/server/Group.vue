<template>
    <div>
        <a-card
        class="app-card"
        :bordered="false">
            <div>
                <a-button @click="handleOpenAddGroupDialog" type="primary" icon="plus">新增分组</a-button>
            </div>
            <a-table
            :columns="tableColumns"
            :dataSource="tableSource"
            :pagination="pagination"
            @change="handleTableChange"
            :loading="tableLoading">

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
            <group-update-compnent :detail="dialogDetail" ref="groupUpdateRef"></group-update-compnent>
        </a-modal>
    </div>
</template>

<script>
import GroupUpdateCompnent from './GroupUpdateCompnent.vue'
import { updateGroupApi } from '@/api/server.js'
export default {
    data() {
        return {
            tableColumns: [],
            tableSource: [],
            pagination: {},
            tableLoading: false,

            dialogTitle: '',
            dialogVisible: false,
            dialogConfirmLoading: false,
            dialogDetail: {},
        }
    },
    components: {
        GroupUpdateCompnent,
    },
    methods: {
        handleTableChange() {

        },
        handleOpenAddGroupDialog() {
            this.dialogTitle = '新增分组'
            this.dialogVisible = true
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
                updateGroupApi(values).then(res => {
                    this.dialogConfirmLoading = false
                    this.handleTableChange()
                    this.dialogCancel()

                    const successModal = this.$success({
                        title: '提示信息',
                        content: '恭喜，服务器分组添加成功',
                    });
                    setTimeout(() => successModal.destroy(), 1000);

                }).catch(err => {
                    this.dialogConfirmLoading = false
                })
            })
        },
    },
}
</script>
