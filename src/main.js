import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'

// 引用css
import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css/animate.css'
import './cpx.css'

// 引入第三方库
window.$ = window.jQuery = require('jquery')
window.$cookie =  require('js-cookie')
window.bootstrap = require('bootstrap')
// window.ud = require('underscore')
window.store = require('store2')
window.Public = require('./js/common')

// 引用模板部分
// login
import login from './views/login.vue'
// index首页
import index from './views/index.vue'
// home
import home from './views/home.vue'
// 单店或分店基础信息
import setstore from './views/basedata/setstore.vue'
import storelist from './views/basedata/storelist/storelist.vue'
import storeright from './views/basedata/storelist/storelistright.vue'
// 门店员工
import storestaff from './views/basedata/storestaff/storestaff.vue'
// 供应商
import supplier from './views/basedata/supplier/supplier.vue'
// 物料类别
import materialtype from './views/basedata/materialtype/materialtype.vue'
import materialright from './views/basedata/materialtype/materialright.vue'
// 初始化物料信息
import materialinit from './views/basedata/materialinit/materialinit.vue'
// 单位管理
import unitmanagement from './views/basedata/unitmanagement/unitmanagement.vue'
// 权限设置
import permissions from './views/basedata/permissions/permissions.vue'
import permissionright from './views/basedata/permissions/perbody.vue'

// 库房
import warehouse from './views/warehouse/warehouse.vue'
// 初始化库房信息
import warehouseinit from './views/warehouse/warehouseinit/warehouseinit.vue'
// 初始化期初
import initializationDepartmentEarly from './views/warehouse/initializationDepartmentEarly/initializationDepartmentEarly.vue'
// 仓库管理
import warehouseManagement from './views/warehouse/warehouseManagement/warehouseManagement.vue'

// 收银
import Cashier from './views/Cashier/Cashier.vue'
// 分类管理
import classification from './views/Cashier/classification/classification.vue'
// 菜品管理
import cookbook from './views/Cashier/cookbook/cookbook.vue'
// 桌台管理
import table from './views/Cashier/table/table.vue'
// 折扣管理
import discount from './views/Cashier/discount/discount.vue'
// 打印设置
import print from './views/Cashier/print/print.vue'
import set from './views/Cashier/print/set.vue'
import printright from './views/Cashier/print/printright.vue'
import list from './views/Cashier/print/list.vue'
// 参数设置
import parameter from './views/Cashier/parameter/parameter.vue'


Vue.config.debug = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

// $http
var VueResource = require('vue-resource')
Vue.use(VueResource)

const router = new VueRouter()
const App = Vue.extend(app)

//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
// router.redirect({
//     '*':"/"
// });
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
router.map({
	'/': {
		name: 'index',
		component: index,
	},
	'login': {
		name: 'login',
		component: login
	},
	'/home': {
		name: 'home',
		component: home,
		subRoutes: {
	      '/': { component: setstore,
	      		subRoutes: {
	      			'/storelist': { component: storelist ,
	      				subRoutes: {
	      					'/:type' : {component: storeright}
	      				}
	      			},
	      			'/storestaff': { component: storestaff,
	      				subRoutes: {
	      					'/:id' : {component: storestaff}
	      				}
	      			},
	      			'/supplier': { component: supplier,
	      				subRoutes: {
	      					'/:id' : {component: supplier}
	      				}
	      			},
	      			'/materialtype': { component: materialtype,
	      				subRoutes: {
	      					'/:type' : {component: materialright}
	      				}
	      			},
	      			'/materialinit': { component: materialinit },
	      			'/unitmanagement': { component: unitmanagement },
	      			'/permissions': { component: permissions,
	      				subRoutes: {
	      					'/:type' : {component: permissionright,
	      						subRoutes: {
			      					'/:typeChild' : {component: materialright}
			      				}
	      					}
	      				}
	      			},
	      		}
	      	}
	    }
	},
	'/warehouse' : {
		name: 'warehouse',
		component: home,
		subRoutes: {
			'/': {
				component: warehouse,
				subRoutes: {
					'/initializeStockInformation': { component: warehouseinit},
					'/initializationDepartmentEarly': {
						component: initializationDepartmentEarly
					},
					'/warehouseManagement': {
						component: warehouseManagement
					}
				},
			}
		}
	},
	'/cashier' : {
		name: 'cashier',
		component: home,
		subRoutes: {
			'/': {
				component: Cashier,
				subRoutes: {
					'/classification': {
						component: classification
					},
					'/cookbook': {
						component: cookbook,
						subRoutes: {
	      					'/:id' : {component: cookbook}
	      				}
					},
					'/table' : {
						component: table,
                        subRoutes: {
                            '/:area_id' : {component: table}
                        }
					},
					'/discount': {
						component: discount
					},
					'/print': {
						component: print,
						subRoutes: {
	      					'/set' : {component: set,
	      						subRoutes: {
			      					'/:id' : {component: printright}
			      				}
	      					},
	      					'/list': {component: list}
	      				}
					},
					'/parameter': {
						component: parameter,
						subRoutes: {
	      					'/:id' : {component: parameter}
	      				}
					}
				}
			}
		}
	}
})

router.start(App, 'body')
