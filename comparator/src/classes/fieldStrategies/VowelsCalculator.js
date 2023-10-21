import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";


export default class CharSimilarityCalculator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }


  async GetNumberWords(aString){
    // console.log(`palabra ${aString}`)
    // console.log(aString.split(" "))
    const count = {}
    for(var word of aString.split(" ")){
      // console.log("word: ", word)
      // console.log("count: ", count)
      const parseWord = word.toLowerCase()
      if(Object.keys(count).includes(parseWord)) 
        count[parseWord]++;
      else
        count[parseWord] = 1
    }
    // console.log(`count ${Object.entries(count)}`)
    const resul  = Object.entries(count).map(([k,v])=> [k,1/v])
    // console.log(`resul: ${resul}`)
    const response = resul.map(([k,v])=>v).reduce((prev,curr)=> parseFloat(prev)+parseFloat(curr),0);
    // console.log(`resultado :  ${response}`)
    return Promise.resolve(response)
  }


  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      //do stuff if query is defined and not null
      this.GetNumberWords(aString)
      .then((data_A)=>{
        this.GetNumberWords(anotherString)
        .then((data_B)=>{
          // console.log(`a: ${data_A}`)
          // console.log(`b: ${data_B}`)
          return Promise.resolve(data_A / data_B)
        })
        .catch((e)=>console.log('error b'))
      })
      .catch((e)=>console.log('error a'))
    } else {
      return 0
    }
  }
};

