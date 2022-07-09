<template>
        <h3 class="text-center">{{viewContent.title}}</h3>
        <h5 class="text-primary">{{viewContent.desc}}</h5>
        <div v-if="viewContent.zhishidian!='' ">
            <div class="zhishidian">
                <h4><span>知识点</span></h4> <p class="line"></p>
                <div class="content" v-html="viewContent.zhishidian">
                </div>
            </div>
            <div class="fuxi">
                <h4><span>复习要点</span></h4> <p class="line"></p>
                <div class="error" v-if="viewContent.fuxierror!='' ">
                    <p><b>【易错点】</b></p>
                    <p  v-html="viewContent.fuxierror"></p>
                </div>
                <div class="strong" v-if="viewContent.fuxistrong!='' ">
                    <p><b>【重难点】</b></p>
                    <p  v-html="viewContent.fuxistrong"></p>
                </div>
            </div>
        </div>        
        <div class="tixing"  v-if=" viewTixing!='' ">
            <h4><span>灵活运用</span></h4> <p class="line"></p>
            <ul v-for="(item,index) in viewTixing" :key="item.id" >
                <h5>题型{{index+1}}：{{item.type}}</h5>
                <p class="act">[核心方法]：{{item.act}}</p>
                <li v-for="item_ti in (item.timu)" :key="item_ti.id" class="card">
                    <p v-if=" item_ti.type==1">经典题型</p>
                    <p v-else>变式题型</p>
                    <p v-html="item_ti.timu"></p>
                    <p @click="jiexifn(item.id+'_'+item_ti.id)"  class="hander">答案/收起</p>
                    <p :class="'jiexi_'+item.id+'_'+item_ti.id" v-html="item_ti.jiexi"></p>
                </li>
            </ul>
        </div>
    
</template>
<style scoped>
    h3{font-size:18px;}
    h4{font-size:16px;margin-top: 2rem;  text-align: center}
    h4 span{background: #fff;padding: 0px 1rem;}
    
    .line{border-bottom: 1px solid #2196f3;margin-top:-1rem}
    h5{font-size:16px;font-weight:400;}
    .tixing ul{
        overflow: hidden;
        width: 100%;
    }
    .tixing li{float:left}
    .act{color:#ff6a00;background-color: #ffecb2;font-weight:bold}
    
</style>
<script>
import  $ from 'jquery.js'
export default {
    name:'Card',
    props:['viewContent','viewTixing'],  
    data(){
        return {
        }
    },
    components:{
         
    },
     // 组件创建完成
    created(){
        // 获取初始数据
        
    }, 
    methods:{  
        jiexifn(id){    
            $('.jiexi_'+id).slideToggle("slow")
        }, 
    },
}
</script>