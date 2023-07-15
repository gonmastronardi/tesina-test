import FieldNormalizer from "./FieldNormalizer.js";

export default class CleanNormalizer extends FieldNormalizer {
  //it receive the words we want to delete in the text.
  constructor(wordsToDelete) {
    super();
    this.wordsToDelete = wordsToDelete;
  }

  get wordsToDelete(){
    return this._wordsToDelete;
  }

  set wordsToDelete(newWords){
    if(!newWords){
      throw 'Must include any word';
    }
    this._wordsToDelete=newWords;

  }
 //check if the words exists in the string and delete the corresponding ones.
  normalize(anObject, attribute) {
    let name = anObject[attribute];
    name = this.deleteIfExists(name, this.wordsToDelete);
    anObject[attribute] = name;
  }


};
