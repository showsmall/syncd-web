<template>
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-card class="app-card" title="项目基本信息" :bordered="false">
            <a-form-item
                label='项目名称'
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                fieldDecoratorId="name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入项目名称' }]}">
                <a-input placeholder='请输入项目名称' />
            </a-form-item>
            <a-form-item
                label='项目描述'
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                fieldDecoratorId="description">
                <a-textarea placeholder="请输入项目描述信息" :rows="3"/>
            </a-form-item>
            <a-form-item
                label='项目空间'
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                fieldDecoratorId="space"
                help='存放项目代码的目录, 例如: /home/syncd/project-demo'
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入项目空间' }]}">
                <a-input placeholder='请输入项目空间' />
            </a-form-item>
        </a-card>
        <a-card class="app-card" title="源码管理" :bordered="false">
            <a-form-item
                label=' '
                :colon="false"
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol">
                <a-radio-group v-model="repoRadioValue">
                    <a-radio value="git">git</a-radio>
                    <a-radio value="svn">svn</a-radio>
                </a-radio-group>
            </a-form-item>
            <template v-if="repoRadioValue == 'git'">

            </template>
            <template v-else>

            </template>
        </a-card>
        <a-card class="app-card app-form-submit" :bordered="false">
            <a-button type="primary">提交</a-button>
        </a-card>
    </a-form>
</template>

<script>
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
export default {
    data() {
        return {
            formItemLayout,
            repoRadioValue: 'git',
            repoRadioOptions: [
                { label: 'git', value: 'git' },
                { label: 'svn', value: 'svn' },
            ]
        }
    },
    methods: {
        handleSubmit() {

        },
    },
}
</script>
