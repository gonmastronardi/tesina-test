import ComposedObjectSimilarityCalculator from "../ComposedObjectSimilarityCalculator.js";

export default class AverageSimilarityCalculator extends ComposedObjectSimilarityCalculator {
  constructor(aConfiguration) {
    super(aConfiguration);
  }

  integrate(aMap) {
    let totalFieldsValue = 0;
    let quantityOfFields = 0;
    for (var key in aMap) {
      if (aMap[key] != null){
        totalFieldsValue += aMap[key];
        quantityOfFields++;
      }
    }
    // console.log('Total: '+totalFieldsValue)
    // console.log('Number of fields: ' + quantityOfFields)
    // console.log('Result: '+ (totalFieldsValue/quantityOfFields))
    // console.log('-')
    return totalFieldsValue / quantityOfFields;
  }
};
