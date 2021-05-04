<template>
    <div>
        <v-text-field
        required
        label="Email"
        v-model="email"
        class="formField"
        placeholder="Email"
        type="email"
        solo> </v-text-field>


        <v-text-field
        required
        type="password"
        label="Password"
        v-model="password"
        class="formField"
        placeholder="Password"
        solo> </v-text-field>

        <v-btn
        class="loginBtn"
        tile
        block
        @click.prevent="signUp()"
        >Log In</v-btn>
    </div>
</template>

<script>
//import fb from 'firebase/app'
import 'firebase/auth'

export default {
    data(){
        return{
            email: '',
            password: '',
        }
    },

    methods:{
 

        /*signIn(){
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log('Login')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        },*/
        
        
    }
        
}
</script>

<style lang="scss">
.v-text-field{
    margin: 0 6vw !important;
}
.loginBtn{
    background: colors(error) !important;
    color: colors(white) !important;
}
</style>