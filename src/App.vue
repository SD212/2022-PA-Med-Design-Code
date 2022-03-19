<template>
  <div id="app">
    
    <div class='menu'>
        <input type="radio" id="factoring" value="Factoring" v-model="picked" class='checkbox'>
        <label for="factoring">Factoring</label>
        <br>
        <input type="radio" id="trig" value="Trig" v-model="picked" class='checkbox'>
        <label for="trig">Trig</label>
        <br>
        <span>Picked: {{ getPicked() }}</span>
    </div> 

    <!--<Menu />-->
    <Problem v-show="factoring" />
    <TrigProblem v-show="trig" />

  <div>
    {{this.showProblem()}}
  </div>

  </div>
</template>

<script>
import Problem from './components/Problem.vue'
//import Menu from './components/Menu.vue'
import TrigProblem from './components/TrigProblem.vue'


export default {
  name: 'App',
  components: {
    Problem,
    //Menu,
    TrigProblem
  },
  data() {
    return {
      factoring: localStorage.getItem("factoring") == "true",
      trig: localStorage.getItem("trig") == "true",
      picked: "Factoring"
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
    },
    getPicked() {
            /*if (isLocalStorage() ) {
               localStorage.setItem('problemType', this.picked)
            }*/

            localStorage.trig = false
            localStorage.factoring = false

            if (this.picked == "Trig") {
                localStorage.trig = true
            } else {
                localStorage.factoring = true
            }

            localStorage.problemType = this.picked

            return this.picked
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
.menu{
        position: absolute;
        Top: 20 px;
        left: 20 px;
        border: 1px solid black;
        height: 20%;
        width: 12%;
        text-align: left;
        padding:10px;
    }
    .checkbox{
        padding: 10px;
        margin: 10px;
    }
</style>
