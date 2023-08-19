import fieldComparators from "../src/classes/fieldStrategies/fieldComparators.js";

var configuration = {
    name: fieldComparators.jaroWinklerSimilarityCalculator,
    processor: fieldComparators.jaroWinklerSimilarityCalculator,
    ramMemory: fieldComparators.jaroWinklerSimilarityCalculator,
    storageMemory: fieldComparators.jaroWinklerSimilarityCalculator,
    mainCamera: fieldComparators.jaroWinklerSimilarityCalculator,
    price: fieldComparators.jaroWinklerSimilarityCalculator,
    battery: fieldComparators.jaroWinklerSimilarityCalculator,
    screenSize: fieldComparators.jaroWinklerSimilarityCalculator,
    speedProcessor: fieldComparators.jaroWinklerSimilarityCalculator,
    operatingSystem: fieldComparators.levensteinComparator,
  };

  export default configuration;