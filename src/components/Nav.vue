<template>
    <div id="nav">
      <ul ref="nav_list">
        <router-link :to="'/arc/'+item.id"  v-for="item in navList" :key="item.id">
        <li @click="switchNav(item.id)">{{item.name}}</li></router-link>
      </ul>
    </div>  
</template>
<script>
export default {
    name:'Nav',
    props:['navList'],
    emits:['newNavId'], // 声明自定义事件
    created(){
       
    },
    mounted(){
     
    },
    methods:{
       switchNav(navId){  // 切换导航
           this.$emit('newNavId',navId)  // 触发自定义事件
       },
        // 导航滑动插件
    }
    
}
</script>