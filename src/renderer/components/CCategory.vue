<template>
    <div style="width:600px;height:560px">
        <div style="width: 200px;height:560px;float:left;margin-right:15px">
            <Icon @click="returnMainModal" style="cursor:pointer;margin-bottom: 10px" size=30 type="md-arrow-round-back" />
            <div style="text-align:left;width:200px;height:520px;padding-left:0px">
                <vuescroll>
                <div v-for="(item, i) in category.categories" :key="i" style="width:200px;height:50px;line-height:60px;cursor: pointer;">
                    <div v-if="i == category.categoriesIndex" style="width:200px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon @click="deleteCategory(i)" size="36" type="md-close-circle" />
                        </div>
                        <div @click="setCategory(i)" style="width:100px;height:50px;display: inline-grid;float: right;">
                            <span style="width:100px;height:50px;line-height:50px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden">
                                {{item.categoryName}}
                            </span>
                        </div>
                    </div>
                    <div v-else style="width:200px;height:50px;line-height:50px;cursor: pointer;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon @click="deleteCategory(i)" size="36" type="md-close-circle" />
                        </div>
                        <div @click="setCategory(i)" style="width:100px;height:50px;display: inline-grid;float: right;">
                            <span style="width:100px;height:50px;line-height:50px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden">
                                {{item.categoryName}}
                            </span>
                        </div>
                    </div>
                </div>
                </vuescroll>
            </div>
        </div>
        <div style="width: 385px;height:560px;float:right;">
            <h3 style="margin-bottom: 10px;text-align:center">类别 </h3>
            <h4 style="margin-bottom: 5px">类别: </h4>
            <Input v-model="category.categoryObj.categoryName" placeholder="请输入一个类别" style="width: 385px;margin-bottom: 15px"/>
            <h4 style="margin-bottom: 5px">icon: </h4>
            <Input readonly=true style="width: 385px;">
                <Icon v-if="icon.iconObj.type == 1" :type=icon.iconObj.icon slot="prefix" />
                <Icon v-if="icon.iconObj.type == 2" :custom=icon.iconObj.icon slot="prefix" />
            </Input>
            <div style="width: 385px;height:350px;margin-bottom: 15px;border-radius:5px;border:#dcdee2 solid 1px">
                <vuescroll>
                    <div style="width: 383px;height:318px;padding:0px 15px">
                        <span v-for="(item, i) in icon.icons" :key="i">
                            <Icon @click="chooseIcon(i)" v-if="item.type == 1" style="margin:5px;cursor: pointer;" size=25 :type=item.icon />
                            <Icon @click="chooseIcon(i)" v-if="item.type == 2" style="margin:5px;cursor: pointer;" size=25 :custom=item.icon  />
                        </span>
                    </div>
                </vuescroll>
            </div>
            <Button type="error" style="float:right;" @click="resetCategory">重置</Button>
            <Button v-if="category.operType == 2" type="success" style="float:right;margin-right:20px" @click="updateCategory">更新</Button>
            <Button v-if="category.operType == 1" type="success" style="float:right;margin-right:20px" @click="addCategory">添加</Button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CCategory",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["category", "icon", "habit", "targetPeriod", "todolist"])
    },
    created() {
        console.log("CCategory created====================================");
        this.getIcons();
    },
    mounted: function() {
        console.log("CCategory mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
            
        }
    },
    methods: {
        returnMainModal(){
            if(this.category.categoryObj.type == 1){
                this.todolist.modalType = 1;
            } else if(this.category.categoryObj.type == 2){
                this.habit.modalType = 1;
            } else {
                this.targetPeriod.modalType = 1;
            }
        },
        chooseIcon(i){
            let icon = this.icon;
            let category = this.category;
            icon.iconsIndex = i;
            let iconObj = icon.icons[i];
            let tempIconObj = JSON.parse(JSON.stringify(iconObj));
            icon.iconObj = tempIconObj;
            category.categoryObj.icon = iconObj.icon;
            category.categoryObj.iconType = iconObj.type;
        },
        getIcons(){
            this.$store.dispatch({
                type: "getIcons"
            })
        },
        setCategory(i){
            let category = this.category;
            category.categoriesIndex = i;
            let tempCategoryObj = JSON.parse(JSON.stringify(category.categories[i]));
            category.categoryObj = tempCategoryObj;
            category.operType = 2;
            let icon = this.icon;
            icon.iconObj.type = category.categoryObj.iconType;
            icon.iconObj.icon = category.categoryObj.icon;
        },

        addCategory(){
            this.$store.dispatch({
                type: "addCategory",
                thisObj: this
            })
        },
        async updateCategory(){
            await this.$store.dispatch({
                type: "updateCategory",
                thisObj: this
            })
            await this.$forceUpdate();
        },
        deleteCategory(index){
            let category = this.category;
            category.categoriesIndex = index;
            this.$store.dispatch({
                type: "deleteCategory",
                thisObj: this
            })
        },
        resetCategory(){
            this.$store.dispatch({
                type: "resetCategory"
            })
            let icon = this.icon;
            icon.iconObj.icon = "";
        },
        test(){
            console.log("test");
        },
        openCategoryModal(index){
            let category = this.category;
            category.categoriesIndex = index;
            if(!category.showCategoryModal){
                category.showCategoryModal = true;
            }
            category.categoryObj = category.categories[category.categoriesIndex];
        }
    }
};
</script>
<style lang='less'>
</style>