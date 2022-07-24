<template>
    <div id="head">
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
          typeArr:[]
        }   
    },
    created(){
        this.getTypeData()
    },
    methods:{
      switchType(e){  // 切换导航
          let obj=this.typeData.find((item)=>{
              if(item.id==e.target.value)
              {
                return item
              }
          })
          this.$emit('newTypeId',e.target.value,obj.type)  // 触发自定义事件
           
      },
      async getTypeData(){
          let {data:res}=await this.$http.post('getYingyuType')
          if(res.code!=1){
                console.log(res.msg)
                return alert('获取分类数据失败')
            }
          this.typeData=res.data
      }

    }
}
</script>