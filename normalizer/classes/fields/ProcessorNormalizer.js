import FieldNormalizer from "./FieldNormalizer.js";

export default class ProcessorNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(ProcesorDesired, optionalField) {
    super();
    this.ProcesorTarget = ProcesorDesired;
    this.optionalField = optionalField;
  }
 //check if the Processor exists in the string and save them isolated on a new field.
  normalize(anObject) {
    const content = Object.values(anObject).map((p)=>p.toLowerCase()).reduce((prev,curr)=>prev+curr,"")
    if (content.includes(this.ProcesorTarget)){
        anObject[this.optionalField] = this.ProcesorTarget;
      }
    }
};