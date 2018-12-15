
import { Form } from 'ant-design-vue'
const GroupUpdate = {
    render() {
        const { getFieldDecorator, getFieldValue } = this.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        }
        getFieldDecorator('id', {
            initialValue: this.detail.id,
        })
        return (
            <a-form>
                <a-form-item
                {...{ props: formItemLayout }}
                label='用户组名称'>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '用户组名称不能为空' },
                        ],
                        initialValue: this.detail.name,
                    })(
                        <a-input autocomplete="off" placeholder='请输入用户组名称' />
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='权限设置'>
                    <a-checkbox
                    indeterminate={this.indeterminate}
                    onChange={this.handleCheckAllPrivChange}
                    checked={this.checkPrivAll}>全选</a-checkbox>
                    {getFieldDecorator('priv', {
                        initialValue: this.detail.priv,
                    })(
                        <div>
                            <a-checkbox-group
                            options={this.plainPrivCheckList}
                            onChange={this.handleCheckPrivChange} />
                        </div>
                    )}
                </a-form-item>
            </a-form>
        )
    },
    props: {
        detail: {
            default: () => {
                return {}
            },
            type: Object,
        }
    },
    data() {
        return {
            checkPrivAll: false,
            indeterminate: false,
            plainPrivCheckList: [
                {label: '查看项目信息', value: 1},
                {label: '新增/更新项目', value: 2},
            ]
        }
    },
    methods: {
        handleCheckAllPrivChange(e) {
            console.log(e)
            this.checkPrivAll = e.target.checked
            this.indeterminate = false
        },
        handleCheckPrivChange(checkList) {
            console.log(checkList)
        },
    },
}
export default Form.create()(GroupUpdate)
