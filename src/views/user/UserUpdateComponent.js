import { Form } from 'ant-design-vue'
const UserUpdate = {
    render() {
        const { getFieldDecorator, getFieldValue } = this.form
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        }
        getFieldDecorator('id', {
            initialValue: this.detail.id,
        })
        return (
            <a-form>
                <a-form-item
                {...{ props: formItemLayout }}
                label='用户组'>
                    {getFieldDecorator('group_id', {
                        rules: [
                            { required: true, message: '用户组不能为空' },
                        ],
                        initialValue: this.detail.group_id,
                    })(
                        <a-select style="width: 100%">
                            <a-select-option value='1'>管理员</a-select-option>
                        </a-select>
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='用户名'>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '用户名不能为空' },
                        ],
                        initialValue: this.detail.name,
                    })(
                        <a-input autocomplete="off" placeholder='请输入用户名' />
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='密码'>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '用户密码不能为空' },
                            { type:"string", min: 6, max: 20, message: '密码必须为6-20个字符' },
                        ],
                        initialValue: this.detail.password,
                    })(
                        <a-input type="password" autocomplete="off" placeholder='请输入用户密码 6-20个字符' />
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='邮箱'>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: '邮箱地址不能为空' },
                            { type:"email", message: '邮箱格式错误' },
                        ],
                        initialValue: this.detail.email,
                    })(
                        <a-input autocomplete="off" placeholder='请输入邮箱地址' />
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='真实姓名'>
                    {getFieldDecorator('true_name', {
                        initialValue: this.detail.true_name,
                    })(
                        <a-input autocomplete="off" placeholder='请输入真实姓名' />
                    )}
                </a-form-item>
                <a-form-item
                {...{ props: formItemLayout }}
                label='手机号'>
                    {getFieldDecorator('mobile', {
                        rules: [
                            { validator: function(rule, value, callback) {
                                if (!value) {
                                    callback()
                                }
                                if (/^1[3456789][0-9]{9}$/.test(value)) {
                                    callback()
                                }
                                callback('手机号格式错误')
                            }},
                        ],
                        initialValue: this.detail.name,
                    })(
                        <a-input autocomplete="off" placeholder='11位数字，目前只支持中国(+86)手机号' />
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
}
export default Form.create()(UserUpdate)
