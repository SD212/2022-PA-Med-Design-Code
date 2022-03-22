<template>
    <div class="probem">
        <button v-on:click="createProblem" class="problem-button">Generate System of Equations Problem</button>
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button>
        
        <vue-mathjax :formula="formula"></vue-mathjax>
        <br>
    
    <div v-show="displaySubmit" class="submit-block">
        <input v-model="uinputX" placeholder="x = " style=margin:10px>
        <input v-model="uinputY" placeholder="y = " style=margin:10px>
        <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button>
        <h1 v-show="correct" class="correct-banner">Correct!</h1>
        <h1 v-show="incorrect" class="incorrect-banner">incorrect</h1>
        
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
    name: 'SystemProblem',
    props: {

    },
    data() {
            return {
                problem: '',
                formula: "",
                count: 0,
                uinputX: null,
                uinputY: null,
                correct: false,
                incorrect: false,
                solX: 0,
                solY: 0,
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
                    } else if (equation.substring(index-1, index) === " " || equation.substring(index-1, index) === "-" || equation.substring(index-1, index) === "\n") {
                        equation = equation.substring(0, index) + equation.substring(index+1, equation.length);
                    }
                }
            }
            return equation;
        },
        createProblem() {
            //give random factors for x and y in both equations and calculate the respective values on the opposite side of the equation
            
            const solutionX = new Fraction(Math.trunc(Math.random()*10), Math.trunc(Math.random()*3)+1);
            const solutionY = new Fraction(Math.trunc(Math.random()*10), Math.trunc(Math.random()*3)+1);
            if (Math.random() >= 0.5) {
                solutionX.setNum(solutionX.getNum()*-1);
            }
            if (Math.random() >= 0.5) {
                solutionY.setNum(solutionY.getNum()*-1);
            }
            if (Math.random() >= 0.5) {
                solutionX.setDenom(1);
            }
            if (Math.random() >= 0.5) {
                solutionY.setDenom(1);
            }
            
            let a1 = Math.trunc((Math.random()*9)+1);
                if (Math.random() >= 0.5) {
                a1 *= -1;
            }

            let b1 = Math.trunc((Math.random()*9)+1);
            if (Math.random() >= 0.5) {
                b1 *= -1;
            }

            let a2 = Math.trunc((Math.random()*9)+1);
            if (Math.random() >= 0.5) {
                a2 *= -1;
            }

            let b2 = Math.trunc((Math.random()*9)+1);
            if (Math.random() >= 0.5) {
                b2 *= -1;
            }

            while (Math.trunc(a1*100000000/a2) == Math.trunc(b1*100000000/b2)) {
                b2 = Math.trunc((Math.random()*9)+1);
                if (Math.random() >= 0.5) {
                    b2 *= -1;
                }
            }

            const c1 = solutionX.multiply(new Fraction(a1, 1)).add(solutionY.multiply(new Fraction(b1, 1)));
            const c2 = solutionX.multiply(new Fraction(a2, 1)).add(solutionY.multiply(new Fraction(b2, 1)));
            let problem = "";
            problem = a1 + "x " + this.signOf(b1, true) + " " + Math.abs(b1) + "y = " + c1;
            problem += "$$\n$$" + a2 + "x " + this.signOf(b2, true) + " " + Math.abs(b2) + "y = " + c2;

            //this is kind of a mess but it brute forces each of the hints
            let coef = new Fraction(a1 * -1, b1);
            let constant = new Fraction(c1.getNum(), c1.getDenom() * b1);
            let hint1 = b1 + "y = " + c1 + " " + this.signOf(a1, false) + " " + Math.abs(a1) + "x";
            hint1 += "$$\n$$y = (" + c1 + " " + this.signOf(a1, false) + " " + Math.abs(a1) + "x)/" + b1;
            hint1 += "$$\n$$y = " + constant + " " + this.signOf(coef.getNum(), true) + " (" + new Fraction(Math.abs(coef.getNum()), coef.getDenom()) + ")x";

            let hint2 = a2 + "x " + this.signOf(b2, true) + " " + Math.abs(b2) + "(" + constant + " " + this.signOf(coef.getNum(), false) + " (" + new Fraction(Math.abs(coef.getNum()), coef.getDenom()) + ")x) = " + c2;

            constant = constant.multiply(new Fraction(b2, 1));
            coef = coef.multiply(new Fraction(b2, 1));
            hint2 += "$$\n$$" + a2 + "x " + this.signOf(constant.getNum(), true) + " " + new Fraction(Math.abs(constant.getNum()), constant.getDenom()) + " " + this.signOf(coef.getNum(), false) + " (" + new Fraction(Math.abs(coef.getNum()), coef.getDenom()) + ")x = " + c2;

            coef = coef.multiply(new Fraction(-1, 1)).add(new Fraction(a2, 1));
            constant = constant.multiply(new Fraction(-1, 1)).add(c2);
            let hint3 = "(" + coef + ")x = " + constant;
            hint3 += "$$\n$$x = " + solutionX;

            let hint4 = a1 + "(" + solutionX + ") " + this.signOf(b1) + " " + Math.abs(b1) + "y = " + c1;
            hint4 += "$$\n$$" + b1 + "y = " + solutionY.multiply(new Fraction(b1, 1));
            hint4 += "$$\n$$y = " + solutionY;

            problem = this.removeOnes(problem);
            hint1 = this.removeOnes(hint1);
            hint2 = this.removeOnes(hint2);
            hint3 = this.removeOnes(hint3);
            hint4 = this.removeOnes(hint4);

            this.formula = "$$" + problem + "$$";
            this.hintContent1 = "$$" + hint1 + "$$";
            this.hintContent2 = "$$" + hint2 + "$$";
            this.hintContent3 = "$$" + hint3 + "$$";
            this.hintContent4 = "$$" + hint4 + "$$";
            this.solX = solutionX;
            this.solY = solutionY;
            this.uinputX = null;
            this.uniputY = null;
            this.correct = false;
            this.incorrect = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.displayAllHints(false)
            this.isDisabled = false;

        },
        submitMethod() {
            if (this.uinputX == this.solX && this.uinputY == this.solY) {
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