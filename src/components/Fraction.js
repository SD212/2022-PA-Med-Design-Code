class Fraction{
    //object with numerator and denominator that will automatically simplify itself
    constructor(num, denom) {
      this.num = num;
      this.denom = denom;
      this.simplify();
    }
  
    simplify() {
      let max = 0;
      if (this.num > this.denom) {
        max = Math.abs(this.num);
      } else {
        max = Math.abs(this.denom);
      }
      for (let dividend = 2; dividend <= max; dividend++) {
        if (this.num % dividend == 0 && this.denom % dividend == 0) {
          this.num /= dividend;
          this.denom /= dividend;
          dividend--;
        }
      }
      if (this.denom < 0) {
        this.num *= -1;
        this.denom *= -1;
      }
    }
  
    getNum() {
      return this.num;
    }
  
    getDenom() {
      return this.denom;
    }
  
    setNum(num) {
      this.num = num;
      this.simplify();
    }
  
    setDenom(denom) {
      this.denom = denom;
      this.simplify();
    }
  
    multiply(x) {
      return new Fraction(this.num * x.getNum(), this.denom * x.getDenom());
    }
    
    divide(x) {
      return new Fraction(this.num * x.getDenom(), this.denom * x.getNum());
    }
  
    add(x) {
      return new Fraction(this.num * x.getDenom() + x.getNum() * this.denom, this.denom * x.getDenom());
    }
  
    subtract(x) {
      return new Fraction(this.num * x.getDenom() - x.getNum() * this.denom, this.denom * x.getDenom());
    }
  
    toString() {
      if (this.denom >  1) {
        return this.num + "/" + this.denom;
      } else {
        return this.num + "";
      }
    }
  }

  export default Fraction;