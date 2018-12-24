import { Form } from 'ant-design-vue'
import { getProjectApi } from '@/api/project.js'
const UpdateApply = {
    render() {
        const { getFieldDecorator, getFieldValue } = this.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }
        if (this.tagList) {
            this.tagList.forEach(t => {

            })
        }
        const renderTagListOpts = () => {
            let list = []
            this.tagList.forEach(t => {
                list.push(
                    <a-select-option key={t}>{t}</a-select-option>
                )
            })
        }
        return (
            <a-form>
                <a-form-item
                {...{ props: formItemLayout }}
                help={this.nameHelp}
                label='上线单名称'>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '上线单名称不能为空' },
                        ],
                        validateTrigger: 'blur',
                    })(
                        <a-input autocomplete="off" placeholder='请输入上线单名称' />
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='选择上线Tag'>
                    {getFieldDecorator('tag_name', {
                        rules: [
                            { required: true, message: '选择上线Tag' },
                        ],
                    })(
                        <div>
                            <a-select
                            showSearch
                            placeholder="关键词搜索"
                            notFoundContent={this.fetchingTag ? undefined : '未找到数据'}
                            style={{ width: '100%' }}>
                                { this.fetchingTag ? (
                                    <a-spin slot="notFoundContent" size="small"/>
                                ): '' }
                                {renderTagListOpts()}
                            </a-select>
                            <a-button onClick={this.handleFetchTagList}><a-icon type="sync" spin={this.fetchingTag} /> 拉取列表</a-button>
                        </div>
                    )}
                </a-form-item>
            </a-form>
        )
    },
    props: {
        spaceId: Number,
        projectId: Number,
    },
    data() {
        return {
            projectDetail: {},
            fetchingTag: false,
            tagList: [],
        }
    },
    methods: {
        handleFetchTagList() {
            this.fetchingTag = true

        },
        loadProjectDetail() {
            getProjectApi({id: this.projectId}).then(res => {
                this.projectDetail = res
            })
        },
    },
    mounted() {
        this.loadProjectDetail()
    },
}
export default Form.create()(UpdateApply)
