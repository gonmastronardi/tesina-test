import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";


export default class WordSimilarityCalculator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }

  GetSimiliarityWords(aString, anotherString){
    const text_a = aString.split(" ").map(w => w.toLowerCase())
    const text_b = anotherString.split(" ").map(w => w.toLowerCase())
    const resul = text_a.filter(word => text_b.includes(word))
    if (resul.length == 0) return 0
    if (resul.length == text_a.length) return text_a.length === text_b.length ? 1 : resul.length / text_b.length 
    return resul.length / text_a.length
  }


  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      //do stuff if query is defined and not null
      return this.GetSimiliarityWords(aString, anotherString)
  
    }
  }
};

