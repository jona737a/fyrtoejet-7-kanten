<template>
  <div id="main">
    <div id="nav">
      <router-link to="/" tag="button">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <p>{{this.minutes}}:{{this.seconds}}</p>
      <button
        
        v-if="currentUser" 
        @click="signOut()">
          Sign Out
        </button>
        <button
        @click="resetTimer()">
          Reset Timer
        </button>
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
      timer: null,
      timerStart: 1619272138,
    }
  },
  created(){
    this.countdown()
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
    countdown(){
      setInterval(() => this.timer = this.timerStart - firebase.firestore.Timestamp.now().seconds, 1000)
    },
    resetTimer(){
      this.timerStart = firebase.firestore.Timestamp.now().seconds + 1800
    },
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    userAtt(){
      return this.$store.getters.userAtt
    },
    minutes(){
      var minutes = Math.floor(this.timer / 60)
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return minutes
    },
    seconds(){
      var seconds = Math.floor(this.timer % 60)
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return seconds
    }
  }
}
</script>

<style lang="scss">
@import 'src/scss/variables.scss';
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(colors(tertiary), colors(white));
  height: 100vh;
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
button{
  padding: 4vw;
  border-radius: 15vw;
  background-color: colors(primary) !important;
  width: 60vw;
  box-shadow: shadow();
}
</style>
