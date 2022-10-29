<template>
  <div id="app">
    
    <div class='menu'>
        <input type="radio" id="factoring" value="Factoring" v-model="picked" class='checkbox'>
        <label for="factoring">Factoring Problem</label>
        <br>
        <input type="radio" id="trig" value="Trig" v-model="picked" class='checkbox'>
        <label for="trig">Trig Problem</label>
        <br>
        <input type="radio" id="linear" value="Linear" v-model="picked" class='checkbox'>
        <label for="linear">Linear Problem</label>
        <br>
        <input type="radio" id="system" value="System" v-model="picked" class='checkbox'>
        <label for="system">System of Equations Problem</label>
        <br>
        <input type="radio" id="whiteboard" value="Whiteboard" v-model="picked" class='checkbox'>
        <label for="system">Whiteboard</label>
        <br>
        <br>
        <span>Picked: {{ getPicked() }}</span>
    </div> 

    <!--<Menu />-->
    <Problem v-show="factoring" />
    <TrigProblem v-show="trig" />
    <LinearEquationProblem v-show="linear" />
    <SystemProblem v-show="system" />
    <Whiteboard v-show="whiteboard"/>

  <div>
    {{this.showProblem()}}
  </div>

  </div>
</template>

<script>
import Problem from './components/Problem.vue'
//import Menu from './components/Menu.vue'
import TrigProblem from './components/TrigProblem.vue'
import LinearEquationProblem from './components/LinearEquationProblem.vue'
import SystemProblem from './components/SystemProblem.vue'
import Whiteboard from './components/Whiteboard.vue'


export default {
  name: 'App',
  components: {
    Problem,
    //Menu,
    TrigProblem,
    LinearEquationProblem,
    SystemProblem,
    Whiteboard
  },
  data() {
    return {
      factoring: localStorage.getItem("factoring") == "true",
      trig: localStorage.getItem("trig") == "true",
      linear: localStorage.getItem("linear") == "linear",
      system: localStorage.getItem("system") == "system",
      whiteboard: localStorage.getItem("whiteboard") == "whiteboard",
      picked: "Factoring"
    }
  },
  mounted() {
    if (localStorage.factoring) {
      this.factoring = localStorage.factoring
    } else if (localStorage.trig) {
      this.trig = localStorage.trig
    } else if (localStorage.linear) {
      this.linear = localStorage.linear
    } else if (localStorage.system) {
      this.system = localStorage.system
    } else if (localStorage.whiteboard) {
      this.system = localStorage.whiteboard
    }
  },
  methods: {
    showProblem() {
      console.log("showProblem is called")
      this.falsifyEverything()

      if (localStorage.problemType == "Trig") {
        this.trig = true
      } else if (localStorage.problemType == "Factoring") {
        this.factoring = true
      } else if (localStorage.problemType == "Linear") {
        this.linear = true
      } else if (localStorage.problemType == "System") {
        this.system = true
      } else if (localStorage.problemType == "Whiteboard") {
        this.whiteboard = true
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
    getLinear() {
      this.showProblem()
      return this.linear
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
        },
        falsifyEverything() {
          this.factoring = false;
          this.trig = false;
          this.linear = false;
          this.system = false;
          this.whiteboard = false;
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
.menu {
    position: absolute;
    Top: 20 px;
    left: 20 px;
    border: 1px solid black;
    height: 50%;
    width: 14%;
    text-align: left;
    padding:10px;
    z-index: 950;
}
.checkbox{
    padding: 10px;
    margin: 10px;
    z-index: 950;
}
</style>
