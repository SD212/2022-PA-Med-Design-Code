<template>
    <div class="problem">
        <button v-on:click="createProblem" class="problem-button">Generate Power Rule Derivative Problem</button> <!--creates the problem button which calls createProblem when clicked on-->
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button">Display Hint</button> <!--creates the display hint button which calls displayHints when clicked-->
        <br>
        <vue-mathjax :formula="formula"></vue-mathjax> <!--displays the problem-->
        <br>
        
        <div v-show="displaySubmit" class="submit-block">
            <input v-model="uinput" placeholder="Solution" style=margin:10px> <!--creates inputs for the user to enter their solutions in-->
            <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button> <!--creates the submit button which calls submitMethod when clicked-->
            <button class="submit-button" v-on:click="createProblem" v-show='isDisabled'>Next Problem</button> <!--creates next problem button which creates a new problem when clicked-->
            <h1 v-show="correct" class="correct-banner">Correct!</h1> <!--displays the correct banner-->
            <h1 v-show="incorrect" class="incorrect-banner">Incorrect</h1> <!--displays the incorrect banner-->
        </div>
    
        <Hint v-if="displayHint1" v-bind:description='hintContent1' v-bind:text="true"/>

    </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import Hint from './Hint.vue'
import Fraction from './Fraction.js'

