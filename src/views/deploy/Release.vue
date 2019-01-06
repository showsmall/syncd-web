<template>
    <div>
        <a-card
        class="app-card app-release"
        title="部署上线单"
        :bordered="false">
            <a-row :gutter="20" class="app-mt-20">
                <a-col :span="8"><span class="sp-title">上线单:</span> {{ detail.name }}</a-col>
                <a-col :span="16"><span class="sp-title">所属项目:</span> {{ detail.space_name }} {{ detail.project_name }}</a-col>
            </a-row>
            <a-row :gutter="20" class="app-mt-20">
                <a-col :span="8"><span class="sp-title">仓库类型:</span> {{ detail.repo }}</a-col>
                <a-col :span="16" v-if="detail.repo_mode == 1"><span class="sp-title">上线分支:</span> {{ detail.repo_branch }} - {{ detail.repo_commit }}</a-col>
                <a-col :span="16" v-if="detail.repo_mode == 2"><span class="sp-title">上线Tag:</span> {{ detail.repo_tag }}</a-col>
            </a-row>
            <a-row :gutter="20" class="app-mt-20">
                <a-col :span="8"><span class="sp-title">提交者:</span> {{ detail.user_name }} - {{ detail.user_email }}</a-col>
                <a-col :span="16"><span class="sp-title">描述:</span> {{ detail.description }}</a-col>
            </a-row>
            <a-divider />
            <a-button @click="handleStartDeploy" type="primary">开始上线</a-button>
            <a-button>终止上线</a-button>
            <div class="shell">
                <div class="shell-title">
                    syncd@localhost:~$ 等待上线... <br/>输出信息 >>>
                </div>
                <div class="shell-body">
                    <pre><a-icon type="loading-3-quarters" spin :style="{fontSize: '20px', color: '#fff'}" /></pre>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
import { getApplyDetailApi, startDeployApi } from '@/api/deploy.js'
export default {
    data() {
        return {
            id: 0,
            detail: {},
        }
    },
    methods: {
        handleStartDeploy() {
            startDeployApi({id: this.id}).then(res => {
                console.log(res)
            })
        },
        loadApplyDetail() {
            getApplyDetailApi({id: this.id}).then(res => {
                this.detail = res
            })
        },
    },
    mounted() {
        this.id = this.$route.query.id
        if (!this.id) {
            this.$root.GotoRouter('deployDeploy')
        }
        this.loadApplyDetail()
    },
}
</script>
