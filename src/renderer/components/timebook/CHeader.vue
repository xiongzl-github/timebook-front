<template>
    <div style="width:100%;height:50px;line-height:50px;background-color:#fff;text-align:center;box-shadow:0px 15px 20px -20px #000;">
        <span style="font-weight:bolder;font-size:16px;float: left;margin-left:10px">2021-05-19 timebook</span>
        <span>
            <Icon @click="test" title="图层" style="width:50px;height:50px;cursor:pointer;padding:10px" size="30" custom="iconfont icontuceng" />
            <Icon @click="test" title="组合" style="width:50px;height:50px;cursor:pointer;padding:10px" size="30" custom="iconfont iconzuhe" />
            <Icon @click="test" title="打散" style="width:50px;height:50px;cursor:pointer;padding:10px" size="30" custom="iconfont icondasan1" />
            <Icon @click="test" title="锁定" style="width:50px;height:50px;cursor:pointer;padding:10px" size="30" custom="iconfont iconsuoding3" />
        </span>
        <Icon @click="test" title="帮助" style="width:50px;height:50px;cursor:pointer;float:right;padding:10px" size="30" custom="iconfont iconwenti" />
        <Icon @click="test" title="分享" style="width:50px;height:50px;cursor:pointer;float:right;padding:10px" size="30" custom="iconfont iconfenxiang" />
        <Icon @click="test" title="下载" style="width:50px;height:50px;cursor:pointer;float:right;padding:10px" size="30" custom="iconfont iconxiazai" />
        <Icon @click="test" title="预览" style="width:50px;height:50px;cursor:pointer;float:right;padding:10px" size="30" custom="iconfont iconyulan" />
    </div>
</template>
<script>

export default {
    name: 'timebook',
    components: {
     },
     data() {
        return {
            
        }
    },
    methods: {
        test(){

        }
    }
}
</script>

<style>

  
</style>
