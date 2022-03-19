
<template>
    <div class="probem">
        <button v-on:click="createProblem" class="problem-button">Generate Problem</button>
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button>
        
        <vue-mathjax :formula="formula"></vue-mathjax>
        <br>
    
    <div class="submit-block" >
        <input v-model="uinput1" placeholder="sol 1" type="number" style=margin:10px>
        <input v-model="uinput2" placeholder="sol 2" type="number" style=margin:10px>
        <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button>
        <h1 v-show="correct" class="correct-banner">Correct!</h1>
        <h1 v-show="incorrect" class="incorrect-banner">incorrect</h1>
    </div>
    
    
    <Hint v-if="displayHint1" v-bind:description='hintContent1' />
    
    <Hint v-if="displayHint2" v-bind:description='hintContent2'/>
    
    <Hint v-if="displayHint3" v-bind:description='hintContent3'/>
    
    <Hint v-if="displayHint4" v-bind:description='hintContent4'/>


    </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import Hint from './Hint.vue'

export default {
    name: 'Problem',
    props: {

    },
    data() {
            return {
                problem: '',
                formula: "",
                count: 0,
                uinput1: null,
                uinput2: null,
                correct: false,
                incorrect: false,
                bVal: 0,
                cVal: 0,
                sol1: 0,
                sol2: 0,
                displayHint1: false,
                displayHint2: false,
                displayHint3: false,
                displayHint4: false,
                hintContent1: null,
                hintContent2: null,
                hintContent3: null,
                hintContent4: null,
                displayHintButton: null,
                numHint: 1,
                isDisabled: false,

            }
    },
    components: {
        Hint,
        'vue-mathjax': VueMathjax
    },
    methods: {
        createProblem() {
            var randomSol1 = Math.floor(Math.random() * (25) - 12);
            var randomSol2 = Math.floor(Math.random() * (25) - 12);
            this.sol1 = -randomSol1;
            this.sol2 = -randomSol2;
            this.problem = this.makeform(randomSol1, randomSol2);
            this.formula = this.problem

            this.correct = false;
            this.incorrect = false;
            this.displayHintButton = true;
            this.numHint = 1;
            this.displayAllHints(false)
            this.isDisabled = false;            
        },
        makeform(sol1, sol2) {
            var bVal = sol1 + sol2;
            var cVal = sol1 * sol2;
            this.bVal = bVal;
            this.cVal = cVal;
            
            this.makeHints()
            return "$$x^2 + " + bVal + "x + " + cVal + " = 0$$";

        },
        submitMethod() {
            if (this.uinput1 == this.sol1 && this.uinput2 == this.sol2) {
                this.correct = true;
                this.incorrect=false;
                this.isDisabled = true;
            } else if (this.uinput1 == this.sol2 && this.uinput2 == this.sol1) {
                this.correct = true;
                this.incorrect=false;
                this.isDisabled = true;
            } else {
                this.incorrect=true;
            }
            
            if (this.correct) {
                this.displayAllHints(true)
            } 


      },
      makeHints() {
            var sol1 = this.sol1
            var sol2 = this.sol2;
            //var b = sol1 + sol2;
            var c = sol1 * sol2
            var b = sol1 + sol2

          this.hintContent1 = '$$c = ' + c + ' = ' + sol1 + ' * ' + sol2 + '$$'
          this.hintContent2 = '$$b = ' + b + ' = ' + sol1 + ' + ' + sol2 + '$$'
          this.hintContent3 = '$$(x + ' + sol1 * -1 + ')' + '(x + ' + sol2 * -1 + ')$$'
          this.hintContent4 = '$$x = ' + sol1 + ', ' + sol2 + '$$'
      },
      displayAllHints(show) {
            this.displayHint1 = show;
            this.displayHint2 = show;
            this.displayHint3 = show;
            this.displayHint4 = show;
      },
      displayHints() {
          switch (this.numHint) {
                case 1:
                    this.displayHint1 = true;
                    this.numHint++;
                    break;
                case 2:
                    this.displayHint2 = true;
                    this.numHint++;
                    break;
                case 3:
                    this.displayHint3 = true;
                    this.numHint++;
                    break;
                case 4:
                    this.displayHint4 = true;
                    break;
          }
          
      }
    }
}
</script>

<style scoped>
.problem-button {
    position:relative;
    background-color: rgb(170, 228, 165);
    padding:10px;
    margin:20px;
    text-emphasis-color: white;
    border-radius: 10px;
}

.problem-button:hover {
    background-color: rgb(149, 233, 141);
    cursor: pointer;
}

.correct-banner{
    background-color: rgb(149, 233, 141);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 1s; 
}
.incorrect-banner{
    background-color: rgb(216, 43, 0);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 1s;
}
@keyframes correct-banner-animation {
  0%    { opacity: 0; }
  100%  { opacity: 1; }
}

.formula-style{
    font:bold;
    font-size: 12px;
}
.submit-block {
    margin: 10px, 10px;
    border-radius: 30px;
    padding: 10px;
}


</style>