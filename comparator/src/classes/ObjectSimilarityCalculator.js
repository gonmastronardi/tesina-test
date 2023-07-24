export default class ObjectSimilarityCalculator {
  //Indicates it's an Abstract Class
  constructor() {
    if (new.target === ObjectSimilarityCalculator) {
      throw new TypeError(
        "Cannot construct ObjectSimilarityCalculator instances directly"
      );
    }
  }

  async getSimilarity(anObject, anotherObject) {
    throw new TypeError("Must override method in the subclass");
  }

  //it receives an object and a map ob objects to compare.
  async getSimilarityMap(anObject, aMapOfObjects, aThreshold) {
    //a map to store the results
    this.result = new Map();
    //put the entry object at the very top of the result to return the original.
    this.result.set(anObject, 1);

    for (var key in aMapOfObjects) {
      //it calls getSimilarity method with the original object and every other in the map
      let similarityValue = await this.getSimilarity(
        anObject,
        aMapOfObjects[key]
      );
      //if the objects are +0.5 similars, save to return
      if (similarityValue >= aThreshold) {
        this.result.set(aMapOfObjects[key], similarityValue);
      }
    }
    //order map by asc.
    var mapAsc = new Map(
      [...this.result.entries()].sort((e1, e2) => e2[1] - e1[1])
    );
    return mapAsc;
  }
};
