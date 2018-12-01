import Vue from 'vue'

import Dashboard from './Dashboard.vue'
import Send from './Send.vue'
import Project from './Project.vue'
import User from './User.vue'
import Shell from './Shell.vue'
import Server from './Server.vue'
import Setting from './Setting.vue'
import CaretRight from './CaretRight.vue'
import Square from './Square.vue'
import MenuFold from './MenuFold.vue'
import MenuUnfold from './MenuUnfold.vue'

const components = [
    Dashboard,
    Send,
    Project,
    User,
    Shell,
    Server,
    Setting,
    CaretRight,
    Square,
    MenuFold,
    MenuUnfold,
]

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    install,
}
