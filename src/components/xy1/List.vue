<template>
  <ul>
    <li v-for="item in listData" :key="item.id" @click="getArcContent(item.id)">
      <router-link :to="{name:'listArc',params:{nid:nId,aid:item.id}}">{{ item.title }}</router-link>
    </li>
  </ul>
  <div class="loader text-center" v-show="isLoad">数据加载中……</div>
  <div class="empty text-center" v-show="isEmpty">暂无数据</div>
</template>

<script>
import $ from "jquery.js";
import {foreEnd} from './Config' 

export default {
  name: "List",
  props:{
      nId:[Number,String]
  },
  emits:['getListArcContent'],
  data() {
    return {
      listData: [],
      isEmpty: false, // 栏目下是否有文章
      isLoad: false, // 数据是否加载中
      limit: 5,
      page:1,// 默认页数
    };
  },
  mounted(){
     this.getListData()
  },
  watch:{
    // 当栏目切换时
    nId:{
      handler(){
        // 上一次请求数据恢复默认值,如果nId<1, index.vue已做处理
        if(this.nId<1)return
        this.isEmpty=false
        this.listData = [];
        this.getListArc()
      },
      immediate:true
    }
  },
  methods: {
    // 获取文章列表
    async getListArc() {
       this.isLoad = true;
      let { data: res } = await this.$http.post("getYingyuListArc", {
        nid: this.nId,
        limit: this.limit,
      });
      if (res.code != 1) {
        console.log(res.msg);
        return alert("获取文章列表数据失败");
      }
      this.isLoad = false;
      let length = res.data.length;
      if (length >= 1) {
        this.listData = res.data;      
      } else {
        this.isEmpty = true;
      }
    },
    // 进入文章内容页面
    getArcContent(aid){
      this.$emit('getListArcContent',aid)
    },
    getListData(){
      // 上拉加载，下拉刷新
    }

  },
};
</script>

<style scoped>
li {
  line-height: 1.5em;
  margin-bottom: 2rem;
  padding: 10px 0px;
  font-size: 16px;
  border-bottom: 1px dashed #565555;
}
li a {
  color: #000;
  text-decoration: none;
}
li a:hover {
  color: #0056b3;
}
</style>