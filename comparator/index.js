/**
 * Recibir un objeto y el JSON con todos los objetos, para luego comparar ese objeto contra
 * todos los de la lista. Para cada uno de los objetos obtener un grado de similitud,
 * y si dicho grado supera un limite predefinido, ese objeto sera devuelto.
 */


import fs from "fs-extra";
// import AverageSimilarityCalculator from "./src/classes/integrationStrategies/CharSimilarityCalculator.js";
import CharSimilarityCalculator from "./src/classes/integrationStrategies/CharSimilarityCalculator.js";
import jsonFile from "jsonfile";
import configuration from "./common/config.js";

const charSimilarityCalculator = new CharSimilarityCalculator(
  configuration
);

// averageSimilarityCalculator.setfieldMethods('name', FieldTypeCalculatorFactory.diceStringSimilarityCalculator)
// averageSimilarityCalculator.setfieldMethods('memory', FieldTypeCalculatorFactory.numberDistanceSimilarityCalculator)
// averageSimilarityCalculator.setfieldMethods('camera', FieldTypeCalculatorFactory.diceStringSimilarityCalculator)


//get arguments
var myArgs = process.argv.slice(2);

let inputFile = myArgs[0];
let inputObject = myArgs[1];
let outputFile = myArgs[2];
let aThreshold = myArgs[3];

//an inputObject number refeers to the object position in the inputFile
//otherwise is the object

inputFile = jsonFile.readFileSync(inputFile);
if (isNaN(inputObject)) {
  inputObject = jsonFile.readFileSync(inputObject);
} else {
  parseInt(inputObject);
  if (inputObject > inputFile.length) {
    throw "The object number does not exists. Try another number.";
  }
  inputObject = inputFile[inputObject];
}

//compares a json object against a file with multiple objects
charSimilarityCalculator
  .getSimilarityMap(inputObject, inputFile, aThreshold)
  .then((result) =>{
    fs.writeFileSync(outputFile, JSON.stringify([...result]), "utf-8")
  }
  )
  .catch((err) => console.error(err));


//compares 2 simple JSON objects
// averageSimilarityCalculator
//   .getSimilarity(inputObject, inputFile)
//   .then(result =>
//     fs.writeFileSync(outputFile, JSON.stringify(result), "utf-8")
//   )
//   .catch(err => console.error(err));
