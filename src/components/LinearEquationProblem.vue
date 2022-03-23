<template>
    <div class="probem">
        <button v-on:click="createProblem" class="problem-button">Generate Linear Equation Problem</button>
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button>
        
        <vue-mathjax :formula="formula"></vue-mathjax>
        <br>
    
    <div v-show="displaySubmit" class="submit-block">
        <input v-model="uinput" placeholder="Solution 1" style=margin:10px>
        <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button>
        <h1 v-show="correct" class="correct-banner">Correct!</h1>
        <h1 v-show="incorrect" class="incorrect-banner">Incorrect</h1>
        
    </div>
    
    
    <Hint v-if="displayHint1" v-bind:description='hintContent1' v-bind:text="true" />
    
    <Hint v-if="displayHint2" v-bind:description='hintContent2' v-bind:text="true"/>
    
    <Hint v-if="displayHint3" v-bind:description='hintContent3' v-bind:text="true"/>
    
    <Hint v-if="displayHint4" v-bind:description='hintContent4' v-bind:text="true"/>


    </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import Hint from './Hint.vue'
import Fraction from './Fraction.js'

export default {
    name: 'LinearEquationProblem',
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
                displayHint1: false,
                displayHint2: false,
                displayHint3: false,
                displayHint4: false,
                hintContent1: null,
                hintContent2: null,
                hintContent3: null,
                hintContent4: null,
                displayHintButton: null,
                displaySubmit: false,
                numHint: 1,
                isDisabled: false,

            }
    },
    components: {
        Hint,
        'vue-mathjax': VueMathjax
    },
    methods: {
        signOf(num, real) {
            if (real) {
                if (num >= 0) {
                return "+";
                }
                return "-";
            }
            else {
                if (num >= 0) {
                return "-";
                }
                return "+";
            }
        },
        removeOnes(equation) {
            for (let index = equation.length-2; index >= 0; index--) {
                if (equation.substring(index, index+1) === "1" && (equation.substring(index+1, index+2) === "x" || equation.substring(index+1, index+2) === "y" || equation.substring(index+1, index+2) === "(")) {
                    if (index == 0) {
                        equation = equation.substring(1, equation.length);
                    } else if (equation.substring(index-1, index) === " " || equation.substring(index-1, index) === "-" || equation.substring(index-1, index) === "$") {
                        equation = equation.substring(0, index) + equation.substring(index+1, equation.length);
                    }
                }
            }
            return equation;
        },
        createProblem() {
            
            const solution = new Fraction(Math.trunc(Math.random()*10), Math.trunc(Math.random()*4)+1);
            
            if (Math.random() >= 0.5) {
                solution.setNum(solution.getNum()*-1);
            }
            if (Math.random() >= 0.5) {
                solution.setDenom(1);
            }
            let otherSide = new Fraction(solution.getNum(), solution.getDenom());
            this.hintContent4 = "$$x = " + solution + "$$";

            //multiply both sides by a random factor
            const factor = new Fraction(Math.trunc(Math.random()*9) + 1, (Math.trunc(Math.random()*4)+1));
            if (Math.random() >= 0.5) {
                factor.setDenom(1);
            }
            if (Math.random() >= 0.5) {
                factor.setNum(factor.getNum() * -1);
                factor.setNum(factor.getNum() - 1);
            } else {
                factor.setNum(factor.getNum() + 1);
            }
            otherSide = otherSide.multiply(factor);
            this.hintContent2 = "$$" + factor + "x = " + otherSide + "$$";
            /*if (factor.getNum() >= 0) {
                this.hintContent3 = "$$" + factor + "x\\left(\\frac{" + factor.getDenom() + "}{" + Math.abs(factor.getNum()) + "}\\right) = " + otherSide + "\\left(\\frac{" + factor.getDenom() + "}{" + Math.abs(factor.getNum()) + "}\\right)$$";
            } else {
                this.hintContent3 = "$$" + factor + "x\\left(-\\frac{" + factor.getDenom() + "}{" + Math.abs(factor.getNum()) + "}\\right) = " + otherSide + "\\left(-\\frac{" + factor.getDenom() + "}{" + Math.abs(factor.getNum()) + "}\\right)$$";
            }*/
            this.hintContent3 = "$$" + factor + "x\\left(" + new Fraction(factor.getDenom(), factor.getNum()) + "\\right) = " + otherSide + "\\left(" + new Fraction(factor.getDenom(), factor.getNum()) + "\\right)$$";

            //add or subtract a random constant from both sides
            const constant = new Fraction(Math.trunc(Math.random()*24)+1, Math.trunc(Math.random()*3)+1);
            if (Math.random() >= 0.5) {
                constant.setDenom(1);
            }
            let problem;
            if (Math.random() >= 0.5) {
                otherSide = otherSide.add(constant);
                problem = "$$" + factor + "x + " + constant + " = " + otherSide + "$$";
                this.hintContent1 = "$$" + factor + "x + " + constant + " - " + constant + " = " + otherSide + " - " + constant + "$$";
            } else {
                otherSide = otherSide.subtract(constant);
                problem = "$$" + factor + "x - " + constant + " = " + otherSide + "$$";
                this.hintContent1 = "$$" + factor + "x - " + constant + " + " + constant + " = " + otherSide + " + " + constant + "$$";
            }

            problem = this.removeOnes(problem);
            this.hintContent1 = this.removeOnes(this.hintContent1);
            this.hintContent2 = this.removeOnes(this.hintContent2);
            this.hintContent3 = this.removeOnes(this.hintContent3);
            this.hintContent4 = this.removeOnes(this.hintContent4);
            
            this.formula = problem
            this.correct = false;
            this.incorrect = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.displayAllHints(false)
            this.isDisabled = false;
            this.sol = solution.toAnswerForm();           
        },
        submitMethod() {
            if (this.uinput == this.sol) {
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

</style>