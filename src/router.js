import { createRouter, createWebHashHistory } from 'vue-router'

import Article from './components/Article.vue' 

const default_arc=8;

// 创建路由实例对象
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', redirect: '/arc/'+default_arc,  props:true},// 路由重定向
      { path: '/arc/:arc_id', component: Article, props:true },
    ],
  })

  export default router