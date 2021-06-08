<template>
    <div style="width:1508px;height:900px;margin: 10px 0;border-radius:10px;red;text-align:center;display:inline-block;float: left;">
        <vuescroll ref="vs">
            <div style="width:4800px;height:1800px;border-radius:10px;text-align:center;display:inline-block;float: left;">
                <div style="width: 1200px;height:842px;margin: 0 auto;position: relative;top: 50%;margin-top: -421px;">
                    <!-- <div style="width: 593px;height: 842px;background-color:#EBD98D;display:inline-block;float: left;box-shadow:0px 15px 40px -15px #000;"></div>
                    <div style="width: 593px;height: 842px;background-color:#EBD98D;display:inline-block;float: right;box-shadow:0px 15px 40px -15px #000;"></div> -->
                    <div id="book">
                        <div class="my-page" data-density="hard">
                            Page Cover
                        </div>
                        <div class="my-page" data-density="hard">
                            Page one
                        </div>
                        <div class="my-page" data-density="hard">
                            Page two
                        </div>
                        <div class="my-page" data-density="hard">
                            Page three
                        </div>
                        <div class="my-page" data-density="hard">
                            Page four
                        </div>
                        <div class="my-page" data-density="hard">
                            Last page
                        </div>
                    </div>
                </div>
            </div>
        </vuescroll>
    </div>
</template>
<script>
import vuescroll from 'vuescroll';
import { PageFlip } from 'page-flip';

// const pageFlip = new PageFlip(htmlParentElement, settings);

export default {
    name: 'timebook',
    components: {
        vuescroll
     },
     data() {
        return {
            numValue: 0
        }
    },
    mounted() {
        const pageFlip = new PageFlip(document.getElementById('book'), {
            width: 593, // required parameter - base page width
            height: 842, // required parameter - base page height
            showCover: true,
            startPage: 1,
            drawShadow: false
        });
        pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));

        this.$refs["vs"].scrollTo(
            {
                x: "50%"
            },
            500
        );
        this.$refs["vs"].scrollTo(
            {
                y: 478
            },
            500,
            "easeInQuad"
        );
    },
    methods: {
        rulerNum(value) {
            console.log(value);
        },
    }
    
}
</script>

<style>
.my-page{
    /* width: 593px;height: 842px; */
    background-color:#EBD98D;
    /* display:inline-block; */
    /* float: left; */
    box-shadow:0px 15px 50px -15px #000;
}
  
</style>
