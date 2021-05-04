<template>
  <div id="menu">
    <v-btn 
    rounded
    to="/kamera">Kamera</v-btn>
    <v-btn 
    rounded
    to="/kort">Kort</v-btn>
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
}
</style>