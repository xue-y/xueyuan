<template>
    <div id="header">
        <Head :typeId="typeId"   @newTypeId="getNavList"   />
        <Nav :navList="navData" @newNavId="updateNav" />
    </div>
    <Article :aId="firstArcId" />
</template>
<script>
import Head from './components/Head.vue'
import Nav from './components/Nav.vue' 
import Article from './components/Article.vue' 
import  $ from 'jquery.js'

export default {
    name: 'App',
    data(){
        return {
            typeId:2, // 默认分类
            navData:[],
            firstArcId:0,
            currenCardId:0,
            currenCardIndex:-1
        }
    },
    created(){
        // 获取默认导航数据
        this.getNavList(this.typeId)      
    },
    components: {
        Head,
        Nav,
        Article
    },
    methods:{
        //获取导航列表
       async getNavList(typeId){        
            let {data:res}=await this.$http.post('getYingyuNav',{pid:typeId})
            if(res.code!=1){
                return alert('获取导航数据失败')
            }
            this.navData=res.data;
            if(res.data.length>=1){
                 $('.empty').text('')
                let firstArcId=this.firstArcId=res.data[0].id
                // 更新路由
                this.$router.push(`/arc/${firstArcId}`)            
            }else{
                 $('.empty').text('暂无数据')
            }
            
       },
       updateNav(navId){
            this.firstArcId=navId
       }
    }
    
}
</script>