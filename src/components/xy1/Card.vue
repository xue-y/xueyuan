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
        <div class="tixing"  v-if=" viewTixing!='' " ref="timu">
            <h4><span>灵活运用</span></h4> <p class="line"></p>
            <div v-for="(item,index) in viewTixing" :key="item.id" >
                <h5>题型{{index+1}}：{{item.type}}</h5>
                <p class="act">[核心方法]：{{item.act}}</p>
                <ul class="clearfix">
                    <li v-for="item_ti in (item.timu)" :key="item_ti.id" class="card">
                        <div>
                        <p v-if=" item_ti.type==1" class=" text-primary">经典题型</p>
                        <p v-else class="text-info">变式题型</p>
                        <p v-html="item_ti.timu"></p> <hr/>
                        <p @click="jiexifn(item.id+'_'+item_ti.id)"  class="hander">答案/收起</p>
                        <p :class="'jiexi_'+item.id+'_'+item_ti.id" v-html="item_ti.jiexi"></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    
</template>
<style scoped>
    h3{font-size:18px;}
    h4{font-size:16px;margin-top: 2rem;  text-align: center}
    h4 span{background: #fff;padding: 0px 1rem;}
    
    .line{border-bottom: 1px solid #2196f3;margin-top:-1rem}
    h5{font-size:16px;font-weight:400;}
  
    .tixing{
        overflow: hidden;
        width: 100%;
        position: relative;
    }
    .tixing p[class^='jiexi_']{display: none;}
    .act{color:#ff6a00;background-color: #ffecb2;font-weight:bold}
    .clearfix{position: relative;}
    .card{border:1px solid #2196f3;box-sizing: border-box;margin-right: 30px;width:350px;float:left;padding:0px 1.5rem}
    .tixing ul .card:last-child{margin-right: 0px;}
    
</style>
<script>
import  $ from 'jquery.js'
export default {
    name:'Card',
     props:['viewContent','viewTixing','bodyWidth'],  
     data(){
        return {
            cIndex:this.viewContent.index,
            isClick:true // 查看答案解析
        }
    },
    // components:{
         
    // },
     // 组件创建完成
    created(){
        // 获取初始数据
        
    }, 
    mounted(){
        // 初始化
        this.cardPos()
    },
    update(){
        
    },
    watch:{
        //Invalid watch option: "immediate" true
        bodyWidth:{
             handler(){    
                this.cardPos()
             }
        }
    },
    methods:{  
        jiexifn(id){   
            if(!this.isClick)return 
            $('.jiexi_'+id).slideToggle("slow")
        }, 
        //转换布局
        cardPos(){
             this.$nextTick(()=>{

                // 页面宽度
                let body_w=this.bodyWidth || document.body.clientWidth

                // ref 有覆盖问题，每次取最后一个
                let ele=this.$refs.timu;

                if(ele==undefined)return;

                // 取得当前版块所有题型
                //let ele_ul=this.$refs.timu.getElementsByClassName('clearfix')
                let ele_ul=$(ele).find('.clearfix')
                // 循环每个题型
                ele_ul.each(function(i,e){
                    // 当前题型下的所有题目
                    var ele_li=$(this).find('li')
            
                    var ul_w=0
                    ele_li.each(function(i,e){
                       ul_w+=$(this).outerWidth(true)
                    })
                    // 设置宽度
                    if(body_w<ul_w){
                         $(this).css('width',ul_w)   
                    }else{
                         $(this).css('width',body_w)   
                    }

                    var move_max_x=body_w-ul_w-50 // 为负数时，可移动,50为边距+滚动条宽度

                    // 鼠标按下移动事件
                    ele_ul.eq(i).mousedown(function(ev){
                        let disX=0
                        let moveX=0  //移动距离
                        this.isClick=false
                        disX = ev.pageX - $(this).position().left
                       
                        $(document).mousemove( (ev)=> {
                            moveX = ev.pageX - disX
                           
                            if(moveX<=5 && moveX>=move_max_x){
                                $(this).css("left", moveX);
                            }
                        })

                        $(document).mouseup(function (ev) {
                            $(document).off();   
                            let t=setTimeout(()=>{   
                                clearTimeout(t) 
                                this.isClick=true  
                            },100)
                        });
                        return false;
                    })
                })
             })
        }
    },
}
</script>