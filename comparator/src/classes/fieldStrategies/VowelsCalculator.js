import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";


export default class CharSimilarityCalculator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }


  GetNumberWords(aString){
    const count = {}
    for(var word of aString.split(" ")){
      const parseWord = word.toLowerCase()
      if(Object.keys(count).includes(parseWord)) 
        count[parseWord]++;
      else
        count[parseWord] = 1
    }
    const resul  = Object.entries(count).map(([k,v])=> [k,1/v])
    const response = resul.map(([k,v])=>v).reduce((prev,curr)=> parseFloat(prev)+parseFloat(curr),0);
    return response
  }


  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      //do stuff if query is defined and not null
      const data_A = this.GetNumberWords(aString)
      const data_B = this.GetNumberWords(anotherString)
      return data_A / data_B
    } else {
      return 0
    }
  }
};

