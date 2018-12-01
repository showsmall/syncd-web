import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AntDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import Icon from './icons'
import './icons/style.scss'
Vue.use(Icon)

Vue.use(AntDesignVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
