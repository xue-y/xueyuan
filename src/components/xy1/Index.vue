<template>
  <div v-if="isNotFound == true"><router-view></router-view></div>
  <div v-else>
    <div id="header" :style="{ width: headerWidth + 'px' }">
      <Head v-model:typeId="typeId" @newTypeId="switchNav" />     
      <Nav :bodyWidth="headerWidth" :typeId="typeId">
        <template v-slot:nav>
          <li v-for="item in navData" :key="item.id">
            <span v-if="typeNum == defaultNavType">
              <router-link :to="{ name: 'arc', params: { nid: item.id } }">
                {{item.name}}
              </router-link> 
              </span
            ><span v-else>
              <router-link :to="{ name: 'list', params: { nid: item.id } }">
                {{item.name}}
              </router-link>
            </span>
          </li>
        </template>
      </Nav>
    </div>
    <div v-if="typeNum == defaultNavType" class="page-con">
      <router-view
        :aId="selectNavId"
        :desc="selectArcDesc"
        :bodyWidth="headerWidth"
        name="arcName"
      ></router-view>
    </div>
    <div v-else-if="!listArcIs" class="page-con">
      <router-view
        :nId="selectNavId"
        name="listName"
        @getListArcContent="gerArc"
      ></router-view>
    </div>
    <div v-else class="page-con">
      <Article2 :aId="listAid" />
      <!-- 路由视图加载不出来 -->
      <!-- <router-view :nId="selectNavId" :aId="listAid" name="listArcName"></router-view> -->
    </div>
    <div class="empty text-center" v-show="isEmpty">暂无数据</div>
  </div>
</template>
<script>
import Head from "./Head.vue";
import Nav from "./Nav.vue";
import { foreEnd } from "./Config";
import Article2 from "./Article2.vue";

export default {
  name: "Index",
  data() {
    return {
      typeId: 0,
      typeNum: 0, // 栏目类型
      navData: [],
      selectNavId: 0,
      selectArcDesc: "",
      isEmpty: false, // 分类下是否有栏目
      headerWidth: window.innerWidth, // 定义初始值
      url: "",
      arcUrl: foreEnd.arcUrl,
      listUrl: foreEnd.listUrl,
      listArcIs: false, // 是否是列表页面文章页面
      listAid: 0, // 列表文章id
      isNotFound: false,
      defaultNavType: foreEnd.defaultNavType,
    };
  },
  beforeRouteEnter(to, from) {
    // console.log('beforeRouteEnter')
  },
  beforeRouteUpdate(to, from) {
    // console.log('beforeRouteUpdate')     // 无效
  },
  created() {
    this.getNavId();
  }, // 页面渲染完成
  mounted() {
    // console.log('mounted')
    // <!--把window.onresize事件挂在到mounted函数上--> 当前函数多个组件有覆盖问题
    window.onresize = () => {
      return (() => {
        this.headerWidth = window.innerWidth; //document.body.clientWidth
      })();
    };
  },
  components: {
    Head,
    Nav,
    Article2,
  },
  watch: {
    "$route.params": {
      handler() {
        this.getNavId();
      },
    },
  },
  methods: {
    //切换分类，获取导航列表
    async getNavList() {
      console.log();
      try {
        let { data: res } = await this.$http.post("getYingyuNavByPid", {
          pid: this.typeId,
        });
        if (res.code != 1) {
          console.log(res.msg);
          return alert("获取导航数据失败");
        }
        if (res.data.length < 1) {
          this.isEmpty = true;
          return;
        }

        this.navData = res.data;
        this.isEmpty = false;
        // 如果是切换分类，默认选中第一个
        if (this.selectNavId < 1) {
          this.selectNavId = res.data[0].id;
        }

        // 如果是章节栏目类型
        if (this.typeNum == foreEnd.defaultNavType) {
          let currentNav = res.data.find((item) => {
            return item.id == this.selectNavId;
          });

          this.selectArcDesc = currentNav.desc;
        }

      } catch (e) {
        // 访问出错时，有跨域问题；访问正常时，没有跨域问题
        console.log(e.message);
      }
    },
    // 获取导航父id
    async getNavPid(nId) {
      let { data: res } = await this.$http.post("getYingyuNavPid", {
        nid: nId,
      });
      if (res.code != 1) {
        console.log(res.msg);
        return alert("获取栏目分类数据失败");
      }
      return res.data;
    },
    // 通过分类id 获取第一个 栏目id
    async getNavIdByPid(pId) {
      let { data: res } = await this.$http.post("getYingyuNavByPid", {
        pid: pId,
        limit: 1,
      });
      if (res.code != 1) {
        console.log(res.msg);
        return alert("获取栏目失败");
      }
      return res.data[0].id;
    },
    // 更新文章数据
    gerArc(aId) {
      this.listArcIs = true;
      this.listAid = aId;
    },
    // 获取栏目Id
    getNavId() {
      let componentName = this.$route.name;
       // 404 页面
      if (componentName == "notFount") {
        this.isNotFound = true;
        return;
      }

      // 如果访问的是文章内容页
      if (componentName == "listArc") {
        this.listArcIs = true;
        this.listAid = parseInt(this.$route.params.aid || 0);
      }
      // 如果访问的是列表页面
       if(componentName=='list'){
          this.listArcIs = false;
        }
      this.selectNavId = parseInt(this.$route.params.nid);

      // 如果没有传栏目ID ,使用默认值
      if (this.selectNavId <= 0) {
        if (componentName == "arc") {
            this.typeNum = foreEnd.defaultNavType;
            this.typeId = foreEnd.defaultTypeId;
            this.url = this.arcUrl;
        } else {
            this.typeNum = foreEnd.listNavType;
            this.typeId = foreEnd.listTypeId;
            this.url = this.listUrl; 
        }
        console.log( this.listArcIs)
        // 更新路由
        this.updateTypeUrl();
      } else {
        // 获取 栏目pid
        this.getNavPid(this.selectNavId).then((res) => {
          this.typeId = res.pid;
          this.typeNum = res.type;
          this.getNavList();
        });
      }
    },
    // 切换分类
    switchNav(typeId, typeNum) {
      this.typeId = typeId;
      this.typeNum = typeNum;
      this.navData=[]
      if (this.typeNum == foreEnd.defaultNavType) {
        this.url = this.arcUrl;
      } else {
        this.url = this.listUrl;
      }
      // 更新栏目，与文章无关
      this.listArcIs=false
      // 更新路由
      this.updateTypeUrl();
    }, 
    // 更新选择分类后的路由
    updateTypeUrl() { 
      // 获取栏目id
      this.getNavIdByPid(this.typeId).then((nId) => {
        // 更新路由
        this.selectNavId = nId;
        let new_url = foreEnd.modulePath + this.url + "" + this.selectNavId;
        this.$router.push(new_url);
      });
    },
  },
};
</script>