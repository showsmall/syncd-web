import { Form } from 'ant-design-vue'
import { getProjectApi } from '@/api/project.js'
import { getGroupMultiApi } from '@/api/server.js'
const ViewProject = {
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }
        return (
            <a-spin spinning={this.loading}>
                <a-form>
                    <a-form-item
                    label='项目ID'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.id}
                    </a-form-item>
                    <a-form-item
                    label='项目名称'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.name}
                    </a-form-item>
                    <a-form-item
                    label='项目描述'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.description}
                    </a-form-item>
                    <a-form-item
                    label='开启审核'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.need_audit ? '需要审核': '不需要审核'}
                    </a-form-item>
                    <a-form-item
                    label='项目启用'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.status == 1 ? (
                            <span class="app-color-success">
                                <a-icon type="check" /> 已启用
                            </span>
                        ): (
                            <span class="app-color-error">
                                <a-icon type="close" /> 未启用
                            </span>
                        )}
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item
                    label='代码仓库类型'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.repo}
                    </a-form-item>
                    <a-form-item
                    label='代码仓库地址'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.repo_url}
                    </a-form-item>
                    <a-form-item
                    label='用户名'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.repo_user}
                    </a-form-item>
                    <a-form-item
                    label='密码'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.repo_pass ? '******': '未设置'}
                    </a-form-item>
                    <a-form-item
                    label='上线模式'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        {this.detail.repo_mode ? (
                            <span>
                                <a-icon type="branches" /> 分支上线 - <strong>{ this.detail.repo_branch }</strong> 分支
                            </span>
                        ) : (
                            <span>
                                <a-icon type="tag" /> Tag上线
                            </span>
                        )}
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item
                    label='上线集群'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        { function(server_group){
                            let r = []
                            if (server_group) {
                                server_group.forEach(g => {
                                    r.push(
                                        <a-tooltip placement="top" >
                                            <template slot="title">
                                                <span>点击可查看服务器列表</span>
                                            </template>
                                            <a href={`/server/group?op=view&id=${g.id}`} target="_blank">
                                                <a-tag><a-icon type="cluster" /> {g.name}</a-tag>
                                            </a>
                                        </a-tooltip>
                                    )
                                })
                            }
                            return r
                        }(this.detail.server_group) }
                    </a-form-item>
                    <a-form-item
                    label='用户'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        { this.detail.deploy_user }
                    </a-form-item>
                    <a-form-item
                    label='目录'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        { this.detail.deploy_path }
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item
                    label='历史版本保留数'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        { this.detail.deploy_history }
                    </a-form-item>
                    <a-form-item
                    label='pre_deploy'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        { this.detail.pre_deploy_cmd }
                    </a-form-item>
                    <a-form-item
                    label='post_deploy'
                    labelCol={formItemLayout.labelCol}
                    wrapperCol={formItemLayout.wrapperCol}>
                        { this.detail.post_deploy_cmd }
                    </a-form-item>
                </a-form>
            </a-spin>
        )
    },
    props: {
        projectId: Number,
    },
    data() {
        return {
            loading: false,
            detail: {},
        }
    },
    methods: {
        getDetail(id) {
            this.loading = true
            getProjectApi({id}).then(res => {
                this.loading = false
                this.detail = res
                if (res.deploy_server.length > 0) {
                    getGroupMultiApi({ids: res.deploy_server.join(",")}).then(res => {
                        this.$set(this.detail, 'server_group', res.list)
                    })
                }
            })
        }
    },
    mounted() {
        this.getDetail(this.projectId)
    },
}
export default Form.create()(ViewProject)
