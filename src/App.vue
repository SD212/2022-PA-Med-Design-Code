<template>
  <div id="app">
    
    <Menu/>
    <Problem v-if="factoring" />
    <div v-show="trig">
      Trig Problem
    </div>
      
  </div>
</template>

<script>
import Problem from './components/Problem.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Problem,
    Menu,
  },
  data() {
    return {
      factoring: localStorage.getItem("factoring"),
      trig: localStorage.getItem("trig")
    }
  },
  mounted() {
    if (localStorage.factoring) {
      this.factoring = localStorage.factoring
    } else if (localStorage.trig) {
      this.trig = localStorage.trig
    }
  },
  methods: {
    showProblem() {
      console.log("showProblem is called")
      this.factoring = false
      this.trig = false

      if (localStorage.problemType == "Trig") {
        this.trig = true
      } else {
        this.factoring = true
      }

    },
    getFactoring() {
      this.showProblem()
      return this.factoring
    },
    getTrig() {
      this.showProblem()
      return this.trig
    }
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
