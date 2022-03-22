
<template>
    <div class="probem">
        
        <button v-on:click="createProblem" class="problem-button">Generate Trig Problem</button>
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button">Display Hint</button>
        <br>
        <vue-mathjax :formula="formula"></vue-mathjax>
        <br>
        
        <p>Write your answer in one of these forms: 1/2, {{formForSqrt}}, or undefined</p>
        <div v-show="displaySubmit" class="submit-block">
            <input v-model="uinput" placeholder="Solution" style=margin:10px>
            <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button>
            <h1 v-show="correct" class="correct-banner">Correct!</h1>
            <h1 v-show="incorrect" class="incorrect-banner">incorrect</h1>
        </div>
    
        <Hint v-if="displayHint1" v-bind:path='"https://i.postimg.cc/d1gnGckk/cropped-unit-circle.jpg"' v-bind:image="true" />

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
                uinput: null,
                correct: false,
                incorrect: false,
                solution: null,
                displaySolution: null,
                displayHint1: false,
                hintContent1: null,
                displayHintButton: null,
                displaySubmit: false,
                isDisabled: false,
                numHint: 1,
                coeffArray: [
                    1, 2, 3, 4, 
                    1/2, 3/2, 
                    1/3, 2/3, 4/3, 5/3, 
                    1/4, 3/4, 5/4, 7/4,
                    1/6, 5/6, 7/6, 11/6
                ],
                stringCoeffArray: [
                    "pi", "2pi", "3pi", "4pi", 
                    "pi/2", "3pi/2", 
                    "pi/3", "2pi/3", "4pi/3", "5pi/3", 
                    "pi/4", "3pi/4", "5pi/4", "7pi/4",
                    "pi/6", "5pi/6", "7pi/6", "11pi/6"
                ],
                functionArray: ["sin", "cos", "tan"],
                formForSqrt: "sqrt(2)/2",
                openPar: "(",
                closePar: ")"

            }
    },
    components: {
        Hint,
        'vue-mathjax': VueMathjax,
    },
    methods: {
        getRandCoeffIndex() {
            return Math.trunc(Math.random()*18);
        },
        getRandTrigFunction() {
            return Math.trunc(Math.random()*3);
        },
        createProblem() {
            let solution=null;
            let displaySolution = null; 
            let coeffIndex = this.getRandCoeffIndex(); //index of the coefficient
            let coeff = this.coeffArray[coeffIndex]; //coefficient number
            let coeffString = this.stringCoeffArray[coeffIndex]; //coefficient string
            let functionIndex = this.getRandTrigFunction(); //index of the trig function in the array
            let fun = this.functionArray[functionIndex]; //function string

            let num = Math.PI * coeff; //number that goes into the trig function
            let isNeg = false; 
            if (functionIndex == 0){
                solution = Math.sin(num);
            } else if (functionIndex==1){
                solution=Math.cos(num);
            } else {
                solution = Math.tan(num);
            }
            if (solution < 0){
                isNeg = true;
                solution = -1 * solution; //removes the negative for now so the next block is universal
            }
            /** Change this. Change all the "solution =" to "displaySolution = "
             * and then make a new "solution = " with the string literal of "sqrt(2)/2"" */
            if (solution.toPrecision(2) == 0.71){ //converts the irrational decimals to string roots or rational numbers
                solution = "sqrt(2)/2"
                displaySolution = "\\frac{\\sqrt{2}}{2}";
            } else if (solution.toPrecision(3) == 1.73){
                solution = "sqrt(3)"
                displaySolution = "\\sqrt{3}";
            } else if (solution.toPrecision(3) == 0.577){
                solution = "sqrt(3)/3"
                displaySolution = "\\frac{\\sqrt{3}}{3}";
            } else if (solution.toPrecision(3) == 0.866){
                solution = "sqrt(3)/2"
                displaySolution = "\\frac{\\sqrt{3}}{2}";
            } else if (solution.toPrecision(3) == 0.500){
                solution = "1/2"
                displaySolution = "\\frac{1}{2}";
            } else if (solution.toPrecision(3) == 1.00){
                solution = "1"
                displaySolution = "1";
            } else if (solution.toPrecision(3) == 2.45){
                solution = "0"
                displaySolution = "0";
                isNeg = false;
            } else if (solution>100){ //catches undefined answers
                solution = "undefined"
                displaySolution = "undefined";
                isNeg = false
            } else {
                displaySolution = "0"
                solution = "0"
                isNeg = false
            }
            
            if (isNeg) {
                solution = "-" + solution;
                displaySolution = "-" + displaySolution
            }

            this.formula = "$$" + fun + "("  + coeffString + ")$$"
            
            this.displaySolution = "$$" + displaySolution + "$$"
            this.solution = solution

            this.uinput1 = "";
            this.uinput2 = "";
            
            this.correct = false;
            this.incorrect = false;
            this.isDisabled = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.uinput = "";
            this.displayAllHints(false) 
            
            console.log("Coeff string is " + coeffString)
            console.log("fun is " + fun)
            console.log("sol is " + solution)
        },
        submitMethod() {
            // Change this to reflect only uinput
            

            
            if (this.uinput == this.solution) {
                this.correct = true;
                this.incorrect=false;
                this.isDisabled = true;
            } else {
                this.incorrect=true;
                this.correct=false;
            }
            
            if (this.correct) {
                this.displayAllHints(true)
            }

      },
      displayAllHints(show) {
            this.displayHint1 = show;
      },
      displayHints() {
          switch (this.numHint) {
                case 1:
                    this.displayHint1 = true;
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

.formula-style{
    font:bold;
    font-size: 12px;
}
.submit-block {
    margin: 10px, 10px;
    border-radius: 30px;
    padding: 10px;
}

.display-hint-button {
    position:relative;
    background-color: rgb(229, 236, 122);
    padding:10px;
    margin:20px;
    text-emphasis-color: white;
    border-radius: 10px;
}

.display-hint-button:hover {
    background-color: rgb(235, 245, 102);
    cursor: pointer;
}
.correct-banner{
    background-color: rgb(149, 233, 141);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 0.5s; 
}
.incorrect-banner{
    background-color: rgb(216, 43, 0);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 0.5s;
}
@keyframes correct-banner-animation {
  0%    { opacity: 0; }
  100%  { opacity: 1; }
}

</style>