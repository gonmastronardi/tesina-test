import JaroWinklerSimilarityCalculator from "./JaroWinklerSimilarityCalculator.js";
import levensteinComparator from "./levensteinComparator.js";

export default {
  jaroWinklerSimilarityCalculator: new JaroWinklerSimilarityCalculator(),
  levensteinComparator: new levensteinComparator()
};
