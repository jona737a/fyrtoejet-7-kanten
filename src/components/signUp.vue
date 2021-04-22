<template>
    <div class="main">
        <h1>Sign Up</h1>
        <v-text-field
        required
        label="Navn"
        v-model="navn"
        background-color="text"
        class="formField"
        placeholder="Navn"
        solo> </v-text-field>
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
        <v-btn dark
        @click="signUp"
        >Opret profil</v-btn>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const db = firebase.firestore();


export default {
    data(){
        return{
            email: '',
            password: '',
            navn: '',
        }
    },

    methods:{
        signUp(){
            
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {

                db.collection('brugere').doc(this.email).set({
                    navn: this.navn,
                    email: this.email,
                    point:0,
                    completed: [""]
                })
            
                this.$router.push('/');

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
    },
    
        
}
</script>

<style scoped>

</style>