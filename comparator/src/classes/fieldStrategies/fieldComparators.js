import JaroWinklerSimilarityCalculator from "./JaroWinklerSimilarityCalculator.js";
import CharSimilarityCalculator from "./VowelsCalculator.js";
export default {
  jaroWinklerSimilarityCalculator: new JaroWinklerSimilarityCalculator(),
  charSimilarityCalculator: new CharSimilarityCalculator()
};
