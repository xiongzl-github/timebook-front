<template>
    <div class="layout">
        <Layout>
            <Header style="padding:0px;height:60px;line-height:60px;background-color:#fff;border-bottom: 1px solid #d7dde4">
                <div style="width:60px;height:60px;display:inline-block">
                    <img style="width:250px;height:60px;display: inline-block" src="../assets/logo.png">
                </div>
                <Menu mode="horizontal" theme="light" active-name="1" style="float: right;background-color:#fff">
                    <MenuItem name="1">
                        <Icon type="ios-paper" />
                        Home
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon type="ios-paper" />
                        DashBoard
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-people" />
                        Setting
                    </MenuItem>
                    <MenuItem name="4">
                        <Icon type="ios-construct" />
                        User
                    </MenuItem>
                </Menu>
            </Header>
            <Layout>
                <Sider class="home-layout-sider" hide-trigger>
                    <Menu @on-select="selectMenuItem" style="width:200px" theme="light">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />目标管理
                            </template>
                            <MenuItem name="目标制定">目标制定</MenuItem>
                            <MenuItem name="目标规划">目标规划</MenuItem>
                            <MenuItem name="目标分析">目标分析</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-paper" />待办管理
                            </template>
                            <MenuItem name="2-1">目标制定</MenuItem>
                            <MenuItem name="2-2">目标规划</MenuItem>
                            <MenuItem name="2-3">目标分析</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-paper" />时间管理
                            </template>
                            <MenuItem name="3-1">目标制定</MenuItem>
                            <MenuItem name="3-2">目标规划</MenuItem>
                            <MenuItem name="3-3">目标分析</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{paddingLeft: '24px'}">
                    <Content :style="{background: '#fff'}">
                        <Tabs v-model="home.tabName" type="card" closable @on-tab-remove="handleTabRemove">
                            <TabPane v-for="(item, index) in home.tabs" :key="index" :name="item" :label="item">
                                <span v-if="item === '目标制定'">
                                    <TargetSetting></TargetSetting>
                                </span>
                                <span v-if="item === '目标规划'">
                                    <TargetPlanning></TargetPlanning>
                                </span>
                                <span v-if="item === '目标分析'">
                                    <TargetAnalysis></TargetAnalysis>
                                </span>
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import "../styles/home.less";
import {mapGetters} from "vuex";
import TargetSetting from './Target/TargetSetting'
import TargetPlanning from './Target/TargetPlanning'
import TargetAnalysis from './Target/TargetAnalysis'
export default {
    name: "home-page",
    components: { TargetSetting, TargetPlanning, TargetAnalysis },
    computed: {
        ...mapGetters(["home"]),
    },
    data() {
        return {
            tab0: true,
        };
    },
    methods: {
        selectMenuItem(name) {
            this.$store.dispatch({
                type: "selectMenuItem",
                name: name
            })
        },
        handleTabRemove(name) {
            
        },
    },
    created() {
        console.log("home created====================================");
    },
    mounted() {
        console.log("home mounted====================================");
    },
};
</script>

<style>
</style>
