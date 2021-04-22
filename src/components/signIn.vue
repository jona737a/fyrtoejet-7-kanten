<template>
    <div>
        <h1>Sign In</h1>
        <v-text-field
        required
        label="Email"
        v-model="email"
        background-color="text"
        class="formField"
        placeholder="Email"
        solo> </v-text-field>
        <v-text-field
        required
        label="Password"
        v-model="password"
        background-color="text"
        class="formField"
        placeholder="Password"
        solo> </v-text-field>
        <v-btn
        dark
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