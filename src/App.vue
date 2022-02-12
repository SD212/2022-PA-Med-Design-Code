<template>
  <div id="app">
 
    <Problem/>
  </div>
</template>

<script>
import Problem from './components/Problem.vue'

export default {
  name: 'App',
  components: {
    Problem
  }
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
