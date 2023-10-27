import JaroWinklerSimilarityCalculator from "./JaroWinklerSimilarityCalculator.js";
import WordSimilarityCalculator from "./WordSimilarityCalculator.js";
export default {
  jaroWinklerSimilarityCalculator: new JaroWinklerSimilarityCalculator(),
  charSimilarityCalculator: new WordSimilarityCalculator()
};
