export default class ObjectNormalizer {
  
  constructor(aConfiguration) {
    this.configuration = aConfiguration;
  }

  //it receives a map of JSON objects, and it calls normalizeObjet for each one
  normalizeObjectsInMap(aMapOfObjects) {
    for (var key in aMapOfObjects) {
      aMapOfObjects[key].properties.url = aMapOfObjects[key].url;
      aMapOfObjects[key].properties.dBPediaType = aMapOfObjects[key].type;

      // console.log(aMapOfObjects[key].properties);
      aMapOfObjects[key] = this.normalizeObject(aMapOfObjects[key].properties);
      console.log("Object " + key + ' normalized');
    }
    return aMapOfObjects;
  }

  /**
   * it receives a JSON object, iterating on the fields
   * and it calls the corresponding normalize method depending on the field configuration
   */
  normalizeObject(anObject) {
    for (var key in this.configuration) {
      this.configuration[key].normalize(anObject, key);
    }
    return anObject;
  }
};