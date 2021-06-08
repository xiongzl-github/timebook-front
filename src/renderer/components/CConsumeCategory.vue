<template>
<vuescroll>
<div v-for="j in 5" :key="j" style="width:300px;">
    <div v-for="i in 6" :key="i" style="width:50px;height:50px; line-height:50px;display:inline-block">
        <div @click="chooseConsumeCategory('三餐', 'iconfont iconyinshi3')" v-if="j == 1 && i == 1" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconyinshi3" />
        </div>
        <div v-if="j == 1 && i == 1" style="width:50px;height:20px;line-height:20px;text-align:center">
            三餐
        </div>

        <div @click="chooseConsumeCategory('服饰', 'iconfont iconfushi')" v-if="j == 1 && i == 2" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconfushi" />
        </div>
        <div v-if="j == 1 && i == 2" style="width:50px;height:20px;line-height:20px;text-align:center">
            服饰
        </div>

        <div @click="chooseConsumeCategory('日用品', 'iconfont iconriyongpin1')" v-if="j == 1 && i == 3" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconriyongpin1" />
        </div>
        <div v-if="j == 1 && i == 3" style="width:50px;height:20px;line-height:20px;text-align:center">
            日用品
        </div>

        <div @click="chooseConsumeCategory('水果', 'iconfont iconshuiguo')" v-if="j == 1 && i == 4" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconshuiguo" />
        </div>
        <div v-if="j == 1 && i == 4" style="width:50px;height:20px;line-height:20px;text-align:center">
            水果
        </div>

        <div @click="chooseConsumeCategory('蔬菜', 'iconfont iconshucai1')" v-if="j == 1 && i == 5" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconshucai1" />
        </div>
        <div v-if="j == 1 && i == 5" style="width:50px;height:20px;line-height:20px;text-align:center">
            蔬菜
        </div>

        <div @click="chooseConsumeCategory('交通', 'iconfont iconjiaotongditiedongchegaotiemianxing')" v-if="j == 1 && i == 6" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconjiaotongditiedongchegaotiemianxing" />
        </div>
        <div v-if="j == 1 && i == 6" style="width:50px;height:20px;line-height:20px;text-align:center">
            交通
        </div>

        <div @click="chooseConsumeCategory('化妆品', 'iconfont iconhuazhuangpin')" v-if="j == 2 && i == 1" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconhuazhuangpin" />
        </div>
        <div v-if="j == 2 && i == 1" style="width:50px;height:20px;line-height:20px;text-align:center">
            化妆品
        </div>

        <div @click="chooseConsumeCategory('聚会', 'iconfont iconjuhui1')" v-if="j == 2 && i == 2" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconjuhui1" />
        </div>
        <div v-if="j == 2 && i == 2" style="width:50px;height:20px;line-height:20px;text-align:center">
            聚会
        </div>

        <div @click="chooseConsumeCategory('宠物', 'iconfont iconchongwu1')" v-if="j == 2 && i == 3" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconchongwu1" />
        </div>
        <div v-if="j == 2 && i == 3" style="width:50px;height:20px;line-height:20px;text-align:center">
            宠物
        </div>

        <div @click="chooseConsumeCategory('运动', 'iconfont iconyundong1')" v-if="j == 2 && i == 4" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconyundong1" />
        </div>
        <div v-if="j == 2 && i == 4" style="width:50px;height:20px;line-height:20px;text-align:center">
            运动
        </div>

        <div @click="chooseConsumeCategory('爱车', 'iconfont iconjiaotong1')" v-if="j == 2 && i == 5" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconjiaotong1" />
        </div>
        <div v-if="j == 2 && i == 5" style="width:50px;height:20px;line-height:20px;text-align:center">
            爱车
        </div>

        <div @click="chooseConsumeCategory('租房', 'iconfont iconzufang1')" v-if="j == 2 && i == 6" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconzufang1" />
        </div>
        <div v-if="j == 2 && i == 6" style="width:50px;height:20px;line-height:20px;text-align:center">
            租房
        </div>

        <div @click="chooseConsumeCategory('学习', 'iconfont iconw_xuexi')" v-if="j == 3 && i == 1" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconw_xuexi" />
        </div>
        <div v-if="j == 3 && i == 1" style="width:50px;height:20px;line-height:20px;text-align:center">
            学习
        </div>

        <div @click="chooseConsumeCategory('烟酒', 'iconfont iconyanjiu1')" v-if="j == 3 && i == 2" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconyanjiu1" />
        </div>
        <div v-if="j == 3 && i == 2" style="width:50px;height:20px;line-height:20px;text-align:center">
            烟酒
        </div>

        <div @click="chooseConsumeCategory('游戏', 'iconfont iconyouxi1')" v-if="j == 3 && i == 3" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconyouxi1" />
        </div>
        <div v-if="j == 3 && i == 3" style="width:50px;height:20px;line-height:20px;text-align:center">
            游戏
        </div>

        <div @click="chooseConsumeCategory('直播', 'iconfont iconzhibobofangshexiangjiguankanmianxing')" v-if="j == 3 && i == 4" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconzhibobofangshexiangjiguankanmianxing" />
        </div>
        <div v-if="j == 3 && i == 4" style="width:50px;height:20px;line-height:20px;text-align:center">
            直播
        </div>

        <div @click="chooseConsumeCategory('医疗', 'iconfont iconshuye')" v-if="j == 3 && i == 5" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconshuye" />
        </div>
        <div v-if="j == 3 && i == 5" style="width:50px;height:20px;line-height:20px;text-align:center">
            医疗
        </div>

        <div @click="chooseConsumeCategory('保健', 'iconfont iconbaojianpin')" v-if="j == 3 && i == 6" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconbaojianpin" />
        </div>
        <div v-if="j == 3 && i == 6" style="width:50px;height:20px;line-height:20px;text-align:center">
            保健
        </div>

        <div @click="chooseConsumeCategory('保险', 'iconfont iconbaoxian')" v-if="j == 4 && i == 1" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconbaoxian" />
        </div>
        <div v-if="j == 4 && i == 1" style="width:50px;height:20px;line-height:20px;text-align:center">
            保险
        </div>

        <div @click="chooseConsumeCategory('基金', 'iconfont iconjijin')" v-if="j == 4 && i == 2" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconjijin" />
        </div>
        <div v-if="j == 4 && i == 2" style="width:50px;height:20px;line-height:20px;text-align:center">
            基金
        </div>

        <div @click="chooseConsumeCategory('股票', 'iconfont icongupiao1')" v-if="j == 4 && i == 3" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont icongupiao1" />
        </div>
        <div v-if="j == 4 && i == 3" style="width:50px;height:20px;line-height:20px;text-align:center">
            股票
        </div>

        <div @click="chooseConsumeCategory('酒店', 'iconfont iconjiudian')" v-if="j == 4 && i == 4" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconjiudian" />
        </div>
        <div v-if="j == 4 && i == 4" style="width:50px;height:20px;line-height:20px;text-align:center">
            酒店
        </div>

        <div @click="chooseConsumeCategory('旅行', 'iconfont iconlvhang1')" v-if="j == 4 && i == 5" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconlvhang1" />
        </div>
        <div v-if="j == 4 && i == 5" style="width:50px;height:20px;line-height:20px;text-align:center">
            旅行
        </div>

        <div @click="chooseConsumeCategory('转账', 'iconfont iconzhuanzhang1')" v-if="j == 4 && i == 6" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconzhuanzhang1" />
        </div>
        <div v-if="j == 4 && i == 6" style="width:50px;height:20px;line-height:20px;text-align:center">
            转账
        </div>

        <div @click="chooseConsumeCategory('还款', 'iconfont iconguihuan')" v-if="j == 5 && i == 1" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconguihuan" />
        </div>
        <div v-if="j == 5 && i == 1" style="width:50px;height:20px;line-height:20px;text-align:center">
            还款
        </div>

        <div @click="chooseConsumeCategory('水电', 'iconfont iconshuidian')" v-if="j == 5 && i == 2" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconshuidian" />
        </div>
        <div v-if="j == 5 && i == 2" style="width:50px;height:20px;line-height:20px;text-align:center">
            水电
        </div>

        <div @click="chooseConsumeCategory('通讯', 'iconfont icondianhua')" v-if="j == 5 && i == 3" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont icondianhua" />
        </div>
        <div v-if="j == 5 && i == 3" style="width:50px;height:20px;line-height:20px;text-align:center">
            通讯
        </div>

        <div @click="chooseConsumeCategory('数码', 'iconfont icondigital')" v-if="j == 5 && i == 4" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont icondigital" />
        </div>
        <div v-if="j == 5 && i == 4" style="width:50px;height:20px;line-height:20px;text-align:center">
            数码
        </div>

        <div @click="chooseConsumeCategory('视频', 'iconfont iconshipingzaixian')" v-if="j == 5 && i == 5" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconshipingzaixian" />
        </div>
        <div v-if="j == 5 && i == 5" style="width:50px;height:20px;line-height:20px;text-align:center">
            视频
        </div>

        <div @click="chooseConsumeCategory('零食', 'iconfont iconlingshi')" v-if="j == 5 && i == 6" style="width:50px;height:30px;text-align:center;cursor: pointer;">
            <Icon style="vertical-align: top" size=30 custom="iconfont iconlingshi" />
        </div>
        <div v-if="j == 5 && i == 6" style="width:50px;height:20px;line-height:20px;text-align:center">
            零食
        </div>
    </div>
</div>
</vuescroll>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CConsumeCategory",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["timelineCategory"])
    },
    created() {
        console.log("CConsumeCategory created====================================");
    },
    mounted: function() {
        console.log("CConsumeCategory mounted====================================");
    },
    data() {
        return {
            
        }
    },
    methods: {
        chooseConsumeCategory(categoryName, icon){
            this.timelineCategory.consumeCategoryModel.consumeCategory = categoryName;
            this.timelineCategory.consumeCategoryModel.consumeCategoryIcon = icon;
        }
    }
};
</script>
<style lang='less'>
</style>