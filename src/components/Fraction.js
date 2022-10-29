class Fraction{
    //object with numerator and denominator that will automatically simplify itself
    constructor(num, denom) {
      this.num = num;
      this.denom = denom;
      this.simplify();
    }
    //simplifies the fraction
    simplify() {
      //finds the LCM between the numerator and denominator and divides both by it
      let max = 0;
      if (Math.abs(this.num) > Math.abs(this.denom)) {
        max = Math.abs(this.num);
      } else {
        max = Math.abs(this.denom);
      }
      for (let dividend = max; dividend >= 2; dividend--) {
        if (this.num % dividend == 0 && this.denom % dividend == 0) {
          this.num /= dividend;
          this.denom /= dividend;
          break;
        }
      }
      //make sure numerator is the negative part if there is a negative
      if (this.denom < 0) {
        this.num *= -1;
        this.denom *= -1;
      }
    }
    //return the numerator
    getNum() {
      return this.num;
    }
    //return the denominator
    getDenom() {
      return this.denom;
    }
    //set the numerator to a value
    setNum(num) {
      this.num = num;
      this.simplify();
    }
    //set the denominator to a value
    setDenom(denom) {
      this.denom = denom;
      this.simplify();
    }
    //multiply this fraction with another fraction x
    multiply(x) {
      return new Fraction(this.num * x.getNum(), this.denom * x.getDenom());
    }
    //divide this fraction by another fraction x
    divide(x) {
      return new Fraction(this.num * x.getDenom(), this.denom * x.getNum());
    }
    //add this fraction to another fraction x
    add(x) {
      return new Fraction(this.num * x.getDenom() + x.getNum() * this.denom, this.denom * x.getDenom());
    }
    //subtract another fraction x from this fraction
    subtract(x) {
      return new Fraction(this.num * x.getDenom() - x.getNum() * this.denom, this.denom * x.getDenom());
    }
    //return a string of the fraction formatted for mathjax
    toString() {
      if (this.denom >  1) {
        if (this.num > 0) {
          return "\\frac{" + this.num + "}{" + this.denom + "}";
        } else {
          return "-\\frac{" + Math.abs(this.num) + "}{" + this.denom + "}";
        }
      } else { //to eliminate having fractions over 1
        return this.num + "";
      }
    }
    //return in string form to check answers with
    toAnswerForm() {
      if (this.denom >  1) {
        return this.num + "/" + this.denom;
      } else { //to eliminate having fractions over 1
        return this.num + "";
      }
    }
  }
  

  export default Fraction;