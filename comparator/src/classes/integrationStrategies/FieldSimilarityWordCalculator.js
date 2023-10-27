import ComposedObjectSimilarityCalculator from "../ComposedObjectSimilarityCalculator.js";

export default class FieldSimilarityWordCalculator extends ComposedObjectSimilarityCalculator {
  constructor(aConfiguration) {
    super(aConfiguration);
  }

  integrate(aMap) {
    const resultado = Object.entries(aMap).map(([key, value]) => {
      if (value){
        return value
      }
      return 0
    }).reduce((prev,curr) => prev+curr,0)
    return resultado / Object.keys(aMap).length
  }
};
