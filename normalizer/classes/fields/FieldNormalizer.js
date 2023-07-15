import {field as debugField} from "../../lib/debuggers.js";
import {info as debugInfo} from "../../lib/debuggers.js";

//abstract class, it works as an interface
export default class FieldNormalizer {
  constructor() {
    //if setted, console.logs fields properties
    //export DEBUG=field,info
    this.debugField = debugField;
    this.debugInfo = debugInfo;
  }

  //it must be implemented by the subclasses
  normalize(anObject, attribute) {
    throw new TypeError("Must override method");
  }

  //it receives a text and an array with those words intented to delete in it. 
  //it returns the text modified.
  deleteIfExists(aValue, wordsToDelete){
    if(!aValue){
      return "";
    }
    let result = aValue;
      for (var k in wordsToDelete) {
        if (result.toUpperCase().includes(wordsToDelete[k].toUpperCase())) {
          let regex = new RegExp(wordsToDelete[k], "gi");
          result = result.replace(regex, "");
        }
      }
        //remove extra whitespaces
      result = result.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
      return result;

  }

};
