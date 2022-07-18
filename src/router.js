import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'

import Article from './components/Article.vue' 
import List from './components/List.vue' 
import Article2 from './components/Article2.vue' 

// 创建路由实例对象
const router = createRouter({
   //history: createWebHashHistory(), // 有#号
   history: createWebHistory(),

    routes: [
      // { path: '/', redirect: '/arc'},// 路由重定向
      { path: '/arc/:arc_id', component: Article,name:'arc',props:true},
      { path: '/list/:nav_id', component: List,name:'list',props:true},
      { path: '/list/:nav_id/arc/:arc_id', component: Article2,name:'arc2',props:true},
    ],
  })

  export default router