import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import AntDesignVue from 'ant-design-vue'
import util from './util'

import 'ant-design-vue/dist/antd.css'
import './scss/antd.scss'
import './scss/app.scss'

import Icon from './icons'
import './icons/style.scss'

Vue.use(Icon)
Vue.use(AntDesignVue)

Vue.config.productionTip = false
Vue.prototype.$jQuery = jQuery

new Vue({
  router,
  store,
  methods: util,
  render: h => h(App)
}).$mount('#app')
