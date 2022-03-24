
<template>
    <div class="probem">
        <button v-on:click="createProblem" class="problem-button">Generate Factoring Problem</button> <!--creates the problem button which calls createProblem when clicked on-->
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button> <!--creates the display hint button which calls displayHints when clicked-->
        
        <vue-mathjax :formula="formula"></vue-mathjax> <!--displays the problem-->
        <br>
    
    <div v-show="displaySubmit" class="submit-block">
        <input v-model="uinput1" placeholder="Solution 1" type="number" style=margin:10px> <!--creates inputs for the user to enter their solutions in-->
        <input v-model="uinput2" placeholder="Solution 2" type="number" style=margin:10px>
        <button class="submit-button" v-on:click="submitMethod" :disabled='isDisabled' >Submit</button> <!--creates the submit button which calls submitMethod when clicked-->
        <button class="submit-button" v-on:click="createProblem" v-show='isDisabled'>Next Problem</button> <!--creates next problem button which creates a new problem when clicked-->
        <h1 v-show="correct" class="correct-banner">Correct!</h1> <!--displays the correct banner-->
        <h1 v-show="incorrect" class="incorrect-banner">Incorrect</h1> <!--displays the incorrect banner-->
        
    </div>
    
    <!--displays the hints-->
    <Hint v-if="displayHint1" v-bind:description='hintContent1' v-bind:text="true" />
    
    <Hint v-if="displayHint2" v-bind:description='hintContent2' v-bind:text="true"/>
    
    <Hint v-if="displayHint3" v-bind:description='hintContent3' v-bind:text="true"/>
    
    <Hint v-if="displayHint4" v-bind:description='hintContent4' v-bind:text="true"/>


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
        //generates the problem
        createProblem() {
            var randomSol1 = Math.floor(Math.random() * (25) - 12); //assigns random integers to randomSol1 and randomSol2
            var randomSol2 = Math.floor(Math.random() * (25) - 12);
            
            this.uinput1 = "";
            this.uinput2 = "";
            
            this.sol1 = -randomSol1; //solutions are negative counterparts of randomSols
            this.sol2 = -randomSol2;
            this.problem = this.makeform(randomSol1, randomSol2); //creates the problem using randomSol1 and randomSol2

            //set up variables to display the problem and hints
            this.formula = this.problem
            this.correct = false;
            this.incorrect = false;
            this.displayHintButton = true;
            this.displaySubmit = true;
            this.numHint = 1;
            this.displayAllHints(false)
            this.isDisabled = false;            
        },
        //creates the problem using randomSol1 and randomSol2
        makeform(sol1, sol2) {
            var bVal = sol1 + sol2;
            var cVal = sol1 * sol2;
            this.bVal = bVal;
            this.cVal = cVal;
            var finalForm = '$$x^2'; //equation starts off with x^2
            
            this.makeHints() //make the hints
            if (bVal == 1) { //adds on the xx term, if 1 in front of x, get rid of it
                finalForm += ' + x';
            } else if (bVal == -1) {
                finalForm += ' - x';
            } else if (bVal > 0) { //gets rid of plus negative numbers
                finalForm += ' + ' + bVal + 'x';
            } else if (bVal < 0) {
                finalForm += ' - ' + Math.abs(bVal) + 'x';
            }
            if (cVal > 0) { //adds on constant, gets rid of plus negative numbers
                finalForm += ' + ' + cVal;
            } else if (cVal < 0) {
                finalForm += ' - ' + Math.abs(cVal);
            }
            finalForm += ' = 0$$'; //add on = 0 at the end of the equation
            return finalForm;
        },
        //check if the user's input matches the answer and display the screen based on whether they're corrrect or not
        submitMethod() {
            if (this.uinput1 == this.sol1 && this.uinput2 == this.sol2) {
                this.correct = true;
                this.incorrect=false;
                this.isDisabled = true;
                this.numHint = 4;
            } else if (this.uinput1 == this.sol2 && this.uinput2 == this.sol1) {
                this.correct = true;
                this.incorrect=false;
                this.isDisabled = true;
                this.numHint = 4;
            } else {
                this.incorrect=true;
            }
            
            if (this.correct) {
                this.displayAllHints(true)
            } 


      },
      //make the hints
      makeHints() {
            var sol1 = this.sol1
            var sol2 = this.sol2;
            var c = sol1 * sol2 //c in form ax^2 + by + c = 0
            var b = sol1 * -1 + sol2 * -1 //b in form ax^2 + by + c = 0

          this.hintContent1 = '$$c = ' + c + ' = ' + sol1 * -1 + ' * ' + sol2 * -1 + '$$' //hint 1 shows the factors of c
          this.hintContent2 = '$$b = ' + b + ' = ' + sol1 * -1 //add the first composition of b to hint 2
          if (sol2 * -1 >= 0) { //gets rid of plus negative numbers
              this.hintContent2 += ' + ' + Math.abs(sol2) + '$$'; //finishes hint 2 with the second number
              this.hintContent3 = '(x + ' + Math.abs(sol2) + ')$$'; //add the first factor of the equation to hint 3
          } else {
              this.hintContent2 += ' - ' + sol2 + '$$'; //finishes hint 2 with the second number
              this.hintContent3 = '(x - ' + sol2 + ')$$'; //add the first factor of the equation to hint 3
          }
          if (sol1 * -1 >= 0) {
              this.hintContent3 = '$$(x + ' + Math.abs(sol1) + ')' + this.hintContent3; //finish hint 3 with the second factor
          } else {
              this.hintContent3 = '$$(x - ' + sol1 + ')' + this.hintContent3; //finish hint 3 with the second factor
          }
          this.hintContent4 = '$$x = ' + sol1 + ', ' + sol2 + '$$' //hint 4 shows the values of x
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

</style>