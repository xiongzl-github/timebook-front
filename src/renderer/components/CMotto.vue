<template>
    <div style="width:1400px;height:150px;">
        <div style="width:1400px;height:150px;text-align:center">
            <Carousel :dots=inside :radius-dot=true @on-click="openMottoModal" style="background:#364e79;width:1400px;height:150px;" :height=150 :autoplay-speed=2000 :autoplay=true :loop=true >
                <CarouselItem  style="width:1400px;height:150px" v-for="(item, i) in motto.mottos" :key="i">
                    <div style="color: white;width:1400px;height:150px;cursor: pointer;">
                        <h3 style="width:1400px;height:32px;line-height:32px;margin-top:40px;color:#fff">{{item.motto}}</h3>
                        <h4 style="text-align:right;margin-right:50px;margin-top:20px;color:#fff">--- {{item.author}}</h4>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    <!-- <a-carousel>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </a-carousel> -->
        <Modal
                v-model="motto.showMottoModal"
                :title=motto.modalTitle
                :mask-closable=false
                :z-index=9999
                @on-ok="test"
                @on-cancel="test"
                width="945px"
                footer-hide=true>
                <div style="width: 913px;height:600px;">
                    <div style="width: 415px;height:600px;float:left;margin-right:15px">
                        <vuescroll>
                            <div style="text-align:left;width:415px;height:600px;padding-left:0px">
                                <div v-for="(item, i) in motto.mottos" style="width:400px;height:50px;line-height:60px;cursor: pointer;">
                                    <div v-if="i == motto.mottosIndex" style="width:400px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                                            <Icon size="40" type="logo-android" />
                                        </div>
                                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                                            <Icon @click="deleteMotto(i)" size="36" type="md-close-circle" />
                                        </div>
                                        <div @click="setMotto(i)" style="width:300px;height:50px;display: inline-grid;float: right;">
                                            <span style="width:300px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden">
                                                {{item.motto}}
                                            </span>
                                            <span style="width:300px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;text-align:right">
                                                --- {{item.author}}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-else style="width:400px;height:50px;line-height:50px;cursor: pointer;">
                                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                                            <Icon size="40" type="logo-android" />
                                        </div>
                                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:10px 7px;">
                                            <Icon @click="deleteMotto(i)" size="36" type="md-close-circle" />
                                        </div>
                                        <div @click="setMotto(i)" style="width:300px;height:50px;display: inline-grid;float: right;">
                                            <span style="width:300px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden">
                                                {{item.motto}}
                                            </span>
                                            <span style="width:300px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;text-align:right">
                                                --- {{item.author}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </vuescroll>
                    </div>
                    <div style="width: 483px;height:600px;float:right;">
                        <h3 style="margin-bottom: 5px;text-align:center">座右铭 </h3>
                        <h4 style="margin-bottom: 5px">座右铭: </h4>
                        <Input v-model="motto.mottoObj.motto" placeholder="请输入座右铭" style="width: 483px;margin-bottom: 15px"/>
                        <h4 style="margin-bottom: 5px">作者: </h4>
                        <Input v-model="motto.mottoObj.author" placeholder="请输入作者名称" style="width: 483px;margin-bottom: 15px"/>
                        <Button type="error" style="float:right;margin-top:390px" @click="resetMotto">重置</Button>
				        <Button v-if="motto.operType == 2" type="success" style="float:right;margin-top:390px;margin-right:20px" @click="updateMotto">更新</Button>
                        <Button v-if="motto.operType == 1" type="success" style="float:right;margin-top:390px;margin-right:20px" @click="addMotto">添加</Button>
                    </div>
                </div>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
// import { Carousel } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import 'ant-design-vue/lib/carousel/style/css';

export default {
    name: "CMotto",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["motto"])
    },
    created() {
        console.log("CMotto created====================================");
        this.getMottos();
    },
    mounted: function() {
        console.log("CMotto mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
            
        }
    },
    methods: {
        setMotto(i){
            let motto = this.motto;
            motto.mottosIndex = i;
            let tempMottoObj = JSON.parse(JSON.stringify(motto.mottos[motto.mottosIndex]));
            motto.mottoObj = tempMottoObj;
        },
        getMottos(){
            this.$store.dispatch({
                type: "getMottos"
            })
        },
        addMotto(){
            this.$store.dispatch({
                type: "addMotto",
                thisObj: this
            })
        },
        updateMotto(){
            this.$store.dispatch({
                type: "updateMotto",
                thisObj: this
            })
        },
        deleteMotto(index){
            let motto = this.motto;
            motto.mottosIndex = index;
            this.$store.dispatch({
                type: "deleteMotto",
                thisObj: this
            })
        },
        resetMotto(){
            this.$store.dispatch({
                type: "resetMotto"
            })
        },
        test(){
            console.log("test");
        },
        openMottoModal(index){
            let motto = this.motto;
            motto.mottosIndex = index;
            if(!motto.showMottoModal){
                motto.showMottoModal = true;
            }
            motto.mottoObj = motto.mottos[motto.mottosIndex];
        }
    }
};
</script>
<style scoped>
/* .ant-carousel >>> .slick-slide {
  text-align: center;
  height: 150px;
  line-height: 150px;
  width: 1400px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
} */
</style>