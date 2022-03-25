<template>
    <div class="problem">
        <button v-on:click="createProblem" class="problem-button">Generate System of Equations Problem</button> <!--creates the problem button which calls createProblem when clicked on-->
        <br>
        <button v-on:click="displayHints" v-if="displayHintButton" class="display-hint-button" style=margin:20px >Display Hint ({{numHint}}/4)</button> <!--creates the display hint button which calls displayHints when clicked-->
        
        <vue-mathjax :formula="formula"></vue-mathjax>
        <br>
    
    <div v-show="displaySubmit" class="submit-block">
        <input v-model="uinputX" placeholder="x = " style=margin:10px> <!--creates inputs for the user to enter their solutions in-->
        <input v-model="uinputY" placeholder="y = " style=margin:10px>
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
    name: 'SystemProblem',
    props: {

    },
    data() {
            return {
                //set up variables that will be used to hold hints and control what gets displayed on the screen
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
            const solutionX = new Fraction(Math.trunc(Math.random()*10), Math.trunc(Math.random()*3)+1); //set solutions as random fractions
            const solutionY = new Fraction(Math.trunc(Math.random()*10), Math.trunc(Math.random()*3)+1);

            if (Math.random() >= 0.5) { //50 50 chance for solutionX to be postive or negative
                solutionX.setNum(solutionX.getNum()*-1);
            }
            if (Math.random() >= 0.5) { //50 50 chance for solutionY to be postive or negative
                solutionY.setNum(solutionY.getNum()*-1);
            }
            if (Math.random() >= 0.5) { //to create cleaner solutions more frequently, half the times make the denominator 1
                solutionX.setDenom(1);
            }
            if (Math.random() >= 0.5) { //to create cleaner solutions more frequently, half the times make the denominator 1
                solutionY.setDenom(1);
            }
            
            let a1 = Math.trunc((Math.random()*8)+1); //assign random integer to a1 that can be positive or negative but not 0
            if (Math.random() >= 0.5) {
                a1 *= -1;
            }

            let b1 = Math.trunc((Math.random()*8)+1); //assign random integer to b1 that can be positive or negative but not 0
            if (Math.random() >= 0.5) {
                b1 *= -1;
            }

            let a2 = Math.trunc((Math.random()*8)+1); //assign random integer to a2 that can be positive or negative but not 0
            if (Math.random() >= 0.5) {
                a2 *= -1;
            }

            let b2 = Math.trunc((Math.random()*8)+1); //assign random integer to b2 that can be positive or negative but not 0
            if (Math.random() >= 0.5) {
                b2 *= -1;
            }

            while (Math.trunc(a1*100000000/a2) == Math.trunc(b1*100000000/b2)) { //make sure that a1:a2 proportion is not the same as b1:b2 to eliminate an all real solutions case
                b2 = Math.trunc((Math.random()*9)+1);
                if (Math.random() >= 0.5) {
                    b2 *= -1;
                }
            }

            const c1 = solutionX.multiply(new Fraction(a1, 1)).add(solutionY.multiply(new Fraction(b1, 1))); //sets other side of the equation to the evaluation of a1*x+b1*y
            const c2 = solutionX.multiply(new Fraction(a2, 1)).add(solutionY.multiply(new Fraction(b2, 1))); //sets other side of the equation to the evaluation of a2*x+b2*y
            let problem = "";
            problem = a1 + "x " + this.signOf(b1, true) + " " + Math.abs(b1) + "y = " + c1; //problem in form a1x+b1y=c1
            problem += "$$\n$$" + a2 + "x " + this.signOf(b2, true) + " " + Math.abs(b2) + "y = " + c2; //the second equation a2x+b2y=c2

            let coef = new Fraction(a1 * -1, b1); //the coefficient of x that we are concerned with during the steps of generating the hints
            let constant = new Fraction(c1.getNum(), c1.getDenom() * b1); //the constant that is added to x that we are concerned with during the steps of generating the hints
            let hint1 = b1 + "y = " + c1 + " " + this.signOf(a1, false) + " " + Math.abs(a1) + "x"; //hint 1 first subtracts the x term from both sides of the first equation
            hint1 += "$$\n$$y = \\frac{" + c1 + " " + this.signOf(a1, false) + " " + Math.abs(a1) + "x}{" + b1 + "}"; //then it divides both sides by the coefficient of y
            hint1 += "$$\n$$y = " + constant + " " + this.signOf(coef.getNum(), true) + " " + new Fraction(Math.abs(coef.getNum()), coef.getDenom()) + "x"; //then it simplifies the right side to get rid of the divided by b1

            let hint2 = a2 + "x " + this.signOf(b2, true) + " " + Math.abs(b2) + "\\left(" + constant + " " + this.signOf(coef.getNum(), true) + " " + new Fraction(Math.abs(coef.getNum()), coef.getDenom()) + "x\\right) = " + c2; //hint 2 first substitutes the y in equation 2 with the y that we found in terms of x in hint 1

            constant = constant.multiply(new Fraction(b2, 1)); //the constant is now multiplied by the coefficient of y in the second equation
            coef = coef.multiply(new Fraction(b2, 1)); //and so is the coefficient
            hint2 += "$$\n$$" + a2 + "x " + this.signOf(constant.getNum(), true) + " " + new Fraction(Math.abs(constant.getNum()), constant.getDenom()) + " " + this.signOf(coef.getNum(), true) + " " + new Fraction(Math.abs(coef.getNum()), coef.getDenom()) + "x = " + c2; //same thing as the previous part of hint 2 but now the ocefficient of y in the second equation has been distributed to the x term and the constant which replaced the y earlier

            coef = coef.add(new Fraction(a2, 1)); //the coefficient is now the coefficient of both x terms on the left side of the equation added up
            constant = constant.multiply(new Fraction(-1, 1)).add(c2); //the constant is now the constant on the right side of the equation minus the constant on the left side of the equation to move the constant to the right side
            let hint3 = coef + "x = " + constant; //hint 3 shows the the new coefficient times x equals the new constant, all evaluated
            hint3 += "$$\n$$x = " + solutionX; //hint 3 then reveals the x solution having divided both sides by the coefficient

            let hint4 = a1 + "\\left(" + solutionX + "\\right) " + this.signOf(b1, true) + " " + Math.abs(b1) + "y = " + c1; //hint 4 plugs the x value found in hint 3 into the first equation
            hint4 += "$$\n$$" + b1 + "y = " + solutionY.multiply(new Fraction(b1, 1)); //hint 4 then moves all the constants to the right side fo the equation
            hint4 += "$$\n$$y = " + solutionY; //hint 4 then divides both sides by the coefficient of y to find y

            //get rid of all unnecessary 1s
            problem = this.removeOnes(problem);
            hint1 = this.removeOnes(hint1);
            hint2 = this.removeOnes(hint2);
            hint3 = this.removeOnes(hint3);
            hint4 = this.removeOnes(hint4);

            //set up variables to display the problem and hints
            this.formula = "$$" + problem + "$$";
            this.hintContent1 = "$$" + hint1 + "$$";
            this.hintContent2 = "$$" + hint2 + "$$";
            this.hintContent3 = "$$" + hint3 + "$$";
            this.hintContent4 = "$$" + hint4 + "$$";
            this.solX = solutionX.toAnswerForm();
            this.solY = solutionY.toAnswerForm();
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
        //check if the user's input matches the answer and display the screen based on whether they're corrrect or not
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