(function(t){function i(i){for(var e,r,o=i[0],u=i[1],l=i[2],h=0,m=[];h<o.length;h++)r=o[h],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&m.push(s[r][0]),s[r]=0;for(e in u)Object.prototype.hasOwnProperty.call(u,e)&&(t[e]=u[e]);c&&c(i);while(m.length)m.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,i=0;i<a.length;i++){for(var n=a[i],e=!0,o=1;o<n.length;o++){var u=n[o];0!==s[u]&&(e=!1)}e&&(a.splice(i--,1),t=r(r.s=n[0]))}return t}var e={},s={app:0},a=[];function r(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,i,n){r.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,i){if(1&i&&(t=r(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)r.d(n,e,function(i){return t[i]}.bind(null,e));return n},r.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(i,"a",i),i},r.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},r.p="/2022-PA-Med-Design/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=i,o=o.slice();for(var l=0;l<o.length;l++)i(o[l]);var c=u;a.push([0,"chunk-vendors"]),n()})({0:function(t,i,n){t.exports=n("56d7")},"034f":function(t,i,n){"use strict";n("85ec")},"04f1":function(t,i,n){"use strict";n("e02c")},"0e44":function(t,i,n){},"1bdf":function(t,i,n){"use strict";n("3001")},3001:function(t,i,n){},"56d7":function(t,i,n){"use strict";n.r(i);n("e260"),n("e6cf"),n("cca6"),n("a79d");var e=n("2b0e"),s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"menu"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.picked,expression:"picked"}],staticClass:"checkbox",attrs:{type:"radio",id:"factoring",value:"Factoring"},domProps:{checked:t._q(t.picked,"Factoring")},on:{change:[function(i){t.picked="Factoring"},t.setFactoring]}}),n("label",{attrs:{for:"factoring"}},[t._v("Factoring Problem")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.picked,expression:"picked"}],staticClass:"checkbox",attrs:{type:"radio",id:"trig",value:"Trig"},domProps:{checked:t._q(t.picked,"Trig")},on:{change:[function(i){t.picked="Trig"},t.setTrig]}}),n("label",{attrs:{for:"trig"}},[t._v("Trig Problem")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.picked,expression:"picked"}],staticClass:"checkbox",attrs:{type:"radio",id:"linear",value:"Linear"},domProps:{checked:t._q(t.picked,"Linear")},on:{change:[function(i){t.picked="Linear"},t.setLinear]}}),n("label",{attrs:{for:"linear"}},[t._v("Linear Equation Problem")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.picked,expression:"picked"}],staticClass:"checkbox",attrs:{type:"radio",id:"system",value:"System"},domProps:{checked:t._q(t.picked,"System")},on:{change:[function(i){t.picked="System"},t.setSystem]}}),n("label",{attrs:{for:"system"}},[t._v("System of Equations Problem")]),n("br"),n("br"),n("span",[t._v("Picked: "+t._s(t.getPicked()))])]),n("Problem",{directives:[{name:"show",rawName:"v-show",value:t.factoring,expression:"factoring"}]}),n("TrigProblem",{directives:[{name:"show",rawName:"v-show",value:t.trig,expression:"trig"}]}),n("LinearEquationProblem",{directives:[{name:"show",rawName:"v-show",value:t.linear,expression:"linear"}]}),n("SystemProblem",{directives:[{name:"show",rawName:"v-show",value:t.system,expression:"system"}]})],1)},a=[],r=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"problem"},[n("button",{staticClass:"problem-button",on:{click:t.createProblem}},[t._v("Generate Factoring Problem")]),t._v(" "),n("br"),t.displayHintButton?n("button",{staticClass:"display-hint-button",staticStyle:{margin:"20px"},on:{click:t.displayHints}},[t._v("Display Hint ("+t._s(t.numHint)+"/4)")]):t._e(),t._v(" "),n("vue-mathjax",{attrs:{formula:t.formula}}),t._v(" "),n("br"),n("div",{directives:[{name:"show",rawName:"v-show",value:t.displaySubmit,expression:"displaySubmit"}],staticClass:"submit-block"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.uinput1,expression:"uinput1"}],staticStyle:{margin:"10px"},attrs:{placeholder:"Solution 1",type:"number"},domProps:{value:t.uinput1},on:{input:function(i){i.target.composing||(t.uinput1=i.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.uinput2,expression:"uinput2"}],staticStyle:{margin:"10px"},attrs:{placeholder:"Solution 2",type:"number"},domProps:{value:t.uinput2},on:{input:function(i){i.target.composing||(t.uinput2=i.target.value)}}}),n("button",{staticClass:"submit-button",attrs:{disabled:t.isDisabled},on:{click:t.submitMethod}},[t._v("Submit")]),t._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:t.isDisabled,expression:"isDisabled"}],staticClass:"submit-button",on:{click:t.createProblem}},[t._v("Next Problem")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.correct,expression:"correct"}],staticClass:"correct-banner"},[t._v("Correct!")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.incorrect,expression:"incorrect"}],staticClass:"incorrect-banner"},[t._v("Incorrect")])]),t.displayHint1?n("Hint",{attrs:{description:t.hintContent1,text:!0}}):t._e(),t.displayHint2?n("Hint",{attrs:{description:t.hintContent2,text:!0}}):t._e(),t.displayHint3?n("Hint",{attrs:{description:t.hintContent3,text:!0}}):t._e(),t.displayHint4?n("Hint",{attrs:{description:t.hintContent4,text:!0}}):t._e()],1)},o=[],u=n("7b93"),l=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("div",{staticClass:"hint-description"},[n("br"),n("br"),t.text?n("vue-mathjax",{attrs:{formula:t.description}}):t._e(),t._v(" "),t.image?n("img",{attrs:{src:t.path}}):t._e()],1)])},c=[],h={name:"Hint",props:{"vue-mathjax":u["VueMathjax"],description:String,text:Boolean,image:Boolean,path:String},components:{"vue-mathjax":u["VueMathjax"]},data:function(){return{}},methods:{}},m=h,p=(n("04f1"),n("2877")),d=Object(p["a"])(m,l,c,!1,null,"172996ab",null),b=d.exports,v={name:"Problem",props:{},data:function(){return{problem:"",formula:"",count:0,uinput1:null,uinput2:null,correct:!1,incorrect:!1,bVal:0,cVal:0,sol1:0,sol2:0,displayHint1:!1,displayHint2:!1,displayHint3:!1,displayHint4:!1,hintContent1:null,hintContent2:null,hintContent3:null,hintContent4:null,displayHintButton:null,displaySubmit:!1,numHint:1,isDisabled:!1}},components:{Hint:b,"vue-mathjax":u["VueMathjax"]},methods:{createProblem:function(){var t=Math.floor(25*Math.random()-12),i=Math.floor(25*Math.random()-12);this.uinput1="",this.uinput2="",this.sol1=-t,this.sol2=-i,this.problem=this.makeform(t,i),this.formula=this.problem,this.correct=!1,this.incorrect=!1,this.displayHintButton=!0,this.displaySubmit=!0,this.numHint=1,this.displayAllHints(!1),this.isDisabled=!1},makeform:function(t,i){var n=t+i,e=t*i;this.bVal=n,this.cVal=e;var s="$$x^2";return this.makeHints(),1==n?s+=" + x":-1==n?s+=" - x":n>0?s+=" + "+n+"x":n<0&&(s+=" - "+Math.abs(n)+"x"),e>0?s+=" + "+e:e<0&&(s+=" - "+Math.abs(e)),s+=" = 0$$",s},submitMethod:function(){this.uinput1==this.sol1&&this.uinput2==this.sol2||this.uinput1==this.sol2&&this.uinput2==this.sol1?(this.correct=!0,this.incorrect=!1,this.isDisabled=!0,this.numHint=4):this.incorrect=!0,this.correct&&this.displayAllHints(!0)},makeHints:function(){var t=this.sol1,i=this.sol2,n=t*i,e=-1*t+-1*i;this.hintContent1="$$c = "+n+" = "+-1*t+" * "+-1*i+"$$",this.hintContent2="$$b = "+e+" = "+-1*t,-1*i>=0?(this.hintContent2+=" + "+Math.abs(i)+"$$",this.hintContent3="(x + "+Math.abs(i)+")$$"):(this.hintContent2+=" - "+i+"$$",this.hintContent3="(x - "+i+")$$"),this.hintContent3=-1*t>=0?"$$(x + "+Math.abs(t)+")"+this.hintContent3:"$$(x - "+t+")"+this.hintContent3,this.hintContent4="$$x = "+t+", "+i+"$$"},displayAllHints:function(t){this.displayHint1=t,this.displayHint2=t,this.displayHint3=t,this.displayHint4=t},displayHints:function(){switch(this.numHint){case 1:this.displayHint1=!0,this.numHint++;break;case 2:this.displayHint2=!0,this.numHint++;break;case 3:this.displayHint3=!0,this.numHint++;break;case 4:this.displayHint4=!0;break}}}},f=v,y=(n("d832"),Object(p["a"])(f,r,o,!1,null,"621c4094",null)),g=y.exports,H=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"problem"},[n("button",{staticClass:"problem-button",on:{click:t.createProblem}},[t._v("Generate Trig Problem")]),t._v(" "),n("br"),t.displayHintButton?n("button",{staticClass:"display-hint-button",on:{click:t.displayHints}},[t._v("Display Hint")]):t._e(),t._v(" "),n("br"),n("vue-mathjax",{attrs:{formula:t.formula}}),t._v(" "),n("br"),n("p",[t._v("Write your answer in one of these forms: 1/2, "+t._s(t.formForSqrt)+", "+t._s(t.formForSqrt3)+", or undefined")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.displaySubmit,expression:"displaySubmit"}],staticClass:"submit-block"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.uinput,expression:"uinput"}],staticStyle:{margin:"10px"},attrs:{placeholder:"Solution"},domProps:{value:t.uinput},on:{input:function(i){i.target.composing||(t.uinput=i.target.value)}}}),t._v(" "),n("button",{staticClass:"submit-button",attrs:{disabled:t.isDisabled},on:{click:t.submitMethod}},[t._v("Submit")]),t._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:t.isDisabled,expression:"isDisabled"}],staticClass:"submit-button",on:{click:t.createProblem}},[t._v("Next Problem")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.correct,expression:"correct"}],staticClass:"correct-banner"},[t._v("Correct!")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.incorrect,expression:"incorrect"}],staticClass:"incorrect-banner"},[t._v("Incorrect")])]),t.displayHint1?n("Hint",{attrs:{path:"https://i.postimg.cc/d1gnGckk/cropped-unit-circle.jpg",image:!0}}):t._e()],1)},x=[],w=(n("b65f"),{name:"Problem",props:{},data:function(){return{problem:"",formula:"",count:0,uinput:null,correct:!1,incorrect:!1,solution:null,displaySolution:null,displayHint1:!1,hintContent1:null,displayHintButton:null,displaySubmit:!1,isDisabled:!1,numHint:1,coeffArray:[1,2,3,4,.5,1.5,1/3,2/3,4/3,5/3,1/4,3/4,5/4,7/4,1/6,5/6,7/6,11/6],stringCoeffArray:["\\pi","2\\pi","3\\pi","4\\pi","\\frac{\\pi}{2}","\\frac{3\\pi}{2}","\\frac{\\pi}{3}","\\frac{2\\pi}{3}","\\frac{4\\pi}{3}","\\frac{5\\pi}{3}","\\frac{\\pi}{4}","\\frac{3\\pi}{4}","\\frac{5\\pi}{4}","\\frac{7\\pi}{4}","\\frac{\\pi}{6}","\\frac{5\\pi}{6}","\\frac{7\\pi}{6}","\\frac{11\\pi}{6}"],functionArray:["sin","cos","tan"],formForSqrt:"sqrt(2)/2",formForSqrt3:"sqrt(3)/2",openPar:"(",closePar:")"}},components:{Hint:b,"vue-mathjax":u["VueMathjax"]},methods:{getRandCoeffIndex:function(){return Math.trunc(18*Math.random())},getRandTrigFunction:function(){return Math.trunc(3*Math.random())},createProblem:function(){var t=null,i=null,n=this.getRandCoeffIndex(),e=this.coeffArray[n],s=this.stringCoeffArray[n],a=this.getRandTrigFunction(),r=this.functionArray[a],o=Math.PI*e,u=!1;t=0==a?Math.sin(o):1==a?Math.cos(o):Math.tan(o),t<0&&(u=!0,t*=-1),.71==t.toPrecision(2)?(t="sqrt(2)/2",i="\\frac{\\sqrt{2}}{2}"):1.73==t.toPrecision(3)?(t="sqrt(3)",i="\\sqrt{3}"):.577==t.toPrecision(3)?(t="sqrt(3)/3",i="\\frac{\\sqrt{3}}{3}"):.866==t.toPrecision(3)?(t="sqrt(3)/2",i="\\frac{\\sqrt{3}}{2}"):.5==t.toPrecision(3)?(t="1/2",i="\\frac{1}{2}"):1==t.toPrecision(3)?(t="1",i="1"):2.45==t.toPrecision(3)?(t="0",i="0",u=!1):t>100?(t="undefined",i="undefined",u=!1):(i="0",t="0",u=!1),u&&(t="-"+t,i="-"+i),this.formula="$$"+r+"\\left("+s+"\\right)$$",this.displaySolution="$$"+i+"$$",this.solution=t,this.uinput1="",this.uinput2="",this.correct=!1,this.incorrect=!1,this.isDisabled=!1,this.displayHintButton=!0,this.displaySubmit=!0,this.numHint=1,this.uinput="",this.displayAllHints(!1)},submitMethod:function(){this.uinput==this.solution?(this.correct=!0,this.incorrect=!1,this.isDisabled=!0):(this.incorrect=!0,this.correct=!1),this.correct&&this.displayAllHints(!0)},displayAllHints:function(t){this.displayHint1=t},displayHints:function(){switch(this.numHint){case 1:this.displayHint1=!0;break}}}}),$=w,_=(n("b7a1"),Object(p["a"])($,H,x,!1,null,"7967377c",null)),C=_.exports,M=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"problem"},[n("button",{staticClass:"problem-button",on:{click:t.createProblem}},[t._v("Generate Linear Equation Problem")]),t._v(" "),n("br"),t.displayHintButton?n("button",{staticClass:"display-hint-button",staticStyle:{margin:"20px"},on:{click:t.displayHints}},[t._v("Display Hint ("+t._s(t.numHint)+"/4)")]):t._e(),t._v(" "),n("vue-mathjax",{attrs:{formula:t.formula}}),t._v(" "),n("br"),n("div",{directives:[{name:"show",rawName:"v-show",value:t.displaySubmit,expression:"displaySubmit"}],staticClass:"submit-block"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.uinput,expression:"uinput"}],staticStyle:{margin:"10px"},attrs:{placeholder:"Solution 1"},domProps:{value:t.uinput},on:{input:function(i){i.target.composing||(t.uinput=i.target.value)}}}),t._v(" "),n("button",{staticClass:"submit-button",attrs:{disabled:t.isDisabled},on:{click:t.submitMethod}},[t._v("Submit")]),t._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:t.isDisabled,expression:"isDisabled"}],staticClass:"submit-button",on:{click:t.createProblem}},[t._v("Next Problem")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.correct,expression:"correct"}],staticClass:"correct-banner"},[t._v("Correct!")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.incorrect,expression:"incorrect"}],staticClass:"incorrect-banner"},[t._v("Incorrect")])]),t.displayHint1?n("Hint",{attrs:{description:t.hintContent1,text:!0}}):t._e(),t.displayHint2?n("Hint",{attrs:{description:t.hintContent2,text:!0}}):t._e(),t.displayHint3?n("Hint",{attrs:{description:t.hintContent3,text:!0}}):t._e(),t.displayHint4?n("Hint",{attrs:{description:t.hintContent4,text:!0}}):t._e()],1)},k=[],P=n("d4ec"),S=n("bee2"),N=function(){function t(i,n){Object(P["a"])(this,t),this.num=i,this.denom=n,this.simplify()}return Object(S["a"])(t,[{key:"simplify",value:function(){var t=0;t=Math.abs(this.num)>Math.abs(this.denom)?Math.abs(this.num):Math.abs(this.denom);for(var i=t;i>=2;i--)if(this.num%i==0&&this.denom%i==0){this.num/=i,this.denom/=i;break}this.denom<0&&(this.num*=-1,this.denom*=-1)}},{key:"getNum",value:function(){return this.num}},{key:"getDenom",value:function(){return this.denom}},{key:"setNum",value:function(t){this.num=t,this.simplify()}},{key:"setDenom",value:function(t){this.denom=t,this.simplify()}},{key:"multiply",value:function(i){return new t(this.num*i.getNum(),this.denom*i.getDenom())}},{key:"divide",value:function(i){return new t(this.num*i.getDenom(),this.denom*i.getNum())}},{key:"add",value:function(i){return new t(this.num*i.getDenom()+i.getNum()*this.denom,this.denom*i.getDenom())}},{key:"subtract",value:function(i){return new t(this.num*i.getDenom()-i.getNum()*this.denom,this.denom*i.getDenom())}},{key:"toString",value:function(){return this.denom>1?this.num>0?"\\frac{"+this.num+"}{"+this.denom+"}":"-\\frac{"+Math.abs(this.num)+"}{"+this.denom+"}":this.num+""}},{key:"toAnswerForm",value:function(){return this.denom>1?this.num+"/"+this.denom:this.num+""}}]),t}(),D=N,O={name:"LinearEquationProblem",props:{},data:function(){return{problem:"",formula:"",count:0,uinput:null,correct:!1,incorrect:!1,displayHint1:!1,displayHint2:!1,displayHint3:!1,displayHint4:!1,hintContent1:null,hintContent2:null,hintContent3:null,hintContent4:null,displayHintButton:null,displaySubmit:!1,numHint:1,isDisabled:!1}},components:{Hint:b,"vue-mathjax":u["VueMathjax"]},methods:{signOf:function(t,i){return i?t>=0?"+":"-":t>=0?"-":"+"},removeOnes:function(t){for(var i=t.length-2;i>=0;i--)"1"!==t.substring(i,i+1)||"x"!==t.substring(i+1,i+2)&&"y"!==t.substring(i+1,i+2)&&"("!==t.substring(i+1,i+2)||(0==i?t=t.substring(1,t.length):" "!==t.substring(i-1,i)&&"-"!==t.substring(i-1,i)&&"$"!==t.substring(i-1,i)||(t=t.substring(0,i)+t.substring(i+1,t.length)));return t},createProblem:function(){var t=new D(Math.trunc(10*Math.random()),Math.trunc(4*Math.random())+1);Math.random()>=.5&&t.setNum(-1*t.getNum()),Math.random()>=.5&&t.setDenom(1);var i=new D(t.getNum(),t.getDenom());this.hintContent4="$$x = "+t+"$$";var n=new D(Math.trunc(9*Math.random())+1,Math.trunc(4*Math.random())+1);Math.random()>=.5&&n.setDenom(1),Math.random()>=.5&&n.setNum(-1*n.getNum()),i=i.multiply(n),this.hintContent2="$$"+n+"x = "+i+"$$",this.hintContent3="$$"+n+"x\\left("+new D(n.getDenom(),n.getNum())+"\\right) = "+i+"\\left("+new D(n.getDenom(),n.getNum())+"\\right)$$";var e,s=new D(Math.trunc(24*Math.random())+1,Math.trunc(3*Math.random())+1);Math.random()>=.5&&s.setDenom(1),Math.random()>=.5?(i=i.add(s),e="$$"+n+"x + "+s+" = "+i+"$$",this.hintContent1="$$"+n+"x + "+s+" - "+s+" = "+i+" - "+s+"$$"):(i=i.subtract(s),e="$$"+n+"x - "+s+" = "+i+"$$",this.hintContent1="$$"+n+"x - "+s+" + "+s+" = "+i+" + "+s+"$$"),e=this.removeOnes(e),this.hintContent1=this.removeOnes(this.hintContent1),this.hintContent2=this.removeOnes(this.hintContent2),this.hintContent3=this.removeOnes(this.hintContent3),this.hintContent4=this.removeOnes(this.hintContent4),this.formula=e,this.correct=!1,this.incorrect=!1,this.displayHintButton=!0,this.displaySubmit=!0,this.numHint=1,this.displayAllHints(!1),this.isDisabled=!1,this.sol=t.toAnswerForm(),this.uinput=null},submitMethod:function(){this.uinput==this.sol?(this.correct=!0,this.incorrect=!1,this.isDisabled=!0):this.incorrect=!0,this.correct&&this.displayAllHints(!0)},displayAllHints:function(t){this.displayHint1=t,this.displayHint2=t,this.displayHint3=t,this.displayHint4=t},displayHints:function(){switch(this.numHint){case 1:this.displayHint1=!0,this.numHint++;break;case 2:this.displayHint2=!0,this.numHint++;break;case 3:this.displayHint3=!0,this.numHint++;break;case 4:this.displayHint4=!0;break}}}},j=O,q=(n("1bdf"),Object(p["a"])(j,M,k,!1,null,"22d665b9",null)),A=q.exports,T=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"problem"},[n("button",{staticClass:"problem-button",on:{click:t.createProblem}},[t._v("Generate System of Equations Problem")]),t._v(" "),n("br"),t.displayHintButton?n("button",{staticClass:"display-hint-button",staticStyle:{margin:"20px"},on:{click:t.displayHints}},[t._v("Display Hint ("+t._s(t.numHint)+"/4)")]):t._e(),t._v(" "),n("vue-mathjax",{attrs:{formula:t.formula}}),n("br"),n("div",{directives:[{name:"show",rawName:"v-show",value:t.displaySubmit,expression:"displaySubmit"}],staticClass:"submit-block"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.uinputX,expression:"uinputX"}],staticStyle:{margin:"10px"},attrs:{placeholder:"x = "},domProps:{value:t.uinputX},on:{input:function(i){i.target.composing||(t.uinputX=i.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.uinputY,expression:"uinputY"}],staticStyle:{margin:"10px"},attrs:{placeholder:"y = "},domProps:{value:t.uinputY},on:{input:function(i){i.target.composing||(t.uinputY=i.target.value)}}}),n("button",{staticClass:"submit-button",attrs:{disabled:t.isDisabled},on:{click:t.submitMethod}},[t._v("Submit")]),t._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:t.isDisabled,expression:"isDisabled"}],staticClass:"submit-button",on:{click:t.createProblem}},[t._v("Next Problem")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.correct,expression:"correct"}],staticClass:"correct-banner"},[t._v("Correct!")]),t._v(" "),n("h1",{directives:[{name:"show",rawName:"v-show",value:t.incorrect,expression:"incorrect"}],staticClass:"incorrect-banner"},[t._v("Incorrect")])]),t.displayHint1?n("Hint",{attrs:{description:t.hintContent1,text:!0}}):t._e(),t.displayHint2?n("Hint",{attrs:{description:t.hintContent2,text:!0}}):t._e(),t.displayHint3?n("Hint",{attrs:{description:t.hintContent3,text:!0}}):t._e(),t.displayHint4?n("Hint",{attrs:{description:t.hintContent4,text:!0}}):t._e()],1)},E=[],F={name:"SystemProblem",props:{},data:function(){return{problem:"",formula:"",count:0,uinputX:null,uinputY:null,correct:!1,incorrect:!1,solX:0,solY:0,displayHint1:!1,displayHint2:!1,displayHint3:!1,displayHint4:!1,hintContent1:null,hintContent2:null,hintContent3:null,hintContent4:null,displayHintButton:null,displaySubmit:!1,numHint:1,isDisabled:!1}},components:{Hint:b,"vue-mathjax":u["VueMathjax"]},methods:{signOf:function(t,i){return i?t>=0?"+":"-":t>=0?"-":"+"},removeOnes:function(t){for(var i=t.length-2;i>=0;i--)"1"!==t.substring(i,i+1)||"x"!==t.substring(i+1,i+2)&&"y"!==t.substring(i+1,i+2)&&"("!==t.substring(i+1,i+2)||(0==i?t=t.substring(1,t.length):" "!==t.substring(i-1,i)&&"-"!==t.substring(i-1,i)&&"$"!==t.substring(i-1,i)||(t=t.substring(0,i)+t.substring(i+1,t.length)));return t},createProblem:function(){var t=new D(Math.trunc(10*Math.random()),Math.trunc(3*Math.random())+1),i=new D(Math.trunc(10*Math.random()),Math.trunc(3*Math.random())+1);Math.random()>=.5&&t.setNum(-1*t.getNum()),Math.random()>=.5&&i.setNum(-1*i.getNum()),Math.random()>=.5&&t.setDenom(1),Math.random()>=.5&&i.setDenom(1);var n=Math.trunc(8*Math.random()+1);Math.random()>=.5&&(n*=-1);var e=Math.trunc(8*Math.random()+1);Math.random()>=.5&&(e*=-1);var s=Math.trunc(8*Math.random()+1);Math.random()>=.5&&(s*=-1);var a=Math.trunc(8*Math.random()+1);Math.random()>=.5&&(a*=-1);while(Math.trunc(1e8*n/s)==Math.trunc(1e8*e/a))a=Math.trunc(9*Math.random()+1),Math.random()>=.5&&(a*=-1);var r=t.multiply(new D(n,1)).add(i.multiply(new D(e,1))),o=t.multiply(new D(s,1)).add(i.multiply(new D(a,1))),u="";u=n+"x "+this.signOf(e,!0)+" "+Math.abs(e)+"y = "+r,u+="$$\n$$"+s+"x "+this.signOf(a,!0)+" "+Math.abs(a)+"y = "+o;var l=new D(-1*n,e),c=new D(r.getNum(),r.getDenom()*e),h=e+"y = "+r+" "+this.signOf(n,!1)+" "+Math.abs(n)+"x";h+="$$\n$$y = \\frac{"+r+" "+this.signOf(n,!1)+" "+Math.abs(n)+"x}{"+e+"}",h+="$$\n$$y = "+c+" "+this.signOf(l.getNum(),!0)+" "+new D(Math.abs(l.getNum()),l.getDenom())+"x";var m=s+"x "+this.signOf(a,!0)+" "+Math.abs(a)+"\\left("+c+" "+this.signOf(l.getNum(),!0)+" "+new D(Math.abs(l.getNum()),l.getDenom())+"x\\right) = "+o;c=c.multiply(new D(a,1)),l=l.multiply(new D(a,1)),m+="$$\n$$"+s+"x "+this.signOf(c.getNum(),!0)+" "+new D(Math.abs(c.getNum()),c.getDenom())+" "+this.signOf(l.getNum(),!0)+" "+new D(Math.abs(l.getNum()),l.getDenom())+"x = "+o,l=l.add(new D(s,1)),c=c.multiply(new D(-1,1)).add(o);var p=l+"x = "+c;p+="$$\n$$x = "+t;var d=n+"\\left("+t+"\\right) "+this.signOf(e,!0)+" "+Math.abs(e)+"y = "+r;d+="$$\n$$"+e+"y = "+i.multiply(new D(e,1)),d+="$$\n$$y = "+i,u=this.removeOnes(u),h=this.removeOnes(h),m=this.removeOnes(m),p=this.removeOnes(p),d=this.removeOnes(d),this.formula="$$"+u+"$$",this.hintContent1="$$"+h+"$$",this.hintContent2="$$"+m+"$$",this.hintContent3="$$"+p+"$$",this.hintContent4="$$"+d+"$$",this.solX=t.toAnswerForm(),this.solY=i.toAnswerForm(),this.uinputX=null,this.uinputY=null,this.correct=!1,this.incorrect=!1,this.displayHintButton=!0,this.displaySubmit=!0,this.numHint=1,this.displayAllHints(!1),this.isDisabled=!1},submitMethod:function(){this.uinputX==this.solX&&this.uinputY==this.solY?(this.correct=!0,this.incorrect=!1,this.isDisabled=!0):this.incorrect=!0,this.correct&&this.displayAllHints(!0)},displayAllHints:function(t){this.displayHint1=t,this.displayHint2=t,this.displayHint3=t,this.displayHint4=t},displayHints:function(){switch(this.numHint){case 1:this.displayHint1=!0,this.numHint++;break;case 2:this.displayHint2=!0,this.numHint++;break;case 3:this.displayHint3=!0,this.numHint++;break;case 4:this.displayHint4=!0;break}}}},B=F,I=(n("a30b"),Object(p["a"])(B,T,E,!1,null,"2d1cfa44",null)),L=I.exports,V={name:"App",components:{Problem:g,TrigProblem:C,LinearEquationProblem:A,SystemProblem:L},data:function(){return{factoring:"true"==localStorage.getItem("factoring"),trig:"true"==localStorage.getItem("trig"),linear:"linear"==localStorage.getItem("linear"),system:"system"==localStorage.getItem("system"),picked:"Factoring"}},mounted:function(){this.factoring=!0},methods:{showProblem:function(){this.falsifyEverything(),"Trig"==localStorage.problemType?this.trig=!0:"Factoring"==localStorage.problemType?this.factoring=!0:"Linear"==localStorage.problemType?this.linear=!0:"System"==localStorage.problemType&&(this.system=!0)},getPicked:function(){return localStorage.problemType=this.picked,this.picked},falsifyEverything:function(){this.factoring=!1,this.trig=!1,this.linear=!1,this.system=!1},setFactoring:function(){this.falsifyEverything(),this.factoring=!0},setTrig:function(){this.falsifyEverything(),this.trig=!0},setLinear:function(){this.falsifyEverything(),this.linear=!0},setSystem:function(){this.falsifyEverything(),this.system=!0}}},X=V,Y=(n("034f"),Object(p["a"])(X,s,a,!1,null,null,null)),G=Y.exports;e["a"].config.productionTip=!1,new e["a"]({render:function(t){return t(G)}}).$mount("#app")},"85ec":function(t,i,n){},a30b:function(t,i,n){"use strict";n("0e44")},b6bd:function(t,i,n){},b7a1:function(t,i,n){"use strict";n("b6bd")},c6fe:function(t,i,n){},d832:function(t,i,n){"use strict";n("c6fe")},e02c:function(t,i,n){}});
//# sourceMappingURL=app.b9cdefc8.js.map