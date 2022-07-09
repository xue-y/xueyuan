<template>
<div class="minNav" v-if="minNavLength >=1 ">
    <MinNav :minNavList="minNavData"  />
</div>
<div class="article"  :data-id="$route.params.arc_id">
   <div class="arc_card clearfix" v-for="item in cardList" :key="item.id"> 
    <Card :viewContent="item.contentData" :viewTixing="item.tixing"  />
    </div>

</div>
<div class="loader"></div>
<div class="empty text-center"></div>
</template>
<script>
import  $ from 'jquery.js'
import MinNav from './MinNav.vue'
import Card from './Card.vue' 

export default {
    name:'Article',
    props:['aId'],  
    data(){
        return {
          minNavData:[],
          minNavLength:0,
          cardContent:[],
          cardTixing:[],
           cardList:[],
          currenCardId:0,
          currenCardIndex:-1,
          card_but:true  // 整个页面 请求数据开关        
        }
    },
    components:{
         MinNav,
         Card
    },
     // 组件创建完成
    created(){
    }, 
    mounted(){  
        let w_h=$(window).height(); //可视区高度
        window.onscroll = () => {
          return (() => {
            
            // 判断下面还有版块 没有请求数据
            let next_cindex=this.currenCardIndex+1
            if(this.minNavLength<=next_cindex){
                return
            }

            // 页面滚动高度
            let src_top=$(window).scrollTop();
           
            //元素的高度
            let ele_h=$('.loader').offset().top

            // 取得当前页面滚动距离+可视区- 元素的高度 >0
            let diff_h=(w_h+src_top)-ele_h

           
            // 判断即将展现的数据是否请求过
            let is_Data=$('.arc_card').eq(next_cindex).length
            
            if(diff_h>0 && this.card_but && is_Data<1){
                let next_cid=this.minNavData[next_cindex].id
                this.getCardData(next_cid,next_cindex)
            }
           
          })()   
      }
    },
    watch:{
        // 监听文章id 变化
        aId:{
            handler(){
              if(this.aId>0){
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
            let {data:res}=await this.$http.post('getYingyuArcCard',{aid:arcId})
            if(res.code!=1){
                return alert('获取快捷导航数据失败')
            }
            this.minNavLength=res.data.length
            if(this.minNavLength>=1){
                 $('.empty').text('')
                 this.currenCardId=res.data[0].id
                 this.currenCardIndex=0;
                 this.minNavData=res.data
                 // 获取 默认第一个版块数据
                 this.getCardData(res.data[0].id,0)
            }else{
                $('.empty').text('暂无数据')
                this.currenCardId=0
                this.currenCardIndex=-1;
            }          
       },
       //获取指定版块数据 index 当前页面第几个元素，c_id 版块id
        async getCardData(c_id,index){
             this.card_but=false;
            let {data:res}=await this.$http.post('getYingyuCard',{cid:c_id})
                if(res.code!=1){
                    return alert('获取文章版块数据失败')
                }
                this.cardList.push(res.data)
            
                this.currenCardId=c_id
                this.currenCardIndex=index;
                // 标识当前版块数据已经请求过了
                $('.arc_card').eq(index).attr('isData',true)
                this.card_but=true
        }

    },
}
</script>