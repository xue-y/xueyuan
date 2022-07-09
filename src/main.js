import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/bootstrap.css'
import './index.css'
import './assets/css/header.css'

import axios from 'axios'

// 路由
import router from './router'


const app=createApp(App)

// 配置根路径
//axios.defaults.baseURL="https://www.escook.cn"
axios.defaults.baseURL="http://casphp.com/api/XueYuan/"
// 可通过 this 实例访问, axios 挂载在 app 上
app.config.globalProperties.$http=axios

// 导入全局注册的滑动组件
import swiper from './components/swiper.vue'
/**
 * 调用 app.component() 方法全局注册组件
 * 在进行组件的注册时，定义组件注册名称的方式有两种：
① 使用 kebab-case 命名法（俗称短横线命名法，例如 my-swiper 和 my-search）
② 使用 PascalCase 命名法（俗称帕斯卡命名法或大驼峰命名法，例如 MySwiper 和 MySearch）
格按照帕斯卡名称进行使用，又可以转化为短横线名称进行使用
如果组件导出时命名，可以 name 方式注册 app.component(swiper.name,swiper)
 */


// 配置请求拦截器
axios.interceptors.request.use(config => {
  // config.headers.Authorization='auth token'   //设置认证后或有跨域问题
  // 这是固定写法
  return config
})
// 配置响应拦截器
axios.interceptors.response.use(response => {
  return response
})

app.component('plugin-swiper',swiper)  // 直接命名

// 挂载路由模块
app.use(router)

// 用app 实例 mount 方法直接vue 控制的区域
app.mount('#app')
