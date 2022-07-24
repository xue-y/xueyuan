import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import Index from './Index.vue'
import Article from './Article.vue'
import List from './List.vue'
import Article2 from './Article2.vue'
import NotFount from './404.vue'

function upParam(to,form){
  //console.log(to)
}


// 创建路由实例对象
const router = createRouter({
  //history: createWebHashHistory(), // 有#号
  history: createWebHistory(),

  // 列表文章页面定位
  scrollBehavior(to,from,savePos){
    if(to.name== 'listArc' )
     if(savePos){
      return savePos
     }else{
      return {x:0,y:0}
     }
  },

  routes: [
    { path: '/', redirect: '/xy1/' },// 路由重定向
    { path: '/xy1', redirect: '/xy1/' },
    { path:'/xy1/',component:Index,name:'xy1',
      children:[
        { path: '',  redirect: '/xy1/arc/0' },
        { path: 'arc',  redirect: '/xy1/arc/0' },
        { path: 'arc/:nid', components: { arcName: Article }, name: 'arc' },  // arcName 用于 router-view 视图中 ,'arc' 用于 router-link to 中
        { path: 'list',  redirect: '/xy1/list/0'},
        {
          path: 'list/:nid', components: { listName: List }, name: 'list',beforeEnter:[upParam],
          children: [
            { path: 'arc2',  redirect: '/xy1/404'},
            { path: 'arc2/:aid', components: { listArcName: Article2 }, name: 'listArc' }
          ]
        },
        { path: ':pathMatch(.*)*', component:NotFount,name:'notFount'},
      ],
      
  },

  ],
})

export default router