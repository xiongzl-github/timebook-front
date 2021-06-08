<template>
    <div style="width:100%;height:100%;">
         <CHeader></CHeader>
         <CNav></CNav>
         <CContent></CContent>
         <!-- <CStyle></CStyle> -->
    </div>
</template>
<script>
import CHeader from '@/components/timebook/CHeader';
import CNav from '@/components/timebook/CNav';
import CStyle from '@/components/timebook/CStyle';
import CContent from '@/components/timebook/CContent';


export default {
    name: 'timebook',
    components: {
        CHeader,
        CNav,
        CStyle,
        CContent
     },
     data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style>

  
</style>
