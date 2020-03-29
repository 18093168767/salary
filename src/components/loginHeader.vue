<template>
    <div class="flex" style="height:50px;line-height:50px;background:#fff">
        <div></div>
        <div>
            <span style="padding-right:20px;">欢迎， {{account}}</span>
            <span style="cursor: pointer;" @click="logout()">退出</span>
        </div>
    </div>
</template>
 
<script>
import store from '@/store'
    export default {
        name:"loginHeader",
        data() {
            return {
                account:null
            }
        },
          mounted() {
            var that = this;
            that.account = this.$store.state.userInfo.account
        },
        methods: {
            logout(){
            var that = this;
               that.$router.push("./login"); 
            }
        }
    }
</script>
<style>
    .flex{
        padding:0 20px;
        display: flex;
        justify-content: space-between;
        color:#909399;
        
    }
</style>