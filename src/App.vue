<template>
  <div id="app">
    <div class='title-banner'>
      ArithMagic
    </div>
    <div class='menu'> <!-- This creates the menu. It contains the checkboxes to choose which type of problem to make. Each label and input is a checkbox-->
        <input type="radio" id="factoring" value="Factoring" v-model="picked" class='checkbox' v-on:change="setFactoring">
        <label for="factoring">Factoring Problem</label>
        <br>
        <input type="radio" id="trig" value="Trig" v-model="picked" class='checkbox' v-on:change="setTrig">
        <label for="trig">Trig Problem</label>
        <br>
        <input type="radio" id="linear" value="Linear" v-model="picked" class='checkbox' v-on:change="setLinear">
        <label for="linear">Linear Equation Problem</label>
        <br>
        <input type="radio" id="system" value="System" v-model="picked" class='checkbox' v-on:change="setSystem">
        <label for="system">System of Equations Problem</label>
        <br>
        <input type="radio" id="quadratic" value="Quadratic" v-model="picked" class='checkbox'>
        <label for="quadratic">Quadratic Problem</label>
        <br>
        <input type="radio" id="powerDeriv" value="Power Rule Derivative" v-model="picked" class='checkbox'>
        <label for="powerDeriv">Power Rule Derivative Problem</label>
        <br>
        <input type="radio" id="powerInt" value="Power Rule Integral" v-model="picked" class='checkbox'>
        <label for="powerInt">Power Rule Integral Problem</label>
        <br>
        <input type="radio" id="whiteboard" value="Whiteboard" v-model="picked" class='checkbox'>
        <label for="whiteboard">Whiteboard</label>
        <br>
        <br>
        <span>Picked: {{ getPicked() }}</span>
    </div> 

    <!-- Displays all the problems -->
    <Problem v-show="factoring" />
    <TrigProblem v-show="trig" />
    <LinearEquationProblem v-show="linear" />
    <SystemProblem v-show="system" />
    <Quadratic v-show="quadratic" />
    <PowerRuleDeriv v-show="powerDeriv" />
    <PowerRuleInt v-show="powerInt" />
    <Whiteboard v-show="whiteboard"/>

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
import Quadratic from './components/Quadratic.vue'
import PowerRuleDeriv from './components/PowerRuleDeriv.vue'
import PowerRuleInt from './components/PowerRuleInt.vue'
import Whiteboard from './components/Whiteboard.vue'

export default {
  name: 'App',
  components: {
    Problem,
    TrigProblem,
    LinearEquationProblem,
    SystemProblem,
    Quadratic,
    PowerRuleDeriv,
    PowerRuleInt,
    Whiteboard
  },
  data() {
    return { // retuns the option selected for the checkboxes. Localstorage is used to store these preferences.
      factoring: localStorage.getItem("factoring") == "true",
      trig: localStorage.getItem("trig") == "true",
      linear: localStorage.getItem("linear") == "linear",
      system: localStorage.getItem("system") == "system",
      quadratic: localStorage.getItem("quadratic") == "quadratic",
      powerDeriv: localStorage.getItem("powerDeriv") == "powerDeriv",
      powerInt: localStorage.getItem("powerInt") == "powerInt",
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
      this.system = localStorage.system;
    } else if (localStorage.quadratic) {
      this.quadratic = localStorage.quadratic;
    } else if (localStorage.powerDeriv) {
      this.powerDeriv = localStorage.powerDeriv;
    } else if (localStorage.powerInt) {
      this.powerInt = localStorage.powerInt;
    } else if (localStorage.whiteboard) {
      this.whiteboard = localStorage.whiteboard
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
      } else if (localStorage.problemType == "Quadratic") {
        this.quadratic = true;
      } else if (localStorage.problemType == "Power Rule Derivative") {
        this.powerDeriv = true;
      } else if (localStorage.problemType == "Power Rule Integral") {
        this.powerInt = true;
      } else if (localStorage.problemType == "Whiteboard") {
        this.whiteboard = true
      }
    },
    getPicked() { // it returns the slelected problem type
        localStorage.problemType = this.picked;
        return this.picked;
        },
    setFactoring() {
      this.falsifyEverything()
      this.factoring = true;
    },
    setTrig() {
      this.falsifyEverything()
      this.trig = true
    },
    falsifyEverything() {
      this.factoring = false;
      this.trig = false;
      this.linear = false;
      this.system = false;
      this.whiteboard = false;
      this.quadratic = false;
      this.powerDeriv = false;
      this.powerInt = false;
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
@keyframes banner-animation {
  0%    { background: rgb(5, 230, 211); }
  50%  { background:rgb(5, 230, 121); }
  100%    { background: rgb(5, 230, 211); }
}
.title-banner{
  padding: 10px;
  margin: 50px;
  border: 1px solid black;
  font-size: 40px;
  text-decoration: underline;
  font-weight: bold;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: rgb(5, 230, 196);
  border-width: 5px;  
  box-shadow:black;
  background-image: linear-gradient(35deg, rgb(5, 230, 211), rgb(5, 230, 121));
  border-radius: 10px;
  animation: banner-animation 20s linear infinite;


}

.menu{ /* styles the menu to be a box in the top left corner */
        position: absolute;
        top: 154px;
        left: 60px;
        /* margin: 20px; */
        border: 1px solid black;
        height: 35%;
        width: 20%;
        text-align: left;
        padding:10px;
        background: rgb(5, 230, 196);
        border-radius: 10px;
        border-width: 5px;
        font-weight: bold;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 15px;
        animation: banner-animation 20s linear infinite;

    }
    .checkbox{
        padding: 10px;
        margin: 10px;
    }
</style>
