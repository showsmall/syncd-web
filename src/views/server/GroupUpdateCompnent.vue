<script>
import { Form } from 'ant-design-vue'
const GroupUpdate = {
    render() {
        const { getFieldDecorator, getFieldValue } = this.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        }
        return (
            <a-form>
                <a-form-item
                {...{ props: formItemLayout }}
                label='分组名称'>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '分组名称不能为空' },
                        ],
                        initialValue: this.detail.name,
                    })(
                        <a-input autocomplete="off" placeholder='请输入分组名称' />
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
export default Form.create()(GroupUpdate)
</script>
