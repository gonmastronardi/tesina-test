import FieldNormalizer from "./FieldNormalizer.js";

export default class MainCameraNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(optionalField) {
    super();
    this.optionalField = optionalField;
  }
 //check if the Processor exists in the string and save them isolated on a new field.
  normalize(anObject, key) {
    let camera = anObject[key];
    if (camera){
        camera = getMaxCamera(camera);    
        anObject[this.optionalField] = camera + "MP";
      }
    }

  getMaxCamera(data){
    return Math.max(...data.split(" ")
                    .map((e) => { 
                      try { 
                        return parseInt(e) } 
                      catch { 
                        return ""}
                      }
                    ).filter( (e) => Number.isInteger(e)));

  } 
};