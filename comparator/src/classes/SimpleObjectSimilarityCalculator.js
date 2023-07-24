import ObjectSimilarityCalculator from "./ObjectSimilarityCalculator.js";

export default class SimpleObjectSimilarityCalculator extends ObjectSimilarityCalculator {
  constructor() {
    super();
    if (new.target === SimpleObjectSimilarityCalculator) {
      throw new TypeError(
        "Cannot construct SimpleObjectSimilarityCalculator instances directly"
      );
    }
  }

  async getSimilarity(anObject, anotherObject) {
    throw new TypeError("Must override method in the subclass");
  }
};
