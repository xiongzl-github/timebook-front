<template>
    <div style="width:100%;height:64px;line-height:64px;background-color:#fff">
        <div style="width:auto;height:64px;display:inline-block;float:right;font-weight:500;color:black">
            <Menu style="font-weight:bolder" @on-select="switchMenu" mode="horizontal" theme="light" :active-name="home.activeName">
                <MenuItem to="/home" name="home">
                    <Icon type="ios-home" />
                    Home
                </MenuItem>
                <MenuItem to="/home/timebook" name="timebook">
                    <Icon type="md-stats" />
                    TimeBook
                </MenuItem>
                <MenuItem to="/home/time_corridor" name="time_corridor">
                    <Icon type="md-stats" />
                    TimeCorridor
                </MenuItem>
                <MenuItem to="/home/shop" name="shop">
                    <Icon type="md-stats" />
                    Shop
                </MenuItem>
            </Menu>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "CHeader",
    components: {},
    computed: {
        ...mapGetters(["home"])
    },
    created() {
        console.log("CHeader created====================================");
    },
    mounted: function() {
        console.log("CHeader mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
        };
    },
    methods: {
        switchMenu: function(name){
            console.log("switchMenu");
            console.log(name);
        },
        test(){
            console.log("test");
        }
    }

};
</script>
<style lang='less'>
</style>