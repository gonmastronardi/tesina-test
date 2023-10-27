import FieldNormalizer from "./FieldNormalizer.js";

export default class BatteryNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(optionalField) {
    super();
    this.optionalField = optionalField;
  }
 //check if the Processor exists in the string and save them isolated on a new field.

  check_integet(value){
    try{
      return parseInt(value) && true
    }
    catch(err){
      return false
    }
  }

  check_regex(value){
    const regex = /\d+/; // This regex matches one or more digits

    const match = value.match(regex);

    if (match) {
      const integer = parseInt(match[0]);
      return integer;
    } else {
      return null;
}
  }

  normalize(anObject, key) {
    let baterry = anObject[key];
    if (baterry){
        baterry = baterry.toLowerCase();
        if (!baterry.includes('mah')){
          baterry = baterry.split(" ").filter(word => this.check_integet(word));
          if (baterry.length > 0)
            anObject[this.optionalField] = "NN mAh";
          else if (baterry.length == 1){
            anObject[this.optionalField] = (check_regex(baterry[0]) || "NN") + " mAh";
          }
          anObject[this.optionalField] = baterry[0] + " mAh";
        }
      }
    }
};