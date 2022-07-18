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
                    <p v-if=" item_ti.type==1" class=" text-primary">经典题型</p>
                    <p v-else class="text-info">变式题型</p>
                    <p v-html="item_ti.timu"></p> <hr/>
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
    .tixing{position: relative;}
    .tixing ul{
        overflow: hidden;
        width: 100%;
        position: relative;
    }
    .tixing li{float:left;margin-right: 2rem;
    padding: 0px 1rem;}
    .tixing p[class^='jiexi_']{display: none;}
    .act{color:#ff6a00;background-color: #ffecb2;font-weight:bold}
    
</style>
<script>
import  $ from 'jquery.js'
export default {
    name:'Card',
     props:['viewContent','viewTixing','bodyWidth'],  
     data(){
        return {
            cIndex:this.viewContent.index,
            bodyW:document.body.clientWidth
        }
    },
    // components:{
         
    // },
     // 组件创建完成
    created(){
        // 获取初始数据
        
    }, 
    update(){
        
    },
    watch:{
        bodyWidth:{
             handler(){    
                console.log(this.bodyWidth)
             }
        }
    },
    methods:{  
        jiexifn(id){    
            $('.jiexi_'+id).slideToggle("slow")
        }, 
        //转换布局
        cardPos(){
             this.$nextTick(()=>{

                let ele_ul= $('.tixing').eq(this.cIndex).find('ul')
                let body_w=document.body.clientWidth
                console.log(body_w)
              

            //      let wrap_w=$('.tixing').outerWidth()
            //      let ul_w=0
            //      $('.tixing').find('li').each(function(i,e){
            //         ul_w+=$(this).outerWidth(true)
            //      })
            //    //  console.log(ul_w)

            //     let move_x=wrap_w-ul_w
            //     if(move_x<0){

            //       $('.tixing').find('ul').width(ul_w)
            //         let disX=0
            //         let moveX=0
            //         $('#nav>ul').mousedown(function(ev){
            //             disX = ev.pageX - $(this).position().left
                        
            //             $(document).mousemove( (ev)=> {
            //                 moveX = ev.pageX - disX
            //                 if(moveX<0 && moveX>move_x){
            //                     $(this).css("left", moveX);
            //                 }
            //             })

            //             $(document).mouseup(function (ev) {
            //                 $(document).off();   
            //             });
            //             return false;
            //         })
            //     }

             })
        }
    },
}
</script>