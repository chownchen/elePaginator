// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import './filter/filter'

import { Button,Dialog,Breadcrumb,BreadcrumbItem,Menu,MenuItem,MenuItemGroup,Row,Submenu,Col,Dropdown,DropdownMenu,DropdownItem,Form,FormItem,Input,Select} from 'element-ui';
import {Option, Pagination, Table, TableColumn, Popover, Radio, RadioGroup, Upload, DatePicker, Checkbox, TimePicker } from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import zPop from './plugins/zPop/zPop'
import "./assets/css/common.scss"
import './assets/css/el-style.scss'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Submenu)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(TimePicker)

/* eslint-disable no-new */
window.$vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

