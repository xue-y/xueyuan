<template>
    <div id="nav">
      <transition mode="out-in">
      <ul ref="nav_list">
        <slot name="nav"></slot>
      </ul></transition>
    </div>
</template>

<script>
import  $ from 'jquery.js'
export default {
    name:'Nav',
    props:['bodyWidth','typeId'],
    data(){
        return {
          isClick:true,// 拖动导航时禁止点击
          ulWidth:0,
          urlName:''
        }
    },
   // emits:['newNavId'], // 声明自定义事件
    //组件在页面中被重新渲染完毕后
    updated(){
         this.setUlwidth()
         this.navSwiper()
    },
    watch:{
        // 如果不传这个值，无法知道窗口大小发生变化， 当前组件使用 onsize 与app.vue 页面冲突
        bodyWidth:{
            handler(){
               // 当窗口由 小 变 大时 ，更改 $('#nav ul').left
                let move_x=this.bodyWidth-this.ulWidth // 可移动的最大距离
                let ul_left=$('#nav>ul').offset().left // 当前的left值
                // 之前移动过导航，并且移动到最左边
                if((ul_left<move_x) && (move_x<=0)){
                    $('#nav>ul').css('left',move_x)
                }
            }
        },
        typeId:{
            // 切换分类导航，nav left 置为0
            handler(){
                $('#nav>ul').css('left',0) 
            },
            immediate:true
        },
    },
    methods:{
    //    switchNav(navId){  // 切换导航
    //        if(this.isClick){
    //          this.$emit('newNavId',navId)  // 触发自定义事件
    //        } 
    //    },
       // 设置初始ul 宽度
       setUlwidth(){
            this.$nextTick(()=>{
                let el=this.$refs.nav_list
                let ul_w=0;
                    $('#nav li').each(function(i,e){
                        ul_w+=$(this).outerWidth(true)
                    })
                    // 必须向上取整
                    ul_w=Math.ceil(ul_w)
                if(this.bodyWidth>=ul_w){
                    el.style.width=this.bodyWidth+'px'
                    this.ulWidth=this.bodyWidth
                  
                }else{
                    el.style.width=ul_w+'px'
                    this.ulWidth=ul_w
                } 
                
            })
       },
        // 导航滑动插件
       navSwiper(){               
         $('#nav>ul').mousedown((ev)=>{
            // 如果当前点击的是li 直接返回，用户切换页面
             if(ev.target.nodeName=='LI')return

            // 如果当前点击的是 ul,执行移动导航操作
            this.isClick=false

            // ul 最大移动距离          
            let move_max=this.bodyWidth-this.ulWidth  // 向左移动，负值

            // 之前移动后，不再是初始值，获取当前ul left 值
            let ul_left=$('#nav>ul').position().left
            let disX=0
            let moveX=0
            // 如果当前 left  超出可移动的最大范围,设置为最大值
            if(move_max>ul_left){
                disX = ev.pageX - move_max
            }else{
                disX=ev.pageX - ul_left
            }
            // 当鼠标移动的时候
            $(document).mousemove( (ev)=> {
              
                moveX = ev.pageX - disX
    
                if((moveX<0) && (moveX>move_max))
                {             
                    $('#nav>ul').css("left", moveX);
                }
            })
            // 当鼠标抬起的时候
            $(document).mouseup((ev)=>{
                $(document).off();   
                let t=setTimeout(()=>{
                    this.isClick=true
                    clearTimeout(t)
                },100)
            });
          
            // 阻止默认事件
            return false;
          }) 
      }
    }    
}
</script>
<style>
#nav{width:100%; height: 50px;overflow: hidden; position: relative;border-bottom: 2px #2196f3 solid;animation: lineColor 4s linear 0.5ms infinite normal forwards;font-size: 16px;}
#nav ul{height: 50px;line-height: 50px;position: relative;left:0px;top:0px;animation: opacitySwitch 1s linear}
/* transition:opacity 1s ease-in;  */
#nav li{float: left;padding: 0px 1rem;margin: 0px 1rem;cursor: pointer;}
#nav a{color:#000; display: block;text-decoration: none;}
#nav a.router-link-active{text-decoration: none;color:#007bff;font-weight: 900;}
@keyframes  lineColor {
    from{border-bottom-color: rgb(255, 115, 0);}
    25%{border-bottom-color: rgb(0, 255, 76);}
    50%{border-bottom-color: rgb(0, 174, 255);}
    75%{border-bottom-color: rgb(76, 0, 255);}
    to{border-bottom-color: rgb(255, 0, 21);}
}
@keyframes opacitySwitch {
    from{opacity:0;}
    to{opacity:1;}
}
.v-enter{
  opacity:0;
}
.v-enter-to{
  opacity:1;
}
.v-enter-active{
  transition:1s;
}
.v-leave{
  opacity:1;
}
.v-leave-to{
  opacity:0;
}
.v-leave-active{
  transition:1s;
}
</style>