<template>
    <div class="problem">
        <button v-on:click="createProblem" class="problem-button">Generate Quadratic Problem</button> <!--creates the problem button which calls createProblem when clicked on-->
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button> <!--creates the display hint button which calls displayHints when clicked-->
        
        <vue-mathjax :formula="formula"></vue-mathjax> <!--displays the problem-->
        <br>
        <p>Find the real zeros to the nearest thousandths. If there are no real zeroes, leave the fields blank.</p> <!--explains what form to write answers in-->
    
    <div v-show="displaySubmit" class="submit-block">
        <input v-model="uinput1" placeholder="Solution 1" type="number" style=margin:10px> <!--creates inputs for the user to enter their solutions in-->
        <input v-model="uinput2" placeholder="Solution 2" type="number" style=margin:10px>
        <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled' >Submit</button> <!--creates the submit button which calls submitMethod when clicked-->
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

export default {
    name: 'Quadratic',
    props: {

    },
    data() {
        return {
            //set up variables that will be used to hold hints and control what gets displayed on the screen
            problem: '',
            formula: "",
            count: 0,
            uinput1: null,
            uinput2: null,
            correct: false,
            incorrect: false,
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
        //generates the problem
        createProblem() {
            //assign random non-zero ints to a, b, c
            let a = Math.trunc(Math.random() * 6 + 1);
            let b = Math.trunc(Math.random() * 9 + 1);
            let c = Math.trunc(Math.random() * 6 + 1);
            let sign1 = "+";
            let sign2 = "+";
            if (Math.random() >= 0.5) {
                a *= -1;
            }
            if (Math.random() >= 0.5) {
                b *= -1;
                sign1 = "-";
            }
            if (Math.random() >= 0.5) {
                c *= -1;
                sign2 = "-";
            }
            //decreases occurence of no real solutions
            if (b * b - 4 * a * c < 0 && Math.random() >= 0.5) {
                a = Math.trunc(Math.random() * 6 + 1);
                b = Math.trunc(Math.random() * 9 + 1);
                c = Math.trunc(Math.random() * 6 + 1);
                sign1 = "+";
                sign2 = "+";
                if (Math.random() >= 0.5) {
                    a *= -1;
                }
                if (Math.random() >= 0.5) {
                    b *= -1;
                    sign1 = "-";
                }
                if (Math.random() >= 0.5) {
                    c *= -1;
                    sign2 = "-";
                }
            }

            //the problem
            let tempA = "";
            let tempB = "";
            if (a != 0) {
                tempA += a;
            }
            if (b != 0) {
                tempB += Math.abs(b);
            }
            this.problem = "$$f(x) = " + tempA + "x^2 " + sign1 + " " + tempB + "x " + sign2 + " " + Math.abs(c) + "$$";
            this.problem = this.removeOnes(this.problem);

            //hint #1
            this.hintContent1 = "$$a = " + a + ", " + "b = " + b + ", " + "c = " + c + "$$";

            //hint #2
            this.hintContent2 = "$$x = \\frac{-b±\\sqrt{b^2-4ac}}{2a}$$";
            this.hintContent2 += "\n" + "$$x = \\frac{" + b * -1 + "±\\sqrt{(" + b + ")^2-4" + "(" + a + ")(" + c + ")}}{2(" + a + ")}$$";

            //each part of the quadratic formula; term2 is the coefficient of the square root
            let term1 = b * -1;
            let term2 = 1;
            let term3 = b * b - 4 * a * c;
            let term4 = 2 * a;

            //hint #2 continued
            this.hintContent2 += "\n" + "$$x = \\frac{" + term1 + "±\\sqrt{" + term3 + "}}{" + term4 + "}$$";

            //simplifies square root
            for (let num = 2; num <= 18; num++) {
                if (term3 % (num * num) == 0 && term3 != 0) {
                    term2 *= num;
                    term3 /= num * num;
                }
            }

            //simplifies overall fraction
            for (let num = 2; num <= 9; num++) {
                if (term1 % num == 0 && term2 % num == 0 && term4 % num == 0) {
                    term1 /= num;
                    term2 /= num;
                    term4 /= num;
                    num -= 1;
                }
            }

            //denominator is always positive, for formatting purposes
            if (term4 < 0) {
                term1 *= -1;
                term2 *= -1;
                term4 *= -1;
            }

            //hint #3
            this.hintContent3 = "$$x = \\frac{" + term1 + "±(" + term2 + ")\\sqrt{" + term3 + "}}{" + term4 + "}$$";

            //getting rid of unnecessary 1's and adding i's
            let middlePart = "";
            if (term3 != 0) {
                middlePart = "±";
                if (term2 != 1) {
                    middlePart += "(" + term2 + ")";
                }
                if (term3 != 1) {
                    middlePart += "\\sqrt{" + term3 + "}";
                }
            }

            //hint #4 continued
            if (term4 == 1) {
                this.hintContent3 += "\n" + "$$x = " + term1 + middlePart + "$$";
            } else {
                this.hintContent3 += "\n" + "$$x = \\frac{" + term1 + middlePart + "}{" + term4 + "}" + "$$";
            }

            //calculate answers
            if (term3 >= 0) {
                this.sol1 = "" + Math.round((term1 + term2 * Math.sqrt(term3)) / term4 * 1000) / 1000;
                this.sol2 = "" + Math.round((term1 - term2 * Math.sqrt(term3)) / term4 * 1000) / 1000;
                this.hintContent4 = "$$x = " + this.sol1 + ", " + this.sol2 + "$$";
            } else {
                this.sol1 = null;
                this.sol2 = null;
                this.hintContent4 = "$$No\\text{ }real\\text{ }solution$$";
            }

            //set up variables to display the problem and hints
            this.formula = this.problem;
            this.correct = false;
            this.incorrect = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.displayAllHints(false);
            this.isDisabled = false;            
        },
        //check if the user's input matches the answer and display the screen based on whether they're corrrect or not
        submitMethod() {
            if (this.uinput1 == this.sol1 && this.uinput2 == this.sol2) {
                this.correct = true;
                this.incorrect = false;
                this.isDisabled = true;
                this.numHint = 4;
            } else if (this.uinput1 == this.sol2 && this.uinput2 == this.sol1) {
                this.correct = true;
                this.incorrect = false;
                this.isDisabled = true;
                this.numHint = 4;
            } else {
                this.incorrect = true;
            }
            
            if (this.correct) {
                this.displayAllHints(true);
            } 
      },
      //make the hints
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
                    this.numHint++;
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