export default {
    name: 'PowerRuleDeriv',
    props: {

    },
    data() {
            return {
                //set up variables that will be used to hold hints and control what gets displayed on the screen
                problem: '',
                formula: "",
                count: 0,
                uinput: null,
                correct: false,
                incorrect: false,
                solution: null,
                displaySolution: null,
                displayHint1: false,
                hintContent1: "$$\\frac{d}{dx}x^n=nx^{n-1}$$",
                displayHintButton: null,
                displaySubmit: false,
                isDisabled: false,
                numHint: 1,
            }
    },
    components: {
        Hint,
        'vue-mathjax': VueMathjax,
    },
    methods: {
        //generates the problem
        createProblem() {
            let problem = null;
            let solution = null;
            let displaySolution = null;

            const amtOfTerms = Math.trunc(Math.random()*4) + 1;
            //assign coefficients to each term
            const coefs = [];
            for (let i = 0; i < amtOfTerms; i++) {
                coefs[i] = new Fraction(Math.trunc(Math.random()*10) + 1, Math.trunc(Math.random()*3) + 1);
                if (Math.random() >= 0.5) {
                    coefs[i].setNum(coefs[i].getNum()*-1);
                }
                if (Math.random() >= 0.5) {
                    coefs[i].setDenom(1);
                }
            }
            //assign exponents to each term
            const exps = [];
            let exp = new Fraction(-1, 1);
            for (let i = 0; i < amtOfTerms; i++) {
                exp = exp.add(new Fraction(Math.trunc(Math.random()*2) + 1, 1));
                exps[i] = exp;
            }
            //generates problem
            problem = coefs[amtOfTerms - 1] + "x^" + exps[amtOfTerms - 1];
            for (let i = amtOfTerms - 2; i >= 0; i--) {
                problem += " + " + coefs[i] + "x^" + exps[i];
            }
            //calculates new coefficients
            const newCoefs = [];
            for (let i = 0; i < amtOfTerms; i++) {
                newCoefs[i] = coefs[i].multiply(exps[i]);
            }
            //calculates new exponents
            const newExps = [];
            for (let i = 0; i < amtOfTerms; i++) {
                newExps[i] = exps[i].subtract(new Fraction(1, 1));
            }
            //generates answer
            solution = newCoefs[amtOfTerms - 1].toAnswerForm() + "x^" + newExps[amtOfTerms - 1].toAnswerForm();
            displaySolution = newCoefs[amtOfTerms - 1] + "x^" + newExps[amtOfTerms - 1];
            for (let i = amtOfTerms - 2; i >= 0; i--) {
                solution += " + " + newCoefs[i].toAnswerForm() + "x^" + newExps[i].toAnswerForm();
                displaySolution += " + " + newCoefs[i] + "x^" + newExps[i];
            }
            //cleans up expressions
            function cleanUp(expression) {
                for (let i = 0; i < expression.length; i++) {
                    if (expression.substring(i, i + 1) == "1") {
                        if (expression.substring(i + 1, i + 2) == "x" && expression.substring(i + 2, i + 4) != "^0" && (i == 0 || expression.substring(i - 1, i) == " " || expression.substring(i - 1, i) == "-")) {
                            expression = expression.substring(0, i) + expression.substring(i + 1);
                            i = 0;
                        } else if (i != 0 && expression.substring(i - 1, i) == "^") {
                            expression = expression.substring(0, i - 1) + expression.substring(i + 1);
                            i = 0;
                        }
                    } else if (expression.substring(i, i + 1) == "-" && i > 0 && expression.substring(i + 1, i + 2) != " " && expression.substring(i - 1, i) != "^") {
                        expression = expression.substring(0, i - 2) + "- " + expression.substring(i + 1);
                        i = 0;
                    } else if (expression.substring(i, i + 1) == "0") {
                        if (expression.substring(i + 1, i + 2) == "x" && (i == 0 || expression.substring(i - 1, i) == " ")) {
                            expression = expression.substring(0, i - 3) + expression.substring(i + 5);
                            i = 0;
                        } else if (i != 0 && expression.substring(i - 1, i) == "^") {
                            expression = expression.substring(0, i - 2) + expression.substring(i + 1);
                            i = 0;
                        }
                    }
                }
                if (expression == "" || expression == "-") {
                    expression = "0";
                }
                return expression;
            }

            problem = cleanUp(problem);
            solution = cleanUp(solution);
            displaySolution = cleanUp(displaySolution);
            for (let i = solution.length; i >= 0; i--) {
                if (solution.substring(i, i + 1) == " ") {
                    solution = solution.substring(0, i) + solution.substring(i + 1);
                }
            }
            console.log(solution);

            //set up variables to display the problem and hints
            this.formula = "$$\\frac{d}{dx}(" + problem + ")$$";
            this.solution = solution;
            this.displaySolution = displaySolution;

            this.uinput = "";
            this.correct = false;
            this.incorrect = false;
            this.isDisabled = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.uinput = "";
            this.displayAllHints(false)
        },
        //check if the user's input matches the answer and display the screen based on whether they're corrrect or not
        submitMethod() {
            if (this.uinput == this.solution) {
                this.correct = true;
                this.incorrect = false;
                this.isDisabled = true;
            } else {
                this.incorrect=true;
                this.correct=false;
            }
            
            if (this.correct) {
                this.displayAllHints(true);
            }
      },
      //immediately display all the hints
      displayAllHints(show) {
            this.displayHint1 = show;
      },
      //display the hints one by one as numHint increases
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
/*problem button is green and placed in the center of the screen */
.problem-button {
    position:relative;
    background-color: rgb(170, 228, 165);
    padding:10px;
    margin:20px;
    text-emphasis-color: white;
    border-radius: 10px;
}
/*problem button becomes brighter when cursor hovers over it */
.problem-button:hover {
    background-color: rgb(149, 233, 141);
    cursor: pointer;
}
/*the formula is bold size 12 text */
.formula-style {
    font:bold;
    font-size: 12px;
}
.submit-block {
    margin: 10px, 10px;
    border-radius: 30px;
    padding: 10px;
}
/*the display hint button is yellow in the center of the screen */
.display-hint-button {
    position:relative;
    background-color: rgb(229, 236, 122);
    padding:10px;
    margin:20px;
    text-emphasis-color: white;
    border-radius: 10px;
}
/*display hint button gets brighter when hovered over by cursor*/
.display-hint-button:hover {
    background-color: rgb(235, 245, 102);
    cursor: pointer;
}
/*green banner saying "Correct!" across the screen */
.correct-banner {
    background-color: rgb(149, 233, 141);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 0.5s; 
}
/*red banner saying "Incorrect" across the screen */
.incorrect-banner {
    background-color: rgb(216, 43, 0);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 0.5s;
}
/*to animate the display of the banner as fading into the screen*/
@keyframes correct-banner-animation {
  0%    { opacity: 0; }
  100%  { opacity: 1; }
}

</style>