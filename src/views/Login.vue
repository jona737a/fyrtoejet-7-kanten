<template>
    <div class="main">
        
        <component v-bind:is="tabStatus"></component>
            <v-btn
        dark
        @click.prevent="changeTab()"
        >{{btnTxt}}</v-btn>
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

