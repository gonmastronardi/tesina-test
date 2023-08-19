import FieldNormalizer from "./FieldNormalizer.js";

export default class mainCameraNormalizer extends FieldNormalizer {
  constructor(optionalField) {
    super();
    this.optionalField = optionalField;
  }
  normalize(anObject, attribute) {
    let cameraDescription = anObject[attribute];
    if (cameraDescription) {
      const megapixelsRegex = /\d+(\.\d+)?(?=[^\dº])/g;
      const megapixelsArray = cameraDescription.match(megapixelsRegex);
      if (megapixelsArray) {
        const megapixelsNumbers = megapixelsArray.map(Number);
        anObject[this.optionalField] = Math.max(...megapixelsNumbers);
      }
    }
  }
};
