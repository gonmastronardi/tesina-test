import fieldComparators from "../src/classes/fieldStrategies/fieldComparators.js";

// var configuration = {
//     name: fieldComparators.jaroWinklerSimilarityCalculator,
//     processor: fieldComparators.jaroWinklerSimilarityCalculator,
//     ramMemory: fieldComparators.jaroWinklerSimilarityCalculator,
//     storageMemory: fieldComparators.jaroWinklerSimilarityCalculator,
//     mainCamera: fieldComparators.jaroWinklerSimilarityCalculator,
//     price: fieldComparators.jaroWinklerSimilarityCalculator,
//     battery: fieldComparators.jaroWinklerSimilarityCalculator,
//     processor: fieldComparators.jaroWinklerSimilarityCalculator,
//     screenSize: fieldComparators.jaroWinklerSimilarityCalculator,
//     speedProcessor: fieldComparators.jaroWinklerSimilarityCalculator,
//     operatingSystem: fieldComparators.jaroWinklerSimilarityCalculator
//   };

  var configuration = {
    name: fieldComparators.charSimilarityCalculator,
    processor: fieldComparators.charSimilarityCalculator,
    ramMemory: fieldComparators.charSimilarityCalculator,
    storageMemory: fieldComparators.charSimilarityCalculator,
    mainCamera: fieldComparators.charSimilarityCalculator,
    price: fieldComparators.charSimilarityCalculator,
    battery: fieldComparators.charSimilarityCalculator,
    processor: fieldComparators.charSimilarityCalculator,
    screenSize: fieldComparators.charSimilarityCalculator,
    speedProcessor: fieldComparators.charSimilarityCalculator,
    operatingSystem: fieldComparators.charSimilarityCalculator
  };

  export default configuration;