import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'

// 引用css
import 'bootstrap/dist/css/bootstrap.css'
import './cpx.css'

// 引入第三方库
window.$ = window.jQuery = require('jquery')
window.bootstrap = require('bootstrap')
window.common = require('./js/common')

// 引用模板部分

Vue.config.debug = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

const router = new VueRouter()
const App = Vue.extend(app)

router.start(App, 'body')
