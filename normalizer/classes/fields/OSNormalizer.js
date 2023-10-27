import FieldNormalizer from "./FieldNormalizer.js";

export default class OSNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(OSDesired, optionalField) {
    super();
    this.OSTarget = OSDesired;
    this.optionalField = optionalField;
  }
 //check if the Processor exists in the string and save them isolated on a new field.
  normalize(anObject, key) {
    let os = anObject[key];
    if (os){
        os = os.toLowerCase().split(" ");
        let op = os.filter(o => this.OSTarget.map(word => word.toLowerCase()).includes(o));
        anObject[this.optionalField] = op[0];
      }
    }
};