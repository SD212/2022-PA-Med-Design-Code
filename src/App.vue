<template>
  <div id="app">
    
    <div class='menu'> <!-- This creates the menu. It contains the checkboxes to choose which type of problem to make. Each label and input is a checkbox-->
        <input type="radio" id="factoring" value="Factoring" v-model="picked" class='checkbox'>
        <label for="factoring">Factoring Problem</label>
        <br>
        <input type="radio" id="trig" value="Trig" v-model="picked" class='checkbox'>
        <label for="trig">Trig Problem</label>
        <br>
        <input type="radio" id="linear" value="Linear" v-model="picked" class='checkbox'>
        <label for="linear">Linear Equation Problem</label>
        <br>
        <input type="radio" id="system" value="System" v-model="picked" class='checkbox'>
        <label for="system">System of Equations Problem</label>
        <br>
        <br>
        <span>Picked: {{ getPicked() }}</span>
    </div> 

    <!-- Displays all the problems -->
    <Problem v-show="factoring" />
    <TrigProblem v-show="trig" />
    <LinearEquationProblem v-show="linear" />
    <SystemProblem v-show="system" />

  <div>
    {{this.showProblem()}}
  </div>

  </div>
</template>

<script>
import Problem from './components/Problem.vue'
import TrigProblem from './components/TrigProblem.vue'
import LinearEquationProblem from './components/LinearEquationProblem.vue'
import SystemProblem from './components/SystemProblem.vue'

export default {
  name: 'App',
  components: {
    Problem,
    TrigProblem,
    LinearEquationProblem,
    SystemProblem
  },
  data() {
    return { // retuns the option selected for the checkboxes. Localstorage is used to store these preferences.
      factoring: localStorage.getItem("factoring") == "true",
      trig: localStorage.getItem("trig") == "true",
      linear: localStorage.getItem("linear") == "linear",
      system: localStorage.getItem("system") == "system",
      picked: "Factoring"
    }
  },
  mounted() { // Checks the localstorage to see what the user has selected in the past for the checkboxes and updates the menu with the correct selection.
    if (localStorage.factoring) {
      this.factoring = localStorage.factoring;
    } else if (localStorage.trig) {
      this.trig = localStorage.trig;
    } else if (localStorage.linear) {
      this.linear = localStorage.linear;
    } else if (localStorage.system) {
      this.system = localStorage.system;
    }
  },
  methods: {
    showProblem() { // This sets all the problem types in the local storage to false so a new choice can be made
      this.falsifyEverything();

      if (localStorage.problemType == "Trig") {
        this.trig = true;
      } else if (localStorage.problemType == "Factoring") {
        this.factoring = true;
      } else if (localStorage.problemType == "Linear") {
        this.linear = true;
      } else if (localStorage.problemType == "System") {
        this.system = true;
      }
    },
    getPicked() { // it returns the slelected problem type
        localStorage.problemType = this.picked;
        return this.picked;
        },
    falsifyEverything() { // Makes all the variables false so a new choice can be selected.
        this.factoring = false;
        this.trig = false;
        this.linear = false;
        this.system = false;
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
.menu{ /* styles the menu to be a box in the top left corner */
        position: absolute;
        Top: 20 px;
        left: 20 px;
        border: 1px solid black;
        height: 30%;
        width: 20%;
        text-align: left;
        padding:10px;
        z-index: -1;
    }
    .checkbox{
        padding: 10px;
        margin: 10px;
    }
</style>
