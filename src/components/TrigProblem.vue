
<template>
    <div class="probem">
        
        <button v-on:click="createProblem" class="problem-button">Generate Trig Problem</button> <!--creates the problem button which calls createProblem when clicked on-->
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button">Display Hint</button> <!--creates the display hint button which calls displayHints when clicked-->
        <br>
        <vue-mathjax :formula="formula"></vue-mathjax> <!--displays the problem-->
        <br>
        
        <p>Write your answer in one of these forms: 1/2, {{formForSqrt}}, {{formForSqrt3}}, or undefined</p> <!--explains what form to write answers in-->
        <div v-show="displaySubmit" class="submit-block">
            <input v-model="uinput" placeholder="Solution" style=margin:10px> <!--creates inputs for the user to enter their solutions in-->
            <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled'>Submit</button> <!--creates the submit button which calls submitMethod when clicked-->
            <button class="submit-button" v-on:click="createProblem" v-show='isDisabled'>Next Problem</button> <!--creates next problem button which creates a new problem when clicked-->
            <h1 v-show="correct" class="correct-banner">Correct!</h1> <!--displays the correct banner-->
            <h1 v-show="incorrect" class="incorrect-banner">Incorrect</h1> <!--displays the incorrect banner-->
        </div>
    
        <Hint v-if="displayHint1" v-bind:path='"https://i.postimg.cc/d1gnGckk/cropped-unit-circle.jpg"' v-bind:image="true" /> <!--shows the unit circle as hint 1-->

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
                    "\\pi", "2\\pi", "3\\pi", "4\\pi", 
                    "\\frac{\\pi}{2}", "\\frac{3\\pi}{2}", 
                    "\\frac{\\pi}{3}", "\\frac{2\\pi}{3}", "\\frac{4\\pi}{3}", "\\frac{5\\pi}{3}", 
                    "\\frac{\\pi}{4}", "\\frac{3\\pi}{4}", "\\frac{5\\pi}{4}", "\\frac{7\\pi}{4}",
                    "\\frac{\\pi}{6}", "\\frac{5\\pi}{6}", "\\frac{7\\pi}{6}", "\\frac{11\\pi}{6}"
                ],
                functionArray: ["sin", "cos", "tan"],
                formForSqrt: "sqrt(2)/2",
                formForSqrt3: "sqrt(3)/2",
                openPar: "(",
                closePar: ")"

            }
    },
    components: {
        Hint,
        'vue-mathjax': VueMathjax,
    },
    methods: {
        //returns random index for coeffArray and stringCoeffArray
        getRandCoeffIndex() {
            return Math.trunc(Math.random()*18);
        },
        //returns random index for functionArray
        getRandTrigFunction() {
            return Math.trunc(Math.random()*3);
        },
        //generates the problem
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
            if (functionIndex == 0){ //use the trig function corresponding to the random index to generate solution
                solution = Math.sin(num);
            } else if (functionIndex==1){
                solution = Math.cos(num);
            } else {
                solution = Math.tan(num);
            }
            if (solution < 0){
                isNeg = true;
                solution = -1 * solution; //removes the negative for now so the next block is universal
            }
            if (solution.toPrecision(2) == 0.71){ //checks the solutions to the necessary decimal places ot tell them apart
                solution = "sqrt(2)/2" //assigns string versions of the solutions to solution so that it matches what the user enters
                displaySolution = "\\frac{\\sqrt{2}}{2}"; //makes a solution formatted for mathjax to be displayed
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
            
            if (isNeg) { //makes negative solutions negative again since we had to make it positive earlier
                solution = "-" + solution;
                displaySolution = "-" + displaySolution
            }

            //set up variables to display the problem and hints
            this.formula = "$$" + fun + "\\left(" + coeffString + "\\right)$$"
            
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
                this.displayAllHints(true)
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
.formula-style{
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
.correct-banner{
    background-color: rgb(149, 233, 141);
    padding: 10px;
    border-radius: 10px;
    border: 5px solid black;
    animation: correct-banner-animation 0.5s; 
}
/*red banner saying "Incorrect" across the screen */
.incorrect-banner{
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