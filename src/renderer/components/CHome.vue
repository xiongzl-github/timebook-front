<template>
    <div style="margin:0 auto;width:100%;height:100%">
        <div style="margin: 0 auto;width:1400px;height:150px;">
            <div id="motto" style="width:1400px;height:150px;">
                <CMotto></CMotto>
            </div>
        </div>
        <div style="margin: 0 auto;width:1400px;height:730px;">
            <div id="emotion" style="width:280px;height:730px;overflow:auto;float:left;display:inline-block">
                <CInbox></CInbox>
            </div>
            <div id="target" style="width:280px;height:730px;overflow:auto;float:left;display:inline-block">
                <CTargetPeriod></CTargetPeriod>
            </div>
            <div id="todolist" style="width:280px;height:730px;overflow:auto;float:left;display:inline-block">
                <CTodolist></CTodolist>
            </div>
            <div id="timeline" style="width:280px;height:730px;overflow:auto;float:left;display:inline-block">
                <CTimeline></CTimeline>
            </div>
            <div id="habit" style="width:280px;height:730px;overflow:auto;float:left;display:inline-block">
                <CHabit></CHabit>
            </div>
        </div>
    </div>
</template>
<script>
	import {mapGetters} from "vuex";
    import CTargetPeriod from '@/components/CTargetPeriod';
    import CTodolist from '@/components/CToDoList';
    import CTimeline from '@/components/CTimeline';
    import CInbox from '@/components/CInbox';
    import CHabit from '@/components/CHabit';
    import CHeader from '@/components/CHeader';
    import CMotto from '@/components/CMotto';
    import types from "@/store/types.js";

	export default {
		computed: {
			...mapGetters(["home"])
		},
        components: { CHeader, CTargetPeriod, CMotto, CTodolist, CTimeline, CInbox, CHabit },
		inject: ['reload'],
		data() {
			return {
			}
		},
		methods: {
            test: function(){
                console.log("test");
            }
		},
		mounted: function () {
            console.log("Home mounted...");
		},
		created: function () {
            console.log("Home created...");
            this.$Message.config({top: 300, duration: 3});
		}
	}
</script>
<style scoped>
</style>
