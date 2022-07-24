<template>
<div class="minNav" v-if="minNavLength >=1 ">
    <MinNav :minNavList="minNavData"  @goPosCard="getPosCard" />
</div>
<div class="article" ref="cardList">
   <p class="desc">{{desc}}</p>
   <div class="arc_card clearfix" v-for="(item,index) in minNavData" :key="item.id" isData="false"  :id="item.id" :index="index" > 
        <!-- 等待数据加载完成 -->
        <div  v-if="(cardList!= '')  && (cardList[index].contentData!=undefined) && (cardList[index].tixing!=undefined)" >
            <Card :viewContent="cardList[index].contentData" :viewTixing="cardList[index].tixing" :bodyWidth="bodyWidth"  /> 
        </div>
   </div>
</div>
<div class="loader text-center"  v-show="isLoad">article 数据加载中……</div>
<div class="empty text-center" v-show="isEmpty">article 暂无数据</div>
</template>
<script>
import  $ from 'jquery.js'
import MinNav from './MinNav.vue'
import Card from './Card.vue' 

export default {
    name:'Article',
    props:['aId','desc','bodyWidth'],  
    data(){
        return {
          pageScrollTop:0,// 文章内容滚动距离
          minNavData:[],
          minNavLength:0,
          cardContent:[],
          cardTixing:[],
          cardList:[],
          isLoad:false, // 数据是否加载中
          isEmpty:false,// 数据是否为空，栏目下是否有版块数据
          cardBut:true,  // 整个页面 请求数据开关
          currentUrl:'', // 当前页面url  
        }
    },
    components:{
         MinNav,
         Card
    },
    mounted(){         
        let w_h=$(window).height()//
        let head_h=$('#header').outerHeight(true)  // 可视区头部高度 可以动态获取

        window.onscroll = () => {
          return (() => {  
            // // 页面滚动高度
            let src_top=$(window).scrollTop();
     
           // 如果标记元素出现在可视区，开始请求数据
           if(this.cardBut){
                let _this=this
                $('.arc_card').each(function(i,e){
               
                   if(($(this).attr('isData')==='false') && _this.cardBut)
                    {
                        // 当前页面高度
                        let ele_top=$(this).offset().top

                        let diff=Math.ceil(src_top+w_h-ele_top);

                       // if(src_top+w_h > ele_top && ele_top<src_top+ head_h)
            
                        // 可视区范围
                        if((diff>=0) && (src_top+head_h<ele_top)){
                            // 开始请求数据
                            let c_index=parseInt($(this).attr('index'))
                            let c_id=parseInt($(this).attr('id'))
                            _this.getCardData(c_id,c_index)
                               
                        }else{
                              return false  // 跳出循环
                        }
                   }
                })
           }  

         })()   
      }
    },
    watch:{
        // 监听栏目id 变化
        aId:{
            handler(){    
              if(this.aId>0){
                // 上一个栏目的 的数据情况 清空
                this.isEmpty=false
                // 清空原来的数据
                this.cardList=[] 
                this.minNavData=[]
                // 获取当前快捷导航列表
                this.getCurrenMinNav(this.aId)
              }
            },
            immediate:true
        },
    },
    methods:{
      // 获取当前快捷导航列表
       async getCurrenMinNav(arcId){
            let {data:res}=await this.$http.post('getYingyuArcCard',{nid:arcId})
            if(res.code!=1){
                console.log(res.msg)
                return alert('获取快捷导航数据失败')
            }
            this.minNavLength=res.data.length
            if(this.minNavLength>=1){
                 this.isEmpty=false
                 this.minNavData=res.data
                // 初始化数据
                res.data.forEach(()=>{this.cardList.push([])}) 

                // 获取 默认第一个版块数据
                this.getCardData(res.data[0].id,0)
            }else{
                this.cardList=[]
                this.isEmpty=true
            }  
            this.currentUrl=this.$route.href        
       },
       //获取指定版块数据 index 当前页面第几个元素，c_id 版块id, c_but 请求数据开关是否开启，默认 true ，开启，完成当前操作可以请求新的数据
        async getCardData(c_id,index,c_but=true){
             this.cardBut=false
             this.isLoad=true
             let {data:res}=await this.$http.post('getYingyuCard',{cid:c_id})
                if(res.code!=1){
                    console.log(res.msg)
                    return alert('获取文章版块数据失败')
                }
                res.data.contentData['index']=index
                // 更新为新的数组
  
                this.cardList.splice(index,1,res.data);
                // 标识当前版块数据已经请求过了
                $('.arc_card').eq(index).attr('isData',true)
                this.cardBut=c_but
                this.isLoad=false
        },
        // 跳转到指定版块
        getPosCard(id,index){
            // 计算滚动距离
            let ele_h=$('.arc_card').eq(index).offset().top
            let head_h=$('#header').outerHeight(true)      
            this.pageScrollTop=Math.ceil(ele_h-head_h)

            let is_data=$('.arc_card').eq(index).attr('isData')

            //滚动条定位到指定位置
            if(is_data=='false'){
              
               // 请求数据 此时不加载 中间的数据 1 ，3， 此时不加载第二条数据
               this.getCardData(id,index,false)
              
               // 等待dom 加载完成处理
               this.$nextTick(()=>{                 
                   let _this=this
                   $('html').animate({
                        scrollTop:_this.pageScrollTop
                        }, 500,'swing',()=>{
                        let t=setTimeout(()=>{
                                _this.cardBut=true
                                clearTimeout(t)
                            },100)
                        }
                    );    
              })
            }else{
              //   window.location.href=this.currentUrl+'#'+id  
              window.scrollTo({
                    top:this.pageScrollTop,
                    behavior:'smooth'
              })
            }
        },
    },
}
</script>
<style scoped>
.arc_card{margin-bottom: 3rem;}
.desc{font-size:15px;margin-top:1rem}
</style>