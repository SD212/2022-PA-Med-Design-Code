<template>
    <div class="probem">
        <button v-on:click="createProblem" class="problem-button">Generate Problem</button>
        <vue-mathjax :formula="formula"></vue-mathjax>
        <br>
    
    <input v-model="uinput1" placeholder="sol 1" type="number">
    <input v-model="uinput2" placeholder="Sol 2" type="number">
    <button class="submit-button" v-on:click="submitMethod">Submit</button>
    <h1 v-show="correct">Correct!</h1>
    

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
                hintContent4: null

            }
    },
    components: {
        Hint,
        'vue-mathjax': VueMathjax
    },
    methods: {
        createProblem() {
            var randomSol1 = Math.floor(Math.random() * (13 + 5)  - 5);
            var randomSol2 = Math.floor(Math.random() * (13 + 5) - 5);
            this.sol1 = -randomSol1;
            this.sol2 = -randomSol2;
            this.problem = this.makeform(randomSol1, randomSol2);
            this.formula = this.problem

            this.correct = false;
            this.displayHints(false)            

            
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
            } else if (this.uinput1 == this.sol2 && this.uinput2 == this.sol1) {
                this.correct = true;
            } else {
                alert("wrong")
            }
            
            if (this.correct) {
                this.displayHints(true)
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
      displayHints(show) {
            this.displayHint1 = show;
            this.displayHint2 = show;
            this.displayHint3 = show;
            this.displayHint4 = show;
      }
    }
}
</script>

<style scoped>
.problem-button {
    background-color: blue;
    text-emphasis-color: white;
}
</style>