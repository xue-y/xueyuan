<template>
  <!--  默认5 条数据 -->
  <ul>
    <li v-for="item in listData" :key="item.id">
      <a :href="url + item.id">{{ item.title }}1111111111111111111111111111</a>
    </li>
  </ul>
  <div class="loader text-center" v-show="isLoad">数据加载中……</div>
  <div class="empty text-center" v-show="isEmpty">暂无数据</div>
</template>

<script>
import $ from "jquery.js";

export default {
  name: "List",
  props: ["nId"],
  data() {
    return {
      listData: [],
      isEmpty: false, // 栏目下是否有文章
      isLoad: false, // 数据是否加载中
      limit: 5,
      page:1,// 默认页数
      url: "",
    };
  },
  // beforeRouteEnter(to,from){
  //   console.log(111)
  // },
  // beforeRouteUpdate(to,form){
  //     console.log(to)
  // },
  // created(){
  //   console.log(333)
  // },
  // mounted(){
  //   console.log(444)
  // },
  mounted() {
  },
  watch: {
    nId: {
      handler() {
        // 上一次请求数据恢复默认值
         this.isEmpty=false
        this.listData = [];
        this.url = "/list/" + this.nId + "/arc/";
        this.getListArc();
        console.log(this.isLoad);
      },
    },
  },
  methods: {
    // 获取文章
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