import jsonfile from "jsonfile";
import ObjectNormalizer from "./classes/ObjectNormalizer.js";
import configuration from './common/config.js';

// const inputFile = "./data/dataSet.json";
// let outputFile = "./data/output.json";

const inputFile  = process.argv[2];
let outputFile = process.argv[3];


//creates an ObjectNormalizer with the previous configuration
const normalizer = new ObjectNormalizer(configuration);

//reads the input file and it calls normalize method from ObjectNormalizer 
jsonfile
  .readFile(inputFile)
  .then(result => normalizer.normalizeObjectsInMap(result))
  .then(result => jsonfile.writeFile(outputFile, result))
  .catch(err => console.error(err));