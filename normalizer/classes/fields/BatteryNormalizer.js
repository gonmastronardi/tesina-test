import FieldNormalizer from "./FieldNormalizer.js";

export default class BatteryNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(BatteryDesired, optionalField) {
    super();
    this.BaterryTarget = BatteryDesired;
    this.optionalField = optionalField;
  }
 //check if the Processor exists in the string and save them isolated on a new field.
  normalize(anObject, key) {
    let baterry = anObject[key];
    if (baterry){
        baterry = baterry.toLowerCase();
        if (baterry.includes('mAh')){
            baterry = parseInt(baterry.replace('mAh', ''));
            if(baterry > this.BaterryTarget)
              anObject[this.optionalField] = this.BaterryTarget;
        }
        else
        anObject[this.optionalField] = "NN";
      }
    }
};