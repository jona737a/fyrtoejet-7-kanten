<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <p v-if="userAtt">{{this.timer}}</p>
      <v-btn
        class="ml-3"
        v-if="currentUser" 
        color="text"
        @click="signOut()">
          Sign Out
        </v-btn>
    </div>
    <router-view />
  </div>
</template>

<script>
import {} from '/firebase.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import store from '../src/store/index.js'


firebase.auth().onAuthStateChanged(function(user){
  if (user){
    store.dispatch('setUser', user)
  }
  else{
    store.dispatch('setUser', null)
  }
}); 

export default {
  data(){
    return{
      timer: firebase.firestore.Timestamp.now()
    }
  },
  methods:{
    signOut(){
      firebase.auth().signOut().then(() => {
        alert('Logged out')
        this.$router.replace('/')
      }).catch(function(error) {
        console.log(error)
      });
    },
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    userAtt(){
      return this.$store.getters.userAtt
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
