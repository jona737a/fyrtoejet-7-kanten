<template>
  <div class="kamera">
    <p class="error"></p>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <img class="kejser" src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Kejser.svg?alt=media&token=e3e281b4-826c-42f2-8320-5e180dede9c7" alt="Kejser">
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
      
      error: ''
    }
  },

  methods: {
    openQuiz(code){
      db.collection('quiz').doc(code).onSnapshot(doc => {
          if(doc.exists) {
          this.checkCompleted(code)
        } else {
          console.log('No match in quiz')
        }
      })
    },
    checkCompleted(code){
        if(!this.userAtt.completed.includes(code)) {
          this.$store.commit('currentQuestUpdate', code)
          this.$router.push('/spoergsmaal');
        } else {
          console.log('Already answered')
        }
    },

    onDecode (result) {
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

<style lang="scss">

.kamera{
  display: flex;
  flex-flow: column;
  align-items: center;
}
.qrcode-stream-wrapper[data-v-9fc2fd96]{
  width: 85vw;
  height: 115vw;
  border:3px solid colors(white);
  padding: 4vw;
  box-sizing: border-box;
  margin-top: 4vw;
}
.error {
  font-weight: bold;
  color: red;
}

.kejser{
  width: 75vw;
  align-self: flex-end;
}
</style>