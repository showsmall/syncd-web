<template>
    <div>
        <a-card
        class="app-card"
        :bordered="false">
            <a-table
            :columns="tableColumns"
            :dataSource="tableSource"
            :loading="tableLoading">
                <template slot="repo_mode" slot-scope="text">
                    <span v-if="text == 1"><icon-branch />分支</span>
                    <span v-else><a-icon type="tag" /> Tag</span>
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
                    <span @click="$root.GotoRouter('projectEdit')" class="app-link app-op"><a-icon type="edit" />编辑</span>
                    <span class="app-link app-op app-remove"><a-icon type="delete" />删除</span>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
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
            tableSource: [
                {id: 1, name: "测试项目", repo_mode: 1, need_audit: 1, status: 1},
                {id: 1, name: "测试项目", repo_mode: 2, need_audit: 0, status: 0},
            ],
        }
    },
    methods: {

    },
}
</script>
