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
// index首页
import index from './views/index.vue'
// 单店或分店基础信息
import store from './views/basedata/basestore.vue'
import setstore from './views/basedata/setstore/setstore.vue'


Vue.config.debug = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

const router = new VueRouter()
const App = Vue.extend(app)

//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
router.redirect({
    '*':"/index"
});
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
router.map({
	'index': {
		name: 'index',
		component: index,
	},
	'store': {
		name: 'store',
		component: store,
		// 渲染子视图
		subRoutes: {
	      '': { component: setstore},
	      // 'storemanagement': { component: storemanagement},
	    }
	}
})

router.start(App, 'body')
