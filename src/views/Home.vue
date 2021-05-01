<template>
  <div id="menu">
    <button @click="$router.push('/kamera')">Kamera</button>
    <button @click="$router.push('/kort')">Kort</button>
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