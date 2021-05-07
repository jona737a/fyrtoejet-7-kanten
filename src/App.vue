<template>
  <div id="main">
    <div id="nav" v-if="this.currentUser">
      <router-link to="/"> <v-icon large>mdi-arrow-left-thick</v-icon></router-link>
      <p>{{this.minutes}}:{{this.seconds}}</p>
      
      
      <div
        rounded
        v-if="currentUser" 
        @click="signOut()">
          Log ud
        </div>

        
    </div>
    <!--<v-btn
        
        @click="resetTimer()">
          Reset Timer
    </v-btn>-->
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
        this.$router.replace('/login')
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#main {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(colors(tertiary), colors(white));
  height: 100vh;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a{
    text-decoration: none;
  }
  p{
    position: absolute;
    left: 44.3vw;
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
