import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";
import jaroWinklerSimilarity from 'jaro-winkler';


export default class JaroWinklerSimilarityCalculator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }

  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      //do stuff if query is defined and not null
      return jaroWinklerSimilarity(aString,anotherString)
    } else {
      return 0
    }
  }
};

