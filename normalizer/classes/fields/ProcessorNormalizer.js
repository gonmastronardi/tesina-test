import FieldNormalizer from "./FieldNormalizer.js";

export default class ProcessorNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(ProcesorDesired, optionalField) {
    super();
    this.ProcesorTarget = ProcesorDesired;
    this.optionalField = optionalField;
  }
 //check if the Processor exists in the string and save them isolated on a new field.
  normalize(anObject, key) {
    let processor = anObject[key];
    if (processor){
        processor = processor.toLowerCase();
        if (processor.includes(this.ProcesorTarget)){
            anObject[this.optionalField] = this.ProcesorTarget;
        }
      }
    }
};