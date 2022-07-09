<template>
<div class="min_nav">
    <h4 @click="showToggle">快捷导航</h4>
    <div ref="minNavList" class="wrap"> 
        <ul id="min_nav"><li v-for="(item, index) in minNavList" :key="item.id" :data-id="index">
            <a :href="'#pos'+index" @click.prevent="goPos(index,item.id)">{{item.title}}</a>
            </li>
            <!-- <li><a>11111111111111322222222222222222222222222222222222223</a></li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>12222</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li> -->
        <ul>
    </div>
    
</div>
</template>
<style lang="css" scoped>
.min_nav {
  position: fixed;
  right: 0px;
  top: 35%;
  z-index: 99999;
 
}
.min_nav .wrap {
  padding: 10px 0px;
  width: 0px;
  overflow: hidden;
  transition: width 0.5s ease-out;
  border-radius: 5px 0px 0px 5px;
   min-height: 100px;
overflow-y: scroll;
  max-height: 400px;
  background: #f5f5f5;
}
.min_nav .wrap ul {
  width: 200px;
  padding: 0px 10px;
  line-height: 1.5rem;
}
.min_nav .wrap ul li{word-wrap: break-word;margin-bottom:0.7rem}
h4 {
  cursor: pointer;
  width: 37px;
  float: left;
  font-size: 1.2rem;
  padding: 10px;
  background: #03a9f4;
  color: #fff;
  border-radius: 10px 0px 0px 10px;
  border: 1px solid #03a9f4;
}
</style>
<script>
export default {
  name: "MinNav",
  props: ["minNavList"],
  data() {
    return {
      navList: [],
      listWidth: 200,
    };
  },
  created() {},
  mounted() {},
  methods: {
    showToggle() {
      // 获取元素宽度
      let w = this.$refs.minNavList.clientWidth; //this.$refs.minNavList.offsetWidth
      if (w != this.listWidth) {
        this.$refs.minNavList.style.width = this.listWidth + "px";
      } else {
        this.$refs.minNavList.style.width = "0px";
      }
    },
    // 跳转到指定位置
    // goPos(index,c_id){
    //         console.log(index,c_id)

    // },
    // 鼠标移动导航操作
    // moveNav(){
    //     this.$nextTick(()=>{
    //           console.log(this.$refs.minNavList.clientHeight)      // 此处无效
    //     })
    // }
    // 后期添加移动快捷导航操作, 当导航移动到最上面，列表向下显示；当导航移动到最下面，列表向上显示，其他位置尽量居中显示
  },
};
</script>