<template>
  <div id="menu">
    <h3>Find QR-koderne og besvar spørgsmålene for at vinde!</h3>
    <v-btn 
    rounded
    @click="$router.push('/kamera')">Kamera</v-btn>
    <v-btn 
    rounded
    @click="$router.push('/kort')">Kort</v-btn>
    <v-btn 
    rounded
    @click="$router.push('/pointtavle')">Pointtavle</v-btn>
    <h3>Du har svaret på {{this.answered}} ud af {{this.totalQuest}} spørgsmål</h3>
    <div class="illuHome">
      <img src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Soldat.svg?alt=media&token=4e2bf79f-e9b5-4ee9-b23f-eaf95d804a5e" alt="Soldat">
      <img src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Heks.svg?alt=media&token=e9869b7e-ad7f-4c3d-966d-2050730d8ebe" alt="Heks">
    </div>
    <div class="done" v-if="this.answered >= this.totalQuest">
        <div class="resultBox">
            <div>
                <h2>Tillykke</h2>
                <p>Du har svaret på alle spørgsmål</p>
                <p>Åben pointtavlen for at se om du har vundet</p>
            </div>
            <v-btn @click="$router.push('/pointtavle')">Gå videre</v-btn>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answered: 0
    }
  },
  mounted(){
      this.answered = this.userAtt.completed.length - 1
  },
  computed: {
    userAtt(){
      return this.$store.getters.userAtt
    },
    totalQuest(){
      return this.$store.getters.totalQuest
    },
  },
  
}
</script>

<style lang="scss">
@import 'src/scss/variables.scss';
#menu{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  h3{
    margin-bottom: 10vw;
    width: 90vw;
    color: colors(secondary);
  }
  .v-btn{
    font-size: 5vw;
    font-weight: 600;
    text-transform: capitalize;
    padding-top: 7vw !important;
    padding-bottom: 7vw !important;
    margin: 5vw;
  }
}

.illuHome{
  width: 100vw;
  display: flex;
  justify-content: space-between;
  margin-top: 10vw;
  img{
    width: 30vw;
  }
}

.done{
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