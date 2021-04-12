<template>
    <div>
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
        color="secondary"
        @click.prevent="signUp()"
        >Log In</v-btn>
    </div>
</template>

<script>
import fb from 'firebase/app'
import 'firebase/auth'

export default {
    data(){
        return{
            email: '',
            password: '',
        }
    },

    methods:{
 
        signUp(){
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password'){
                    alert ("Wrong password")
                }else{
                    alert (errorMessage)
                }
                console.log(error)
            });
        }
    }
        
}
</script>