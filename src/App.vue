<template>
  <div id="main">
    <div id="nav" v-if="this.currentUser">
      <div
        class="logout"
        rounded
        v-if="currentUser" 
        @click="signOut()">
          Log ud
        </div>
      <p @click="resetTimer()">{{this.minutes}}:{{this.seconds}}</p>
      <router-link to="/" v-if="$router.history.current['path'] != '/'"> <v-icon large>mdi-arrow-left-thick</v-icon></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import {} from '/firebase.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import store from '../src/store/index.js'
const db = firebase.firestore();

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
      timerStart: null,
    }
  },
  created(){
    db.collection('timer').doc('start').onSnapshot(doc =>{
        this.timerStart = doc.data().timerStart
    })
    this.countdown()
  },
  methods:{
    signOut(){
      firebase.auth().signOut().then(() => {
        alert('Logged out')
        this.$router.replace('/login')
      }).catch(function(error) {
        console.log(error)
      });
    },
    countdown(){
      setInterval(() => this.timer = this.timerStart - firebase.firestore.Timestamp.now().seconds, 1000)
    },
    resetTimer(){
      db.collection('timer').doc('start').set({
        timerStart: firebase.firestore.Timestamp.now().seconds + 1800
      })
    },
  },
  computed: {
    minutes(){
      var minutes = Math.floor(this.timer / 60)
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return minutes
    },
    seconds(){
      var seconds = Math.floor(this.timer % 60)
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return seconds
    },
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
@import 'src/scss/variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

p{
  font-size: 4vw;
}

h1{
  font-size: 9vw;
  color: colors(secondary);
}

h2{
  font-size: 7vw;
}

h3{
  font-size: 5vw;
}

#main {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(colors(tertiary), colors(white));
  height: 100vh;
  position: relative;
  z-index: 2;
}

#nav {
  padding: 3vh 7vw;
  display: flex;
  flex-flow: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 10vh;
  position: relative;
  z-index: 4;
  a{
    text-decoration: none;
  }
  p{
    position: absolute;
    left: 46vw;
    font-size: 5vw;
  }
  .logout{
    font-size: 5vw;
  }
}
button{
  padding: 4vw;
  border-radius: 15vw !important;
  background-color: colors(primary) !important;
  text-transform: capitalize !important;
  font-weight: 600 !important;
  width: 60vw;
  box-shadow: shadow();
}
</style>
