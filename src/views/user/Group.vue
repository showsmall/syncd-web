<template>
    <div>
        <a-card
        class="app-card"
        :bordered="false">
            <div class="app-btn-group">
                <a-row :gutter="10">
                    <a-col :span="4">
                        <a-button @click="handleOpenAddGroupDialog" type="primary" icon="plus">新增用户组</a-button>
                    </a-col>
                    <a-col :span="14"></a-col>
                    <a-col :span="6">
                        <a-input-search v-model="search.keyword" placeholder="关键词搜索，ID、名称" @search="handleSearch" enterButton/>
                    </a-col>
                </a-row>
            </div>
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
                <group-update-component :detail="dialogDetail" ref="groupUpdateRef"></group-update-component>
            </a-spin>
        </a-modal>
    </div>
</template>

<script>
import GroupUpdateComponent from './GroupUpdateComponent.js'
export default {
    data () {
        return {
            search: {},

            dialogTitle: '',
            dialogVisible: false,
            dialogConfirmLoading: false,
            dialogLoading: false,
            dialogDetail: {},
        }
    },
    components: {
        GroupUpdateComponent,
    },
    methods: {
        handleOpenAddGroupDialog() {
            this.dialogTitle = '新增用户组'
            this.dialogVisible = true
            this.dialogDetail = {}
        },
        handleSearch(value) {

        },
        dialogSubmit() {

        },
        dialogCancel() {
            this.dialogVisible = false
        },
    },
}
</script>
