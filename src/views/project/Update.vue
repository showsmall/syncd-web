<script>
import { Form } from 'ant-design-vue'
import { newProject } from '@/api/project.js'

const NewProject = {
    render() {
        const { getFieldDecorator, getFieldValue } = this.form
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
                srvList.forEach(srv => {
                    let server = this.findServerItem(srv)
                    renderList.push(
                        <div class="ant-list-item">
                            <div class="ant-list-item-content ant-list-item-content-single">{server.name}</div>
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
                                <div class="ant-spin-container">
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

        return (
            <a-form onSubmit={this.handleSubmit}>
                <a-card
                class="app-card"
                title="项目基本信息"
                bordered={false}>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='项目名称'>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '项目名称不能为空' },
                            ],
                            initialValue: '',
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
                            initialValue: '',
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
                            initialValue: '',
                        })(
                            <a-input autocomplete="off" placeholder='请输入项目空间' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='开启审核'
                    help='开启后，上线单需要审核通过后才能发起上线'>
                        {getFieldDecorator('needAudit', {
                            initialValue: false,
                            valuePropName: 'checked',
                        })(
                            <a-switch checkedChildren="开启" unCheckedChildren="关闭"/>
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='项目启用'>
                        {getFieldDecorator('status', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })(
                            <a-switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked />
                        )}
                    </a-form-item>
                </a-card>
                <a-card
                class="app-card"
                title="源码管理"
                bordered={false}>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='代码仓库类型'>
                        {getFieldDecorator('repo', {
                            rules: [
                                { required: true, message: '请选择代码仓库类型' },
                            ],
                            initialValue: 'git',
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
                            initialValue: '',
                        })(
                            <a-input autocomplete="off" placeholder='请输入代码仓库地址' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemSmallLayout }}
                    label='用户名'>
                        {getFieldDecorator('repoUser')(
                            <a-input autocomplete="off" placeholder='请输入用户名' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemSmallLayout }}
                    label='密码'>
                        {getFieldDecorator('repoPass')(
                            <a-input autocomplete="off" placeholder='请输入密码' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    help="测试环境推荐分支上线，生产环境推荐tag上线"
                    label='上线模式'>
                        {getFieldDecorator('repoMode', {
                            initialValue: "1",
                        })(
                            <a-radio-group>
                                <a-radio value="1">分支上线</a-radio>
                                <a-radio value="2">tag上线</a-radio>
                            </a-radio-group>
                        )}
                    </a-form-item>
                </a-card>
                <a-card
                class="app-card"
                title="编译/打包管理"
                bordered={false}>
                    <a-form-item
                        label='编译/打包脚本'
                        {...{ props: formItemLayout }}>
                        {getFieldDecorator('buildScript')(
                            <div>
                                <a-textarea autosize={{ minRows: 3, maxRows: 20 }} />
                                <span>脚本可用变量 <a href="javascript:;">参见>></a></span>
                            </div>
                        )}
                    </a-form-item>
                </a-card>
                <a-card
                class="app-card"
                title="部署管理"
                bordered={false}>
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
                            initialValue: [],
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
                            initialValue: '',
                        })(
                            <a-input autocomplete="off" placeholder='目标机部署的用户' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='目录'>
                        {getFieldDecorator('deployPath', {
                            rules: [
                                { required: true, message: '请选择上线集群' },
                            ],
                            initialValue: '',
                        })(
                            <a-input autocomplete="off" placeholder='代码/包部署的目录' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    help='保留最近上线版本数, 回滚使用'
                    label='历史版本保留数'>
                        {getFieldDecorator('deployHistory', {
                            initialValue: 3,
                            rules: [
                                { required: true, message: '请设置历史版本保留数' },
                            ],
                        })(
                            <a-input-number min={1} max={99} />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='pre_deploy'>
                        {getFieldDecorator('preDeployCmd')(
                            <a-input autocomplete="off" placeholder='代码部署之前运行的命令' />
                        )}
                    </a-form-item>
                    <a-form-item
                    {...{ props: formItemLayout }}
                    label='post_deploy'>
                        {getFieldDecorator('postDeployCmd')(
                            <a-input autocomplete="off" placeholder='代码部署之后运行的命令' />
                        )}
                    </a-form-item>
                </a-card>
                <a-card class="app-card app-form-submit" bordered={false}>
                    <a-button type="primary" htmlType='submit'>提交</a-button>
                </a-card>
            </a-form>
        )
    },
    data () {
        return {
            serverGroupList: [
                {
                    id: 1,
                    name: '线上Mirror机房',
                },
                {
                    id: 2,
                    name: '华北机房',
                },
                {
                    id: 3,
                    name: '华东机房',
                },
                {
                    id: 4,
                    name: '东北机房',
                },
            ],
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
                newProject(values).then(res => {
                    this.$success({
                        title: '项目添加成功',
                        content: (
                            <div>
                                点击确定，进入项目列表管理已添加项目
                            </div>
                        ),
                        okText: "确定",
                        onOk: () => {
                            this.$router.push({name: "projectList"})
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
    },
}
export default Form.create()(NewProject)
</script>
