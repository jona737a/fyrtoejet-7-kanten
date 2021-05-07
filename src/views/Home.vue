<template>
  <div id="menu">
    <h3>Find QR-koderne og besvar spørgsmålene for at vinde!</h3>
    <v-btn 
    rounded
    @click="$router.push('/kamera')">Kamera</v-btn>
    <v-btn 
    rounded
    @click="$router.push('/kort')">Kort</v-btn>
    <div class="illuHome">
      <img src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Soldat.svg?alt=media&token=4e2bf79f-e9b5-4ee9-b23f-eaf95d804a5e" alt="Soldat">
      <img src="https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Heks.svg?alt=media&token=e9869b7e-ad7f-4c3d-966d-2050730d8ebe" alt="Heks">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
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
</style>