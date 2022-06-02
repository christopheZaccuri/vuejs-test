

<script>
import electrisCalculator from './components/calculator/electrisCalculator.vue'


export default {
  name: 'App',
  components: {
    'electriscalculator' : electrisCalculator
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template>
  <div>
    <electriscalculator />
  </div>
</template>