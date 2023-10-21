import ComposedObjectSimilarityCalculator from "../ComposedObjectSimilarityCalculator.js";

export default class CharSimilarityCalculator extends ComposedObjectSimilarityCalculator {
  constructor(aConfiguration) {
    super(aConfiguration);
  }

  integrate(aMap) {
    let totalFieldsValue = 0;
    for (var key in aMap) {
      if (aMap[key] != null){
        totalFieldsValue += aMap[key];
      }
    }
    return totalFieldsValue;
  }
};
