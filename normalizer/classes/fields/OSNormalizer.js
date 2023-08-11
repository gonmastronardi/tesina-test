import FieldNormalizer from "./FieldNormalizer.js";

export default class OSNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(OSs, optionalField) {
    super();
    this.OSs = OSs;
    this.optionalField = optionalField;
  }
 //check if the OS names exists in the string and save them isolated on a new field.
  normalize(anObject, attribute) {
    let OSDescription = anObject[attribute];
    if (OSDescription){
      OSDescription = OSDescription.toUpperCase();
      console.log(OSDescription);
      for (let i = 0; i< this.OSs.length; i++){
          if (OSDescription.includes(this.OSs[i])){
            console.log('ENCONTRADOOOOOOOOOOOOOOOOOO')
              anObject[this.optionalField] = this.OSs[i];
          }else{
            console.log('NO ENCONTRADOOOOOOOOOOOOOOOOOO')
          }
      }
    }
  }

};
