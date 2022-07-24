<template> 
    <div class="text-content">
        <h3 class="text-center">{{arcData.title}}</h3>
        <p class="text-center"><time>发布时间： {{arcData.time}}</time></p>
    </div>
    <div class="con" style="text-indent:2rem">{{arcData.con}}</div>
</template>

<script>
export default {
     name:'Article2',
     props:['aId'], 
     data(){
        return {
            arcData:{con:''}
        }
    },
    created(){
        this.getArcContent()
    },
    methods:{
        // 获取文章内容
        async getArcContent(){
           let { data: res } = await this.$http.post("getYingyuListArcContent", {
                aid: this.aId
            })
            if (res.code != 1) {
                console.log(res.msg);
                this.arcData.con=''
                return alert("获取文章内容数据失败");
            }
            this.arcData=res.data
        },
    }

}
</script>

<style  scoped>

</style>