import { Form } from 'ant-design-vue'
import { updateProjectApi, getProjectApi, checkProjectNameExistsApi } from '@/api/project.js'
import { getGroupListApi } from '@/api/server.js'
const UpdateProject = {
    render() {
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.form
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        const formItemSmallLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 4 },
        }
        const renderServerGroupOpts = () => {
            let list = []
            this.serverGroupList.forEach(ser => {
                list.push(
                    <a-select-option value={ser.id}>{ser.name}</a-select-option>
                )
            })
            return list
        }
        const renderServerGroupList = () => {
            let srvList = getFieldValue('deployServer')
            let renderList = []
            if (srvList) {
                srvList.forEach((srv, index) => {
                    let server = this.findServerItem(srv)
                    if (!server.id) {
                        return
                    }
                    renderList.push(
                        <div class="ant-list-item">
                            <div class="ant-list-item-content ant-list-item-content-single">{index + 1}. {server.name} (ID:{server.id})</div>
                            <ul class="ant-list-item-action">
                                <li>
                                    <a onClick={this.removeServerItem.bind(this, srv)} class="oper-delete"><icon-delete />移除</a>
                                </li>
                            </ul>
                        </div>
                    )
                })
            }

            let renderTpl = ''
            if (renderList.length) {
                renderTpl = (
                    <div class="app-server-group-list">
                        <div class="title">已选集群列表</div>
                        <div class="ant-list ant-list-split ant-list-bordered">
                            <div class="ant-spin-nested-loading">
                                <div class="ant-spin-container" style="max-height: 200px; overflow-y: auto;">
                                    {renderList}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                renderTpl
            )
        }

        let vm = this
        let nameExistsCb = function(rule, value, callback) {
            if (!value) {
                callback()
                return
            }
            vm.nameHelp = `正在验证名称是否被占用...`
            checkProjectNameExistsApi({id: vm.detail.id, space_id: vm.spaceId, keyword: value}).then(res => {
                if (!res.exists) {
                    vm.nameHelp = undefined
                    callback()
                } else {
                    vm.nameHelp = `抱歉！该名称已经存在，请重新输入`
                    callback(`抱歉！该名称已经存在，请重新输入`)
                }
            }).catch(err => {
                vm.nameHelp = '网络错误, 校验失败'
                callback('网络错误, 校验失败')
            })
        }

        return (
            <a-form onSubmit={this.handleSubmit}>
                <a-spin spinning={this.detailLoading}>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    help={this.nameHelp}
                    label='项目名称'>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '项目名称不能为空' },
                                { validator: nameExistsCb},
                            ],
                            initialValue: this.detail.name,
                            validateTrigger: 'blur',
                        })(
                            <a-input autocomplete="off" placeholder='请输入项目名称' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='项目描述'>
                        {getFieldDecorator('description', {
                            rules: [
                                { required: true, message: '项目名称不能为空' },
                            ],
                            initialValue: this.detail.description,
                            validateTrigger: 'blur',
                        })(
                            <a-textarea placeholder="请输入项目描述信息" rows={3} />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='项目空间'
                    help='存放项目代码的目录, 例如: /home/syncd/project-demo'>
                        {getFieldDecorator('space', {
                            rules: [
                                { required: true, message: '项目空间不能为空' },
                            ],
                            initialValue: this.detail.space,
                        })(
                            <a-input autocomplete="off" placeholder='请输入项目空间' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='开启审核'
                    help='开启后，上线单需要审核通过后才能发起上线'>
                        {getFieldDecorator('needAudit', {
                            initialValue: this.detail.need_audit ? true: false,
                            valuePropName: 'checked',
                        })(
                            <a-switch checkedChildren="开启" unCheckedChildren="关闭"/>
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='项目启用'>
                        {getFieldDecorator('status', {
                            initialValue: this.detail.status ? true : false,
                            valuePropName: 'checked',
                        })(
                            <a-switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked />
                        )}
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='代码仓库类型'>
                        {getFieldDecorator('repo', {
                            rules: [
                                { required: true, message: '请选择代码仓库类型' },
                            ],
                            initialValue: this.detail.repo,
                        })(
                            <a-radio-group>
                                <a-radio value='git'>Git</a-radio>
                                <a-radio value='svn'>Svn</a-radio>
                            </a-radio-group>
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='代码仓库地址'>
                        {getFieldDecorator('repoUrl', {
                            rules: [
                                { required: true, message: '代码仓库地址不能为空' },
                            ],
                            initialValue: this.detail.repo_url,
                            validateTrigger: 'blur',
                        })(
                            <a-input autocomplete="off" placeholder='请输入代码仓库地址' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemSmallLayout }}
                    label='用户名'>
                        {getFieldDecorator('repoUser', {
                            initialValue: this.detail.repo_user,
                        })(
                            <a-input autocomplete="off" placeholder='请输入用户名' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemSmallLayout }}
                    label='密码'>
                        {getFieldDecorator('repoPass', {
                            initialValue: this.detail.repo_pass,
                        })(
                            <a-input type="password" autocomplete="off" placeholder='请输入密码' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    help="测试环境推荐分支上线，生产环境推荐tag上线"
                    label='上线模式'>
                        {getFieldDecorator('repoMode', {
                            rules: [
                                { required: true, message: '请选择上线模式' },
                            ],
                            initialValue: this.detail.repo_mode ? this.detail.repo_mode : 1,
                        })(
                            <a-radio-group>
                                <a-radio value={1}>分支上线</a-radio>
                                <a-radio value={2}>tag上线</a-radio>
                            </a-radio-group>
                        )}
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item
                        label='编译/打包脚本'
                        {...{ props: formItemLayout }}>
                        {getFieldDecorator('buildScript', {
                            initialValue: this.detail.build_script,
                        })(
                            <div>
                                <a-textarea autosize={{ minRows: 3, maxRows: 20 }} />
                                <span>脚本可用变量 <a href="javascript:;">参见>></a></span>
                            </div>
                        )}
                    </a-form-item>
                    <a-divider></a-divider>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='选择上线集群'>
                        <a-select
                        allowClear={true}
                        showSearch
                        placeholder="关键词搜索"
                        notFoundContent="无数据"
                        style={{ width: '200px' }}
                        optionFilterProp="children"
                        onSelect={this.handleServerSelect}>
                            {renderServerGroupOpts()}
                        </a-select>
                        {getFieldDecorator('deployServer', {
                            rules: [
                                { required: true, message: '请选择上线集群' },
                            ],
                            initialValue: this.detail.deploy_server ? this.detail.deploy_server: [],
                        })(
                            <div>
                                {renderServerGroupList()}
                            </div>
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemSmallLayout }}
                    label='用户'>
                        {getFieldDecorator('deployUser', {
                            rules: [
                                { required: true, message: '请选择上线集群' },
                            ],
                            initialValue: this.detail.deploy_user,
                        })(
                            <a-input autocomplete="off" placeholder='目标机部署的用户' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='目录'>
                        {getFieldDecorator('deployPath', {
                            rules: [
                                { required: true, message: '请设置代码部署目录' },
                            ],
                            initialValue: this.detail.deploy_path,
                            validateTrigger: 'blur',
                        })(
                            <a-input autocomplete="off" placeholder='代码/包部署的目录' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    help='保留最近上线版本数, 回滚使用'
                    label='历史版本保留数'>
                        {getFieldDecorator('deployHistory', {
                            initialValue: this.detail.deploy_history ? this.detail.deploy_history : 3,
                            rules: [
                                { required: true, message: '请设置历史版本保留数' },
                            ],
                            validateTrigger: 'blur',
                        })(
                            <a-input-number min={3} max={99} />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='pre_deploy'>
                        {getFieldDecorator('preDeployCmd', {
                            initialValue: this.detail.pre_deploy_cmd
                        })(
                            <a-input autocomplete="off" placeholder='代码部署之前运行的命令' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='post_deploy'>
                        {getFieldDecorator('postDeployCmd', {
                            initialValue: this.detail.post_deploy_cmd
                        })(
                            <a-input autocomplete="off" placeholder='代码部署之后运行的命令' />
                        )}
                    </a-form-item>
                    <a-divider></a-divider>
                    <div style="text-align: right">
                        <a-button  type="primary" htmlType='submit'>提交</a-button>
                    </div>
                </a-spin>
            </a-form>
        )
    },
    props: {
        projectId: {
            type: Number,
            default: 0,
        },
        spaceId: {
            type: Number,
            default: 0,
        },
    },
    data () {
        return {
            id: 0,
            detail: {},
            serverGroupList: [],
            detailLoading: false,
            nameHelp: undefined,
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (err) {
                    this.$root.ResolveFormError(err, values)
                    return
                }
                let postData = {... values}
                if (!this.spaceId) {
                    this.$error({
                        title: '参数错误',
                        content: (
                            <div>
                                项目空间ID丢失，操作失败，请重试!
                            </div>
                        ),
                    })
                    return
                }
                postData.space_id = this.spaceId
                postData.id = this.projectId
                postData.status = postData.status ? 1: 0
                postData.needAudit = postData.needAudit ? 1: 0
                postData.deployServer = this.filterInvalidServerGroup(postData.deployServer)
                updateProjectApi(postData).then(res => {
                    let opMsg = this.projectId ? '更新成功': '新增成功'
                    this.$success({
                        title: opMsg,
                        okText: "确定",
                        content: (
                            <div>恭喜，项目{opMsg}，点击确定返回项目列表</div>
                        ),
                        onOk: () => {
                            this.$emit('close')
                        }
                    });
                })
            })
        },
        handleServerSelect(value) {
            let list = this.form.getFieldValue('deployServer')
            if (!list) {
                list = []
            }
            if (list.indexOf(value) == -1) {
                list.push(value)
            }
            this.form.setFieldsValue({ deployServer: list})
        },
        findServerItem(id) {
            let server = {}
            this.serverGroupList.forEach(srv => {
                if (srv.id == id) {
                    server = srv
                }
            })
            return server
        },
        removeServerItem(srvId) {
            let list = this.form.getFieldValue('deployServer')
            if (!list) {
                list = []
            }
            let index = list.indexOf(srvId)
            if (index > -1) {
                list.splice(index, 1)
            }
            this.form.setFieldsValue({ deployServer: list})
        },
        filterInvalidServerGroup(groupList) {
            let newGroupList = []
            if (groupList) {
                groupList.forEach(id => {
                    if (this.findServerItem(id).id) {
                        newGroupList.push(id)
                    }
                })
            }
            return newGroupList
        },
        getDataDetail(id) {
            this.detailLoading = true
            getProjectApi({id}).then(res => {
                this.detail = res
                this.detailLoading = false
            })
        },
        getDataGroupList() {
            getGroupListApi({offset: 0, limit: 9999}).then(res => {
                this.serverGroupList = res.list
            })
        },
    },
    mounted() {
        if (this.projectId) {
            this.getDataDetail(this.projectId)
        }
        this.getDataGroupList()
    },
}
export default Form.create()(UpdateProject)
