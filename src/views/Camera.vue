<template>
  <div class="kamera">
    <p class="error"></p>
    <qrcode-stream class="live" @decode="onDecode" @init="onInit" />
    <img class="kejser" src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Kejser.svg?alt=media&token=e3e281b4-826c-42f2-8320-5e180dede9c7" alt="Kejser">
    <div class="done" v-if="this.alert == true">
        <div class="resultBox">
            <div>
                <h2>Allerede besvaret</h2>
                <p>Du har allerede svaret på dette spørgsmål</p>
                <p>Find en anden og scan igen</p>
            </div>
            <v-btn @click="$router.push('/')">Gå videre</v-btn>
        </div>
    </div>
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
      error: '',
      alert: false,
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
        if(!this.userAtt.completed.includes(code) && this.userAtt.completed.length <= this.totalQuest + 1 && this.currentTime >= 0) {
          this.$store.commit('currentQuestUpdate', code)
          this.$router.push('/spoergsmaal');
        } else {
          this.alert = true
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
    },
    totalQuest(){
      return this.$store.getters.totalQuest
    },
    currentTime(){
      return this.$store.getters.currentTime
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
.qrcode-stream-wrapper[data-v-9fc2fd96], .live{
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

.alert{
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.432);
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    .resultBox{
        background-color: colors(white);
        height: 100vw;
        width: 100vw;
        box-shadow: shadow();
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
        align-items: center;
        p{
            font-size: 5vw;
            margin-top: 3vw;
            width: 80vw;
        }
        
    }
}
</style>