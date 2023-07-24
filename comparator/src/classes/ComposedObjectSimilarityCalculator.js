import ObjectSimilarityCalculator from "./ObjectSimilarityCalculator.js";

export default class ComposedObjectSimilarityCalculator extends ObjectSimilarityCalculator {

  constructor(aConfiguration) {
    super();
    if (new.target === ComposedObjectSimilarityCalculator) {
      throw new TypeError(
        "Cannot construct ComposedObjectSimilarityCalculator instances directly"
      );
    }

    this.fieldCalculatorMethods = aConfiguration;
  }

  //it returns a similarity number between the 2 objects.it compares each field
  async getSimilarity(anObject, anotherObject) {
    //map for values of the objects.
    this.fieldsSimilitudes = new Map();
    for (var key in this.fieldCalculatorMethods) {
      //cheks if both values are complete
      if (!anotherObject[key] || !anObject[key]) {
        this.fieldsSimilitudes[key] = null;
      } else {
        //calls method to compare fields
        this.fieldsSimilitudes[key] = await this.fieldCalculatorMethods[
          key
        ].getSimilarity(anObject[key], anotherObject[key]);
      }
    }
    console.log(this.fieldsSimilitudes);
    //integrates all the values and returns the final result.
    return this.integrate(this.fieldsSimilitudes);
  }

  integrate(aMap) {
    throw new TypeError("Must override method in the subclass");
  }
};
