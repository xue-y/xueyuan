<template>
    <div id="header"  :style="{ width:headerWidth+'px' }" >
        <Head :typeId="typeId"   @newTypeId="getNavList"   />
        <Nav :bodyWidth="headerWidth" > 
            <template v-slot:nav>
                <router-link :to="url+item.id"  v-for="item in navData" :key="item.id">
                    <li  @click="updateNav(item.id)">{{item.name}}</li>
                </router-link>
            </template>
        </Nav>
    </div>
    <div v-if="typeNum==1" class="page-con">
       <Article :aId="firstNavId" :desc="firstArcDesc"  :bodyWidth="headerWidth"/>
    </div><div v-else class="page-con">
       <List :nId="firstNavId" />
    </div>
    <div class="empty text-center" v-show="isEmpty">暂无数据</div>
</template>
<script>
import Head from './components/Head.vue'
import Nav from './components/Nav.vue' 
import Article from './components/Article.vue' 
import List from './components/List.vue' 
import  $ from 'jquery.js'

export default {
    name: 'App',
    data(){
        return {
            typeId:2, // 默认分类
            typeNum:1,// 栏目类型
            navData:[],
            firstNavId:0,
            firstArcDesc:'',
            currenCardId:0,
            currenCardIndex:-1,
            isEmpty:false, // 分类下是否有栏目
            headerWidth:document.body.clientWidth, // 定义初始值
            url:''
        }
    },
    created(){
        // 获取默认导航数据
        this.getNavList(this.typeId,this.typeNum)   

    },   // 页面渲染完成
    mounted(){
        // <!--把window.onresize事件挂在到mounted函数上--> 当前函数多个组件有覆盖问题
        window.onresize = () => {
            return (() => {
                this.headerWidth=document.body.clientWidth;
            })()   
        }
    }, 
    components: {
        Head,
        Nav,
        Article,
        List
    },
    methods:{
        //获取导航列表
       async getNavList(typeId,typeNum){    
            this.typeId=typeId
            this.typeNum=typeNum   
            let {data:res}=await this.$http.post('getYingyuNav',{pid:typeId})
            if(res.code!=1){
                return alert('获取导航数据失败')
            }
            this.navData=res.data;
            if(res.data.length>=1){
                this.isEmpty=false
                let firstNavId=this.firstNavId=res.data[0].id
                if(this.typeNum==1){
                    this.firstArcDesc=res.data[0].desc
                    // 更新路由
                    this.$router.push(`/arc/${firstNavId}`)      
                }else{
                    this.$router.push(`/list/${firstNavId}`)  
                }
               // console.log(this.firstNavId)
                      
            }else{
               this.isEmpty=true
            }    
       },
       updateNav(navId){
            this.firstNavId=navId
            this.isEmpty=false
            if(this.typeNum==1){
                let obj=this.navData.find((item)=>{
                    if(item.id==navId){
                        return item
                    }
                })
                this.firstArcDesc=obj.desc
                this.url='/arc/'
            }else{
                this.url='/list/'
            }
       }
    }
    
}
</script>