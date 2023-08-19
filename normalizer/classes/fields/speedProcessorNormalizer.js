import FieldNormalizer from "./FieldNormalizer.js";

export default class speedProcessorNormalizer extends FieldNormalizer {
  constructor(optionalField) {
    super();
    this.optionalField = optionalField;
  }
  normalize(anObject, attribute) {
    let speedProcessor = anObject[attribute];
    if (speedProcessor) {
        const GHZ_TO_MHZ_CONVERSION = 1000;
        const ghzMatches = speedProcessor.match(/\d+(\.\d+)?\s*GHz/g) || [];
        const mhzMatches = speedProcessor.match(/\d+(\.\d+)?\s*MHz/g) || [];
        const speedsMhz = ghzMatches.map(speed => parseFloat(speed) * GHZ_TO_MHZ_CONVERSION)
            .concat(mhzMatches.map(speed => parseFloat(speed)));
        let processorSpeed =  speedsMhz.length > 0 ? Math.max(...speedsMhz) : null;
      if (processorSpeed) {
        anObject[this.optionalField] = processorSpeed;
      }
    }
  }


};
