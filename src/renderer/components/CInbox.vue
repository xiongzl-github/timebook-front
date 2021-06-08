<template>
    <div style="width:280px;height:730px;overflow:auto;float:left;display:inline-block;">
        <div style="text-align:left;width:265px;height:70px;line-height:40px;margin-left:15px;font-size:16px;font-weight:bold">
            <h3 style="height:30px;width:265px;text-align:center">
                <Poptip trigger="hover" placement="bottom" width="400">
                    <Icon type="ios-funnel" />
                    <div slot="title">Condition Filter</div>
                    <div style="height: 300px" slot="content">
                        <div style="width:368px;height:50px; line-height:50px;">
                            <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">是否隐藏:</h4>
                            <Select v-model="inbox.condition.display" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=0>是</Option>
                                <Option :value=1>否</Option>
                            </Select>
                        </div>
                        <div style="width:368px;height:50px; line-height:50px;">
                            <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">是否处理:</h4>
                            <Select v-model="inbox.condition.handle" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=1>是</Option>
                                <Option :value=0>否</Option>
                            </Select>
                        </div>
                        <div style="height:32px;width: 368px;margin-top:10px">
                            <Button @click="getInboxs" type="error" style="float: right;">确定</Button>
                        </div>
                    </div>
                </Poptip>
                Inbox
            </h3>
            <span style="float:left;height:32px;width:113px;line-height:32px;margin-right:5px">
                <DatePicker  @on-change="getInboxs" v-model="inbox.handleTime" style="width: 115px;font-size:12px;font-weight:500;" size="small" type="date"></DatePicker>
            </span>
            <span @click="openInboxModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" type="md-stats" /></span>
            <span @click="openInboxModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" type="md-add-circle" /></span>
        </div>
        <div style="width:280px;height:660px;overflow:auto;float:left;display:inline-block;">
            <vuescroll>
            <div style="text-align:left;width:265px;height:660px;padding-left:15px">
                <div v-for="(item, i) in inbox.inboxs" :key="i" style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                    <div v-if="i == inbox.inboxsIndex" style="width:250px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" custom="iconfont iconshoujiliang" />
                        </div>
                        <div @click="handleInbox(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:5px 8px;">
                            <Icon v-if="item.handle == 0" size="34" custom="iconfont iconweiwancheng3" />
                            <Icon v-else size="34" custom="iconfont iconwancheng" />
                        </div>
                        <div @click="openInboxModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span :title="item.remark" style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden;text-overflow: ellipsis;">{{item.remark}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">
                                {{item.createTime}}
                            </span>
                        </div>
                    </div>
                    <div v-else style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" custom="iconfont iconshoujiliang" />
                        </div>
                        <div @click="handleInbox(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:5px 8px;">
                            <Icon v-if="item.handle == 0" size="34" custom="iconfont iconweiwancheng3" />
                            <Icon v-else size="34" custom="iconfont iconwancheng" />
                        </div>
                        <div @click="openInboxModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span :title="item.remark" style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden;text-overflow: ellipsis;">{{item.remark}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">
                                {{item.createTime}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </vuescroll>
        </div>
        <Modal
                v-model="inbox.showInboxModal"
                :title=inbox.modalTitle
                :mask-closable="false"
                :z-index=9999
                @on-ok="addOrUpdateInbox"
                @on-cancel="closeInboxModal">
                <div style="width:490px">
                    <h3 style="margin-bottom: 5px;width:56px;display: inline-block;float: left;"></h3>
                    <h3 style="width: 378px;margin-bottom: 5px;text-align:center;display: inline-block;">INBOX</h3>
                    <Switch v-model="inbox.inboxObj.display" style="float: right;" size="large">
                        <span slot="close">隐藏</span>
                        <span slot="open">公开</span>
                    </Switch>
                </div>
                <h3 style="margin-bottom: 5px">事项: </h3>
                <Input v-model="inbox.inboxObj.remark" placeholder="请输入一个事项"
                        style="width: 490px;margin-bottom: 15px"/>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
import { format } from 'date-fns';

let formatStr = "yyyy-MM-dd HH:mm:SS";
// import * as util from "@/store/util/util";

export default {
    name: "CInbox",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["inbox"])
    },
    created() {
        console.log("CInbox created====================================");
        this.getInboxs();
    },
    mounted: function() {
        console.log("CInbox mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
        };
    },
    methods: {
        async handleInbox(i){
            let inbox = this.inbox;
            inbox.inboxsIndex = i;
            await this.$store.dispatch({
                type: "handleInbox"
            })
            await this.$forceUpdate();
        },
        getInboxs(){
            this.$store.dispatch({
                type: "getInboxs"
            })
        },
        chooseInbox(i){
            this.inbox.inboxsIndex = i;
            this.inbox.id = this.inbox.inboxs[i].id;
            this.getElementsByInboxId();
        },
        getElementsByInboxId(){
            this.$store.dispatch({
                type: "getElementsByInboxId"
            })
        },
        openInboxModal(operType, index){
            let inbox = this.inbox;
            inbox.showInboxModal = true;
            inbox.operType = operType;
            inbox.modalTitle = "添加事项";
            if(operType == 2){
                inbox.modalTitle = "更新事项";
                inbox.inboxsIndex = index;
                let tempObj = JSON.parse(JSON.stringify(inbox.inboxs[index]));
                inbox.inboxObj = tempObj;
            }
        },
        addOrUpdateInbox(){
            if(this.inbox.operType == 1) {
                this.addInbox();
            } else {
                this.updateInbox();
            }
        },
        addInbox(){
            this.$store.dispatch({
                type: "addInbox",
                thisObj: this
            })
        },
        updateInbox(){
            this.$store.dispatch({
                type: "updateInbox",
                thisObj: this
            })
        },
        deleteInbox(i){
            this.inbox.inboxsIndex = i;
            this.$store.dispatch({
                type: "deleteInbox",
                thisObj: this
            })
        },
        closeInboxModal(){
            let tempObj = JSON.parse(JSON.stringify(this.inbox.oriInboxObj));
            this.inbox.inboxObj = tempObj;
        },
        test(){
            console.log("test");
        }
    }

};
</script>
<style lang='less'>
</style>