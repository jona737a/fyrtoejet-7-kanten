<template>
    <div class="main">
        <img class="logo" src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Fyrt%C3%B8jet.svg?alt=media&token=86eb4b7d-315e-4110-ba1d-1cccb22cb332" />
            
        
        <v-btn
        rounded
        @click.prevent="changeTab()"
        >{{btnTxt}}</v-btn>
        
        <div class="form">
            <component v-bind:is="tabStatus"></component>
        </div>
        
            
    </div>
</template>

<script>

import signIn from "@/components/signIn.vue"
import signUp from "@/components/signUp.vue"

export default {
    components: {
        signIn,
        signUp,
    },
    data(){
        return{
            tabStatus: "signUp",
            btnTxt: "Login"
        }
    },
    methods:{
        changeTab(){
            if (this.tabStatus == "signIn") {
                this.tabStatus = "signUp",
                this.btnTxt = "Login"
            }else if(this.tabStatus == "signUp"){
                this.tabStatus = "signIn",
                this.btnTxt = "Opret ny profil"
            }
        }
    },
    computed:{
        
    }
}
</script>

<style lang="scss">
.main{
    display: flex;
    align-items: center;
    flex-flow: column;
}

.form{
    width: 90vw;
    background-color: colors(white);
    padding: 7vw 0;
    border-radius: 6vw;
    margin-top: 7vw;
    box-shadow: shadow();
}

.logo{
    width: 80vw;
    margin: 20vw 0 10vw 0;  
}
</style>
