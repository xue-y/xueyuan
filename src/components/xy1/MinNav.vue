<template>
  <div class="min_nav">
    <h3 @click="showToggle" class="show">〈</h3>
    <h4>
      <span style="margin-bottom: -10px">︿</span>
      <span style="padding: 10px 0px"> 快捷导航</span>
      <span style="margin-top: -10px">﹀</span>
    </h4>
    <div ref="minNavList" class="wrap">
      <ul id="min_nav">
        <li v-for="(item, index) in minNavList" :key="item.id" :index="index">
          <a :href="'#' + item.id" @click.prevent="goPos(item.id,index)">{{
            item.title
          }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="css" scoped>
.min_nav {
  position: relative;
  right: 0px;
  z-index: 999;top:0px
}
.show {
  transition: right 0.5s ease-out;
  position: fixed;
  right: 37px;
  cursor: pointer;
  cursor: pointer;
  background: #03a9f4;
  margin-top: 0px;
  border-radius: 10px 0px 0px 10px;
  padding: 10px 0px;
  color: #fff;
}
.min_nav .wrap {
  padding: 10px 0px;
  position: fixed;
  right: 0px;
  width: 0px;
  margin-left: 37px;
  transition: width 0.5s ease-out;
  min-height: 123px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 80%;
  background: #f5f5f5;
}
.min_nav .wrap ul {
  width: 200px;
  padding: 0px 10px;
  line-height: 1.5rem;
}
.min_nav .wrap ul li {
  word-wrap: break-word;
  margin-bottom: 0.7rem;
}
h4 {
  cursor: move;
  width: 37px;margin:0px;
  transition: right 0.5s ease-out;
  float: left;
  position: fixed;
  right: 0px;
  font-size: 1.2rem;
  padding: 0px 10px;
  background: #03a9f4;
  color: #fff;
  border-radius: 10px 0px 0px 10px;
  border: 1px solid #03a9f4;
}
h4 span {
  display: block;
}
</style>
<script>
import $ from "jquery.js";
export default {
  name: "MinNav",
  props: ["minNavList"],
  emits:['goPosCard'], // 声明自定义事件
  data() {
    return {
      navList: [],
      listWidth: 200,
      isShow: false,
      srcTop: 0,
      winHeight: 0,
      minNavWidth: 0, // 快捷导航按钮高度
      showButTop:30 // 可以根据元素高度计算，这里简洁处理
    };
  },
  created() {},
  mounted() {
    // 初始化
    this.winHeight = $(window).height() // 这个地方可以动态获取 ，这里先写死
    this.minNavWidth = $("h4").outerWidth(true);
    this.setMinNavDefault();
    this.dragY($("h4"));
  },
  updated(){
    // 切换栏目时，从新定位侧目录默认定位
     this.setMinNavDefault();
  },
  // watch:{
  //   $route:{
  //     handler(el){
      
  //     }
  //   }
  // },
  methods: {
    //展开侧导航
    showToggle() {
      // 禁止移动侧边导航
      let h4_w = this.minNavWidth - 1;
      // 获取元素宽度
      let w = this.$refs.minNavList.offsetWidth; //this.$refs.minNavList.offsetWidth
      // 展开
      if (w != this.listWidth) {
        this.isShow = true;
        this.$refs.minNavList.style.width = this.listWidth + "px";
        $("h4").css({ right: this.listWidth,'cursor':'not-allowed'});
        $("h3").css({ right: this.listWidth + h4_w});
      } else {
        // 收回
        this.$refs.minNavList.style.width = "0px";
        $("h4").css({ right: 0 ,'cursor':'move'});
        $("h3").css({ right: h4_w});
        this.isShow=false;
      }
    },
    // 拖拽导航
    dragY(el) {   
      let disY = 0;
      let el_h = el.outerHeight(true);
      let body_h = this.winHeight - el_h; // 可上下移动的最大高度
      let _this = this;
      let moveY = 0;
      el.mousedown(function (ev) {
       if(_this.isShow){
            return
        }
		// 元素为fixed 定位 所有用 clientY ； absoult 定位 用 pageY
        disY = ev.clientY - $(this).offset().top; // 多减去一个滚动条高度距离
        $(document).mousemove(function (ev) {
          // 页面滚动会加载数据，页面 ev.clientY  会变化
          let scr_top = $(window).scrollTop();
          moveY = ev.clientY - disY - scr_top; // -scr_top 负负为正 加一个滚动条高度的距离
		  //console.log(ev.clientY,ev.pageY,scr_top,moveY,disY)

          if (moveY > 0 && moveY < body_h) {
            el.css("top", moveY);
            $("h3").css("top", moveY+_this.showButTop);
          }
        });
        $(document).mouseup(function (ev) {
          $(document).off();
          _this.setMinNavPos();
        });
        return false;
      });
    },
    // 设置导航位置
    setMinNavPos() {
      this.$nextTick(() => {
        // 侧目录高度
        let min_nav_h = this.$refs.minNavList.clientHeight;
        // 快捷导航/2  的高
        let min_but_h2 = $("h4").outerHeight() / 2;
        let min_but_top = $("h4").offset().top;
        let src_top=$(window).scrollTop();

        let max_top = min_but_top + min_but_h2-src_top;

        // 一半的列表目录高度
        let min_nav_h2 = min_nav_h / 2;
        // 上半部分的差距
        let pos = max_top - min_nav_h2;
        // 位于上半部分
        if (pos <= 0) {
          this.$refs.minNavList.style.top = 0 + "px";
        } else if (max_top + min_nav_h2 > this.winHeight) {
          this.$refs.minNavList.style.top =
            Math.ceil(this.winHeight - min_nav_h) + "px";
        } else {
          this.$refs.minNavList.style.top = Math.ceil(pos) + "px";
        }
      });
    },
    // 设置默认位置
    setMinNavDefault() {
      this.$nextTick(() => {
        // 侧目录高度
        let min_nav_h2 =this.$refs.minNavList.clientHeight / 2;
         
        //  快捷导航/2  的高
        let min_but_h2 = $("h4").outerHeight() / 2;
        // 页面一半的高度
        let win_h2 = this.winHeight / 2;
        $("h4").css("top", Math.ceil(win_h2 - min_but_h2));
        $("h3").css("top", Math.ceil(win_h2 - min_but_h2+this.showButTop));

        this.$refs.minNavList.style.top = Math.ceil(win_h2 - min_nav_h2) + "px";
    
      });
    },
    // 跳转到指定位置
    goPos(id,index){
         this.$emit('goPosCard',id,index)  // 触发自定义事件
    },
  },
};
</script>