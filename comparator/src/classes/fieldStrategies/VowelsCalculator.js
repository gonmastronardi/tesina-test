import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";


export default class CharSimilarityCalculator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }


  async GetNumberChars(aString){
    console.log(`palabra ${aString}`)
    const count = {}
    for(var char of aString){
      if(count[char]) (count[char] || 0 ) + 1;
    }
    console.log(`count ${Object.entries(count)}`)
    const resul  = Object.entries(count).map(([k,v])=> [k,1/v])
    console.log(`resul: ${resul}`)
    const response = Object.values(resul).reduce((prev,curr)=> parseInt(prev)+parseInt(curr),0);
    console.log(`resultado :  ${response}`)
    return response
  }


  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      //do stuff if query is defined and not null
      let a;
      let b;
      this.GetNumberChars(aString).then((data)=>{console.log(data)}).catch((e)=>console.log('error a'))
      this.GetNumberChars(anotherString).then((data)=>{console.log(data)}).catch((e)=>console.log('error b'))
      // const b = Promise.resolve(this.GetNumberChars(anotherString))
      console.log(`a: ${a}`)
      console.log(`b: ${b}`)
      return a / b

    } else {
      return 0
    }
  }
};

