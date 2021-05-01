<template>
  <div id="app">
  <p>
    Seneste resultater: <b>{{ currentQuest }}</b>
  </p>

  <p class="error">
    
  </p>

  <qrcode-stream @decode="onDecode" @init="onInit" />
</div>
</template>

<script>
import { QrcodeStream} from 'vue-qrcode-reader'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const db = firebase.firestore();

export default {
  components: {
    QrcodeStream,
  },

  data () {
    return {
      currentQuest: '',
      error: ''
    }
  },

  methods: {
    openQuiz(code){
      db.collection('quiz').doc(code).onSnapshot(doc => {
          if(doc.exists) {
          console.log('Quizcheck')
          this.checkCompleted(code)
        } else {
          console.log('No match in quiz')
        }
      })
    },
    checkCompleted(code){
        if(!this.userAtt.completed.includes(code)) {
          console.log('Usercheck')
          this.currentQuest = code
          this.$store.commit('currentQuestUpdate', code)
          this.$router.push('/spoergsmaal');
        } else {
          console.log('Already answered')
        }
    },

    onDecode (result) {
      console.log('læser')
      this.openQuiz(result)
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "FEJL: Der er ikke givet adgang til kameraet"
        } else if (error.name === 'NotFoundError') {
          this.error = "FEJL: Der er ikke et kamera på denne enhed" 
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "FEJL: Er kameraet allerede i brug?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "FEJL: Kameraet virker ikke sammen med dette program"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  },
  computed:{
    currentUser(){
      return this.$store.getters.currentUser
    },
    userAtt(){
      return this.$store.getters.userAtt
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>