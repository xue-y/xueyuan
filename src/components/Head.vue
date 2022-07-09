<template>
    <div id="head" :style="{ width:headerWidth+'px' }" >
      <h1>英语学园</h1> 
      <select  @change="switchType($event)">
        <option v-for="item in typeData" :name="'list-'+item.id" :key="item.id" :value="item.id" :selected="item.id==typeId? true:false ">{{item.name}}</option>
      </select>
    </div>
</template>
<script>

export default {
    name:"Head",
    props:['typeId'],
    emits:['newTypeId'], // 声明自定义事件
    data() {
        return {   
          typeData:[],
          headerWidth: document.body.clientWidth, // 定义初始值
        }   
    },
    created(){
        this.getTypeData()
    },
    // 页面渲染完成
    mounted() {
        // <!--把window.onresize事件挂在到mounted函数上-->
        window.onresize = () => {
            return (() => {
                this.headerWidth=document.body.clientWidth;
            })()   
        }
    },
    methods:{
      switchType(e){  // 切换导航
           this.$emit('newTypeId',e.target.value)  // 触发自定义事件
           
      },
      async getTypeData(){
          let {data:res}=await this.$http.post('getYingyuType')
          if(res.code!=1){
                return alert('获取分类数据失败')
            }
          this.typeData=res.data
      }

    }
}
</script>