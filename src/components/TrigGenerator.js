function getRandCoeffIndex(){ //gets a random coefficient for pi
    return Math.trunc(Math.random()*18);
  }
  
  const coeffArray = [ //array of coeffs at an int
  1, 2, 3, 4, 
  1/2, 3/2, 
  1/3, 2/3, 4/3, 5/3, 
  1/4, 3/4, 5/4, 7/4,
  1/6, 5/6, 7/6, 11/6
  ]
  const stringCoeffArray = [ //array of coeffs as a string for displaying
  "pi", "2pi", "3pi", "4pi", 
  "pi/2", "3pi/2", 
  "pi/3", "2pi/3", "4pi/3", "5pi/3", 
  "pi/4", "3pi/4", "5pi/4", "7pi/4",
  "pi/6", "5pi/6", "7pi/6", "11pi/6"
  ]
  
  const functionArray = ["sin", "cos", "tan"] //array of trig functions for displaying
  
  function getRandTrigFunction(){
    return Math.trunc(Math.random()*3);
  }
  
  
  
  function askProblem(){
  
    let solution=0; 
    let coeffIndex = getRandCoeffIndex(); //index of the coefficient
    let coeff = coeffArray[coeffIndex]; //coefficient number
    let coeffString = stringCoeffArray[coeffIndex]; //coefficient string
    let functionIndex = getRandTrigFunction(); //index of the trig function in the array
    let fun = functionArray[functionIndex]; //function string
  
    let num = Math.PI * coeff; //number that goes into the trig function
    let isNeg = false; 
    if (functionIndex == 0){
      solution = Math.sin(num);
    } else if (functionIndex==1){
      solution=Math.cos(num);
    } else {
      solution = Math.tan(num);
    }
    if (solution<0){
      isNeg = true;
      solution = -1 * solution; //removes the negative for now so the next block is universal
    }
    if (solution.toPrecision(2) == 0.71){ //converts the irrational decimals to string roots or rational numbers
        solution = "sqrt2/2";
    } else if (solution.toPrecision(3) == 1.73){
        solution = "sqrt3";
    } else if (solution.toPrecision(3) == 0.577){
        solution = "sqrt3/3";
    } else if (solution.toPrecision(3) == 0.866){
        solution = "sqrt3/2";
    } else if (solution.toPrecision(3) == 0.500){
        solution = "1/2";
    } else if (solution.toPrecision(3) == 1.00){
        solution = "1";
    } else if (solution.toPrecision(3) == 2.45){
        solution = "0";
    } else if (solution.toPrecision(3) == 544){
        solution = "undefined";
    }
    if (isNeg){ 
      solution = "-" + solution; //adds the negative back
    }
  
    let userSol = prompt("What is "+fun+"("+coeffString+")");
    if (userSol === solution) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
    console.log(fun + "(" + coeffString + ") = " + solution);
    console.log("-------------------------------");
  
  }
  