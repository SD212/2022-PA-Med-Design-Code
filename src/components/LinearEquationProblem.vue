<template>
    <div class="problem">
        <button v-on:click="createProblem" class="problem-button">Generate Linear Equation Problem</button> <!--creates the problem button which calls createProblem when clicked on-->
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button> <!--creates the display hint button which calls displayHints when clicked-->
        
        <vue-mathjax :formula="formula"></vue-mathjax> <!--displays the problem-->
        <br>
    
    <div v-show="displaySubmit" class="submit-block">
        <input v-model="uinput" placeholder="Solution 1" style=margin:10px> <!--creates inputs for the user to enter their solution in-->
        <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button> <!--creates the submit button which calls submitMethod when clicked-->
        <button class="submit-button" v-on:click="createProblem" v-show='isDisabled'>Next Problem</button> <!--creates next problem button which creates a new problem when clicked-->
        <h1 v-show="correct" class="correct-banner">Correct!</h1> <!--displays the correct banner-->
        <h1 v-show="incorrect" class="incorrect-banner">Incorrect</h1> <!--displays the incorrect banner-->
    </div>
    
    <!--displays the hints-->
    <Hint v-if="displayHint1" v-bind:description='hintContent1' v-bind:text="true"/>
    
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
                //set up variables that will be used to hold hints and control what gets displayed on the screen
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
        //return the real sign of num if real is true, otherwise return the opposite sign of num
        signOf(num, real) {
            if (real) {
                if (num >= 0) {
                    return "+";
                }
                return "-";
            } else {
                if (num >= 0) {
                    return "-";
                }
                return "+";
            }
        },
        //eliminate unnecessary 1s as coefficients
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
        //generates the problem while also generating hints
        createProblem() {
            const solution = new Fraction(Math.trunc(Math.random()*10), Math.trunc(Math.random()*4)+1); //set solution to a random fraction
            
            if (Math.random() >= 0.5) { //50 50 chance for solution to be positive or negative
                solution.setNum(solution.getNum()*-1);
            }
            if (Math.random() >= 0.5) { //to create cleaner solutions more frequently, half the times make the denominator 1
                solution.setDenom(1);
            }
            let otherSide = new Fraction(solution.getNum(), solution.getDenom()); //other side of the equation as of now is the same as the solution
            this.hintContent4 = "$$x = " + solution + "$$"; //hint 4 is made

            const factor = new Fraction(Math.trunc(Math.random()*9) + 1, (Math.trunc(Math.random()*4)+1)); //make a random fraction factor to multiply x by
            if (Math.random() >= 0.5) { //like above, make numbers simple more often
                factor.setDenom(1);
            }
            if (Math.random() >= 0.5) { //50 50 chance to make the factor positive or negative
                factor.setNum(factor.getNum() * -1);
            }
            otherSide = otherSide.multiply(factor); //update the other side of the equation so that it's multiplied by the same factor
            this.hintContent2 = "$$" + factor + "x = " + otherSide + "$$"; //hint 2 is when the constants have been eliminated so just the factor times x on one side and the actual value on the other side
            this.hintContent3 = "$$" + factor + "x\\left(" + new Fraction(factor.getDenom(), factor.getNum()) + "\\right) = " + otherSide + "\\left(" + new Fraction(factor.getDenom(), factor.getNum()) + "\\right)$$"; //hint 3 takes hint two but multplies both sides by the reciprocal of the factor

            const constant = new Fraction(Math.trunc(Math.random()*24)+1, Math.trunc(Math.random()*3)+1); //makes a random rational constant
            if (Math.random() >= 0.5) { //like above, makes simpler numbers more often
                constant.setDenom(1);
            }
            let problem;
            if (Math.random() >= 0.5) { //50 50 chance constant gets added or subtracted
                otherSide = otherSide.add(constant);
                problem = "$$" + factor + "x + " + constant + " = " + otherSide + "$$"; //creates problem in format factor * x + constant = the left side evaluated
                this.hintContent1 = "$$" + factor + "x + " + constant + " - " + constant + " = " + otherSide + " - " + constant + "$$"; //like the problem  but it subtracts the constant from both sides
            } else {
                otherSide = otherSide.subtract(constant);
                problem = "$$" + factor + "x - " + constant + " = " + otherSide + "$$"; //creates problem in format factor * x - constant = the left side evaluated
                this.hintContent1 = "$$" + factor + "x - " + constant + " + " + constant + " = " + otherSide + " + " + constant + "$$"; //like the problem but it adds the constant to both sides
            }

            //get rid of all unnecessary 1s
            problem = this.removeOnes(problem);
            this.hintContent1 = this.removeOnes(this.hintContent1);
            this.hintContent2 = this.removeOnes(this.hintContent2);
            this.hintContent3 = this.removeOnes(this.hintContent3);
            this.hintContent4 = this.removeOnes(this.hintContent4);
            
            //set up variables to display the problem and hints
            this.formula = problem;
            this.correct = false;
            this.incorrect = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.displayAllHints(false);
            this.isDisabled = false;
            this.sol = solution.toAnswerForm();
            this.uinput = null;           
        },
        //check if the user's input matches the answer and display the screen based on whether they're corrrect or not
        submitMethod() {
            if (this.uinput == this.sol) {
                this.correct = true;
                this.incorrect = false;
                this.isDisabled = true;
            } else {
                this.incorrect = true;
            }
            
            if (this.correct) {
                this.displayAllHints(true);
            }
      },
      //immediately display all the hints
      displayAllHints(show) {
            this.displayHint1 = show;
            this.displayHint2 = show;
            this.displayHint3 = show;
            this.displayHint4 = show;
      },
      //display the hints one by one as numHint increases
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
/*green banner saying "Correct!" across the screen */
.correct-banner {
    background-color: rgb(149, 233, 141);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 1s; 
}
/*red banner saying "Incorrect" across the screen */
.incorrect-banner {
    background-color: rgb(216, 43, 0);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 1s;
}
/*to animate the display of the banner as fading into the screen*/
@keyframes correct-banner-animation {
  0%    { opacity: 0; }
  100%  { opacity: 1; }
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

</style>