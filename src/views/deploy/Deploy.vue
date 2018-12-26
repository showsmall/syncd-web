<template>
    <div>
        <a-card
        class="app-card"
        title="上线单管理"
        :bordered="false">
            <a-table
            :columns="tableColumns"
            :dataSource="tableSource"
            :pagination="pagination"
            @change="handleTableChange"
            :loading="tableLoading">
                <span :class="rowClassName(record.status)" slot="name" slot-scope="text,record">
                    {{ text }}
                </span>
                <span class="app-cursor" slot="ctime" slot-scope="text, record">
                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>{{ $root.FormatDateTime(text) }}</span>
                        </template>
                        {{ $root.FormatDateFromNow(text) }}
                    </a-tooltip>
                </span>
                <span :class="rowClassName(record.status)" slot="status" slot-scope="text, record">
                    <span v-if="text == 0"><a-icon type="clock-circle" /> 待审核</span>
                    <span v-if="text == 1"><a-icon type="warning" /> 审核拒绝</span>
                    <span v-if="text == 2"><a-icon type="smile" /> 待上线</span>
                    <span v-if="text == 3"><a-icon type="coffee" /> 上线中</span>
                    <span v-if="text == 4"><a-icon type="check-circle" /> 已上线</span>
                    <span v-if="text == 5"><a-icon type="frown" /> 上线失败</span>
                    <span v-if="text == 6"><a-icon type="close-circle" /> 已废弃</span>
                </span>
                <span slot="op" slot-scope="text, record">
                    <a-dropdown>
                        <a-menu slot="overlay" @click="handleMenuClick($event, record.id)">
                            <a-menu-item key="view"><a-icon type="eye" />查看</a-menu-item>
                            <a-menu-item key="audit" v-if="record.status == 0"><a-icon type="audit" />审核</a-menu-item>
                            <a-menu-item key="unaudit" v-if="record.status == 2"><a-icon type="close" />取消审核</a-menu-item>
                            <a-menu-item key="deploy" v-if="record.status == 2"><a-icon type="coffee" />上线</a-menu-item>
                            <a-menu-item key="deploy" v-if="record.status == 5"><a-icon type="coffee" />再次上线</a-menu-item>
                            <a-menu-item key="discard" v-if="
                                record.status == 0 ||
                                record.status == 1 ||
                                record.status == 2 ||
                                record.status == 5
                            "><a-icon type="delete" />废弃</a-menu-item>
                        </a-menu>
                        <a-button style="margin-left: 8px">
                            操作 <a-icon type="down" />
                        </a-button>
                    </a-dropdown>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { getApplyListApi } from '@/api/deploy.js'
export default {
    data() {
        return {
            tableColumns: [
                {dataIndex: "id", title: 'ID', width: '10%'},
                {dataIndex: "name", title: '上线单名称', scopedSlots: { customRender: 'name' }},
                {dataIndex: "project_name", title: '项目名称', width: '20%'},
                {dataIndex: "space_name", title: '空间名称', width: '15%'},
                {dataIndex: "ctime", title: '提交时间', width: '10%', scopedSlots: { customRender: 'ctime' }},
                {dataIndex: "status", title: '状态', width: '12%', scopedSlots: { customRender: 'status' }},
                {dataIndex: "op", title: '操作', width: '10%', align: 'right', scopedSlots: { customRender: 'op' }},
            ],
            tableSource: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
            },
            tableLoading: false,
            search: {
                keyword: '',
            },
        }
    },
    methods: {
        handleTableChange(pagination) {
            this.pagination.current = pagination.current
            this.getDataList({
                page: pagination.current,
                pageSize: pagination.pageSize,
            })
        },
        handleMenuClick({key}, id) {
            console.log(key, id)
        },
        rowClassName(status) {
            let className = ''
            switch (status) {
                case 1:
                    className = 'app-color-warning'
                    break
                case 3:
                    className = 'app-color-info'
                    break
                case 6:
                    className = 'app-color-gray'
                    break
                case 5:
                    className = 'app-color-error'
                    break
            }
            return className
        },
        getDataList(params) {
            this.tableLoading = true
            let offset = (params.page - 1) * params.pageSize
            getApplyListApi({keyword: this.search.keyword, offset: offset, limit: params.pageSize}).then(res => {
                this.tableLoading = false
                this.pagination.total = res.total
                this.tableSource = res.list
            }).catch(err => {
                this.tableLoading = false
            })
        },
    },
    mounted() {
        this.handleTableChange(this.pagination)
    },
}
</script>
